var staticCacheName = 'ab-v0';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll([
        'manifest.json'
      ]);
    })
  );
});
self.addEventListener('activate', function (event) {
  console.log('ServiceWorker: Activate');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
  if (event.request.url.indexOf('/browser-sync/') !== -1) {
    event.respondWith(fetch(event.request));
    return;
  }

});

self.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  installButton.disabled = false;
  installButton.addEventListener("click", async e => {
    installButton.disabled = true;
    const { userChoice } = await event.prompt();
    console.info(`user choice was: ${userChoice}`);
  });
});