import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: "AIzaSyC9hVXkoEe1oe2gwOmExxm2fmV0PjE_bnE",
	authDomain: "crwn-db-eb9ef.firebaseapp.com",
	databaseURL: "https://crwn-db-eb9ef.firebaseio.com",
	projectId: "crwn-db-eb9ef",
	storageBucket: "crwn-db-eb9ef.appspot.com",
	messagingSenderId: "975397445170",
	appId: "1:975397445170:web:ffcbc3e39c5426fe72662b",
	measurementId: "G-DYGT5JX567"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {

	if(!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();
	// console.log(snapShot);
	
	if(!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			})

		}catch(error){
			console.log('error creating user', error.message);
		}
	}

	return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// we want to always trigger the Google pop up when we use this Google Auth
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
