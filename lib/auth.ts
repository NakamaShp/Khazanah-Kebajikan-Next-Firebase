import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  AuthError 
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function loginWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
  } catch (error) {
    const err = error as AuthError;
    // Bisa akses code & message dari Firebase
    throw new Error(`Firebase Auth Error (${err.code}): ${err.message}`);
  }
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return { user: result.user };
  } catch (error) {
    const err = error as AuthError;
    throw new Error(`Firebase Auth Error (${err.code}): ${err.message}`);
  }
}
