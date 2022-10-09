import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBPlDOgY_tvNP4hLclv48eIL720I7pH44U",
  authDomain: "sketchapp-2cbd2.firebaseapp.com",
  projectId: "sketchapp-2cbd2",
  storageBucket: "sketchapp-2cbd2.appspot.com",
  messagingSenderId: "768709028411",
  appId: "1:768709028411:web:e38b5fc4cebacee01c8a1e"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);