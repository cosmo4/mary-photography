"use client";

import { useCallback, useEffect, useRef, useState, FC } from "react";
import Image from 'next/image';

const images = [
    { src: '/carousel-pics/ashton_grayson1.jpg', alt: 'Ashton and Grayson', priority: true},
    { src: '/carousel-pics/fisher1.jpg', alt: 'Fisher', priority: true },
    { src: '/carousel-pics/leah-senior-pic.webp', alt: 'Leah', priority: false},
    { src: '/carousel-pics/tate1.jpg', alt: 'Tate', priority: false },
    { src: '/carousel-pics/baxter1.jpg', alt: 'Baxter', priority: false },
    { src: '/carousel-pics/fisher2.jpg', alt: 'Fisher', priority: false },
    { src: '/carousel-pics/quaylyn2.jpg', alt: 'Quaylyn', priority: false },
    { src: '/carousel-pics/ashton_grayson2.jpg', alt: 'Ashton and Grayson', priority: false },
    { src: '/carousel-pics/jordan1.jpg', alt: 'Jordan', priority: false },
    { src: '/carousel-pics/baxter3.jpg', alt: 'Baxter', priority: false },
];

const HeroSlideShow: FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null); // Ref for the timer
    const containerRef = useRef<HTMLDivElement | null>(null); // Ref for the slideshow container

    // Function to go to the next slide
    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, []);

    // Function to start auto-scrolling
    const startAutoScroll = useCallback(() => {
        if (timerRef.current === null) {
            timerRef.current = setInterval(nextSlide, 5000);
        }
    }, [nextSlide]);

    // Function to stop auto-scrolling 
    const stopAutoScroll = useCallback(() => {
        if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    // Effect to start auto-scroll on component mount
    useEffect(() => {
        startAutoScroll();

        // cleanup after component unmounts
        return () => stopAutoScroll();
    }, [startAutoScroll, stopAutoScroll]);

    // Effect to add event listeners and manage auto-scrolling
    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('mouseenter', stopAutoScroll);
            container.addEventListener('mouseleave', startAutoScroll);

            // cleanup after component unmounts
            return () => {
                container.removeEventListener('mouseenter', stopAutoScroll);
                container.removeEventListener('mouseleave', startAutoScroll);
            };
        }
    }, [startAutoScroll, stopAutoScroll]);
    


    return (
        <div className="hero-banner relative overflow-hidden">
            {images.map((image, index) => (
                <Image
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    width={1100}
                    height={120}
                    priority={image.priority}
                    className = {`transition-opacity duration-500 hero-img ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                />
            ))}

            <button className="prev" onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}>&#10094;</button>
            <button className="next" onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}>&#10095;</button>
        </div>
    )
}

export default HeroSlideShow