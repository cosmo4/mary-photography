"use client"

import Image from "next/image";
import Link from "next/link";
import { Parallax } from "react-parallax";

export default function Investment() {
    return (
      <div className="min-h-screen text-gray-600">
        <div className="grid grid-cols-3 gap-4 w-2/3 mx-auto my-20">
          <p className="text-6xl">CREATING <span className="italic">MEMORIES TOGETHER</span></p>
          <Image src="/leah-investment.jpg" alt="Senior in grass" width={500} height={800} />
          <p className="text-3xl my-auto ml-10">Freezing time through the lens of my camera is my passion. My mission is to create memories for you that will last a lifetime all while making the experience fun and enjoyable. </p>
        </div>
        <div className="w-full bg-sage mb-16">
          <p className="text-center text-5xl tracking-widest py-16">INVESTMENT</p>
        </div>
        <div className="grid grid-cols-4 text-2xl w-5/6 mx-auto mb-32">
          <div className="mx-auto">
            <p className="mb-16 text-4xl">SENIORS</p>
            <ul className="list-disc ml-10 space-y-3 mb-10">
              <li>1 to 2 outfits</li>
              <li>High res, edited photos</li>
              <li>Customized, online gallery</li>
              <li>Printing rights</li>
            </ul>
            <p>Price:</p>
            <p className="text-3xl">$250</p>
          </div>
          <div className="mx-auto">
            <p className="mb-16 text-4xl">FAMILES</p>
            <ul className="list-disc ml-10 space-y-3 mb-2">
              <li>Up to 6 people ($10 extra for every additional person)</li>
              <li>High res, edited photos</li>
              <li>Customized, online gallery</li>
              <li>Printing rights</li>
            </ul>
            <p>Price:</p>
            <p className="text-3xl">$300</p>
          </div>
          <div className="mx-auto">
            <p className="mb-5 text-4xl">ENGAGEMENT/ BRIDALS</p>
            <ul className="list-disc ml-10 space-y-3 mb-11">
              <li>1 to 2 outfits</li>
              <li>High res, edited photos</li>
              <li>Customized, online gallery</li>
              <li>Printing rights</li>
            </ul>
            <p>Price:</p>
            <p className="text-3xl">$300</p>
          </div>
          <div className="mx-auto">
            <p className="mb-16 text-4xl">WEDDINGS</p>
            <ul className="list-disc ml-10 space-y-3 mb-10">
              <li>5 hours</li>
              <li>High res, edited photos</li>
              <li>Customized, online gallery</li>
              <li>Printing rights</li>
            </ul>
            <p>Price:</p>
            <p className="text-3xl">Starting at $1,000</p>
          </div>
        </div>
        <div className="relative">
          <Parallax strength={700} bgImage="/tall-parallax-1.jpg" className="w-2/5 mx-auto h-[60vh] z-10 mb-[30vh]"></Parallax>

          <div className="transform absolute top-1/2 right-1/2 bg-sugar p-16 w-1/4 z-50">
            <p className="text-4xl mb-8">HAVE SOMETHING ELSE IN <span className="italic">MIND</span> ?</p>
            <p className="text-2xl mb-10">Share your vision with me and we&apos;ll work out the best plan for your special day.</p>
            <Link href="/contact" className="border border-black text-xl px-4 py-2 rounded-md text-black hover:text-sugar hover:bg-black duration-300">GET IN TOUCH</Link>
          </div>

        </div>
      </div>
    );
  }