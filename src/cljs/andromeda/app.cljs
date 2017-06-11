(ns andromeda.app
  (:require [reagent.core :as reagent :refer [atom]]
            [re-frame.core :as rf]
            [andromeda.state.core]
            [andromeda.sites.home :as home]))

(defmulti sites identity)
(defmethod sites :home [] (home/home))

(defn app []
  (let [site (rf/subscribe [:app/site])]
    (sites @site)))

(defn init []
  (reagent/render-component [app]
                            (.getElementById js/document "app")))
