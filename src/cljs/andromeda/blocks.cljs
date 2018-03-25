(ns andromeda.blocks
  (:require [reagent.core :as reagent]
            [re-frame.core :as rf]
            [andromeda.components :as components]
            [andromeda.data :as data]
            [andromeda.utils :refer [date]]))

(defn post
  "Post view."
  [slug]
  (let [post (rf/subscribe [:post slug])
        loading (rf/subscribe [:posts-loading])]
    [:div.post
      [data/query-posts
        {:slug slug
         :per_page 1
         :_embed true}]
      (if @loading
          [components/post-placeholder]
          (if (not @post)
              [components/error 404 "Oops! This page does not exist."]
              [:div
                [components/page-title (str (:title @post) " - Besides Programming")]
                [components/post-header @post]
                [components/post-content (:content @post)]
                [components/post-footer @post]
                [components/disqus-thread (:id @post) (:title @post) (:slug @post)]]))]))

(defn posts-feed
  "Posts feed."
  [query]
  (let [posts (rf/subscribe [:posts])
        loading (rf/subscribe [:posts-loading])
        total-posts (rf/subscribe [:posts-total])]
    (fn [query]
      [:div.posts-feed
        [data/query-posts query]
        (map #(with-meta [components/post-excerpt %] {:key (:slug %)})
             @posts)
        (when @loading
          (map #(with-meta [components/post-placeholder] {:key %}) (range 3)))])))
