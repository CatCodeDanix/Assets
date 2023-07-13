// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('https://assets.zibatadbir.ir/mpp/sw.js');
// }

// let deferredPrompt;

// window.addEventListener('beforeinstallprompt', function (e) {
//   e.preventDefault();
//   deferredPrompt = e;
//   return;
// });

// pwaInstallBtn.addEventListener('click', function (e) {
//   if (deferredPrompt) {
//     deferredPrompt.prompt();

//     deferredPrompt.userChoice.then(choiceResult => {
//       console.log(choiceResult.outcome);

//       if (choiceResult.outcome === 'dismissed') {
//         console.log('dismissed prompt');
//       } else {
//         console.log('user installed pwa');
//       }

//       deferredPrompt = null;
//     });
//   }
// });

let STATIC_CACHE_V = 1;
let STATIC_PAGES_CACHE_V = 1;

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(`static-${STATIC_CACHE_V}`).then(cache => {
      cache.addAll([
        'https://assets.zibatadbir.ir/assets/css/bootstrap-5.3-rtl.min.css',
        'https://assets.zibatadbir.ir/assets/css/vazirmatn-v33.003-Variable-font-face.css',
        'https://assets.zibatadbir.ir/assets/mpp/offline.html',
        'https://assets.zibatadbir.ir/assets/mpp/images/cute-sad-dog.svg',
        'https://unpkg.com/aos@2.3.1/dist/aos.css',
        'https://cdn.statically.io/gh/CatCode69/mpp-main-page/main/css/style_v_4.css',
        'https://daniums.ir/0:/Personal/Main%20Page/images/menu-icon.svg',
        'https://assets.zibatadbir.ir/assets/js/bootstrap-5.3-bundle.min.js',
        'https://unpkg.com/aos@2.3.1/dist/aos.js',
        'https://daniums.ir/0:/Personal/Main%20Page/images/which-pansion.gif',
        'https://daniums.ir/0:/Personal/Main%20Page/images/why-us.jpg',
        'https://daniums.ir/0:/Personal/Main%20Page/images/dog-reception.webp',
        'https://daniums.ir/0:/Personal/Main%20Page/images/dog-reception.jpg',
        'https://daniums.ir/0:/Personal/Main%20Page/images/telegram.svg',
        'https://daniums.ir/0:/Personal/Main%20Page/images/WhatsApp.svg',
        'https://daniums.ir/0:/Personal/Main%20Page/images/instagram.svg',
        'https://daniums.ir/0:/Personal/Main%20Page/images/pomeranian-dog-footer.png',
        'https://assets.zibatadbir.ir/assets/fonts/Vazirmatn-RD[wght].woff2',
        'https://daniums.ir/0:/Personal/Main%20Page/images/hero-image-large.png',
        'https://cdn.statically.io/gh/CatCode69/mpp-main-page/main/css/post_v_2.css',
        'https://daniums.ir/0:/Personal/Main%20Page/images/dam-1.jpg',
        'https://daniums.ir/0:/Personal/Main%20Page/images/dam-2.jpg',
        'https://daniums.ir/0:/Personal/Main%20Page/images/sanati-1.jpg',
        'https://daniums.ir/0:/Personal/Main%20Page/images/sanati-2.jpg',
        'https://daniums.ir/0:/Personal/Main%20Page/images/home-1.jpg',
        'https://daniums.ir/0:/Personal/Main%20Page/images/home-2.jpg',
        'https://cdn.statically.io/gh/CatCode69/mpp-main-page/main/css/about-us.css',
        'https://daniums.ir/0:/Personal/Main%20Page/images/about-us.jpg',
        'https://daniums.ir/0:/Personal/Main%20Page/images/hero-image-mobile.png',
        'https://iili.io/QqI8aR.md.png',
        'https://cdn.statically.io/gh/CatCode69/mpp/main/user-login-dependency/plyr.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
        'https://cdn.statically.io/gh/CatCode69/mpp/main/user-login-dependency/styleUserPanel3.css',
        'https://cdn.statically.io/gh/CatCode69/mpp/main/user-login-dependency/plyr.p.js',
      ]);
    })
  );
  e.waitUntil(
    caches.open(`static-pages-${STATIC_PAGES_CACHE_V}`).then(cache => {
      cache.addAll([
        'https://marypetpansion.ir/',
        'https://marypetpansion.ir/which-pansion',
        'https://marypetpansion.ir/about-us',
      ]);
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(keysArr =>
      Promise.all(
        keysArr.map(key => {
          if (
            key !== `static-${STATIC_CACHE_V}` &&
            key !== `static-pages-${STATIC_PAGES_CACHE_V}`
          )
            return caches.delete(key);
        })
      )
    )
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.requset).then(res => {
      if (res) {
        return res;
      } else {
        return fetch(e.requset).catch(err => {
          return caches.match(
            'https://assets.zibatadbir.ir/assets/mpp/offline.html'
          );
        });
      }
    })
  );
});
