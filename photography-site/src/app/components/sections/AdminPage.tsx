"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { logout } from "../../lib/auth";
import { auth } from "../../lib/firebase"
import { useRouter } from "next/navigation";

const adminEmails = ["warner.luke0102@gmail.com", "marymillsphotography@gmail.com"];

const AdminPage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser && adminEmails.includes(currentUser.email || "")) {
                setUser(currentUser);
            } else {
                setUser(null);

                router.push("/login");
                
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        await logout();

        router.push("/login");
        
    };

    if (loading) return <p>Loading...</p>;

    if (!user) return null;


    return(
        <div className="w-5/6 md:w-2/3 mx-auto my-24 min-h-screen">
            <div className="flex md:gap-28 items-center mb-24">
                <p className="text-4xl">Hello Mary!</p>
                <button onClick={handleLogout} className="border border-mocha px-4 py-2 text-2xl rounded-md ml-auto hover:bg-black hover:text-sugar duration-300">Logout</button>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-14 text-3xl text-black text-center md:w-2/3 mx-auto">
                <Link href="/admin/add-to-portfolio" className="bg-bone py-10 rounded-md hover:bg-wheat duration-300">Add to Portfolio</Link>
                <Link href="/admin/update-portfolio" className="bg-bone py-10 rounded-md hover:bg-wheat duration-300">Update Portfolio</Link>
                <Link href="/admin/create-blog" className="bg-sage py-10 rounded-md hover:bg-oak hover:text-sugar duration-300">Create Blog</Link>
                <Link href="/admin/update-blog" className="bg-sage py-10 rounded-md hover:bg-oak hover:text-sugar duration-300">Update / Delete Blog</Link>
                <Link href="/admin/manage-investment" className="bg-wheat py-10 rounded-md hover:bg-mocha hover:text-sugar duration-300 md:translate-x-[60%]">Manage Prices</Link>

            </div>
            
        </div>
        
    )
}

export default AdminPage;