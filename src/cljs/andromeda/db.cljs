(ns andromeda.db
  (:require [re-frame.core :as rf]))

(rf/reg-event-db
  :init-db
  (fn [_ _]
    {:app {:title "Besides Programming"
           :view :home
           :uri []}}))

(rf/dispatch-sync [:init-db])
