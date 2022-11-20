import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * To find your Firebase config object:
 *
 * 1. Go to your [Project settings in the Firebase console](https://console.firebase.google.com/project/_/settings/general/)
 * 2. In the "Your apps" card, select the nickname of the app for which you need a config object.
 * 3. Select Config from the Firebase SDK snippet pane.
 * 4. Copy the config object snippet, then add it here.
 */
const firebaseConfig = {
  apiKey: 'AIzaSyCpVHT8LlNstyqKwVQbR2061s_gfnDB8_k',
  authDomain: 'signal-clone-b9e32.firebaseapp.com',
  projectId: 'signal-clone-b9e32',
  storageBucket: 'signal-clone-b9e32.appspot.com',
  messagingSenderId: '683981564186',
  appId: '1:683981564186:web:973ca6d288cd193a7464a3',
};
let app;
let auth;
if (getApps().length < 1) {
  // Initialize Firebase

  app = initializeApp(firebaseConfig);
  // Initialize Firebase Authentication and get a reference to the service
  auth=initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
}
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


auth = getAuth(app);

export { db, auth };
