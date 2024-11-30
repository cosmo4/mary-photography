"use client";

import React from "react";
import { uploadFile } from "../../lib/firebase";
import { saveToFirestore } from "@/app/lib/firestore";
import ImageUploader from "../shared/ImageUploader";

const UploadPortfolio: React.FC = () => {

    const handleUpload = async (files: File[]) => {
        const altText = "Example alt";
        const categories = ["test-category"];

        try {
            await Promise.all(
                files.map(async (file) => {
                    const downloadUrl = await uploadFile(file, "images");

                    await saveToFirestore(downloadUrl, altText, categories);
                })
            );

            alert("Upload completed!")

        } catch (error) {
            console.error("Error uploading files: ", error);
        }
        
    };

    return (
        <div>
            <ImageUploader onUpload={handleUpload} maxFiles={15}/>
        </div>
    )

}

export default UploadPortfolio;