(ns andromeda.data
  (:require [reagent.core :as reagent]
            [re-frame.core :as rf]))

(defn query-posts
  "Dispatches an event on-load or event-change."
  [query]
  (let [update-query (fn [this]
                       (rf/dispatch [:query-posts (reagent/props this)]))]
    (reagent/create-class
      {:component-will-mount (rf/dispatch [:query-posts query])
       :component-will-receive-props update-query
       :display-name "query-posts"
       :reagent-render (fn [] nil)})))
