// The landing page will have the gallery separated into 5 categories which the user can select
// One of the options will be to view the entire gallery. This will lead to the query of 
// the most recent photos uploaded by Mary.
"use client";

import Link from "next/link";
import Image from "next/image";
import { Parallax } from "react-parallax";

const Portfolio = () => {
    return (
      <div className="min-h-screen w-full">
        <div className="text-3xl text-center md:text-left md:text-5xl flex bg-sage md:w-5/12 justify-center py-16 md:py-24">
          <div>
            <h2 className="">RECENT</h2>
            <h2 className="italic">ADVENTURES</h2>
          </div>
        </div>
        {/* Senior Album */}
        <div className="flex flex-col-reverse md:flex-row md:gap-36 items-center justify-center mt-[50px]">
          <div className="flex flex-col justify-center items-center gap-6 md:w-1/5 mt-5 md:mt-0">
            <p className="text-5xl">Seniors</p>
            <Link href="/portfolio/senior" className="text-2xl border border-black rounded-md px-4 py-1 hover:bg-oak hover:text-sugar duration-300">See Album</Link>
          </div>
          <div className="relative md:mt-[-50px]">
            <Link href="/portfolio/senior" className="hover:opacity-80 duration-300 ">
              <Image src="/kellsiesenior24-103.jpg" alt="Senior" width={1000} height={500} className="object-cover"/>
            </Link>
          </div>
        </div>
        {/* Family Album */}
        <div className="flex flex-col md:flex-row md:gap-36 items-center justify-center my-32">
          <div className="relative">
            <Link href="/portfolio/family" className="hover:opacity-80 duration-300 ">
              <Image src="/adamsfam24-46_websize.jpg" alt="Senior" width={1000} height={500} className="object-cover"/>
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center gap-6 md:w-1/5 mt-5 md:mt-0">
            <p className="text-5xl">Families</p>
            <Link href="/portfolio/family" className="text-2xl border border-black rounded-md px-4 py-1 hover:bg-oak hover:text-sugar duration-300">See Album</Link>
          </div>
        </div>
        
        {/* Couples Album */}
        <div className="flex flex-col-reverse md:flex-row md:gap-36 items-center justify-center">
          <div className="flex flex-col justify-center items-center gap-6 md:w-1/5 mt-5 md:mt-0">
            <p className="text-5xl">Couples</p>
            <Link href="/portfolio/couple" className="text-2xl border border-black rounded-md px-4 py-1 hover:bg-oak hover:text-sugar duration-300">See Album</Link>
          </div>
          <div className="relative">
            <Link href="/portfolio/couple" className="hover:opacity-80 duration-300 ">
              <Image src="/braybraxengage-38.jpg" alt="Senior" width={1000} height={500} className="object-cover"/>
            </Link>
          </div>
        </div>
        {/* Weddings Album */}
        <div className="flex flex-col md:flex-row md:gap-36 items-center justify-center my-32">
          <div className="relative">
            <Link href="/portfolio/wedding" className="hover:opacity-80 duration-300 ">
              <Image src="/larandjordorem-65_websize.jpg" alt="Senior" width={1000} height={500} className="object-cover"/>
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center gap-6 md:w-1/5 mt-5 md:mt-0">
            <p className="text-5xl">Weddings</p>
            <Link href="/portfolio/wedding" className="text-2xl border border-black rounded-md px-4 py-1 hover:bg-oak hover:text-sugar duration-300">See Album</Link>
          </div>
        </div>
        {/* Full Gallery*/}
        <div>
          <Parallax strength={70} bgImage="/full-width-img.webp" bgImageStyle={{objectFit: "cover", height: "175%", width: "auto"}} className="mb-24 hover:opacity-85 duration-300">
            <div className="min-h-32 flex justify-center items-center">
              <Link href="portfolio/all" className="text-2xl text-black bg-sage hover:text-sugar hover:bg-mocha hover:opacity-100 px-8 py-4 rounded-md duration-300">See Full Gallery</Link>
            </div>
          </Parallax>
        </div>
      </div>
    );
  }

export default Portfolio;