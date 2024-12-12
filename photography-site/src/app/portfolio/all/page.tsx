"use client";

import React from "react";
import GoBack from "@/app/components/shared/GoBack";
import { Gallery } from "react-grid-gallery";
import useFetchPortfolioImages from "@/app/hooks/useFetchPortfolioImages";

const FetchAllImages: React.FC = () => {
  const { images, loading, error } = useFetchPortfolioImages({ excludeCategory: "Blog"});

  return (
    <div className="w-4/5 mx-auto min-h-screen">
      <GoBack path="/portfolio" />
      <div className="mt-5 mb-20">
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


export default FetchAllImages;
