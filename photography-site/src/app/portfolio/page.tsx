
// The landing page will have the gallery separated into 5 categories which the user can select
// One of the options will be to view the entire gallery. This will lead to the query of 
// the most recent photos uploaded by Mary.

import Link from "next/link";
import Image from "next/image";

export default function Portfolio() {
    return (
      <div className="min-h-screen">
        <div className="text-5xl flex flex-col gap-3 bg-sage w-5/12 pl-36 py-28">
          <h2 className="">RECENT</h2>
          <h2 className="italic">ADVENTURES</h2>
        </div>
        <div className="flex gap-36 items-center justify-center">
          <div className="flex flex-col justify-center items-center gap-6 w-1/5">
            <p className="text-5xl">Seniors</p>
            <Link href="/portfolio/seniors" className="text-2xl border border-black rounded-md px-4 py-1 hover:bg-oak hover:text-sugar duration-300">See Album</Link>
          </div>
          <div className="relative mt-[-50px]">
            <Link href="/portfolio/seniors" className="hover:opacity-80 duration-300 ">
              <Image src="/kellsiesenior24-103.jpg" alt="Senior" width={1000} height={500} className="object-cover"/>
            </Link>
          </div>
        </div>
        <Link href="portfolio/all" className="text-2xl text-black bg-sage hover:text-sugar hover:bg-mocha px-8 py-4 mx-10 my-20 duration-300">See Gallery</Link>
      </div>
    );
  }