// ========== إعدادات Firebase لمشروع مسار ==========
const firebaseConfig = {
  apiKey: "AIzaSyBkHEVqTl5wtkZenoEtGy0Y0LPmwg7DArM",
  authDomain: "masar-5c498.firebaseapp.com",
  projectId: "masar-5c498",
  storageBucket: "masar-5c498.firebasestorage.app",
  messagingSenderId: "608006700928",
  appId: "1:608006700928:web:32e4172ff944858cf1cb65",
  measurementId: "G-NLTJR7H7XK"
};

// لا تعدّل تحت هذا السطر
let firebaseApp = null;
let firebaseAuth = null;
let firebaseDb = null;

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
    if (firebase.firestore) {
      firebaseDb = firebase.firestore();
    }
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const u = {
          uid: user.uid,
          email: user.email,
          name: user.displayName || (user.email ? user.email.split('@')[0] : 'User'),
          avatar: user.photoURL || ''
        };
        localStorage.setItem('ph_user', JSON.stringify(u));
        if (typeof loadHistoryFromCloud === 'function') {
          await loadHistoryFromCloud(user.uid);
        }
      } else {
        const local = localStorage.getItem('ph_user');
        if (local) {
          try {
            const parsed = JSON.parse(local);
            if (!(parsed.uid && String(parsed.uid).startsWith('local_'))) {
              localStorage.removeItem('ph_user');
            }
          } catch(e) {
            localStorage.removeItem('ph_user');
          }
        }
      }
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}
