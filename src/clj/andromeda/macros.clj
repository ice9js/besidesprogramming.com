(ns andromeda.macros
  (:require [environ.core :refer [env]]))

(defmacro read-config
  "Loads an EDN configuration file for the current environment from config/ at compile time."
  []
  (let [config (env :cljs-env)]
    (clojure.edn/read-string (slurp (str "config/" config ".edn")))))
