"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
  
      if (currentScrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
  
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [lastScrollY]);
    return (
        <header className={`fixed top-0 left-0 z-50 w-full bg-sugar  border-b border-gray-300 transition-transform duration-500 ease-in-out ${
            showHeader ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          {/* Hamburger Menu for Small Screens */}
          <button
            className="block md:hidden text-gray-700 fixed top-11 left-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-8 w-8 transition-transform duration-300 ${
                isMenuOpen ? "rotate-180" : "rotate-0"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
      
          <div className={`${
              isMenuOpen ? "grid-rows-2" : "grid-rows-1"
            } grid grid-cols-5 text-center md:flex md:justify-between justify-center md:items-center py-6 md:px-16`}>
            <nav className={`${
              isMenuOpen ? "flex" : "hidden"
            } flex flex-col row-start-2 col-start-2 gap-5 md:flex md:mt-0 md:flex-row md:space-x-8 text-gray-700 text-xl md:ml-auto`}>
              <Link href="/" className="underline-hover hover:text-black" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/portfolio" className="underline-hover hover:text-black" onClick={() => setIsMenuOpen(false)}>
                Portfolio
              </Link>
              <Link href="/about" className="underline-hover hover:text-black" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              
            </nav>

            <Link href="/" onClick={() => setIsMenuOpen(false)} className={`${
              isMenuOpen ? "" : ""
            } col-start-2 col-span-3 text-center md:mx-28`}>
              <h1 className="text-4xl md:text-5xl tracking-wider text-gray-600">Mary Mills</h1>
              <p className="text-lg md:text-xl mt-1 tracking-widest text-gray-700">PHOTOGRAPHY</p>
            </Link>

            
            <nav className={`${
              isMenuOpen ? "block" : "hidden"
            } flex flex-col row-start-2 col-start-4 gap-5 md:flex md:mt-0 md:flex-row md:space-x-8 text-gray-700 text-xl md:mr-auto`}>
              <Link href="/blog" className="underline-hover hover:text-black" onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
              <Link href="/investment" className="underline-hover hover:text-black" onClick={() => setIsMenuOpen(false)}>
                Investment
              </Link>
              <Link href="/contact" className="underline-hover hover:text-black" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </nav>

          </div>
        </header>
    )
};

export default Header;