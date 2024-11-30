"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getDownloadURL, ref, listAll } from "firebase/storage";
import { storage } from "@/app/lib/firebase";

const FetchAllImages: React.FC = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);

      try {
        // Reference to the images folder in Firebase Storage
        const imagesRef = ref(storage, "images");

        // List all files in the folder
        const result = await listAll(imagesRef);

        // Fetch download URLs for each file
        const urls = await Promise.all(
          result.items.map((itemRef) => getDownloadURL(itemRef))
        );

        setImageUrls(urls); // Update state with fetched URLs
      } catch (error: any) {
        console.error("Error fetching images:", error);
        setError("Failed to fetch images.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="fetch-images min-h-screen w-4/5 mx-auto my-14">
      {loading && <p>Loading images...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-4 gap-4">
        {imageUrls.map((url, index) => (
          <div key={index} className="relative w-full border">
            <Image
              src={url}
              alt={`Image ${index + 1}`}
              width={700}
              height={500}
              className="object-cover hover:opacity-90 duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchAllImages;
