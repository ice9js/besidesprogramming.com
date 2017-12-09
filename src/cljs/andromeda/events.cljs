(ns andromeda.events
  (:require [re-frame.core :as rf]
            [day8.re-frame.http-fx]
            [andromeda.config :as config :refer [api-host]]))

(defn json-format []
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
                  :response-format (json-format)
                  :on-success [:fetch-posts-success]
                  :on-failure [:fetch-posts-failure]}

     :db (-> (:db ctx)
             (assoc-in [:posts :loading] true))}))

(rf/reg-event-fx
  :fetch-posts-success
  (fn [ctx [_ response]]
    (let [results (mapv (fn [post] {:item {:id (:id post)
                                           :slug (:slug post)
                                           :title (:rendered (:title post))
                                           :date (:date post)
                                           :content (:rendered (:content post))
                                           :excerpt (:rendered (:excerpt post))
                                           :status :ok}
                                    :loading false})
                        (:body response))
          new-posts (zipmap (map #(:slug (:item %)) results) results)
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
                  :params {:slug slug}
                  :timeout 5000
                  :response-format (json-format)
                  :on-success [:fetch-post-success slug]
                  :on-failure [:fetch-post-failure slug]}

     :db (-> (:db ctx)
             (assoc-in [:posts slug :loading] true))}))

(rf/reg-event-fx
  :fetch-post-success
  (fn [ctx [_ slug response]]
    {:dispatch [:fetch-posts-success response]}))

(rf/reg-event-fx
  :fetch-post-failure
  (fn [ctx [_ slug]]
    {:db (-> (:db ctx)
             (assoc-in [:posts slug :loading] false)
             (assoc-in [:posts slug :item] nil))}))

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
