(ns andromeda.components
  (:require [reagent.core :as reagent :refer [atom]]
            [andromeda.config :as config]
            [andromeda.utils :refer [className]]))

(defn fa [icon]
  "Font awesome icons."
  [:i.fa {:class (str "fa-" icon)}])

(defn logo
  "Big site logo."
  []
  [:div.logo
    [:a.logo__link
     {:href "/"}
     [:div.logo__img]]])

(defn nav
  "Site navigation."
  [links]
  (let [item (fn [{label :label url :url}]
                 [:a.nav__link {:href url} label])]
    [:div.nav
     (map #(with-meta [item %] {:key (:label %)})
          links)]))

(defn page
  "Page layout container with navigation."
  [props & children]
  [:div.page
    props
    [nav config/nav-links]
    [:div.page__content
      (map-indexed (fn [idx elem] (with-meta elem {:key idx}))
                   children)]])

(defn main
  "Main page content."
  [& children]
  [:main.main
    (map-indexed (fn [idx elem] (with-meta elem {:key idx}))
                 children)])

(defn search-input
  "A search input component."
  ([] (search-input ""))
  ([initial-value]
    (let [query (atom initial-value)]
      (fn []
        [:div.search-input
          [:input.search-input__input
            {:value @query
             :on-change #(reset! query (-> % .-target .-value))}]
          [:a.search-input__button
            {:href (str "/search?q=" (js/encodeURIComponent @query))}
            [fa "search"]]]))))

(defn sidebar
  "Content sidebar."
  [& children]
  [:div.sidebar
    (map-indexed (fn [idx elem] (with-meta elem {:key idx}))
                 children)])

(defn sidebar-image
  "An image component to be used within the sidebar."
  [src description]
  [:div.sidebar-image
    [:img.sidebar-image__img {:src src
                              :alt description}]])

(defn sidebar-text
  "A text box component to be used within the sidebar."
  []
  [:div])

(defn social-button
  "Social media links."
  [icon url]
  [:a.social-button
    {:href url
     :rel "noopener"
     :target "_blank"}
    [fa icon]])

(defn share-button
  "Share buttons for social media."
  ([icon url] (share-button icon url false))
  ([icon url is-small]
    [:a.share-button
      {:class (className {"is-small" is-small
                          icon true})
       :href url}
      [fa icon]]))

(defn page-title
  "Page title header."
  [text]
  [:h2.page-title text])

(defn post-header
  "Post header including social links & comment count."
  [post]
  [:div.post-header
    [page-title "Nanana nanana nanana batman!"]
    [:div.post-header__meta
      (share-button "facebook" "#")
      (share-button "twitter" "#")
      (share-button "pinterest" "#")]])
