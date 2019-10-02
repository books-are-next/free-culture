/* global self, caches, fetch */
/* eslint-disable no-restricted-globals */

const CACHE = 'cache-04bf345';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./02-introduction.html","./03-piracy.html","./01-preface.html","./04-property.html","./05-puzzles.html","./06-balances.html","./07-conclusion.html","./08-afterword.html","./09-acknowledgments.html","./index.html","./license.html","./manifest.json","./scripts/bundle.js","./style/bundle.css","./style/style.min.css","./images/01.png","./images/01.svg","./images/02.png","./images/02.svg","./images/03.png","./images/03.svg","./images/04.png","./images/04.svg","./images/05.png","./images/05.svg","./images/06.png","./images/06.svg","./images/07.png","./images/07.svg","./images/08.png","./images/08.svg","./images/09.png","./images/09.svg","./images/10.png","./images/12.png","./images/13.png","./images/11.png","./images/14.png","./images/15.png","./images/16.png","./images/17.png","./images/18.jpg","./images/cc.png","./images/cover.png","./images/touch-icons/apple-touch-icon-ipad-76x76.png","./images/touch-icons/apple-touch-icon-ipad-retina-152x152.png","./images/touch-icons/apple-touch-icon-iphone-60x60.png","./images/touch-icons/apple-touch-icon-iphone-retina-120x120.png","./open-sans-fontface/README.md","./open-sans-fontface/bower.json","./open-sans-fontface/index.html","./open-sans-fontface/open-sans.css","./open-sans-fontface/open-sans.less","./open-sans-fontface/open-sans.scss","./open-sans-fontface/package.json","./open-sans-fontface/sass/_Bold.scss","./open-sans-fontface/sass/_BoldItalic.scss","./open-sans-fontface/sass/_ExtraBold.scss","./open-sans-fontface/sass/_ExtraBoldItalic.scss","./open-sans-fontface/sass/_Light.scss","./open-sans-fontface/sass/_Italic.scss","./open-sans-fontface/sass/_LightItalic.scss","./open-sans-fontface/sass/_Semibold.scss","./open-sans-fontface/sass/_Regular.scss","./open-sans-fontface/sass/_SemiboldItalic.scss","./open-sans-fontface/sass/_mixins.scss","./open-sans-fontface/sass/_variables.scss","./open-sans-fontface/sass/open-sans.scss","./open-sans-fontface/fonts/BoldItalic/OpenSans-BoldItalic.svg","./open-sans-fontface/fonts/BoldItalic/OpenSans-BoldItalic.eot","./open-sans-fontface/fonts/BoldItalic/OpenSans-BoldItalic.ttf","./open-sans-fontface/fonts/BoldItalic/OpenSans-BoldItalic.woff","./open-sans-fontface/fonts/BoldItalic/OpenSans-BoldItalic.woff2","./open-sans-fontface/fonts/Bold/OpenSans-Bold.eot","./open-sans-fontface/fonts/Bold/OpenSans-Bold.svg","./open-sans-fontface/fonts/Bold/OpenSans-Bold.ttf","./open-sans-fontface/fonts/Bold/OpenSans-Bold.woff","./open-sans-fontface/fonts/Bold/OpenSans-Bold.woff2","./open-sans-fontface/fonts/ExtraBold/OpenSans-ExtraBold.eot","./open-sans-fontface/fonts/ExtraBold/OpenSans-ExtraBold.svg","./open-sans-fontface/fonts/ExtraBold/OpenSans-ExtraBold.ttf","./open-sans-fontface/fonts/ExtraBold/OpenSans-ExtraBold.woff","./open-sans-fontface/fonts/ExtraBold/OpenSans-ExtraBold.woff2","./open-sans-fontface/fonts/ExtraBoldItalic/OpenSans-ExtraBoldItalic.eot","./open-sans-fontface/fonts/ExtraBoldItalic/OpenSans-ExtraBoldItalic.svg","./open-sans-fontface/fonts/ExtraBoldItalic/OpenSans-ExtraBoldItalic.ttf","./open-sans-fontface/fonts/ExtraBoldItalic/OpenSans-ExtraBoldItalic.woff","./open-sans-fontface/fonts/ExtraBoldItalic/OpenSans-ExtraBoldItalic.woff2","./open-sans-fontface/fonts/Italic/OpenSans-Italic.eot","./open-sans-fontface/fonts/Italic/OpenSans-Italic.svg","./open-sans-fontface/fonts/Italic/OpenSans-Italic.ttf","./open-sans-fontface/fonts/Italic/OpenSans-Italic.woff","./open-sans-fontface/fonts/Italic/OpenSans-Italic.woff2","./open-sans-fontface/fonts/Light/OpenSans-Light.eot","./open-sans-fontface/fonts/Light/OpenSans-Light.svg","./open-sans-fontface/fonts/Light/OpenSans-Light.woff","./open-sans-fontface/fonts/Light/OpenSans-Light.ttf","./open-sans-fontface/fonts/Light/OpenSans-Light.woff2","./open-sans-fontface/fonts/LightItalic/OpenSans-LightItalic.eot","./open-sans-fontface/fonts/LightItalic/OpenSans-LightItalic.svg","./open-sans-fontface/fonts/LightItalic/OpenSans-LightItalic.ttf","./open-sans-fontface/fonts/LightItalic/OpenSans-LightItalic.woff","./open-sans-fontface/fonts/LightItalic/OpenSans-LightItalic.woff2","./open-sans-fontface/fonts/Regular/OpenSans-Regular.svg","./open-sans-fontface/fonts/Regular/OpenSans-Regular.eot","./open-sans-fontface/fonts/Regular/OpenSans-Regular.ttf","./open-sans-fontface/fonts/Regular/OpenSans-Regular.woff","./open-sans-fontface/fonts/Regular/OpenSans-Regular.woff2","./open-sans-fontface/fonts/Semibold/OpenSans-Semibold.eot","./open-sans-fontface/fonts/Semibold/OpenSans-Semibold.svg","./open-sans-fontface/fonts/Semibold/OpenSans-Semibold.ttf","./open-sans-fontface/fonts/Semibold/OpenSans-Semibold.woff","./open-sans-fontface/fonts/Semibold/OpenSans-Semibold.woff2","./open-sans-fontface/fonts/SemiboldItalic/OpenSans-SemiboldItalic.eot","./open-sans-fontface/fonts/SemiboldItalic/OpenSans-SemiboldItalic.svg","./open-sans-fontface/fonts/SemiboldItalic/OpenSans-SemiboldItalic.woff","./open-sans-fontface/fonts/SemiboldItalic/OpenSans-SemiboldItalic.ttf","./open-sans-fontface/fonts/SemiboldItalic/OpenSans-SemiboldItalic.woff2"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
