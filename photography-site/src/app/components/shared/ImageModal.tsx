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
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const fetchImageDimensions = async () => {
      if (imageSrc) {
        const img = new window.Image();
        img.src = imageSrc;
        await new Promise((resolve) => (img.onload = resolve));

        setImageDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      }
    };

    if (isOpen) {
      setShowAnimation(true);
      fetchImageDimensions();

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
            className="rounded-md max-w-[95vw] max-h-[95vh] object-contain my-auto"
          />

        <button
          onClick={onClose}
          className="fixed top-5 right-20 text-white text-2xl bg-gray-600 rounded-full px-3 py-1 hover:bg-gray-400 duration-300"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
