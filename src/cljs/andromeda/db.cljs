(ns andromeda.db
  (:require [datascript.core :as d]
            [re-frame.core :as rf]))

(def schema {})

(rf/reg-event-db
  :init-db
  (fn [_ _]
    (d/db-with (d/empty-db schema)
               [{:db/id -1
                 :app/title "Besides Programming"
                 :app/view :home}])))

(rf/dispatch-sync [:init-db])
