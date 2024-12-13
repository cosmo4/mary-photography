"use client";

import Image from "next/image";
import HoneyBookWidget from "../components/sections/HoneybookWidget";

export default function Contact() {
  return (
    <div className="min-h-screen text-gray-600">
      <div className="bg-bone md:w-2/5 h-44 md:h-72 flex justify-center items-center mb-14">
        <h2 className="text-4xl md:text-6xl md:mr-20 md:w-1/3 italic">REACH OUT</h2>
      </div>
      <div className="md:w-5/6 mx-auto">
        <div className="flex gap-48 justify-center md:mt-[-150px]">
          <Image src="/leah-field-1.jpg" alt="Senior in a field" width={400} height={400}/>
          <div className="hidden md:block mb-[-20px]">
            <Image src="/sis-mills.jpg" alt="Senior sitting on steps" width={400} height={400}/>
          </div>

        </div>
        <h3 className="text-3xl md:text-4xl w-[70%] mx-auto text-center my-14">No place too far and no idea too big</h3>
        {/* HoneyBook Widget Container */}
        <div className="mb-24">
          <HoneyBookWidget />
        </div>
      </div>
    </div>
  );
}
