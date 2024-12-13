"use client";

import Link from "next/link";
import { Parallax } from "react-parallax";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const parallaxContent = (
        <div className="min-h-52 relative">
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="relative flex flex-col md:flex-row gap-16 text-sugar items-center md:mx-20 pt-16">
                        <div className="md:max-w-[300px]">
                            <h3 className="text-5xl mb-2 text-center md:text-left">Mary Mills</h3>
                            <h4 className="text-2xl">Senior, Family, & Wedding Photographer</h4>
                        </div>
                        <div className="justify-center w-[95%] mx-auto md:mx-0 md:w-auto">
                            <p className="text-2xl">
                                Senior, family & wedding photographer based in Utah County but ready for an adventure anywhere!
                            </p>
                        </div>
                    </div>
                    <div className="relative grid grid-cols-2 gap-5 md:gap-16 min-h-52 md:flex mx-[10%] md:mx-0 items-center justify-center text-xl">
                        <Link href="/portfolio" className="hover:bg-opacity-40 hover:bg-black text-sugar  px-2 py-1 rounded-md duration-300">
                            Portfolio &nbsp; &#10095;
                        </Link>
                        <Link href="/about" className="hover:bg-opacity-40 text-sugar hover:bg-black px-2 py-1 rounded-md duration-300">
                            About &nbsp; &#10095;
                        </Link>
                        <Link href="/blog" className="hover:bg-opacity-40 text-sugar hover:bg-black px-2 py-1 rounded-md duration-300">
                            Blog &nbsp; &#10095;
                        </Link>
                        <Link href="/investment" className="hover:bg-opacity-40 text-sugar hover:bg-black px-2 py-1 rounded-md duration-300">
                            Investment &nbsp; &#10095;
                        </Link>
                        <Link href="/contact" className="hover:bg-opacity-40 text-sugar hover:bg-black px-2 py-1 rounded-md duration-300">
                            Contact &nbsp; &#10095;
                        </Link>
                    </div>
                </div>
    );

    return (
      <footer className="">
        <div className="block lg:hidden">
            <Parallax strength={300} bgImage="/mary-footer-2.jpg" bgImageStyle={{objectFit: "cover", height: "150%", width: "auto"}}>
                {parallaxContent}
            </Parallax>
        </div>

        <div className="hidden lg:block">
            <Parallax strength={300} bgImage="/mary-footer-2.jpg">
                {parallaxContent}
            </Parallax>
        </div>

        <div className=" text-center text-sugar bg-oak">
            <div className="flex flex-col gap-5 items-center justify-center p-10 md:p-20 text-3xl md:text-5xl">
                <div className="flex flex-col md:flex-row">
                    <p className="">FOLLOW ME ON</p>
                    <p className="italic">&nbsp;&nbsp;INSTAGRAM</p>
                </div>
                <Link href="https://www.instagram.com/marymillsphotography/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 duration-300">@marymillsphotography</Link>
            </div>
            <p className="py-14 bg-wheat text-black text-lg">© {currentYear} Mary Mills Photography. All rights reserved.</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;