(ns andromeda.views
  (:require [reagent.core :as reagent :refer [atom]]
            [re-frame.core :as rf]
            [andromeda.blocks :as blocks]
            [andromeda.components :as components]
            [andromeda.routes :refer [navigate!]]
            [andromeda.config :as config]))

(defn home
  "Home page."
  []
  (let [loading (rf/subscribe [:posts-loading])
        count (rf/subscribe [:posts-count])]
    (fn []
      [components/single-column
        {:class "home"}
        [components/page-title "Home - Besides Programming"]
        [blocks/posts-feed {:per_page config/posts-per-page}]
        (when (and (not @loading) (< config/posts-per-page @count))
              [components/view-all-button 2])])))

(defn category
  "Category page."
  []
  (let [route (rf/subscribe [:app/route])
        loading (rf/subscribe [:posts-loading])
        count (rf/subscribe [:posts-count])]
    (fn []
      (let [category (first (filter #(= (:path @route) (:slug %)) config/post-categories))]
        [components/single-column
          {:class "category"}
          [components/page-title (str (:label category) " - Besides Programming")]
          [components/page-header (:label category)]
          [blocks/posts-feed {:per_page config/posts-per-page
                              :categories [(:id category)]}]
          (when (and (not @loading) (< config/posts-per-page @count))
                [components/view-all-button 1])]))))

(defn archive
  "Complete articles list."
  []
  (let [route (rf/subscribe [:app/route])
        total (rf/subscribe [:posts-total])]
    (fn []
      (let [page (max (- (get-in @route [:query :p] 1) 1) 0)
            offset (* config/posts-per-page page)]
        [components/single-column
          {:class "archive"}
          [components/page-title (str "Archive - Page " (+ 1 page) " - Besides Programming")]
          [components/page-header "Archive"]
          [blocks/posts-feed {:per_page config/posts-per-page
                              :offset offset}]
          [components/pagination page config/posts-per-page @total #(navigate! (str "/archive?p=" (+ % 1)))]]))))

(defn search
  "Search results list."
  []
  (let [route (rf/subscribe [:app/route])
        total (rf/subscribe [:posts-total])]
    (fn []
      (let [query (js/decodeURIComponent (get-in @route [:query :q] ""))
            page (max (- (get-in @route [:query :p] 1) 1) 0)
            offset (* config/posts-per-page page)]
        [components/single-column
          {:class "search"}
          [components/page-title (if (not (empty? query))
                                     (str "Search results for: " query " - Page " (+ 1 page) " - Besides Programming")
                                     "Search - Besides Programming")]
          [components/page-header "Search"]
          [components/search-form query]
          (when (and (not (empty? query)))
                [:div
                  [blocks/posts-feed {:per_page config/posts-per-page
                                      :offset offset
                                      :search query}]
                  (if (= @total 0)
                      [:div]
                      [components/pagination
                        page
                        config/posts-per-page
                        @total
                        #(navigate! (str "/search?q=" (js/encodeURIComponent query) "&p=" (+ % 1)))])])]))))

(defn post
  "Post page."
  []
  (let [route (rf/subscribe [:app/route])]
    (fn []
      [components/single-column
        {:class "post-page"}
        [blocks/post (:path @route)]])))
