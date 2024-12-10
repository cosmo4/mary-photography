"use client";

import React from "react";
import GoBack from "@/app/components/shared/GoBack";
import useFetchImages from "@/app/hooks/useFetchPortfolioImages";
import { Gallery } from "react-grid-gallery";

const FetchCategoryImages: React.FC<{ category: string }> = ({ category }) => {
  const { images, loading, error } = useFetchImages(category);

  return (
    <div className="w-4/5 mx-auto min-h-screen">
      <GoBack path="/portfolio" />
      <div className="photo-album mt-5 mb-20">
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

export default FetchCategoryImages;
