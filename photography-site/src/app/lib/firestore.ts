import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "./firebase";

export const saveToFirestore = async (
    downloadURL: string,
    alt: string,
    categories: string[]
) => {
    try {
        const imageDoc = {
            src: downloadURL,
            alt: alt,
            categories: categories,
            createdAt: serverTimestamp(),
        };

        const docRef = doc(db, "images", `${Date.now()}`);
        await setDoc(docRef, imageDoc);
        console.log("Document successfully written!");
    } catch (error) {
        console.error("Error writing document: ", error)
        throw error;
    }
}
