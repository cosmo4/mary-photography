"use client";

import Link from "next/link";
import { Parallax } from "react-parallax";

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
      <footer className="">
        <Parallax strength={300} bgImage="/leah-senior-pic.webp">
            <div className="min-h-52 flex items-center justify-center">
                <div className="space-x-8">
                    <Link href="/portfolio" className="hover:bg-opacity-80 text-sugar bg-black px-2 py-1 bg-opacity-50 rounded-md">
                        Portfolio
                    </Link>
                    <Link href="/about" className="hover:bg-opacity-80 text-sugar bg-black px-2 py-1 bg-opacity-50 rounded-md">
                        About
                    </Link>
                    <Link href="/blog" className="hover:bg-opacity-80 text-sugar bg-black px-2 py-1 bg-opacity-50 rounded-md">
                        Blog
                    </Link>
                    <Link href="/investment" className="hover:bg-opacity-80 text-sugar bg-black px-2 py-1 bg-opacity-50 rounded-md">
                        Investment
                    </Link>
                    <Link href="/contact" className="hover:bg-opacity-80 text-sugar bg-black px-2 py-1 bg-opacity-50 rounded-md">
                        Contact
                    </Link>
                </div>
            </div>
        </Parallax>
        <div className="py-10 text-center border-t border-gray-300 bg-wheat">
            <p className="text-black">© {currentYear} Mary Mills Photography. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;