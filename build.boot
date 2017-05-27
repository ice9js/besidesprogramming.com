(set-env!
 :source-paths    #{"src/cljs" "src/clj" "less"}
 :resource-paths  #{"resources"}
 :dependencies '[[adzerk/boot-cljs        "1.7.228-2" :scope "test"]
                 [adzerk/boot-cljs-repl   "0.3.3"     :scope "test"]
                 [adzerk/boot-reload      "0.4.13"    :scope "test"]
                 [pandeiro/boot-http      "0.7.6"     :scope "test"]
                 [com.cemerick/piggieback "0.2.1"     :scope "test"]
                 [org.clojure/tools.nrepl "0.2.12"    :scope "test"]
                 [weasel                  "0.7.0"     :scope "test"]
                 [deraen/boot-less        "0.6.2"     :scope "test"]
                 [org.clojure/clojurescript "1.9.293"]
                 [reagent "0.6.0"]
                 [re-frame "0.9.3"]
                 [datascript "0.16.1"]
                 [secretary "1.2.3"]])

(require
 '[adzerk.boot-cljs      :refer [cljs]]
 '[adzerk.boot-cljs-repl :refer [cljs-repl start-repl]]
 '[adzerk.boot-reload    :refer [reload]]
 '[pandeiro.boot-http    :refer [serve]]
 '[deraen.boot-less      :refer [less]])

(deftask build []
  (comp (speak)

        (cljs)

        (less)
        (sift :move {#"screen.css" "css/screen.css"
                     #"screen.main.css.map" "css/screen.main.css.map"})))

(deftask run []
  (comp (serve)
        (watch)
        (cljs-repl)
        
        (reload)
        (build)))

(deftask production []
  (task-options! cljs {:optimizations :advanced}
                 less {:compression true})
  identity)

(deftask development []
  (task-options! cljs {:optimizations :none}
                 reload {:on-jsload 'andromeda.app/init}
                 less {:source-map true})
  identity)

(deftask dev
  "Simple alias to run application in development mode"
  []
  (comp (development)
        (run)))
