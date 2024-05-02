import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Indicators } from './Indicators';
import { useState, useCallback, useEffect } from 'react';
import { Product, loadCarousel } from '../library/data';

type CarouselProducts = {
  index: Product;
};

export function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carousel, setCarousel] = useState<CarouselProducts[]>([]);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    async function load() {
      try {
        const carouselProducts = await loadCarousel();
        setCarousel(carouselProducts);
        console.log(carouselProducts);
      } catch (error) {
        setError(error);
      }
    }
    load();
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((activeIndex + 1) % carousel.length);
  }, [activeIndex, carousel]);

  useEffect(() => {
    const intervalId = setInterval(handleNext, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, [handleNext]);

  function handleCurrent(shoe: number) {
    setActiveIndex(shoe);
  }

  function handlePrevious() {
    setActiveIndex((activeIndex - 1 + carousel.length) % carousel.length);
  }

  if (error) {
    return (
      <div className="text-primary">
        Error Loading carousel:{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }
  return (
    <div className="flex relative flex-wrap justify-center">
      <FaChevronLeft
        className="text-primary w-20 h-20 absolute left-0 top-2/4 cursor-pointer"
        onClick={handlePrevious}
      />
      <img
        className="w-screen my-6"
        src={carousel[activeIndex]?.index?.image}
      />
      <FaChevronRight
        className="text-primary w-20 h-20 absolute  right-0   top-2/4 cursor-pointer"
        onClick={handleNext}
      />
      <Indicators
        thisIsCurrent={handleCurrent}
        count={carousel.length}
        current={activeIndex}
      />
    </div>
  );
}
