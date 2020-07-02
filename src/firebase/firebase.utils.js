import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
	apiKey: 'AIzaSyAq2TNe_55iz798YeYK5y3OCytNUZR5IuM',
	authDomain: 'shop-db-86e05.firebaseapp.com',
	databaseURL: 'https://shop-db-86e05.firebaseio.com',
	projectId: 'shop-db-86e05',
	storageBucket: 'shop-db-86e05.appspot.com',
	messagingSenderId: '4978283448',
	appId: '1:4978283448:web:858e873999918c314df54d',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapshot = await userRef.get();

	if (!snapshot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (err) {
			console.log('error creating user', err);
		}
	}

	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
