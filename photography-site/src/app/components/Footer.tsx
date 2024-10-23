"use client";

import Link from "next/link";
import { Parallax } from "react-parallax";

const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
      <footer className="">
        <Parallax strength={600} bgImage="/leah-senior-pic.webp">
            <div className="min-h-52 flex items-center justify-center">
                <div className="space-x-8">
                    <Link href="/portfolio" className="underline-hover text-sugar bg-black px-2 py-1 bg-opacity-50">
                        Portfolio
                    </Link>
                    <Link href="/about" className="underline-hover ">
                        About
                    </Link>
                    <Link href="/blog" className="underline-hover ">
                        Blog
                    </Link>
                    <Link href="/investment" className="underline-hover ">
                        Investment
                    </Link>
                    <Link href="/contact" className="underline-hover ">
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