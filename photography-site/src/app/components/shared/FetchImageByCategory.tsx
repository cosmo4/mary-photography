"use client";

import React, { useState } from "react";
import GoBack from "@/app/components/shared/GoBack";
import useFetchImages from "@/app/hooks/useFetchPortfolioImages";
import { Gallery } from "react-grid-gallery";
import ImageModal from "./ImageModal";

const FetchCategoryImages: React.FC<{ category: string; excludeCategory: string }> = ({ category, excludeCategory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const { images, loading, error } = useFetchImages({ category, excludeCategory });

  return (
    <div className="w-4/5 mx-auto min-h-screen">
      <GoBack path="/portfolio" />
      <div className="photo-album mt-5 mb-20">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <Gallery
          images={images.map((image) => ({
            ...image,
            customOverlay: (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(256, 256, 256, 0.1)", // Hover effect
                  transition: "opacity 300ms ease-in-out",
                }}
              />
            ),
          }))}
          enableImageSelection={false}
          rowHeight={700}
          margin={2}onClick={(index) => {
            setSelectedImage(images[index]);
            setIsModalOpen(true);
          }}
        />

        <ImageModal
          isOpen={isModalOpen}
          imageSrc={selectedImage?.src || ""}
          altText={selectedImage?.alt || "Image"}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default FetchCategoryImages;
