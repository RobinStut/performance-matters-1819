var CACHE_NAME = "my-site-cache-v1";
// var OFFLINE_URL = "/offline";
var urlsToCache = ["/", "index.js", "styles.css"];

self.addEventListener("install", event => {
  console.log("installing service workerSSS", event);
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Opened cache");
      console.log(urlsToCache);
      return cache.addAll(urlsToCache);
    })
  );
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  console.log("activate service worker", event);
});

self.addEventListener("fetch", event => {
  console.log("fetch event", event.request.url);
  if (
    event.request.method === "GET" &&
    event.request.headers.get("accept").indexOf("images/*") > -1
  ) {
    event.respondWith(fetch);
  }
});

self.addEventListener("fetch", function(event) {
  // if (event.request.mode === "navigate") {
  //   return event.respondWith(
  //     fetch(event.request).catch(() => caches.match(OFFLINE_URL))
  //   );
  // }
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return (
        resp ||
        fetch(event.request).then(function(response) {
          return caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
