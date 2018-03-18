(ns andromeda.data
  (:require [reagent.core :as reagent]
            [re-frame.core :as rf]))

(defn query-posts
  "Dispatches an event on-load or event-change."
  [query] (rf/dispatch [:query-posts query]))
