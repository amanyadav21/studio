import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth } from './firebase';

if (!auth) {
  // If auth is not initialized (e.g., running on server), we still export stub functions
  console.warn('Firebase auth is not initialized. Make sure you are running in the browser.');
}

export async function signUpWithEmailPassword(email: string, password: string) {
  if (!auth) throw new Error('Firebase auth not initialized');
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function signInWithEmailPassword(email: string, password: string) {
  if (!auth) throw new Error('Firebase auth not initialized');
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function signOut() {
  if (!auth) throw new Error('Firebase auth not initialized');
  await firebaseSignOut(auth);
}

export async function sendResetEmail(email: string) {
  if (!auth) throw new Error('Firebase auth not initialized');
  await sendPasswordResetEmail(auth, email);
}

export function onAuthChanged(callback: (user: User | null) => void) {
  if (!auth) return () => undefined;
  return onAuthStateChanged(auth, callback);
}
