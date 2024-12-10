import { doc, setDoc, serverTimestamp, collection, where, query, getDocs } from "firebase/firestore"
import { db } from "./firebase";

const saveToFirestore = async (
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

const fetchBlogBySlug = async (slug: string) => {
    try {
        const blogRef = collection(db, "blog_posts");
        const q = query(blogRef, where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const blog = querySnapshot.docs[0].data();
            return blog;
        } else {
            console.error("Blog not found with specified slug.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching blog by slug: ", error);
        return null;
    }
};

export { saveToFirestore, fetchBlogBySlug };