import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBfeY8x83oSFubaiVzwZqW3NzIkb-yz6aA",
	authDomain: "beatburger-app.firebaseapp.com",
	projectId: "beatburger-app",
	storageBucket: "beatburger-app.appspot.com",
	messagingSenderId: "986490917655",
	appId: "1:986490917655:web:de0a8281bfdd62f0819d52",
};

export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
