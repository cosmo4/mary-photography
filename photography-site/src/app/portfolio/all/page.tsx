"use client";

import React, { useState } from "react";
import GoBack from "@/app/components/shared/GoBack";
import { Gallery } from "react-grid-gallery";
import useFetchPortfolioImages from "@/app/hooks/useFetchPortfolioImages";
import ImageModal from "@/app/components/shared/ImageModal";
import useWindowSize from "@/app/hooks/useWindowSize";

const FetchAllImages: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const { images, loading, error } = useFetchPortfolioImages({ excludeCategory: "Blog"});

  const size = useWindowSize();
  const rowHeight = size.width >= 768 ? 700 : 300;

  return (
    <div className="md:w-4/5 mx-auto min-h-screen">
      <GoBack path="/portfolio" />
      <div className="mt-5 mb-20">
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
          rowHeight={rowHeight}
          margin={2}
          onClick={(index) => {
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


export default FetchAllImages;
