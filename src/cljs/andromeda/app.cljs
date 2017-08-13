(ns andromeda.app
  (:require [reagent.core :as reagent :refer [atom]]
            [re-frame.core :as rf]
            [andromeda.routes]
            [andromeda.db]
            [andromeda.events]
            [andromeda.subs]
            [andromeda.views :as views]))

(defmulti sites identity)
(defmethod sites :home [] (views/home))

(defn app []
  (let [site (rf/subscribe [:app/site])]
    (sites @site)))

(defn init []
  (reagent/render-component [app]
                            (.getElementById js/document "app")))
