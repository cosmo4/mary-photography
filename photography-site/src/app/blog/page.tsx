"use client";

import Link from "next/link";
import React from "react";
import useFetchBlogs from "../hooks/useFetchBlogs";
import Image from "next/image";

const BlogPage: React.FC = () => {
  const { blogs, loading, error } = useFetchBlogs();

  return (
    <div className="w-4/5 mx-auto my-10 min-h-screen">
      <h2 className="text-5xl mb-10">Welcome to the Blog</h2>
      {loading && <p>Loading blogs...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:gridcols-3 gap-14">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-cared border-2 border-mocha p-8 rounded-md">
            <Link href={`/blog/${blog.slug}`}>
            {/* Thumbnail */}
            <Image 
              src={blog.imageThumbnail}
              alt={blog.title}
              width={400}
              height={200}
              className="w-full h-40 object-cover mb-4 rounded-md"
            />

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>

            {/* Description */}
            <p className="text-xl mb-4">{blog.content.slice(0, 100)}...</p>

            {/* Link to full blog */}
            <Link href={`/blog/${blog.slug}`} className="text-black text-2xl hover:text-sugar duration-300 hover:scale-110 bg-sage px-3 py-1 hover:bg-mocha rounded-md my-2">Read More</Link>
            </Link>
            
          </div>
        ))}

      </div>
    </div>
  )
}
export default BlogPage;