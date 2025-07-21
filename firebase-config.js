// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js";

// ✅ Correct Firebase config for your project
const firebaseConfig = {
  apiKey: "AIzaSyCt7256M7ocWrUk1BKXEhkwAbXxTQzoaEE",
  authDomain: "autocultive-b70df.firebaseapp.com",
  projectId: "autocultive-b70df",
  storageBucket: "autocultive-b70df.appspot.com",  // ✅ fixed this line
  messagingSenderId: "567543720829",
  appId: "1:567543720829:web:682f549c40773ff3b5ba14",
  measurementId: "G-SDS626SJQW"
};

// 🔧 Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 📦 Export the services to use in your other HTML pages
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
