import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../lib/firebase"

export const login = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Login failed");
        throw error;
    }
}

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Logout failed");
        throw error;
    }
}