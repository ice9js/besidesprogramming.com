(ns andromeda.sites.home
  (:require [reagent.core :as reagent :refer [atom]]
            [re-frame.core :as rf]
            [andromeda.components.nav :refer [header]]))

(defn home []
  [:div
    [header]])
