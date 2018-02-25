(ns andromeda.config)

(def domain "besidesprogramming.com")

(def api-host "http://zoninator.dev/wp-json")

(def nav-links [{:label "Home" :url "/"}
                {:label "Articles" :url "/all"}
                {:label "About" :url "/about"}])

(def social-links [{:link "https://besidesprogramming.com/feed/rss" :icon "rss"}
                   {:link "https://slackin.besidesprogramming.com/" :icon "slack"}
                   {:link "https://www.instagram.com/ice9js/" :icon "instagram"}
                   {:link "https://twitter.com/ice9js" :icon "twitter"}
                   {:link "https://www.facebook.com/besidesprogramming/" :icon "facebook"}])

(def posts-per-page 10)

(def posts-on-home-page 5)
