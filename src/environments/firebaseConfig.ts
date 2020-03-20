import firebase from 'firebase';
import * as firebaseui from 'firebaseui';

export const firebaseConfig = {
  apiKey: 'AIzaSyDb07B1nv0May__cQB7eVoHTTwSRZa1oQ4',
  authDomain: 'doctrinal-mastery-ebe13.firebaseapp.com',
  databaseURL: 'https://doctrinal-mastery-ebe13.firebaseio.com',
  projectId: 'doctrinal-mastery-ebe13',
  storageBucket: 'doctrinal-mastery-ebe13.appspot.com',
  messagingSenderId: '66956608965',
  appId: '1:66956608965:web:60ff2741510fd3f6ebb7ac'
};

export const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  // tosUrl: '<your-tos-link>',
  // privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};
