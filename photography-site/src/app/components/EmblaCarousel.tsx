"use client";

import React, { useState, useEffect } from 'react';
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

  // Fetch images from JSON file on mount
  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('/dynamic-images.json');
      const data: ImageData[] = await response.json();
      setImages(data);
    };

    fetchImages();
  }, []);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container h-75vh w-full">
          {images.map((image, index) => (
            <div className="embla__slide relative" key={index}>
              <Image src={image.src} alt={image.alt} layout='fill' objectFit='cover' className="embla__slide__img" />
            </div>
          ))}
        </div>
      </div>
      <div className="embla__controls">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </section>
  );
};

export default EmblaCarousel;
