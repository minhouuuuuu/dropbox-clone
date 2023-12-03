import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDycszXRz5Qag1CId9DbNO0Je392Fgl3ok",
  authDomain: "dropbox-clone-59205.firebaseapp.com",
  projectId: "dropbox-clone-59205",
  storageBucket: "dropbox-clone-59205.appspot.com",
  messagingSenderId: "250082281821",
  appId: "1:250082281821:web:bcdd2cfae94f89df3040b4"
};
 
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };