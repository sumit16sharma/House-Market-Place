import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBCvKTAQcWyuCxawuRPwTxiLS-Mj2wqEyg',
  authDomain: 'house-marketplace-app-ebeeb.firebaseapp.com',
  projectId: 'house-marketplace-app-ebeeb',
  storageBucket: 'house-marketplace-app-ebeeb.appspot.com',
  messagingSenderId: '659431810176',
  appId: '1:659431810176:web:662f92527d84591910f265',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
