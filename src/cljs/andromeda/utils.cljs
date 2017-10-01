(ns andromeda.utils)

(defn className
  "Turns object keys into a class string depending on their values."
  [classes]
  (let [enabledClasses (map (fn [[class _]] class)
                            (filter #(get % 1) classes))]
    (clojure.string/join " " enabledClasses)))

(def months ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"])

(defn date
  "Takes ISO date and formats it to a string."
  [date-str]
  (let [date (js/Date. date-str)
        year (.getFullYear date)
        current-year (.getFullYear (js/Date.))]
    (str (subs (nth months (.getMonth date)) 0 3)
         " "
         (.getDate date)
         (when (not= current-year year) (str ", " year)))))
