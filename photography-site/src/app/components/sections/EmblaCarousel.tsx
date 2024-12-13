"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { PrevButton, NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import Image from 'next/image';

type ImageData = {
  src: string;
  alt: string;
};

type PropType = {
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ options }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
  const containerRef = useRef<HTMLElement | null>(null);

  // Callback to stop autoplay
  const handleMouseEnter = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.plugins().autoplay.stop();
  }, [emblaApi]);

  // Callback to stop autoplay
  const handleMouseLeave = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.plugins().autoplay.play();

    // Jump to the next slide
    emblaApi.scrollNext();
  }, [emblaApi]);

  // Fetch images from JSON file on mount
  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('/dynamic-images.json');
      const data: ImageData[] = await response.json();
      setImages(data);
    };

    fetchImages();
  }, []);

  // Effect to stop and start auto play when the mouse is hovering or not over the container
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        // cleanup after component unmounts
        return () => {
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }
}, [handleMouseLeave, handleMouseEnter]);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla" ref={containerRef}>
      <div className="embla__controls">
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled}/>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container h-[50vh] md:h-75vh w-full">
            {images.map((image, index) => (
              <div className="embla__slide relative" key={index}>
                <Image src={image.src} alt={image.alt} layout='fill' objectFit='cover' className="embla__slide__img" />
              </div>
            ))}
          </div>
        </div>
          
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled}/>
      </div>
    </section>
  );
};

export default EmblaCarousel;
