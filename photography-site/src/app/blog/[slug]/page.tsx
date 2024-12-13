"use client"

import React, { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { fetchBlogBySlug } from "@/app/lib/firestore";
import { Gallery } from "react-grid-gallery";
import GoBack from "@/app/components/shared/GoBack";
import ImageModal from "@/app/components/shared/ImageModal";
import useWindowSize from "@/app/hooks/useWindowSize";

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
  }
  

const BlogPostPage = ({ params }: { params: { slug: string } }) => {
    const { slug } = params;
    const [blog, setBlog] = useState<Blog | null>(null);
    const [galleryImages, setGalleryImages] = useState<BlogImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

    const size = useWindowSize();
    const rowHeight = size.width >= 768 ? 500 : 200;

    useEffect(() => {
        
        const fetchBlog = async () => {
            const result = await fetchBlogBySlug(slug);
            if (result) {
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
                        };
                    })
                );
                setGalleryImages(imagesForGallery);
                setBlog(result as Blog);
            }
            setLoading(false);
        }

        fetchBlog();
    }, [slug]);

    if (loading) return <p className="w-1/2 mx-auto my-10 min-h-screen">Loading blog...</p>;

    if (!blog) return <p className="w-1/2 mx-auto my-10 min-h-screen">Blog not found</p>;



    return (
        <div className="w-5/6 md:w-1/2 mx-auto mt-10 mb-32 min-h-screen">
            <GoBack path="/blog" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-600 text-center">{blog.title}</h2>
            <pre className="text-xl my-5 whitespace-pre-wrap">{blog.content}</pre>

            <Gallery 
                images={galleryImages.map((image) => ({
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
                          transition: "opacity 300ms ease-in-out",
                        }}
                      />
                    ),
                  }))} 
                enableImageSelection={false} 
                rowHeight={rowHeight}
                onClick={(index) => {
                setSelectedImage(galleryImages[index]);
                setIsModalOpen(true);
                }}
            />

            <ImageModal
            isOpen={isModalOpen}
            imageSrc={selectedImage?.src || ""}
            altText={selectedImage?.alt || "Image"}
            onClose={() => setIsModalOpen(false)}
            />

        </div>
    )
};

export default BlogPostPage;