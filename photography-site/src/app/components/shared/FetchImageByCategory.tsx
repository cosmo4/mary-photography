"use client";

import React from "react";
import GoBack from "@/app/components/shared/GoBack";
import useFetchImages from "@/app/hooks/useFetchPortfolioImages";
import { Gallery } from "react-grid-gallery";

const FetchCategoryImages: React.FC<{ category: string; excludeCategory: string }> = ({ category, excludeCategory }) => {
  const { images, loading, error } = useFetchImages({ category, excludeCategory });

  return (
    <div className="w-4/5 mx-auto min-h-screen">
      <GoBack path="/portfolio" />
      <div className="photo-album mt-5 mb-20">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <Gallery
          images={images.map((image, i) => ({
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
          margin={2}
        />
      </div>
    </div>
  );
};

export default FetchCategoryImages;
