"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { logout } from "../../lib/auth";
import { auth } from "../../lib/firebase"
import { useRouter } from "next/navigation";

const adminEmails = ["warner.luke0102@gmail.com"];

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
        <div className="w-4/5 mx-auto my-24 min-h-lvh">
            <div className="flex gap-28 items-center mb-24">
                <p className="text-4xl">Hello Mary!</p>
                <button onClick={handleLogout} className="border border-mocha px-4 py-2 text-2xl rounded-md ml-auto hover:bg-bone">Logout</button>
            </div>
            <div className="flex gap-24 justify-center text-2xl text-sugar">
                <Link href="/admin/manage-blog" className="bg-oak px-10 py-5 rounded-md hover:bg-mocha">Manage Blog</Link>
                <Link href="/admin/manage-portfolio" className="bg-oak px-10 py-5 rounded-md hover:bg-mocha">Manage Portfolio</Link>
                <Link href="/admin/manage-prices" className="bg-oak px-10 py-5 rounded-md hover:bg-mocha">Manage Prices</Link>

            </div>
            
        </div>
        
    )
}

export default AdminPage;