(ns andromeda.app
  (:require [reagent.core :as reagent :refer [atom]]
            [re-frame.core :as rf]
            [andromeda.state.core]))

(defmulti sites identity)
(defmethod sites :home [] [:div "Hello world"])

(defn app []
  (let [site (rf/subscribe [:app/site])]
    (sites @site)))

(defn init []
  (reagent/render-component [app]
                            (.getElementById js/document "app")))
