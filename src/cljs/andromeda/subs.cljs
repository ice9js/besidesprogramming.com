(ns andromeda.subs
  (:require-macros [reagent.ratom :refer [reaction]])
  (:require [datascript.core :as d]
            [re-frame.core :as rf]))

(rf/reg-sub-raw
  :app/site
  (fn [db _]
    (let [site (d/q '[:find ?view .
                      :where [_ :app/view ?view]]
                    @db)]
      (reaction site))))
