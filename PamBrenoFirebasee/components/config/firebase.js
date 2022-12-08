
import firebase from "firebase/compat/app";
import 'firebase/compat/database'


const firebaseConfig = {
  apiKey: "AIzaSyClYo2lI4h6CF_gTfh6GDj6rMbWSPqUXEc",
  authDomain: "cadastropam.firebaseapp.com",
  projectId: "cadastropam",
  storageBucket: "cadastropam.appspot.com",
  messagingSenderId: "185129691123",
  appId: "1:185129691123:web:0be50d981326bdedb15486",
  measurementId: "G-3LPLRG1D9G"
};


if(!firebase.app.length == 0) {

    firebase.initializeApp(firebaseConfig);
}
// Initialize Firebase
export default firebase;