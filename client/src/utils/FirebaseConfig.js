import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyAOndwxLr2ALqg_89Mz09JbzxvDG1OUE0U",
    authDomain: "whatsapp-clone-7805a.firebaseapp.com",
    projectId: "whatsapp-clone-7805a",
    storageBucket: "whatsapp-clone-7805a.appspot.com",
    messagingSenderId: "322532147469",
    appId: "1:322532147469:web:cd016839e10713042cf044",
    measurementId: "G-4GL0L0S5CR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
export { firebaseAuth }