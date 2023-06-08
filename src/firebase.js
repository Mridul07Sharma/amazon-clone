
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAn1TUZzYHKtCrtSbAYchDMIFQsPuI0acg",
  authDomain: "clone-495fd.firebaseapp.com",
  projectId: "clone-495fd",
  storageBucket: "clone-495fd.appspot.com",
  messagingSenderId: "772067622536",
  appId: "1:772067622536:web:ea60c864bbd57f2918e93d",
  measurementId: "G-3XHED22V8M"
};



const firebaseApp=firebase.initializeApp(firebaseConfig);

const db=firebaseApp.firestore();
const auth=firebase.auth();

export {db, auth};

