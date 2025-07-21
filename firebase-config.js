
const firebaseConfig = {
  apiKey: "AIzaSyAwU28U1FyH70tGCtzkZ5f6eW1RV_ASoKM",
  authDomain: "cautious-citizens-a2774.firebaseapp.com",
  projectId: "cautious-citizens-a2774",
  storageBucket: "cautious-citizens-a2774.appspot.com",
  messagingSenderId: "112229540957",
  appId: "1:112229540957:web:15997733e119de29e219b4"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
