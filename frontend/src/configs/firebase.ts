// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, OAuthProvider, browserLocalPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsSBVOi9ANqyckfXARqGGLSDSvJzhtrXU",
  authDomain: "inno-lunch.firebaseapp.com",
  databaseURL:
    "https://inno-lunch-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "inno-lunch",
  storageBucket: "inno-lunch.appspot.com",
  messagingSenderId: "475476904888",
  appId: "1:475476904888:web:cf553bc56c1decd438dd4d",
  measurementId: "G-KGGKTW0XGW",
};

const buildAuthProvider = () => {
  const provider = new OAuthProvider("microsoft.com");
  provider.addScope("email");
  provider.addScope("openid");
  provider.addScope("profile");
  provider.setCustomParameters({
    propmt: "consent",
    tenant: "common",
  });
  return provider;
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.setPersistence(browserLocalPersistence);
export const azureProvider = buildAuthProvider();
