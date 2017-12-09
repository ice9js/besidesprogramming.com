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

(defn posts-by-date
  "Returns posts sorted by date."
  ([db] (let [items (reaction (get-in @db [:posts :items] {}))]
          (reaction (sort-by :date #(compare %2 %1) (map :item (vals @items))))))
  ([db _] (posts-by-date db)))

(rf/reg-sub-raw
  :posts
  posts-by-date)

(rf/reg-sub-raw
  :posts-by-year
  (fn [db _]
    (let [sorted-posts (posts-by-date db)]
      (reaction (group-by #(.getFullYear (js/Date. (:date %)))
                          @sorted-posts)))))

(rf/reg-sub-raw
  :posts-count
  (fn [db _]
    (let [posts (reaction (get-in @db [:posts :items] {}))]
      (reaction (count (vals @posts))))))

(rf/reg-sub-raw
  :posts-total
  (fn [db _]
    (reaction (get-in @db [:posts :total] 0))))

(rf/reg-sub-raw
  :posts-loading
  (fn [db _]
    (reaction (get-in @db [:posts :loading] false))))

(rf/reg-sub-raw
  :post
  (fn [db [_ slug]]
    (reaction (get-in @db [:posts :items slug :item]))))

(rf/reg-sub-raw
  :post-loading
  (fn [db [_ slug]]
    (reaction (get-in @db [:posts :items slug :loading]))))
