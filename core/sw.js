
if(!self.define){let e,s={};const r=(r,i)=>(r=new URL(r+".js",i).href,s[r]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=s,document.head.appendChild(e)}else e=r,importScripts(r),s()})).then((()=>{let e=s[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(i,c)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let o={};const n=e=>r(e,a),l={module:{uri:a},exports:o,require:n};s[a]=Promise.all(i.map((e=>l[e]||n(e)))).then((e=>(c(...e),o)))}}define(["./workbox-f0298a24"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"app.js",revision:"33b4aed9d83661d876cb15fa4a8cef43"},{url:"assets/android-chrome-192x192.png",revision:"0af86695597db73afb62f80db867be00"},{url:"assets/android-chrome-512x512.png",revision:"cd6976d67a7282a0be2165c0e3267819"},{url:"assets/apple-touch-icon.png",revision:"11e0dad42f0d8fac6d32b25b6073fe4a"},{url:"assets/bank.png",revision:"f362924b55cea6a8eec01bb23a4a5e67"},{url:"assets/check-mark.png",revision:"ea75ebcedd3ca883522532d2fd2493f2"},{url:"assets/check.png",revision:"b802766f3d963c2cc7d5b4ee7213fa9a"},{url:"assets/clock.png",revision:"2358d98184ce7eb45a3c9c2dcfb05614"},{url:"assets/countries.js",revision:"c1c6f03e7c8d319690f57e2d240b2341"},{url:"assets/countriesALl.js",revision:"608cc9d6c65bb23be4e139c713abc451"},{url:"assets/exchange.png",revision:"5766650481e343c65bb419c2642cee61"},{url:"assets/favicon-16x16.png",revision:"aa4b413d1bd800523e643d9f39feeac8"},{url:"assets/favicon-32x32.png",revision:"deaec9c608ea6c520a7cbecd0e501e63"},{url:"assets/favicon.ico",revision:"dde8016fe942f8e62ab70ec302d067ad"},{url:"assets/idea.png",revision:"f24212a25ce09c324db7a8bf673ac845"},{url:"assets/lock.png",revision:"242d659cf6cf609ef30eb045ecf4a6be"},{url:"assets/logo.wu.big.svg",revision:"2ba1c30f8b056f5e5e99ab905ee06fba"},{url:"assets/money-transfer.png",revision:"904fdfe09c73c5f6cde0d39a876b6ac1"},{url:"assets/shield.png",revision:"75f2324395f3195796d56b055a113946"},{url:"assets/site.webmanifest",revision:"f2166b3fc2d0bfd80f0fef8d3d173787"},{url:"assets/splash-w.png",revision:"6a8e97e30c31e904571a65505c0e6f1a"},{url:"assets/transfer.png",revision:"69537e399a1495ad098084c572f1e1fa"},{url:"assets/ui-bootstrap-tpls-2.5.0.min.js",revision:"08ee5b916c5af9bb473906b957e73c32"},{url:"assets/uptime.png",revision:"a4d725e5d6f7111d65c1937052ab0f94"},{url:"assets/w.png",revision:"34e9554a311ba5671181a54014a3d04a"},{url:"assets/wall-clock.png",revision:"572c66c0beeb0df1988dc8277e57771b"},{url:"assets/wide.png",revision:"885473df7682cbf3bd98bbbfb4e2b42d"},{url:"controllers/accountController.js",revision:"693edc7929d7b8b171b2f694e7ff1fad"},{url:"controllers/addProfileController.js",revision:"81dd72122c6cb5dd9c178b845f8d6e30"},{url:"controllers/confirmController.js",revision:"1bcb7bda2d03026b8e6fbb296402bf20"},{url:"controllers/dashboardController.js",revision:"af51ad9cfb1c2a52b2c13e723384cd67"},{url:"controllers/historyController.js",revision:"cc708ad4a4c01e273ef57b599d9109f9"},{url:"controllers/loginController.js",revision:"be90fb47129536917b79369dd9a81d98"},{url:"controllers/notificationController.js",revision:"dccb7222a1d5da4d919e8c180ba5c23d"},{url:"controllers/profileController.js",revision:"393ad82cf8bae012f36557947eaa3176"},{url:"controllers/receiverController.js",revision:"fc3f828bcb84af046644a0650ec25235"},{url:"controllers/registerController.js",revision:"c0cc7620847b231eb2f79aa13518637d"},{url:"controllers/reminderModalController.js",revision:"e7420d7a01ad0c70be46898aeb436deb"},{url:"controllers/statusController.js",revision:"821ea3fd979b94faa8efa451fec40e06"},{url:"controllers/transactionController.js",revision:"ae9c907bc259f5b0c702238c652d437f"},{url:"controllers/verifyController.js",revision:"5d86b9483dff66a9a5ea77fb8471af72"},{url:"directives/footer.html",revision:"52ebb433ff945e4e092ed6e091ca43c2"},{url:"directives/navbar.html",revision:"06707cd4b9b66e46a5be935c9bf8ba2a"},{url:"directives/navdashboard.html",revision:"4384a060c3069d5face42058d774f429"},{url:"index.html",revision:"22322056bd1c26502d22bbb946538225"},{url:"scripts/network-information-api-polyfill.js",revision:"b2c2b84a9ae7edfeaee8d6e51b0e0189"},{url:"service/accountService.js",revision:"541f61038f9b6379ec91e4bfbfe1d126"},{url:"service/authService.js",revision:"c1e36f6a2e72bfe1676002a361d31b4a"},{url:"service/dateTimePickerService.js",revision:"dc37ce0635c17c3754889e826287f615"},{url:"service/internetConnectivityService.js",revision:"9148d7ba04a01fd8ffe5df1ee3e2003d"},{url:"service/localStorageService.js",revision:"6461973700864a2e6d9cd65f9f806cf9"},{url:"service/networkInfoService.js",revision:"c00668ecb1a84efc4ab045b8e43e26d6"},{url:"service/profileService.js",revision:"f820a30c913da945e5d506ebe72bbe34"},{url:"service/quickResendService.js",revision:"8fb18df36231a507e482eac0b641848e"},{url:"service/transactionService.js",revision:"f2c9af779bd6f3ea8572685a359a4992"},{url:"styles/dashboard.css",revision:"f18b53e1800ed358a4e97cadf8fa82b4"},{url:"styles/global.css",revision:"6c0fb6cf81f996b4e0c056de237dc2fa"},{url:"styles/home.css",revision:"99ac02cb426c02ce4f38a09ad167590f"},{url:"styles/login.css",revision:"a436357062e322203f86455eed461646"},{url:"styles/notification.css",revision:"8d7471ed9e27d02742c8331c1a5218b7"},{url:"styles/profile.css",revision:"b32d4cdce3e4ff009674d945516f0c9e"},{url:"styles/register.css",revision:"594ac2998217809699507c37137a5bc9"},{url:"styles/statuspage.css",revision:"e8f3f86f2eb1d6ec8881a19825c50f6d"},{url:"styles/userform.css",revision:"e8b5bd0f5d5f955ec160a8d2ff2b8def"},{url:"styles/verifymail.css",revision:"369c6eda4b521eb0c88ace864b5d1e99"},{url:"views/account.html",revision:"7f1eea30defaf145e69c847cf4882b94"},{url:"views/addProfile.html",revision:"1a10996db2a0217fd7eaca5aca420107"},{url:"views/confirmation.html",revision:"7ea740d7c1ec50ee09ea1c0718abee4b"},{url:"views/dashboard.html",revision:"73e80a851c4da0863c4341e12fdbb990"},{url:"views/history.html",revision:"baceb9498961143596ba58c2fde4f212"},{url:"views/home.html",revision:"9fac19ada60d7d5df72583625dbcbd04"},{url:"views/login.html",revision:"e8ff9062283ad0e012c1e7d2610eda1e"},{url:"views/notification.html",revision:"5609b3f7c7591281fef71142372306a7"},{url:"views/profile.html",revision:"c779db3c6b3e1883954f4e9cce200029"},{url:"views/receiver.html",revision:"83dc7104fe609de3e40adaa35d484213"},{url:"views/register.html",revision:"3300d608fa5eea77fa82387ba77c41dd"},{url:"views/reminderModalContent.html",revision:"3364048d96cde8e3595406dd11736fe5"},{url:"views/statuspage.html",revision:"7f5db25efd3fec63ba52123d9deae847"},{url:"views/transaction.html",revision:"ae3f05fa517f85ab280c5e783542c614"},{url:"views/verifymail.html",revision:"bbf739c623b959707d779ea848e9db2d"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/,/^utm/]}),e.registerRoute(/^https?:\/\/localhost:8081\/api\/user\/[^\/]+$/,new e.StaleWhileRevalidate({cacheName:"api-user-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:3600})]}),"GET"),e.registerRoute(/^https?:\/\/localhost:8081\/api\/user\/account\/[^\/]+$/,new e.NetworkFirst({cacheName:"api-account-cache",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:3600})]}),"GET"),e.registerRoute(/^https?:\/\/localhost:8083\/api\/transaction\/history\/[^\/]+$/,new e.StaleWhileRevalidate({cacheName:"api-transaction-history-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:3600})]}),"GET")}));

//# sourceMappingURL=sw.js.map
