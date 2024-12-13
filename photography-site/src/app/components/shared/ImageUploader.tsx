import React, { useState, ChangeEvent, DragEvent } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  onUpload: (files: {file: File; alt: string; categories: string[] } []) => void; // Function to handle upload
  maxFiles?: number; // Limit the number of files
  actionText?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload, maxFiles = 30, actionText = "Upload Images" }) => {
  const [previews, setPreviews] = useState<string[]>([]); // Thumbnail previews
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [altText, setAltText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categoriesList = ["Senior", "Family", "Wedding", "Maternity", "Couple", "Blog"]

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files); // Convert FileList to an array

      // Enforce maxFiles limit
      if (files.length > maxFiles) {
        alert(`You can upload a maximum of ${maxFiles} files.`);
        return;
      }

      // Generate preview URLs
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews([...previews, ...newPreviews]);
      setSelectedFiles([...selectedFiles, ...files]);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length > maxFiles) {
        alert(`You can upload a maximum of ${maxFiles} files.`);
        return;
    }

    const newPreviews = imageFiles.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
    setSelectedFiles([...selectedFiles, ...files]); 
    
    if (imageFiles.length < files.length) {
        alert("Some files were not images and were ignored.")
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }

  const handleRemove = (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);

    setPreviews(newPreviews);
    setSelectedFiles(newSelectedFiles);
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
    prev.includes(category) ? prev.filter((cat) => cat !== category) : [...prev, category])
  }

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      alert("No files selected!");
      return;
    }

    if (!altText) {
      alert("Please provide a description for this upload batch.");
      return;
    }

    if (selectedCategories.length === 0) {
      alert("Please select at least one category.");
      return;
    }

    const filesWithMetadata = selectedFiles.map((file) => ({
      file,
      alt: altText,
      categories: selectedCategories,
    }));
    
    // Pass selected files to parent for upload
    onUpload(filesWithMetadata); 
  };

  return (
    <div className="image-uploader">
        {/* Drag-and-Drop Area */}
        <div
            className="drag-drop-area border-2 border-dashed border-sage p-6 mb-4 rounded-md flex flex-col items-center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            >
            <p className="text-2xl">Drag and drop your files here, or click to select</p>
            <Image src="/placeholder-icon.jpg" alt="Image placeholder" width={200} height={100} className="m-24" />

            {/* Thumbnails */}
            <div className="thumbnails grid grid-cols-4 gap-4">
                {previews.map((src, index) => (
                    <div
                    key={index}
                    className="relative group w-32 h-32 border border-gray-300 overflow-hidden rounded-md"
                    >
                        {/* Image */}
                        <Image
                            src={src}
                            alt={`Preview ${index + 1}`}
                            width={32}
                            height={32}
                            className="object-cover w-full h-full cursor-pointer group-hover:opacity-75"
                            onClick={() => handleRemove(index)}
                        />

                        {/* Hover Text */}
                        <p className="absolute inset-0 flex items-center justify-center text-white text-sm bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => handleRemove(index)}>
                            Click to remove
                        </p>
                    </div>
                ))}
            </div>
        </div>

        <div className="">
            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="mb-4 w-full text-xl"
            />

            {/* Alt Text Input */}
            <div className="my-4">
              <label htmlFor="altText" className="block text-2xl mb-2">
                Image Description (applies to all images):
              </label>
              <input
                id="altText"
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Enter brief description for all images"
                className="w-full md:w-1/2 p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Categories Checkboxes */}
            <div className="my-4">
              <p className="text-2xl mb-2">Categories (applies to all images):</p>
              <div className="flex flex-wrap gap-4">
                {categoriesList.map((category) => (
                  <label key={category} className="flex items-center text-xl">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="mr-2"
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>

            {/* Upload Button */}
            <button
                onClick={handleUpload}
                className="mt-4 hover:bg-mocha hover:text-sugar duration-300 px-8 py-4 rounded bg-sage text-black text-2xl"
            >
                {actionText}
            </button>
        </div>
        {/* File Input */}
        
    </div>
  );
};

export default ImageUploader;
