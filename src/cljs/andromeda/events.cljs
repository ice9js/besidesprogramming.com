(ns andromeda.events
  (:require [re-frame.core :as rf]
            [ajax.core :as ajax]
            [day8.re-frame.http-fx]
            [andromeda.config :as config :refer [api-host]]))

(rf/reg-event-fx
  :fetch-posts
  (fn [_ [_ per-page page]]
    {:http-xhrio {:method :get
                  :uri (str api-host "/wp/v2/posts?page=" page "&per_page=" per-page)
                  :timeout 5000
                  :response-format (ajax/json-response-format {:keywords? true})
                  :on-success [:fetch-posts-success]
                  :on-failure [:fetch-posts-failure]}}))

(rf/reg-event-fx
  :fetch-posts-success
  (fn [ctx [_ response]]
    (let [results (mapv (fn [post] {:id (:id post)
                                    :slug (:slug post)
                                    :title (:rendered (:title post))
                                    :date (:date post)
                                    :content (:rendered (:content post))
                                    :excerpt (:rendered (:excerpt post))
                                    :status :ok})
                        response)
          new-posts (zipmap (map :slug results) results)
          current-posts (or (:posts (:db ctx)) {})]
      {:db (assoc-in (:db ctx) [:posts] (merge current-posts new-posts))})))

(rf/reg-event-fx
  :fetch-posts-failure
  (fn [ctx _]
    (.log js/console "Failed to fetch posts!")))

(rf/reg-event-fx
  :fetch-post
  (fn [ctx [_ slug]]
    {:http-xhrio {:method :get
                  :uri (str api-host "/wp/v2/posts?slug=" slug)
                  :timeout 5000
                  :response-format (ajax/json-response-format {:keywords? true})
                  :on-success [:fetch-post-success slug]
                  :on-failure [:fetch-post-failure slug]}

     :db (assoc-in (:db ctx) [:posts slug :status] :loading)}))

(rf/reg-event-fx
  :fetch-post-success
  (fn [ctx [_ slug results]]
    {:dispatch [:fetch-posts-success results]}))

(rf/reg-event-fx
  :fetch-post-failure
  (fn [ctx [_ slug]]
    {:db (assoc-in (:db ctx) [:posts slug :status] :missing)}))

(rf/reg-event-fx
  :load-home-page
  (fn [ctx _]
    {:dispatch [:fetch-posts config/posts-on-home-page 1]

     :db (-> (:db ctx)
             (assoc-in [:app :view] :home)
             (assoc-in [:app :uri] []))}))

(rf/reg-event-fx
  :load-articles
  (fn [ctx [_ page]]
    {:dispatch [:fetch-posts config/posts-per-page page]

     :db (-> (:db ctx)
             (assoc-in [:app :view] :articles)
             (assoc-in [:app :uri] page))}))

(rf/reg-event-fx
  :load-post
  (fn [ctx [_ slug]]
    {:dispatch [:fetch-post slug]

     :db (-> (:db ctx)
             (assoc-in [:app :view] :post)
             (assoc-in [:app :uri] [slug]))}))
