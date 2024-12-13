"use client";

import GoBack from "@/app/components/shared/GoBack";
import useFetchPortfolioImages from "@/app/hooks/useFetchPortfolioImages";
import { deleteImageFromCloud } from "@/app/lib/firestore";
import { useEffect, useState } from "react";
import { Gallery } from "react-grid-gallery";

const UpdatePortfolioPage: React.FC = () => {
  const { images, loading, error } = useFetchPortfolioImages({ excludeCategory: "Blog" });
  const [imagesPortfolio, setImagesPortfolio] = useState<
    { src: string; alt: string; width: number; height: number; isSelected?: boolean }[]
  >([]);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  useEffect(() => {
    if (!loading && !error && images.length > 0) {
        const initializedImages = images.map((image) => ({
            ...image,
            isSelected: false, // Initialize the isSelected property
          }));
          setImagesPortfolio(initializedImages);
    }
  }, [images, loading, error]);

  const handleDeleteSelected = async () => {
    const confirmed = window.confirm("Are you sure you want to delete the selected images?");
    if (!confirmed) return;

    try {
      await Promise.all(
        selectedImages.map(async (index) => {
          const image = imagesPortfolio[index];
          // delete function in the database
          await deleteImageFromCloud(image.src);
        })
      );
      alert("Images deleted successfully.");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting images: ", error);
    }
  };

  return (
    <div className="w-4/5 mx-auto min-h-screen">
      <GoBack path="/admin" />
      <div className="mt-5 mb-20">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {imagesPortfolio.length > 0 && (
          <Gallery
          images={imagesPortfolio.map((image) => ({
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
                  pointerEvents: "none", // Ensure no interference with selection
                  transition: "opacity 300ms ease-in-out",
                }}
              />
            ),
          }))}
            enableImageSelection={true}
            rowHeight={300}
            margin={2}
            onSelect={(index) => {
                setImagesPortfolio((prev) =>
                  prev.map((image, i) =>
                    i === index ? { ...image, isSelected: !image.isSelected } : image
                  )
                );
            
                setSelectedImages((prev) =>
                  imagesPortfolio[index].isSelected
                    ? prev.filter((i) => i !== index) // Remove if deselected
                    : [...prev, index] // Add if selected
                );
              }}
          />
        )}
        {selectedImages.length > 0 && (
          <button
            onClick={handleDeleteSelected}
            className="fixed top-36 left-5 text-xl bg-red-500 text-sugar px-4 py-2 rounded-md hover:bg-red-700 duration-300"
          >
            Delete Selected
          </button>
        )}
      </div>
    </div>
  );
};

export default UpdatePortfolioPage;
