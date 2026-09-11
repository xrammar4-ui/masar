// ========== ضع مفاتيح Firebase هنا ==========
// اذهب إلى: https://console.firebase.google.com
// أنشئ مشروع → Authentication → Email/Password
// ثم Project Settings → Your apps → Web → انسخ الإعدادات

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// لا تعدّل تحت هذا السطر
let firebaseApp = null;
let firebaseAuth = null;

function initFirebase() {
  if (typeof firebase === 'undefined') {
    console.warn('Firebase SDK not loaded');
    return false;
  }
  if (firebaseConfig.apiKey === 'YOUR_API_KEY') {
    console.warn('ضع مفاتيح Firebase في js/firebase-config.js');
    return false;
  }
  try {
    firebaseApp = firebase.initializeApp(firebaseConfig);
    firebaseAuth = firebase.auth();
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
