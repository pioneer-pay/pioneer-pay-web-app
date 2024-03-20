module.exports = {
	globDirectory: 'core/',
	globPatterns: [
		'**/*.{js,png,ico,svg,webmanifest,html,css}'
	],
	swDest: 'core/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/,
		/^utm/
	],
	clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https?:\/\/localhost:8081\/api\/user\/[^\/]+$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'api-user-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60, // Cache for 1 hour
        },
      },
    },
    {
      urlPattern: /^https?:\/\/localhost:8081\/api\/user\/account\/[^\/]+$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-account-cache',
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60, // Cache for 1 hour
        },
      },
    },
    {
      urlPattern: /^https?:\/\/localhost:8083\/api\/transaction\/history\/[^\/]+$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'api-transaction-history-cache',
        // networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 , // Cache for 1 hour
        },
      },
    },
  ],
};