(ns andromeda.events
  (:require [re-frame.core :as rf]
            [day8.re-frame.http-fx]
            [andromeda.config :as config :refer [api-host]]
            [andromeda.utils :refer [post-from-api]]))

(def json-format
  {:read (fn [xhrio] {:status (. xhrio getStatus)
                      :headers (js->clj (. xhrio getResponseHeaders) :keywordize-keys true)
                      :body (js->clj (.parse js/JSON (. xhrio getResponse)) :keywordize-keys true)})
   :description "raw"})

(rf/reg-event-fx
  :fetch-posts
  (fn [ctx [_ per-page offset]]
    {:http-xhrio {:method :get
                  :uri (str api-host "/wp/v2/posts")
                  :params {:per_page per-page
                           :offset offset}
                  :timeout 5000
                  :response-format json-format
                  :on-success [:fetch-posts-success]
                  :on-failure [:fetch-posts-failure]}

     :db (-> (:db ctx)
             (assoc-in [:posts :loading] true))}))

(rf/reg-event-fx
  :fetch-posts-success
  (fn [ctx [_ response]]
    (let [results (mapv (fn [post] {:post (post-from-api post)
                                    :loading false})
                        (:body response))
          new-posts (zipmap (map #(:slug (:post %)) results) results)
          current-posts (get-in ctx [:db :posts :items] {})]
      {:db (-> (:db ctx)
               (assoc-in [:posts :items] (merge current-posts new-posts))
               (assoc-in [:posts :total] (:x-wp-total (:headers response)))
               (assoc-in [:posts :loading] false))})))

(rf/reg-event-fx
  :fetch-posts-failure
  (fn [ctx _]
    (.log js/console "Failed to fetch posts!")
    {:db (-> (:db ctx)
             (assoc-in [:posts :loading] false))}))

(rf/reg-event-fx
  :fetch-post
  (fn [ctx [_ slug]]
    {:http-xhrio {:method :get
                  :uri (str api-host "/wp/v2/posts")
                  :params {:slug slug
                           :per_page 1
                           :_embed true}
                  :timeout 5000
                  :response-format json-format
                  :on-success [:fetch-post-success slug]
                  :on-failure [:fetch-post-failure slug]}

     :db (-> (:db ctx)
             (assoc-in [:posts :items slug :loading] true))}))

(rf/reg-event-fx
  :fetch-post-success
  (fn [ctx [_ slug response]]
    (let [post (first (mapv post-from-api (:body response)))
          slug (:slug post)]
      {:db (-> (:db ctx)
               (assoc-in [:posts :items slug :post] post)
               (assoc-in [:posts :items slug :loading] false))})))

(rf/reg-event-fx
  :fetch-post-failure
  (fn [ctx [_ slug]]
    {:db (-> (:db ctx)
             (assoc-in [:posts :items slug :post] nil)
             (assoc-in [:posts :items slug :loading] false))}))

(rf/reg-event-fx
  :fetch-search-results
  (fn [ctx [_ search-query]]
    (let [reset-results (if (= search-query (:query (:search (:db ctx))))
                            identity
                            #(assoc-in % [:search :results] []))
          offset (count (get-in (:db ctx) [:search :results] []))]
      {:http-xhrio {:method :get
                    :uri (str api-host "/wp/v2/posts")
                    :params {:search search-query
                             :per_page config/posts-per-page
                             :offset offset}
                    :timeout 5000
                    :response-format json-format
                    :on-success [:fetch-search-results-success]
                    :on-failure [:fetch-search-results-failure]}
       :db (-> (:db ctx)
               (assoc-in [:search :query] search-query)
               (assoc-in [:search :loading] true)
               reset-results)})))

(rf/reg-event-fx
  :fetch-search-results-success
  (fn [ctx [_ response]]
    (let [new-results (mapv post-from-api (:body response))
          current-results (get-in ctx [:db :search :results] [])]
      {:db (-> (:db ctx)
               (assoc-in [:search :results] (concat current-results new-results))
               (assoc-in [:search :total] (js/parseInt (:x-wp-total (:headers response))))
               (assoc-in [:search :loading] false))})))

(rf/reg-event-fx
  :fetch-search-results-failure
  (fn [ctx _]
    {:db (-> (:db ctx)
             (assoc-in [:search :loading] false))}))

(rf/reg-event-fx
  :load-home-page
  (fn [ctx _]
    {:dispatch [:fetch-posts config/posts-on-home-page 0]

     :db (-> (:db ctx)
             (assoc-in [:app :view] :home)
             (assoc-in [:app :uri] []))}))

(rf/reg-event-fx
  :load-articles
  (fn [ctx [_ page]]
    {:dispatch [:fetch-posts config/posts-per-page 0]

     :db (-> (:db ctx)
             (assoc-in [:app :view] :articles)
             (assoc-in [:app :uri] [page]))}))

(rf/reg-event-fx
  :load-post
  (fn [ctx [_ slug]]
    {:dispatch [:fetch-post slug]

     :db (-> (:db ctx)
             (assoc-in [:app :view] :post)
             (assoc-in [:app :uri] [slug]))}))

(rf/reg-event-fx
  :load-search
  (fn [ctx [_ search-query]]
    {:dispatch [:fetch-search-results search-query 0]

     :db (-> (:db ctx)
             (assoc-in [:app :view] :search)
             (assoc-in [:app :uri] []))}))
