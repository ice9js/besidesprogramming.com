(ns andromeda.events
  (:require [re-frame.core :as rf]
            [day8.re-frame.http-fx]
            [andromeda.config :refer [config]]))

(rf/reg-fx
  :ga-page-view
  (fn [uri]
    (when (and (:ga-tracker-id config) (.-gtag js/window))
          (.gtag js/window "config" (:ga-tracker-id config) (clj->js {:page_path uri})))))

(rf/reg-event-fx
  :update-route
  (fn [ctx [_ path query]]
    {:ga-page-view (str (str "/" path)
                        (when-not (empty? query)
                                  (str "?" (clojure.string/join "&" (map #(str (name %) "=" (% query)) (keys query))))))

     :db (-> (:db ctx)
             (assoc-in [:app :route] {:path (clojure.string/trim path)
                                      :query query}))}))

(def json-format
  {:read (fn [xhrio] {:status (. xhrio getStatus)
                      :headers (js->clj (. xhrio getResponseHeaders) :keywordize-keys true)
                      :body (js->clj (.parse js/JSON (. xhrio getResponse)) :keywordize-keys true)})
   :description "raw"})

(defn post-from-api
  "Formats a post received from the API to the local format."
  [post]
  {:id (:id post)
   :slug (:slug post)
   :title (:rendered (:title post))
   :date (:date post)
   :link (:link post)
   :image (get-in post [:_embedded :wp:featuredmedia 0 :source_url] nil)
   :content (:rendered (:content post))
   :excerpt (:rendered (:excerpt post))
   :status :ok
   :next (:next post)
   :previous (:previous post)})

(rf/reg-event-fx
  :query-posts
  (fn [ctx [_ query]]
    {:http-xhrio {:method :get
                  :uri (str (:api-host config) "/wp/v2/posts")
                  :params query
                  :timeout 3000
                  :response-format json-format
                  :on-success [:query-posts-success]
                  :on-failure [:query-posts-failure]}

     :db (-> (:db ctx)
             (assoc-in [:posts :error] false)
             (assoc-in [:posts :loading] true)
             (assoc-in [:posts :items] []))}))

(rf/reg-event-fx
  :query-posts-success
  (fn [ctx [_ response]]
    (let [results (mapv post-from-api (:body response))]
      {:db (-> (:db ctx)
               (assoc-in [:posts :items] results)
               (assoc-in [:posts :total] (js/parseInt (:x-wp-total (:headers response))))
               (assoc-in [:posts :loading] false))})))

(rf/reg-event-fx
  :query-posts-failure
  (fn [ctx _]
    {:db (-> (:db ctx)
             (assoc-in [:posts :error] true)
             (assoc-in [:posts :total] 0)
             (assoc-in [:posts :loading] false))}))
