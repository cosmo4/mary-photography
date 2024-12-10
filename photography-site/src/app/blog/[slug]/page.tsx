"use client"

import React, { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { fetchBlogBySlug } from "@/app/lib/firestore";
import { Gallery } from "react-grid-gallery";
import GoBack from "@/app/components/shared/GoBack";

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
        <div className="w-1/2 mx-auto my-10 min-h-screen">
            <GoBack path="/blog" />
            <h2 className="text-5xl font-bold text-gray-600">{blog.title}</h2>
            <p className="text-lg my-5">{blog.content}</p>

            <Gallery images={galleryImages} enableImageSelection={false} rowHeight={500}/>

        </div>
    )
};

export default BlogPostPage;