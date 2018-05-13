(ns andromeda.components
  (:require [reagent.core :as reagent :refer [atom]]
            [andromeda.config :refer [config]]
            [andromeda.routes :refer [navigate!]]
            [andromeda.utils :refer [className date facebook-link twitter-link pinterest-link]]))

(defn page-title
  "Updates the metadata for the current page."
  [title]
  (let [update-title (fn [this] (let [title (first (reagent/children this))]
                                  (when-not (empty? title) (set! (.-title js/document) title))))]
    (reagent/create-class
      {:component-did-mount update-title
       :component-did-update update-title
       :display-name "page-title"
       :reagent-render (fn [] nil)})))

(defn fa [icon]
  "Font awesome icons."
  [:i.fa {:class (str "fa-" icon)}])

(defn main
  "Main page content."
  [& children]
  [:main.main
    (map-indexed (fn [idx elem] (with-meta elem {:key idx}))
                 children)])

(defn logo
  "Big site logo."
  []
  [:a.logo
   {:href "/"}
   [:div.logo__img]])

(defn social-button
  "Social media links."
  [icon url]
  [:a.social-button
    {:href url
     :rel "noopener"
     :target "_blank"}
    [fa icon]])

(defn site-links
  "Navigation links."
  ([] [site-links nil])
  ([on-click]
    [:ul.site-links
      (map #(with-meta [:li.site-links__item
                         [:a.site-links__link
                           {:href (:url %)
                            :on-click on-click}
                           (:label %)]]
                       {:key (:label %)})
           (:nav config))]))

(defn search-link
  "Search link."
  ([] [search-link nil])
  ([on-click]
    [:a.search-link
      {:href "/search"
       :on-click on-click}
      "Search"
      [fa "search"]]))

(defn social-links
  "Social navigation."
  []
  [:ul.social-links
    (map #(with-meta [:li.social-links__item [social-button (:icon %) (:link %)]] {:key (:icon %)})
         (:social-links config))])

(defn nav
  "Site navigation."
  []
  (let [nav-link (fn [{label :label url :url}]
                   [:a.nav__link
                   {:href url}
                   label])]
    [:div.nav
      [logo]
      [site-links]
      [search-link]
      [social-links]]))

