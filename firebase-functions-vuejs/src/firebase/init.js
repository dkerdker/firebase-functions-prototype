import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
import serviceAccount from '@/firebase-confidential/fr-function-prototype-firebase-adminsdk-xlllh-be612a4a07'
const firebaseApp = firebase.initializeApp(serviceAccount)

const firebaseFunction = firebaseApp.functions();
const database = firebaseApp.firestore();

export { database, firebaseFunction, firebaseApp };