import { useState, useEffect } from "react";
import { collection, query, where, getDocs, orderBy, Timestamp } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

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

const useFetchBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            setError(null);

            try {
                const blogsRef = collection(db, "blog_posts");
                const q = query(
                    blogsRef,
                    where("isPublished", "==", true),
                    orderBy("publishedAt", "desc")
                );

                const querySnapshot = await getDocs(q);
                const blogsData = querySnapshot.docs.map((doc) => {
                    const data = doc.data() as Blog;
                    return {
                      ...data,
                    };
                  });
                  setBlogs(blogsData);
                  // const formattedDate = blog.publishedAt.toDate().toLocaleDateString();
            } catch (error) {
                console.log("Error fetching blogs: ", error)
                setError("Failed to fetch blogs.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return { blogs, loading, error };
};

export default useFetchBlogs;