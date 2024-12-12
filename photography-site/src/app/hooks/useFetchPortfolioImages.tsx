import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

const useFetchPortfolioImages = ({
  category,
  excludeCategory,
  }: {
    category?: string;
    excludeCategory?: string;
}) => {
    const [images, setImages] = useState<{ src: string; alt: string; width: number; height: number; isSelected: boolean }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchImages = async () => {
        setLoading(true);
        setError(null);
  
        try {
          const collectionRef = collection(db, "images");
          const querySnapshot = await getDocs(collectionRef);
  
          const promises = querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const src = data.src;
            const alt = data.alt || "Image";
            const categories = data.categories || [];
  
            // Dynamically get image dimensions
            const img = new Image();
            img.src = src;
            await new Promise((resolve) => (img.onload = resolve));
  
            // Return the image object
            return {
              src,
              alt,
              width: img.width,
              height: img.height,
              categories,
              isSelected: false,
            };
          });
  
          const allImages = await Promise.all(promises);
  
          // Filter images based on `category` and `excludeCategory`
          const filteredImages = allImages.filter((image) => {
            if (excludeCategory && image.categories.includes(excludeCategory)) {
              return false;
            }
            if (category && !image.categories.includes(category)) {
              return false;
            }
            return true;
          });
  
          setImages(filteredImages);
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

export default useFetchPortfolioImages;