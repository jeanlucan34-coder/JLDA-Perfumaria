// firebase-messaging-sw.js
// Este arquivo DEVE ficar na raiz do repositório

importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCY0DDSTeFkjaEwL6LE6iLt0JdKHwExVgs",
  authDomain: "fila-viladaserra.firebaseapp.com",
  databaseURL: "https://fila-viladaserra-default-rtdb.firebaseio.com",
  projectId: "fila-viladaserra",
  storageBucket: "fila-viladaserra.firebasestorage.app",
  messagingSenderId: "1064151600235",
  appId: "1:1064151600235:web:8ffd2ac2868a9943a6b52e"
});

const messaging = firebase.messaging();

// Notificação quando app está em BACKGROUND ou tela bloqueada
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification || {};

  const options = {
    body: body || 'Sua senha foi chamada!',
    icon: icon || '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [300, 100, 300, 100, 600, 100, 600],
    sound: 'default',
    requireInteraction: true, // Não some até o usuário interagir
    tag: 'senha-chamada',     // Substitui notificação anterior
    renotify: true,
    actions: [
      { action: 'ver', title: '👁️ Ver minha senha' }
    ],
    data: payload.data || {}
  };

  self.registration.showNotification(title || '🔔 Hospital Vila da Serra', options);
});

// Clique na notificação abre o app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Se já tem uma aba aberta, foca nela
      for (const client of clientList) {
        if (client.url.includes('index.html') || client.url.endsWith('/')) {
          return client.focus();
        }
      }
      // Senão abre nova aba
      return clients.openWindow('/fila-viladaserra/');
    })
  );
});
