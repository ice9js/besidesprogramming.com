(ns andromeda.analytics
  (:require [andromeda.config :refer [config]]))

(defonce gtag
  (let []
    (.appendChild (or (.-head js/document) (.-body js/document))
                (doto (.createElement js/document "script")
                      (.setAttribute "async" true)
                      (.setAttribute "src" (str "https://www.googletagmanager.com/gtag/js?id="
                                                (:ga-tracker-id config)))))

    (set! (.-dataLayer js/window) (or (.-dataLayer js/window) (clj->js [])))
    (let [collect (fn [event]
                    (.push (.-dataLayer js/window) (clj->js event)))]

      (collect ["js" (js/Date.)])

      collect)))
