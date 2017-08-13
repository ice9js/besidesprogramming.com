(ns andromeda.components
  (:require [reagent.core :as reagent]
            [andromeda.config :as config]))

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

(defn sidebar
  "Content sidebar."
  [& children]
  [:div.sidebar
    (map-indexed (fn [idx elem] (with-meta elem {:key idx}))
                 children)])

(defn fa [icon]
  "Font awesome icons."
  [:i.fa {:class (str "fa-" icon)}])

(defn social-button
  "Social media links."
  [icon link]
  [:a.social-button
    {:href link
     :rel "noopener"
     :target "_blank"}
    [fa icon]])

(defn title-header
  "Page title header."
  [text]
  [:h2.title-header text])
