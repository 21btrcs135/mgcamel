// This script can be run with Node.js to add sample products to your Firestore database.
// Usage: node scripts/addSampleProducts.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addSampleProducts() {
  const products = [
    { name: 'Product 1', price: 19.99 },
    { name: 'Product 2', price: 29.99 },
    { name: 'Product 3', price: 39.99 },
  ];
  for (const product of products) {
    await addDoc(collection(db, 'products'), product);
    console.log('Added:', product);
  }
  console.log('Sample products added!');
}

addSampleProducts();
