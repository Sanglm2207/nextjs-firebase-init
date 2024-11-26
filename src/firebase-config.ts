import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyAVzHKDlv5bKBTgmbpwNYNPeDr8r6bOUNo",
    authDomain: "saas-387913.firebaseapp.com",
    projectId: "saas-387913",
    storageBucket: "saas-387913.firebasestorage.app",
    messagingSenderId: "617215876101",
    appId: "1:617215876101:web:45d8f0ccea7e8ae8a7d06c",
    measurementId: "G-TSE82HY83P"
};

const app = initializeApp(firebaseConfig);

let messaging: import('firebase/messaging').Messaging | null = null;

// Kiểm tra nếu Messaging được hỗ trợ
isSupported().then((supported) => {
    if (supported) {
        messaging = getMessaging(app);

        // Lắng nghe tin nhắn khi ứng dụng đang chạy
        onMessage(messaging, (payload) => {
            console.log('Tin nhắn nhận được:', payload);
            if (Notification.permission === 'granted') {
                new Notification(payload.notification?.title || "Tin nhắn mới", {
                    body: payload.notification?.body,
                    icon: payload.notification?.icon || '/default-icon.png',
                });
            } else {
                console.warn('Trình duyệt không cấp quyền hiện thông báo.');
            }
        });
    } else {
        console.warn('Firebase Messaging không được hỗ trợ trên trình duyệt này.');
    }
}).catch((error) => {
    console.error('Lỗi khi kiểm tra hỗ trợ Messaging:', error);
});

// Hàm yêu cầu quyền và lấy token FCM
export const requestPermissionAndGetToken = async (): Promise<string | null> => {
    if (!messaging) {
        console.warn('Firebase Messaging chưa được khởi tạo.');
        return null;
    }

    try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            console.warn('Quyền thông báo bị từ chối.');
            return null;
        }

        const token = await getToken(messaging, {
            vapidKey: 'BFMiKJKXIB5BH-hRi-2jeZz0kSmYc9zSVU6ugZoZqSTAcjMaPL2Pg0JdGQOT9vHpVVrmW8-tJsSP5hL_JRYDreM',
        });

        if (token) {
            console.log('FCM Token:', token);
            return token;
        } else {
            console.warn('Không có token đăng ký khả dụng.');
            return null;
        }
    } catch (error) {
        console.error('Lỗi khi lấy token:', error);
        return null;
    }
};