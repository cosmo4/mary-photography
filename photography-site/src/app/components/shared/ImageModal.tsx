"use client";

import React, { useEffect, useState } from "react";

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
    }, [onClose, isOpen]);
    
    if (!isOpen && !showAnimation) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center ${
        isOpen ? "opacity-100": "opacity-0"
    } transition-opacity duration-300`}>
      <div className={`relative transform ${
          isOpen ? "scale-100" : "scale-90"
        } transition-transform duration-300`}
        >
        <img
          src={imageSrc}
          alt={altText}
          className="max-w-full max-h-screen"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl bg-gray-700 rounded-full px-3 py-1"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
