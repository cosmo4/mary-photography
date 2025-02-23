"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Parallax } from "react-parallax";
import { fetchPrices } from "../lib/firestore";

interface Prices {
  id: string;
  families: string;
  seniors: string;
  engagements: string;
  weddings: string;
}

export default function Investment() {
  const [prices, setPrices] = useState<Prices>({
    id: "",
    families: "",
    seniors: "",
    engagements: "",
    weddings: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
      const fetchPrice = async () => {
          const result =  await fetchPrices();
          if (result) {
              setPrices({
                  id: result.id || "",
                  seniors: result.seniors || "",
                  families: result.families || "",
                  engagements: result.engagements || "",
                  weddings: result.weddings || "",
              });
          }
          setLoading(false);
      }

      fetchPrice();
  }, []);

  
  return (
    <div className="min-h-screen text-gray-600">
        {loading && <p>Loading...</p>}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 w-2/3 mx-auto mt-10 mb-20 md:my-20">
          <p className="text-4xl text-center md:text:left md:text-6xl">CREATING <span className="italic">MEMORIES TOGETHER</span></p>
          <Image src="/leah-investment.jpg" alt="Senior in grass" width={500} height={800} />
          <p className="text-2xl md:text-3xl my-auto md:ml-10">Freezing time through the lens of my camera is my passion. My mission is to create memories for you that will last a lifetime all while making the experience fun and enjoyable. </p>
        </div>
        <div className="w-full bg-sage mb-16">
          <p className="text-center text-5xl tracking-widest py-16">INVESTMENT</p>
        </div>
        <div className="grid grid-rows-4 md:grid-rows-1 gap-5 md:gap-0 md:grid-cols-4 text-2xl w-5/6 mx-auto mb-32">
          <div className="md:mx-auto outline outline-gray-400 p-2 md:outline-none md:p-0">
            <p className="mb-5 md:mb-16 text-3xl md:text-4xl">SENIORS</p>
            <ul className="list-disc ml-10 space-y-3 mb-10">
              <li>1 to 2 outfits</li>
              <li>High res, edited photos</li>
              <li>Customized, online gallery</li>
              <li>Printing rights</li>
            </ul>
            <p>Price:</p>
            <p className="text-3xl">{prices.seniors}</p>
          </div>
          <div className="mx-auto outline outline-gray-400 p-2 md:outline-none md:p-0">
            <p className="mb-5 md:mb-16 text-3xl md:text-4xl">FAMILES</p>
            <ul className="list-disc ml-10 space-y-3 mb-2">
              <li>Up to 6 people ($10 extra for every additional person)</li>
              <li>High res, edited photos</li>
              <li>Customized, online gallery</li>
              <li>Printing rights</li>
            </ul>
            <p>Price:</p>
            <p className="text-3xl">{prices.families}</p>
          </div>
          <div className="mx-auto outline outline-gray-400 p-2 md:outline-none md:p-0">
            <p className="mb-5 text-3xl md:text-4xl">ENGAGEMENT/ BRIDALS</p>
            <ul className="list-disc ml-10 space-y-3 mb-11">
              <li>1 to 2 outfits</li>
              <li>High res, edited photos</li>
              <li>Customized, online gallery</li>
              <li>Printing rights</li>
            </ul>
            <p>Price:</p>
            <p className="text-3xl mb-5 md:m-0">{prices.engagements}</p>
          </div>
          <div className="md:mx-auto outline outline-gray-400 p-2 md:outline-none md:p-0">
            <p className="mb-5 md:mb-16 text-3xl md:text-4xl">WEDDINGS</p>
            <ul className="list-disc ml-10 space-y-3 mb-10">
              <li>5 hours</li>
              <li>High res, edited photos</li>
              <li>Customized, online gallery</li>
              <li>Printing rights</li>
            </ul>
            <p>Price:</p>
            <p className="text-3xl">{prices.weddings}</p>
          </div>
        </div>
        <div className="relative">
          <Parallax strength={600} bgImage="/tall-parallax-1.jpg" bgImageStyle={{objectFit: "contain", width: "auto"}} className="md:w-2/5 mx-auto h-[70vh] md:h-[60vh] z-10 mb-[30vh]"></Parallax>

          <div className="transform absolute top-[17%] right-0 md:top-1/2 md:right-1/2 bg-sugar p-16 md:w-1/4 z-50">
            <p className="text-3xl md:text-4xl mb-8">HAVE SOMETHING ELSE IN <span className="italic">MIND</span> ?</p>
            <p className="text-2xl mb-10">Share your vision with me and we&apos;ll work out the best plan for your special day.</p>
            <Link href="/contact" className="border border-black text-xl px-4 py-2 rounded-md text-black hover:text-sugar hover:bg-black duration-300">GET IN TOUCH</Link>
          </div>

        </div>
      </div>
    );
  }