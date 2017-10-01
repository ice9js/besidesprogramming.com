(ns andromeda.blocks
  (:require [reagent.core :as reagent]
            [re-frame.core :as rf]
            [andromeda.config :as config]
            [andromeda.components :as components]))

(defn posts-feed
  "Posts feed."
  [per-page show-first]
  (let [uri (rf/subscribe [:app/uri])
        page (or (first @uri) 1)
        posts (rf/subscribe [:latest-posts per-page page])]
    (fn [per-page show-first]
      (let [latest-post (if show-first (first @posts) nil)]
        [:div.posts-feed
          (map #(with-meta [components/post-excerpt % (= % latest-post)] {:key (:slug %)})
               @posts)]))))

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
