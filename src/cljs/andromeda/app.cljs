(ns andromeda.app
  (:require [reagent.core :as reagent :refer [atom]]
            [re-frame.core :as rf]
            [andromeda.events]
            [andromeda.subs]
            [andromeda.routes]
            [andromeda.components :as components]
            [andromeda.views :as views]))

(defmulti sites identity)
(defmethod sites :home [] [views/home])
(defmethod sites :category [] [views/category])
(defmethod sites :archive [] [views/archive])
(defmethod sites :search [] [views/search])
(defmethod sites :post [] [views/post])

(defn app []
  (let [current-route (rf/subscribe [:app/route])
        site (case (:path @current-route)
                   "" :home
                   ("thoughts" "programming" "travel" "photos") :category
                   "search" :search
                   "archive" :archive
                   :post)]
    [components/page
      (sites site)]))

(defn init []
  (reagent/render-component [app]
                            (.getElementById js/document "app")))
