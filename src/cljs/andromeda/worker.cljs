(ns andromeda.worker)

(defn install-worker []
  (when (.-serviceWorker js/navigator)
        (-> (.-serviceWorker js/navigator)
            (.register "/service-worker.js"))))

(install-worker)
