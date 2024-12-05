"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [lastScrollY]);
    return (
        <header className={`fixed top-0 left-0 z-50 w-full bg-sugar flex justify-between items-center py-6 px-4 md:px-16 border-b border-gray-300 transition-transform duration-500 ease-in-out ${
            showHeader ? "translate-y-0" : "-translate-y-full"
          }`}
        >
      
        <nav className="flex space-x-8 text-gray-700 text-xl ml-auto">
          <Link href="/" className="underline-hover hover:text-black">
            Home
          </Link>
          <Link href="/portfolio" className="underline-hover hover:text-black">
            Portfolio
          </Link>
          <Link href="/about" className="underline-hover hover:text-black">
            About
          </Link>
          
        </nav>

        <Link href="/" className="text-center mx-28">
          <h1 className="text-5xl tracking-wider text-gray-600">Mary Mills</h1>
          <p className="text-xl mt-1 tracking-widest text-gray-700">PHOTOGRAPHY</p>
        </Link>

        
        <nav className="flex space-x-8 text-gray-700 text-xl mr-auto">
          <Link href="/blog" className="underline-hover hover:text-black">
            Blog
          </Link>
          <Link href="/investment" className="underline-hover hover:text-black">
            Investment
          </Link>
          <Link href="/contact" className="underline-hover hover:text-black">
            Contact
          </Link>
        </nav>
      </header>
    )
};

export default Header;