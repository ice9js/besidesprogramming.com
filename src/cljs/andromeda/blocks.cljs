(ns andromeda.blocks
  (:require [reagent.core :as reagent]
            [re-frame.core :as rf]
            [andromeda.config :refer [config]]
            [andromeda.components :as components]
            [andromeda.data :as data]
            [andromeda.utils :refer [date]]))

(defn post
  "Post view."
  [slug]
  (let [post (rf/subscribe [:post slug])
        error (rf/subscribe [:error-status])
        loading (rf/subscribe [:posts-loading])]
    [:div.post
      [data/query-posts
        {:slug slug
         :per_page 1
         :_embed true}]
      (if @loading
          [components/post-placeholder]
          (if @error
              [components/error @error]
              [:div
                [components/page-title (str (:title @post) " - " (:app-name config))]
                [components/post-header @post]
                [components/post-content (:content @post)]
                [components/post-footer @post]
                [components/disqus-thread (:id @post) (:title @post) (:slug @post)]]))]))

(defn posts-feed
  "Posts feed."
  [query]
  (let [posts (rf/subscribe [:posts])
        error (rf/subscribe [:error-status])
        loading (rf/subscribe [:posts-loading])
        total-posts (rf/subscribe [:posts-total])]
    (fn [query]
      [:div.posts-feed
        [data/query-posts query]
        (if @loading
            (map #(with-meta [components/post-placeholder] {:key %}) (range 3))
            (if @error
              [components/error @error]
              (map #(with-meta [components/post-excerpt %] {:key (:slug %)})
                   @posts)))])))
