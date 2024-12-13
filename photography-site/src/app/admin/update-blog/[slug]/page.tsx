"use client"

import React, { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { deleteBlogPost, deleteImageFromBlog, deleteImageFromCloud, fetchBlogBySlug, saveToFirestore, updateBlogImages, updateBlogText } from "@/app/lib/firestore";
import { Gallery } from "react-grid-gallery";
import GoBack from "@/app/components/shared/GoBack";
import ImageUploader from "@/app/components/shared/ImageUploader";
import { uploadFile } from "@/app/lib/firebase";

interface Blog {
    id: string;
    title: string;
    imageThumbnail: string;
    content: string;
    categories: string[];
    images: string[];
    isPublished: boolean;
    slug: string;
    publishedAt: Timestamp;
  }

  interface BlogImage {
    src: string;
    alt: string;
    width: number;
    height: number;
    isSelected: boolean;
  }
  

const UpdateBlogPostPage = ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const [blog, setBlog] = useState<Blog | null>(null);
    const [content, setContent] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [galleryImages, setGalleryImages] = useState<BlogImage[]>([]);
    const [selectedImages, setSelectedImages] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true)
            const result = await fetchBlogBySlug(slug);
            if (result) {
                setBlog(result as Blog);
                setTitle(result.title || "");
                setContent(result.content || "");

                const imagesForGallery = await Promise.all(
                    result.images.map(async (src: string) => {
                        const img = new Image();
                        img.src = src;

                        await new Promise((resolve) => (img.onload = resolve));

                        return {
                            src,
                            alt: result.title || "image from blog",
                            width: img.width,
                            height: img.height,
                            isSelected: false,
                        };
                    })
                );
                setGalleryImages(imagesForGallery);
            }
            setLoading(false);
        }

        fetchBlog();
    }, [slug]);

    const handleSaveTextChanges = async () => {
        try {
            setLoading(true);
            if (blog) {
                await updateBlogText(blog.id, title, content);
            } else {
                throw new Error("Blog not initialized.");
            }

            alert("Blog text updated successfully!");
        } catch (error) {
            console.error("Error saving text changes: ", error);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteSelected = async () => {
        const confirmed = window.confirm("Are you sure you want to delete the selected images?");
        if (!confirmed) return;

        try {
            setLoading(true);
            const deletedImageSrcs = selectedImages.map((index) => galleryImages[index].src);

            if (blog) {
                // Remove image src from image array field in blog document
                await deleteImageFromBlog(blog.id, blog.imageThumbnail, deletedImageSrcs);
            } else {
                throw new Error("Error deleting images from blog")
            }

            await Promise.all(
                // Delete image from firestore and firebase storage
                deletedImageSrcs.map(async (src) => {
                    await deleteImageFromCloud(src);
                })
            );
            
        alert("Images deleted successfully.");
        window.location.reload();
        } catch (error) {
            console.error("Error deleting images: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadImages = async (files: {file: File; alt: string; categories: string[] } []) => {
        try {
            setLoading(true);
            const newImages: string[] = [];
            await Promise.all(
                files.map(async ({ file, alt, categories}) => {
                    const downloadUrl = await uploadFile(file, "images");
                    newImages.push(downloadUrl);
                    await saveToFirestore(downloadUrl, alt, categories);
                })
            );

            if (blog) {
                await updateBlogImages(blog.id, newImages);
            } else {
                throw new Error("Blog not initialized");
            }

            alert("Image Uploads Completed!");
            window.location.reload();
        } catch (error) {
            console.log("Error uploading images: ", error);
        } finally {
            setLoading(false);
        }
    }

    const deletePost = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this post?\n(This cannot be undone)");

        if (!confirmed) return;

        try {
            setLoading(true);
            await Promise.all(
                galleryImages.map(async ({ src }) => {
                    await deleteImageFromCloud(src);
                })
            );
            if (blog) {
                await deleteBlogPost(blog.id);
            } else {
                throw new Error("Deleting blog post failed");
            }
            alert("Blog post deleted successfully!");

            window.location.href = "/admin/update-blog";
        } catch (error) {
            console.log("Error deleting post", error);
        } finally {
            setLoading(false);
        }
    }

    if (!blog) return <p className="w-1/2 mx-auto my-10 min-h-screen">Blog not found</p>;

    return (
        <div className="w-[90%] md:w-1/2 mx-auto my-10 min-h-screen">
            <GoBack path="/admin/update-blog" />
            <h2 className="text-4xl text-center md:text-5xl md:text-left my-8 text-gray-600">Update Blog</h2>
            <div className="text-2xl flex flex-col justify-center mb-14">
                <label htmlFor="title" className="mb-2">Blog Title:</label>
                <input 
                    type="text" 
                    id="title" 
                    className="text-xl border border-gray-400 p-2 rounded-md md:w-1/3 mb-10" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <label htmlFor="blog-content" className="mb-2">Blog Content:</label>
                <textarea 
                    className="text-lg border border-gray-400 p-4 rounded-md" 
                    rows={25}
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                />
                <div>
                    <button
                        onClick={handleSaveTextChanges}
                        className="bg-wheat px-6 py-3 rounded-md mt-5 hover:bg-mocha hover:text-sugar duration-300"
                    >Save Text Changes</button>
                </div>
            </div>            

            <div className="bg-wheat h-px w-full my-32"></div>

            <div className="my-16">
                <p className="text-3xl mb-4">Select Images to Be Deleted:</p>
                <Gallery 
                    images={galleryImages.map((img) => ({ ...img,
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
                    rowHeight={200}
                    margin={2}
                    onSelect={(index) => {
                        setGalleryImages((prev) =>
                        prev.map((image, i) =>
                            i === index ? { ...image, isSelected: !image.isSelected } : image
                        )
                        );
            
                        setSelectedImages((prev) =>
                        galleryImages[index].isSelected
                            ? prev.filter((i) => i !== index) // Remove if deselected
                            : [...prev, index] // Add if selected
                        );
                    }}
                />
                
                {selectedImages.length > 0 && (
                    <button
                        onClick={handleDeleteSelected}
                        className="text-xl text-sugar bg-red-500 hover:bg-red-700 px-6 py-3 rounded-md mt-4"
                    >
                        Delete Selected Images
                    </button>
                )}

            </div>
            
            <div className="bg-wheat h-px w-full my-32"></div>

            <div>
                <h2 className="text-3xl text-center my-10">Upload Additional Images</h2>
                <ImageUploader onUpload={handleUploadImages} actionText="Add Images to Post"/>
                <p className="text-lg">* BLOG MUST BE SELECTED AS ONE OF THE CATEGORIES *</p>
                <p className="text-lg">* Blog Thumbnail image will be first image selected for upload</p>

            </div>

            <div className="bg-wheat h-px w-full my-32"></div>

            <div className="mb-32 text-center">
                <button
                    onClick={deletePost}
                    className="bg-red-500 text-sugar hover:bg-red-700 duration-300 rounded-md px-10 py-5 text-4xl tracking-wider"
                >DELETE&nbsp; POST</button>
            </div>
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
};

export default UpdateBlogPostPage;