(defn mobile-nav
  "Mobile site navigation."
  []
  (let [current-offset (atom 0)
        show-header (atom true)
        show-menu (atom false)
        on-scroll #(let [offset (.-pageYOffset js/window)]
                     (reset! show-header (< offset (max @current-offset 100)))
                     (reset! current-offset offset))
        toggle-menu #(reset! show-menu (not @show-menu))]
    (reagent/create-class
      {:component-did-mount #(.addEventListener js/window "scroll" on-scroll)

       :component-will-unmount #(.removeEventListener js/window "scroll" on-scroll)

       :display-name "mobile-nav"

       :reagent-render (fn []
                         [:div.mobile-nav
                           {:class (when @show-header "is-active")}
                           [logo]
                           [:button.mobile-nav__toggle
                             {:class (when @show-menu "is-active")
                              :on-click #(toggle-menu)}
                             [fa (if @show-menu "times" "bars")]]
                           [:div.mobile-nav__menu
                             {:class (when @show-menu "is-active")}
                             [site-links #(toggle-menu)]
                             [search-link #(toggle-menu)]
                             [social-links]]])})))

(defn page
  "Page layout container with navigation."
  [& children]
  [:div.page
    [nav]
    [mobile-nav]
    [:div.page__content
      (map-indexed (fn [idx elem] (with-meta elem {:key idx})) children)]])

(defn single-column
  "Single column content layout."
  [props & children]
  props
  [:div.single-column
    [main
      (map-indexed (fn [idx elem] (with-meta elem {:key idx}))
                   children)]])

(defn page-header
  "Page header."
  [text]
  [:h1.page-header text])

(defn share-button
  "Share buttons for social media."
  ([icon url] (share-button icon nil url))
  ([icon action url]
    [:a.share-button
      {:class (className {"is-small" (not action)
                          icon true})
       :rel "noopener"
       :target "_blank"
       :href url}
      [fa icon]
      (when action [:span.share-button__action action])]))

(defn post-header
  "Post header including share buttons & date."
  [post]
  [:div.post-header
    [:h2.post-header__title
      [:a.post-header__link
        {:href (str "/" (:slug post))}
        (:title post)]]
    [:div.post-header__meta
      (share-button "facebook" (facebook-link post))
      (share-button "twitter" (twitter-link post))
      (share-button "pinterest" (pinterest-link post))
      [:span.post-header__date (date (:date post))]]])

(defn post-content
  "Post content container."
  [content]
  [:div.post-content {:dangerouslySetInnerHTML {:__html content}}])

(defn read-more-button
  "Action button for posts."
  [action url]
  [:a.read-more-button {:href url} action [fa "angle-double-right"]])

(defn post-excerpt
  "Post excerpt block."
  [post]
  [:div.post-excerpt
    [post-header post]
    [post-content (:excerpt post)]
    [:div.post-excerpt__actions
      [read-more-button "Continue reading" (str "/" (:slug post))]]])

(defn view-all-button
  "View archive button."
  [archive-page]
  [:a.view-all-button {:href (str "/archive?p=" archive-page)} "View All Posts"])

(defn post-placeholder
  "Post loading placeholder."
  []
  [:div.post-placeholder
    [:div.post-placeholder__title]
    [:div.post-placeholder__meta
      (map #(with-meta [:div.post-placeholder__meta-button] {:key %}) (range 3))
      [:div.post-placeholder__meta-date]]
    (map #(with-meta [:div.post-placeholder__content-line] {:key %}) (range 4))])

(defn post-footer
  "Post footer including share, next and previous buttons."
  [post]
  [:div.post-footer
    [:div.post-footer__share
      (share-button "facebook" "Share" (facebook-link post))
      (share-button "twitter" "Tweet" (twitter-link post))
      (share-button "pinterest" "Pin" (pinterest-link post))]
    [:div.post-footer__links
      (when (:previous post)
        [:a.post-footer__link.is-prev
          {:href (str "/" (:slug (:previous post)))}
          [:span.post-footer__link-label "previous"]
          [:span.post-footer__link-title (:title (:previous post))]])
      (when (:next post)
        [:a.post-footer__link.is-next
          {:href (str "/" (:slug (:next post)))}
          [:span.post-footer__link-label "next"]
          [:span.post-footer__link-title (:title (:next post))]])]])

(defn disqus-thread
  "Loads a Disqus comments thread."
  [id title path]
  (let [shortname (:disqus-shortname config)
        website-url (:domain config)
        load-disqus #(if (.-DISQUS js/window)
                         (.reset (.-DISQUS js/window) #js {:reload true})
                         (.appendChild (or (.-head js/document) (.-body js/document))
                                       (doto (.createElement js/document "script")
                                             (.setAttribute "async" true)
                                             (.setAttribute "src" (str "//" shortname ".disqus.com/embed.js")))))]
    (reagent/create-class
      {:component-did-mount #(load-disqus)

       :component-did-update #(load-disqus)

       :display-name "disqus-thread"

       :reagent-render (fn [id title path]
                         (set! (.-disqus_shortname js/window) shortname)
                         (set! (.-disqus_identifier js/window) id)
                         (set! (.-disqus_title js/window) title)
                         (set! (.-disqus_url js/window) (str website-url "/" path))

                         [:div#disqus_thread.disqus-thread])})))

(defn pagination
  "Pagination component."
  [page per-page total on-click]
  (let [last-page (- (.ceil js/Math (/ total per-page)) 1)
        current-range (range (max 0 (- page 2))
                             (+ (min last-page (+ page 2)) 1))
        pages (flatten [(when (< 2 page) 0)
                        (when (< 3 page) (if (= page 4) 1 "more"))
                        current-range
                        (when (< page (- last-page 3)) (if (= page (- last-page 4)) (- last-page 1) "more"))
                        (when (< page (- last-page 2)) last-page)])

        page-button (fn [n]
                      [:button.pagination__button
                        {:class (when (= n page) "is-active")
                         :disabled (= n "more")
                         :on-click (when (not= n "more") #(on-click n))}
                        (if (= n "more")
                            [fa "ellipsis-h"]
                            (+ n 1))])]
    [:div.pagination
      [:button.pagination__button {:disabled (= 0 page)} [fa "angle-double-left"]]
      (map-indexed (fn [idx n] (with-meta [page-button n] {:key idx})) (filter identity pages))
      [:button.pagination__button {:disabled (= page last-page)} [fa "angle-double-right"]]]))

(defn search-form
  "Search form component."
  [initial-value]
  (let [query (atom initial-value)]
    (fn [initial-value]
      [:form.search-form
        {:action "/search"
         :method "get"
         :on-submit (fn [e] (.preventDefault e)
                            (when (not (empty? @query))
                                  (navigate! (str "/search?q=" (js/encodeURIComponent @query)))))}
        [:input.search-form__input
          {:name "q"
           :value @query
           :placeholder "Search..."
           :on-change #(reset! query (-> % .-target .-value))}]
        [:button.search-form__button
          {:type "submit"}
          [fa "search"]]])))

(defn error
  "Error page."
  [code]
  (let [header (case code
                     404 "Oops! This page does not exist."
                     503 "Sorry :( \nThe service is unavailable."
                     "Yikes! That didn't work.")
        message (case code
                      503 "This message might've been caused by a poor connection. \nEnsure you're connected to the internet and check back later."
                      nil)]
    [:div.error
      [:div.error__header header]
      (when message [:div.error__message message])
      [:div.error__code code]]))
