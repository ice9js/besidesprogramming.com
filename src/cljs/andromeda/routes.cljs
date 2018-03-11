(ns andromeda.routes
  (:require-macros [secretary.core :refer [defroute]])
  (:import goog.history.Html5History
           goog.Uri)
  (:require [secretary.core :as secretary]
            [goog.events :as events]
            [goog.history.EventType :as EventType]
            [re-frame.core :as rf]))

; Patch Html5History.getUrl_() as it causes issues with query strings. See:
; https://github.com/google/closure-library/blob/be0326ba32f47ea74af4fbe8df038e579ec35215/closure/goog/history/html5history.js#L267
(aset js/goog.history.Html5History.prototype "getUrl_"
      (fn [token]
        (this-as this
          (if (.-useFragment_ this)
              (str "#" token)
              (str (.-pathPrefix_ this) token)))))

(defonce history (Html5History.))
(.setUseFragment history false)
(.setPathPrefix history (str js.window.location.protocol "//" js.window.location.host))

(defn get-href [element]
  (and element (or (.-href element) (get-href (.-parentNode element)))))

; Ensure the view always scrolls up when switching pages
(defn navigate!
  ([path] (navigate! path ""))
  ([path title] (. history (setToken path title))
                (set! (.-scrollTop (.getElementById js/document "page-root")) 0)))

(defonce browser-navigation
  (events/listen history EventType/NAVIGATE #(secretary/dispatch! (.-token %))))

(defonce click-navigation
  (events/listen
    js/document
    "click"
    (fn [e]
      (when-let [href (get-href (.-target e))]
        (let [url (.parse Uri href)
              local? (.hasSameDomainAs url (.parse Uri js/window.location.href))
              matches? (secretary/locate-route (.getPath url))]
          (when (and local? matches?)
            (.preventDefault e)
            (navigate!
              (str (.getPath url) (when (.hasQuery url)
                                        (str "?" (.getQuery url))))
              (.-title (.-target e)))))))))

(defroute "/all" [] (rf/dispatch [:load-articles nil]))
(defroute "/search" [query-params] (rf/dispatch [:load-search (:q query-params)]))
(defroute "/:post" [post] (rf/dispatch [:load-post post]))
(defroute "/" [] (rf/dispatch [:load-home-page]))

; Ensure this is executed after the route definitions
(.setEnabled history true)
