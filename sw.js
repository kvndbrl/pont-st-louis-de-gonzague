self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(event) {
  event.waitUntil(clients.claim());
});

self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};

  event.waitUntil(
    self.registration.showNotification(data.title || 'Ponts Beauharnois', {
      body: data.body || '',
      icon: data.icon || '/notification-icon.png',
      badge: data.badge || '/notification-icon.png',
      tag: 'pont-widget',
      renotify: false,
      requireInteraction: false,
      silent: false,
      vibrate: [],
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
