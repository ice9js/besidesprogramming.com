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

(defn facebook-link
  "Returns a share link for Facebook."
  [{link :link}]
  (str "https://www.facebook.com/sharer/sharer.php?u=" link))

(defn twitter-link
  "Returns a share link for Twitter."
  [{link :link title :title}]
  (str "https://twitter.com/intent/tweet?url=" link ";via=ice9js;text=" title ";&amp;count=none"))

(defn pinterest-link
  "Returns a share link for Pinterest."
  [{image :image link :link title :title}]
  (str "https://pinterest.com/pin/create/button/?url=" link "&media=" image "&description=" title))
