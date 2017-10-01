(ns andromeda.config)

(def domain "besidesprogramming.com")

(def api-host "http://zoninator.dev/wp-json")

(def nav-links [{:label "Home" :url "/"}
                {:label "Articles" :url "/all"}
                {:label "About" :url "/about"}])

(def social-links [{:link "#" :icon "rss"}
                   {:link "#" :icon "slack"}
                   {:link "#" :icon "instagram"}
                   {:link "#" :icon "twitter"}
                   {:link "#" :icon "facebook"}])

(def posts-per-page 10)

(def posts-on-home-page 5)
