(ns andromeda.blocks
  (:require [reagent.core :as reagent]
            [re-frame.core :as rf]
            [andromeda.config :as config]
            [andromeda.components :as components]
            [andromeda.utils :refer [date]]))

(defn post
  "Post view."
  []
  (let [post (rf/subscribe [:current-post])]
    (fn []
      (let [is-loading (:loading @post)
            post-data (:post @post)]
        (if is-loading
          [components/post-placeholder]
          [:div.post
            [components/post-header post-data]
            [components/post-content (:content post-data)]
            [components/post-footer post-data]
            [components/disqus-thread (:id post-data) (:title post-data) (:slug post-data)]])))))

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
          (when @loading
            (map #(with-meta [components/post-placeholder] {:key %}) (range per-page)))
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

(defn search-query
  "Search query panel."
  []
  (let [query (rf/subscribe [:search-query])]
    [components/compact-search (js/decodeURIComponent @query)]))

(defn search-results
  "Search results feed."
  []
  (let [posts (rf/subscribe [:search-results])
        query (rf/subscribe [:search-query])
        loading (rf/subscribe [:search-results-loading])
        results-count (rf/subscribe [:search-results-count])
        total-results (rf/subscribe [:search-results-total])]
    (fn []
      [:div.search-results
        (map #(with-meta [components/post-excerpt % false] {:key (:slug %)}) @posts)
        (when (= 0 @total-results) [:div.search-results__empty "Sorry, no results were found."])
        (when @loading
          (map #(with-meta [components/post-placeholder] {:key %}) (range config/posts-per-page)))
        (when (and (< @results-count @total-results) (not @loading))
              [components/infinite-loader #(rf/dispatch [:fetch-search-results @query])])])))
