(ns andromeda.subs
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [re-frame.core :as rf]
            [andromeda.config :as config]))

(rf/reg-sub-raw
  :app/view
  (fn [db _]
    (reaction (:view (:app @db)))))

(rf/reg-sub-raw
  :app/uri
  (fn [db _]
    (reaction (:uri (:app @db)))))

(rf/reg-sub-raw
  :latest-posts
  (fn [db [_ per-page page]]
    (let [posts (reaction (vals (:posts @db)))
          sorted-posts (reaction (sort-by :date #(compare %2 %1) @posts))]
      (reaction (->> @sorted-posts
                     (take (* page per-page))
                     (take-last per-page))))))

(rf/reg-sub-raw
  :post
  (fn [db [_ slug]]
    (reaction ((:posts @db) slug))))
