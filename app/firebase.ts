import { initializeApp, getApps } from "firebase/app";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyACjzm83zgE_Sfi1HajJNJVHwHxO6Exf6A",

  authDomain:
    "hockey-pool-d8c50.firebaseapp.com",

  projectId:
    "hockey-pool-d8c50",

  storageBucket:
    "hockey-pool-d8c50.appspot.com",

  messagingSenderId:
    "587441247779",

  appId:
    "1:587441247779:web:89636bbcda842c1bc88396",

};

const app =

  getApps().length
    ? getApps()[0]
    : initializeApp(firebaseConfig);

export const db =
  getFirestore(app);