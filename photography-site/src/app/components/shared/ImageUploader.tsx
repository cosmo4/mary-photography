import React, { useState, ChangeEvent, DragEvent } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  onUpload: (files: File[]) => void; // Function to handle upload
  maxFiles?: number; // Limit the number of files
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload, maxFiles = 30 }) => {
  const [previews, setPreviews] = useState<string[]>([]); // Thumbnail previews
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      alert("No files selected!");
      return;
    }
    // Pass selected files to parent for upload
    onUpload(selectedFiles); 
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

            {/* Upload Button */}
            <button
                onClick={handleUpload}
                className="mt-4 hover:bg-mocha hover:text-sugar px-8 py-4 rounded bg-sage text-black text-2xl"
            >
                Upload Images
            </button>
        </div>
        {/* File Input */}
        
    </div>
  );
};

export default ImageUploader;
