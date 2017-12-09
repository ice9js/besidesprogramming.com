(ns andromeda.routes
  (:require-macros [secretary.core :refer [defroute]])
  (:import goog.history.Html5History
           goog.Uri)
  (:require [secretary.core :as secretary]
            [goog.events :as events]
            [goog.history.EventType :as EventType]
            [re-frame.core :as rf]))

(defn get-href [element]
  (if element
      (or (.-href element) (get-href (.-parentNode element)))
      ""))
    
  (defn get-uri [link]
  (.getPath (.parse Uri link)))

(defn hook-browser-navigation! []
  (let [history (doto (Html5History.)
                  (events/listen
                    EventType/NAVIGATE
                    (fn [event]
                      (secretary/dispatch! (.-token event))))
                  (.setUseFragment false)
                  (.setPathPrefix "")
                  (.setEnabled true))]
    (events/listen js/document "click"
      (fn [e]
        (let [link (get-href (.-target e))
              path (get-uri link)
              title (.-title (.-target e))]
          (when (and
                ; fix that to use current window location :p
                (re-matches #"^https?://(www\.)?(localhost:?|besidesprogramming\.).*" (str "" link))
                (secretary/locate-route path))
            (. e stopPropagation)
            (. e preventDefault)
            (. history (setToken path title))))))))

(defn navigate! [path title]
  (let [history (doto (Html5History.)
                  (events/listen
                    EventType/NAVIGATE
                    (fn [event]
                      (secretary/dispatch! (.-token event))))
                  (.setUseFragment false)
                  (.setPathPrefix "")
                  (.setEnabled true))]
    (. history (setToken path title))))

(defn app-routes []
  (defroute "/all" [] (rf/dispatch [:load-articles nil]))
  (defroute "/search" [] (rf/dispatch [:load-search]))
  (defroute "/:post" [post] (rf/dispatch [:load-post post]))
  (defroute "/" [] (rf/dispatch [:load-home-page]))

  (hook-browser-navigation!))

(app-routes)
