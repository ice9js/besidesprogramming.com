(ns andromeda.components.nav
  (:require [reagent.core :as reagent :refer [atom]]))

(def site-navigation [{:alias "Articles" :url "/all"}
                      {:alias "Contact" :url "/contact"}
                      {:alias "About" :url "/about-me"}])

(defn nav-link [{alias :alias url :url}]
  [:a.nav__link {:href url} alias])

(defn nav [links]
  [:div.nav
    (map-indexed (fn [idx link] (with-meta [nav-link link] {:key idx})) links)])

(defn header []
  [:div.header
    [nav site-navigation]
    [:a.header__emblem-link
        {:href "/"}
        [:div.header__logo]]])

(defn sticky-header []
  [:div.navbar
    [:div.nav__toggle
      ""]
    [:div.navbar__content
      "Uno dos tres"]])

(defn sidebar []
  [:div.sidebar])

;; put all under navbar namespace ?
;;
;; nav-banner
;; sticky-navbar
;; nav-sidebar
;; etc.
;; + channel for toggling the sidebar on and off (not actual state)
