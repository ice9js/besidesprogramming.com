(ns andromeda.config
  (:require-macros [andromeda.macros :refer [read-config]]))

(def config (read-config))
