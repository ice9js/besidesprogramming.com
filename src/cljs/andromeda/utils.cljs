(ns andromeda.utils)

(defn className
  "Turns object keys into a class string depending on their values."
  [classes]
  (let [enabledClasses (map (fn [[class _]] class)
                            (filter identity classes))]
    (clojure.string/join " " enabledClasses)))
