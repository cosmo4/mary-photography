"use client";

import React from "react";
import ReturnToPortfolio from "@/app/components/shared/ReturnToPortfolio";
import useFetchImages from "@/app/hooks/useFetchImages";
import { Gallery } from "react-grid-gallery";

const FetchAllImages: React.FC = () => {
  const { images, loading, error } = useFetchImages();
  console.log("fetchallimages: ", images);

  return (
    <div className="w-4/5 mx-auto min-h-screen">
      <ReturnToPortfolio />
      <div className="mt-5 mb-20">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <Gallery
          images={images}
          enableImageSelection={false}
          rowHeight={700}
          margin={2}
        />
      </div>
    </div>
  );
};


export default FetchAllImages;
