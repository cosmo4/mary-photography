"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string;
  altText: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageSrc, altText, onClose }) => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowAnimation(true);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    } else {
      const timeout = setTimeout(() => setShowAnimation(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [onClose, isOpen, imageSrc]);

  if (!isOpen && !showAnimation) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center ${
        isOpen ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
    >
      <div
        className={`relative w-full h-full transform ${
          isOpen ? "scale-100" : "scale-90"
        } transition-transform duration-300`}
      >
          <Image
            src={imageSrc}
            alt={altText}
            fill
            className="rounded-md max-w-[95vw] max-h-[95vh] object-contain m-auto"
          />

        <button
          onClick={onClose}
          className="fixed bottom-[10%] right-[45%] md:bottom-auto md:top-5 md:right-[2%] text-5xl text-white md:text-3xl bg-gray-600 rounded-full px-4 md:px-3 md:py-1 pt-1 pb-2 hover:bg-gray-400 duration-300"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
