// The landing page will have the gallery separated into 5 categories which the user can select
// One of the options will be to view the entire gallery. This will lead to the query of 
// the most recent photos uploaded by Mary.
"use client";

import Link from "next/link";
import Image from "next/image";
import { Parallax } from "react-parallax";

const Portfolio = () => {
    return (
      <div className="min-h-screen">
        <div className="text-5xl flex bg-sage w-5/12 justify-center py-24">
          <div>
            <h2 className="">RECENT</h2>
            <h2 className="italic">ADVENTURES</h2>
          </div>
        </div>
        {/* Senior Album */}
        <div className="flex gap-36 items-center justify-center">
          <div className="flex flex-col justify-center items-center gap-6 w-1/5">
            <p className="text-5xl">Seniors</p>
            <Link href="/portfolio/senior" className="text-2xl border border-black rounded-md px-4 py-1 hover:bg-oak hover:text-sugar duration-300">See Album</Link>
          </div>
          <div className="relative mt-[-50px]">
            <Link href="/portfolio/senior" className="hover:opacity-80 duration-300 ">
              <Image src="/kellsiesenior24-103.jpg" alt="Senior" width={1000} height={500} className="object-cover"/>
            </Link>
          </div>
        </div>
        {/* Family Album */}
        <div className="flex gap-36 items-center justify-center my-32">
          <div className="relative">
            <Link href="/portfolio/family" className="hover:opacity-80 duration-300 ">
              <Image src="/abby24-20.jpg" alt="Senior" width={1000} height={500} className="object-cover"/>
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center gap-6 w-1/5">
            <p className="text-5xl">Families</p>
            <Link href="/portfolio/family" className="text-2xl border border-black rounded-md px-4 py-1 hover:bg-oak hover:text-sugar duration-300">See Album</Link>
          </div>
        </div>
        <Link href="/portfolio/all">
          <Parallax strength={70} bgImage="/full-width-img.webp" className="mb-24 hover:opacity-85 duration-300">
            <div className="min-h-32 flex justify-center items-center">
              <Link href="portfolio/all" className="text-2xl text-black bg-sage hover:text-sugar hover:bg-mocha hover:opacity-100 px-8 py-4 rounded-md duration-300">See Full Gallery</Link>
            </div>
          </Parallax>
        </Link>
        {/* Couples Album */}
        <div className="flex gap-36 items-center justify-center">
          <div className="flex flex-col justify-center items-center gap-6 w-1/5">
            <p className="text-5xl">Couples</p>
            <Link href="/portfolio/couple" className="text-2xl border border-black rounded-md px-4 py-1 hover:bg-oak hover:text-sugar duration-300">See Album</Link>
          </div>
          <div className="relative">
            <Link href="/portfolio/couple" className="hover:opacity-80 duration-300 ">
              <Image src="/DSC02612.jpg" alt="Senior" width={1000} height={500} className="object-cover"/>
            </Link>
          </div>
        </div>
        {/* Weddings Album */}
        <div className="flex gap-36 items-center justify-center my-32">
          <div className="relative">
            <Link href="/portfolio/wedding" className="hover:opacity-80 duration-300 ">
              <Image src="/tateclass24-124.jpg" alt="Senior" width={1000} height={500} className="object-cover"/>
            </Link>
          </div>
          <div className="flex flex-col justify-center items-center gap-6 w-1/5">
            <p className="text-5xl">Weddings</p>
            <Link href="/portfolio/wedding" className="text-2xl border border-black rounded-md px-4 py-1 hover:bg-oak hover:text-sugar duration-300">See Album</Link>
          </div>
        </div>
      </div>
    );
  }

export default Portfolio;