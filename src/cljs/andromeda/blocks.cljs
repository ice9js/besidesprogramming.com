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
      [:div.sidebar-layout__section.sidebar-layout__social-links
        (map #(with-meta [components/social-button (:icon %) (:link %)] {:key (:icon %)})
             config/social-links)]
      [:div.sidebar-layout__section.sidebar-layout__about
        [components/sidebar-image "/img/tmp.jpg"
                                  "That's me!"]
        [components/sidebar-text]]
      [:div.sidebar-layout__section
        [components/search-input]]
      ;; newsletter
      [:div.sidebar-layout__section]]])
