"use client";

import React from "react";
import Image from "next/image";
import ReturnToPortfolio from "@/app/components/shared/ReturnToPortfolio";
import useFetchImages from "@/app/hooks/useFetchImages";
import Masonry from "react-masonry-css";

const FetchCategoryImages: React.FC<{ category: string }> = ({ category }) => {
  const { imageUrls, imageAlts, loading, error } = useFetchImages(category);

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="w-4/5 mx-auto min-h-screen">
      <ReturnToPortfolio />
      <div className="fetch-images min-h-screen mt-5 mb-14">
        {loading && <p>Loading images...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <Masonry 
            breakpointCols={breakpointColumnsObj}
            className="flex gap-2 mt-5 mb-20"
            columnClassName="masonry-grid_column"
        >
            {imageUrls.map((url, index) => (
                <div key={index} className="relative mb-2">
                <Image
                    src={url}
                    alt={imageAlts[index]}
                    width={700}
                    height={500}
                    className="object-cover hover:opacity-90 duration-300"
                />
                </div>
                ))}
        </Masonry>
      </div>
    </div>
  );
};

export default FetchCategoryImages;
