(ns andromeda.subs
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [re-frame.core :as rf]))

(rf/reg-sub-raw
  :app/route
  (fn [db _]
    (reaction (get-in @db [:app :route] {:path "" :query {}}))))

(rf/reg-sub-raw
  :posts
  (fn [db _]
    (let [items (reaction (get-in @db [:posts :items] []))]
      (reaction (sort-by :date #(compare %2 %1) (filter identity @items))))))

(rf/reg-sub-raw
  :posts-count
  (fn [db _]
    (let [posts (reaction (get-in @db [:posts :items]))]
      (reaction (count @posts)))))

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
    (let [posts (reaction (get-in @db [:posts :items]))]
      (reaction (first (filter #(= slug (:slug %)) @posts))))))

(rf/reg-sub-raw
  :search-query
  (fn [db _]
    (reaction (get-in @db [:search :query]))))
