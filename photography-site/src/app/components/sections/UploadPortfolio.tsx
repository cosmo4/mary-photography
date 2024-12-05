"use client";

import React, { useState } from "react";
import { uploadFile } from "../../lib/firebase";
import { saveToFirestore } from "@/app/lib/firestore";
import ImageUploader from "../shared/ImageUploader";

const UploadPortfolio: React.FC = () => {
    const [loading, setLoading] = useState(false);
    
    const handleUpload = async (files: {file: File; alt: string; categories: string[] } []) => {
        try {
            setLoading(true);
            await Promise.all(
                files.map(async ({ file, alt, categories }) => {
                    const downloadUrl = await uploadFile(file, "images");

                    await saveToFirestore(downloadUrl, alt, categories);
                })
            );

            alert("Upload completed!")

            window.location.reload();

        } catch (error) {
            console.error("Error uploading files: ", error);
        } finally {
            setLoading(false);
        }
        
    };

    return (
        <div>
            <ImageUploader onUpload={handleUpload} maxFiles={15}/>
            {/* Loading Indicator */}
            {loading && (
                <div className="fixed inset-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                <svg
                    className="animate-spin h-12 w-12 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    ></circle>
                    <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                    ></path>
                </svg>
                </div>
            )}
        </div>
    )

}

export default UploadPortfolio;