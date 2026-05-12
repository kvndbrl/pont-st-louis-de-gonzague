// Nautical vibration patterns (kept for reference but not used)
const VIBRATION_PATTERNS = {
  bientot_leve: [200,100,200,100,200],
  raising:      [500,100,200,100,200],
  leve:         [600,200,600],
  lowering:     [300,100,200,100,100],
  disponible:   [800],
  scheduled:    [200,100,200],
  outage:       [500,100,500,100,500],
  achalandage:  [100,100,100,100,100,100,100],
};

self.addEventListener('install', function(event) {
  event.waitUntil(Promise.resolve());
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    self.registration.getNotifications().then(notifs => {
      notifs.forEach(n => {
        if (!n.tag || n.tag !== 'pont-widget') n.close();
      });
    })
  );
});

self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};

  // Single persistent widget notification — replaces itself silently
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
