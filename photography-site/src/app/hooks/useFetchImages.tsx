import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

const useFetchImages = (category?: string, excludeCategory?: string) => {
    const [images, setImages] = useState<{ src: string; alt: string; width: number; height: number;}[]>([]);
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

          const promises = querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const src = data.src as string;
            const alt = data.alt || "Image";
  
            // Dynamically get the image dimensions
            const img = new Image();
            img.src = src;
            
            await new Promise((resolve) => (img.onload = resolve)); // Wait until the image loads
  
            return {
              src,
              alt,
              width: img.width,
              height: img.height,
            };
          });

          const imagesData = await Promise.all(promises);
  
          setImages(imagesData);
        } catch (error) {
          console.error("Error fetching images:", error);
          setError("Failed to fetch images.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchImages();
    }, [category, excludeCategory]);
  
    return { images, loading, error };
  };

export default useFetchImages;