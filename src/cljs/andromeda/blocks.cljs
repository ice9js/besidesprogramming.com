(ns andromeda.blocks
  (:require [reagent.core :as reagent]
            [re-frame.core :as rf]
            [andromeda.config :as config]
            [andromeda.components :as components]))

(defn sidebar-layout
  "Page content layout with a sidebar."
  [& children]
  [:div.sidebar-layout
    [:div.sidebar-layout__content
      (map-indexed (fn [idx elem] (with-meta elem {:key idx}))
                   children)]
    [components/sidebar
      [:div.sidebar-layout__social-links
        (map #(with-meta [components/social-button (:icon %) (:link %)] {:key (:icon %)})
             config/social-links)]]])
