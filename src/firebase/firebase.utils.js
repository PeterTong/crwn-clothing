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

export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);
	// this make a big request, because we can only call the set function once at a time 
	const batch = firestore.batch();
	objectsToAdd.forEach(obj => {
		// firebase give me a new document ref, that firebase will generate unique key for each object.
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef,obj);
	});
	// this will fire off our batch requests
	return await batch.commit();
	// console.log(collectionRef);
};
// we want to convert it to an object instead of the array 
export const convertCollectionsSnapshotToMap = (collections) => {
	const transformedCollection = collections.docs.map(doc => {
		const { title, items } = doc.data();
		
		return{
			// encodeURI method comes with every javascript render 
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items

		}
	});

	console.log(transformedCollection);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// we want to always trigger the Google pop up when we use this Google Auth
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
