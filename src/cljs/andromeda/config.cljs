(ns andromeda.config)

(def domain "besidesprogramming.com")

(def api-host "http://zoninator.dev/wp-json")
; (def api-host "https://besidesprogramming.com/wp-json")

(def post-categories [{:id 2 :label "Thoughts" :slug "thoughts"}
            {:id 3 :label "Programming" :slug "programming"}
            {:id 4 :label "Travel" :slug "travel"}
            {:id 5 :label "Photos" :slug "photos"}])

(def main-nav [{:label "Home" :url "/"}
               {:label "Thoughts" :url "/thoughts"}
               {:label "Programming" :url "/programming"}
               {:label "Travel" :url "/travel"}
               {:label "Photos" :url "/photos"}
               {:label "About" :url "/about"}])

(def social-links [{:link "https://besidesprogramming.com/feed/rss" :icon "rss"}
                   {:link "https://slackin.besidesprogramming.com/" :icon "slack"}
                   {:link "https://www.instagram.com/ice9js/" :icon "instagram"}
                   {:link "https://twitter.com/ice9js" :icon "twitter"}
                   {:link "https://www.facebook.com/besidesprogramming/" :icon "facebook"}])

; (def ga-tracker-id "UA-88781129-1")
(def ga-tracker-id nil)

(def posts-per-page 10)

(def posts-on-home-page 5)
