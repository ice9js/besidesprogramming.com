(ns andromeda.blocks
  (:require [reagent.core :as reagent]
            [re-frame.core :as rf]
            [andromeda.config :as config]
            [andromeda.components :as components]
            [andromeda.utils :refer [date]]))

(defn post
  "Post view."
  []
  (let [uri (rf/subscribe [:app/uri])
        post (rf/subscribe [:post (first @uri)])]
    (fn []
      [:div.post
        [components/post-header @post]
        [components/post-content (:content @post)]
        [components/post-footer @post]
        [components/disqus-thread (:id @post) (:title @post) (:slug @post)]])))

(defn posts-feed
  "Posts feed."
  [per-page show-first]
  (let [uri (rf/subscribe [:app/uri])
        page (or (first @uri) 1)
        posts (rf/subscribe [:posts])
        loading (rf/subscribe [:posts-loading])
        total-posts (rf/subscribe [:posts-total])]
    (fn [per-page show-first]
      (let [latest-post (if show-first (first @posts) nil)]
        [:div.posts-feed
          (map #(with-meta [components/post-excerpt % (= % latest-post)] {:key (:slug %)})
               @posts)
          (when (and (< (count @posts) @total-posts) (not @loading))
                [components/infinite-loader #(rf/dispatch [:fetch-posts per-page (count @posts)])])]))))

(defn posts-timeline
  "Post archives timeline."
  []
  (let [posts-by-year (rf/subscribe [:posts-by-year])
        loading (rf/subscribe [:posts-loading])
        posts-count (rf/subscribe [:posts-count])
        total-posts (rf/subscribe [:posts-total])]
    (fn []
      [:div.posts-timeline
        (map (fn [[year posts]]
               (with-meta [components/timeline year posts] {:key year}))
             @posts-by-year)
        (when (and (< @posts-count @total-posts) (not @loading))
              [components/infinite-loader #(rf/dispatch [:fetch-posts config/posts-per-page @posts-count])])])))
