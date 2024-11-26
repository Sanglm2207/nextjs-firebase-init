'use client';

import { useEffect } from 'react';
import { requestPermissionAndGetToken } from '../firebase-config';

export default function RootLayout({children}: {children: React.ReactNode}) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then(async (registration) => {
          console.log('Service Worker registered:', registration);
          const token = await requestPermissionAndGetToken();
          if (token) {
            console.log('Firebase Messaging token received:', token);
          }
        })
        .catch((error) => console.error('Service Worker Error:', error));
    }
  }, []);

  return <>{children}</>;
}
