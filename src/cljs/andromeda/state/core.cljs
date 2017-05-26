(ns andromeda.state.core
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [datascript.core :as d]
            [re-frame.core :as rf]
            [andromeda.state.routes]))

(rf/reg-event-db
  :init-db
  (fn [_ _]
    (let [schema {}]
      (d/db-with (d/empty-db schema) 
                 [{:db/id -1
                   :app/title "Besides Programming"
                   :app/site :home}]))))

(rf/reg-sub-raw
  :app/site
  (fn app-site-sub [db _]
    (let [site (d/q '[:find ?site .
                      :where [_ :app/site ?site]]
                    @db)]
      (reaction site))))

(rf/dispatch-sync [:init-db])
