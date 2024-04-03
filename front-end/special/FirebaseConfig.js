import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

/*
Go here to fetch your Firebase Config file:
https://console.firebase.google.com/

Click into the project. Click the gear icon on the top left
then click "Project Settings"

Under "Your apps", create a new web app. After creating there'll be a
window with const firebaseConfig. Copy it here:
*/

const firebaseConfig = {

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);