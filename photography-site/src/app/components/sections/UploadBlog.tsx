// Set actionText to "Upload Blog"
"use client";

import React, { useState } from "react";
import { uploadFile } from "../../lib/firebase";
import { saveBlogToFirestore, saveToFirestore } from "@/app/lib/firestore";
import ImageUploader from "../shared/ImageUploader";
import GoBack from "../shared/GoBack";

const UploadBlog: React.FC = () => {
    // const [selectedCategories, setSelectedCategories] = useState<string[]>([]); use if decided to have blog categories
    // const [isPublished, setIsPublished] = useState(true);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const handleUpload = async (files: {file: File; alt: string; categories: string[] } []) => {
        try {
            setLoading(true);
            const images: string[] = [];
            await Promise.all(
                files.map(async ({ file, alt, categories }) => {
                    const downloadUrl = await uploadFile(file, "images");
                    images.push(downloadUrl);
                    await saveToFirestore(downloadUrl, alt, categories);
                })
            );

            await saveBlogToFirestore(title, content, images);

            alert("Upload completed!")

            window.location.reload();
        } catch (error) {
            console.error("Error uploading blog: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <GoBack path="/admin"/>
            <h2 className="md:w-4/5 md:mx-auto text-4xl text-center md:text-left md:text-5xl text-gray-600 my-10">Create Blog Post</h2>
            <div className="md:w-4/5 mx-auto mb-24">
                <div className="flex flex-col md:w-4/5">
                    <label htmlFor="title" className="block text-2xl mb-2">
                        Title:
                    </label>
                    <input 
                        type="text" 
                        id="title" 
                        placeholder="Enter Title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-xl border border-gray-400 p-2 rounded-md mb-6 w-full md:w-1/3"
                        required
                    />

                    <label htmlFor="content" className="text-2xl mb-2">Content:</label>
                    <textarea 
                        id="content" 
                        rows={15}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="p-2 border border-gray-400 rounded-md mb-14 text-lg"
                        placeholder="Tell us about your shoot"
                        required
                    ></textarea>

                </div>

                <ImageUploader onUpload={handleUpload} actionText="Upload Blog Post"/>
                <p className="text-lg">* BLOG MUST BE SELECTED AS ONE OF THE CATEGORIES *</p>
                <p className="text-lg">* Blog Thumbnail image will be last image selected for upload</p>

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
        </div>
    )
}

export default UploadBlog;