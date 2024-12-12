import { deleteObject, ref } from "firebase/storage";
import { doc, setDoc, serverTimestamp, collection, where, query, getDocs, updateDoc, deleteDoc } from "firebase/firestore"
import { db, storage } from "./firebase";

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


const saveBlogToFirestore = async (
    // isPublished: boolean,
    // categories: string[],
    title: string,
    content: string,
    images: string[],
) => {
    // Ensures the slug is unique for each blog post
    const slugBase = title.toLowerCase().replace(/\s+/g, "-");
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const slug = `${slugBase}-${randomNum}`;
    
    try {
        const blogPostDoc = {
            title: title,
            slug: slug,
            content: content,
            imageThumbnail: images[0],
            isPublished: true,
            images: images,
            categories: [""],
            publishedAt: serverTimestamp()
        }
        
        const docRef = doc(db, "blog_posts", `${Date.now()}`);
        await setDoc(docRef, blogPostDoc);
        console.log("Blog document written successfully!");
    } catch (error) {
        console.log("Failed to upload blog post: ", error)
        throw error;
    }
}

const fetchPrices = async () => {
    try {
        const pricesRef = collection(db, "prices");
        const q = query(pricesRef);
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const prices = querySnapshot.docs[0].data();
            return prices;
        } else {
            console.error("Unable to load prices.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching prices: ", error);
        return null;
    }
}

const savePricesToFirestore = async (
    families: string,
    seniors: string,
    engagements: string,
    weddings: string,
) => {
    try {
        const pricesPostDoc = {
            families: families,
            seniors: seniors,
            engagements: engagements,
            weddings: weddings,
        }

        const docRef = doc(db, "prices", "46WTtpUrJXDYFLhijjgd");
        await updateDoc(docRef, pricesPostDoc);
        console.log("Prices updated successfully")
    } catch (error) {
        console.log("Error updating prices: ", error)
        throw error;
    }

}

const deleteImageFromCloud = async (imageUrl: string, documentId?: string) => {
    try {
        const imageRef = ref(storage, decodeURIComponent(new URL(imageUrl).pathname.split('/o/')[1]));
        await deleteObject(imageRef);

        if (documentId) {
            const docRef = doc(db, "images", documentId);
            await deleteDoc(docRef);
        } else {
            const imagesRef = collection(db, "images");
            const q = query(imagesRef, where("src", "==", imageUrl));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docToDelete = querySnapshot.docs[0].ref;
                await deleteDoc(docToDelete);
            } else {
                throw new Error("Image document not found in Firestore");
            }
        }
        console.log("Image successfully deleted from storage and firestore.");
    } catch (error) {
        console.log("Error deleting images: ", error);
        throw error;
    }
}

export { saveToFirestore, fetchBlogBySlug, saveBlogToFirestore, fetchPrices, savePricesToFirestore, deleteImageFromCloud };