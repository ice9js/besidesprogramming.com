(ns andromeda.views
  (:require [reagent.core :as reagent :refer [atom]]
            [andromeda.blocks :as blocks]
            [andromeda.components :as components]))

(defn home
  "Home page."
  []
  [components/page
    {:class "home"}
    [components/logo]
    [blocks/sidebar-layout
      [components/main
       [components/title-header "How to loose friends and alienate people."]]]])
