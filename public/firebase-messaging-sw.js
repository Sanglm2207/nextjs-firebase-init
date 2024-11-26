// Import các thư viện Firebase
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

// Cấu hình Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAVzHKDlv5bKBTgmbpwNYNPeDr8r6bOUNo",
    authDomain: "saas-387913.firebaseapp.com",
    projectId: "saas-387913",
    storageBucket: "saas-387913.firebasestorage.app",
    messagingSenderId: "617215876101",
    appId: "1:617215876101:web:45d8f0ccea7e8ae8a7d06c",
    measurementId: "G-TSE82HY83P"
};

// Lắng nghe tin nhắn
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    console.log('Received background message: ', payload);
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon,
    });
});
