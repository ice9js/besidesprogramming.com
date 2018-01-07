(ns andromeda.views
  (:require [reagent.core :as reagent :refer [atom]]
            [re-frame.core :as rf]
            [andromeda.blocks :as blocks]
            [andromeda.components :as components]
            [andromeda.config :as config]))

(defn home
  "Home page."
  []
  [components/page
    {:class "home"}
    [components/logo]
    [components/sidebar-layout
      [components/main
        [blocks/posts-feed config/posts-on-home-page true]
        ]]])

(defn articles
  "Complete articles list."
  []
  [components/page
    {:class "articles"}
    [components/logo]
    [components/sidebar-layout
      [components/main
        [components/page-title "Articles"]
        [blocks/posts-timeline]
        ; [blocks/posts-feed config/posts-per-page false]
        ]]])

(defn search
  "Search results list."
  []
  [components/page
    {:class "search"}
    [components/logo]
    [components/sidebar-layout
      [components/main
        [components/page-title "Search results"]
        [blocks/search-query]
        [blocks/search-results]]]])

(defn post
  "Post page."
  []
  [components/page
    ; class post is already in use :o
    {}
    [components/logo]
    [components/sidebar-layout
      [components/main
        [blocks/post]]]])
