import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

const useFetchImages = (category?: string, excludeCategory?: string) => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [imageAlts, setImageAlts] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchImages = async () => {
        setLoading(true);
        setError(null);
  
        try {
          // Reference to the Firestore collection
          const collectionRef = collection(db, "images");
  
          let q;
  
          if (excludeCategory) {
            // Query to exclude images containing a specific category
            q = query(
              collectionRef,
              where("categories", "not-in", [excludeCategory])
            );
          } else if (category) {
            // Query to fetch images with a specific category
            q = query(
              collectionRef,
              where("categories", "array-contains", category)
            );
          } else {
            // Default query to fetch all images
            q = query(collectionRef);
          }
  
          const querySnapshot = await getDocs(q);
  
          // Extract URLs from the documents
          const urls = querySnapshot.docs.map((doc) => doc.data().src as string);
          // Extract Alts from the documents
          const alts = querySnapshot.docs.map((doc) => doc.data().alt as string);
  
          setImageUrls(urls);
          setImageAlts(alts);
        } catch (error) {
          console.error("Error fetching images:", error);
          setError("Failed to fetch images.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchImages();
    }, [category, excludeCategory]);
  
    return { imageUrls, imageAlts, loading, error };
  };
  

export default useFetchImages;
