import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Indicators } from './Indicators';
import { useState, useCallback, useEffect } from 'react';
import { Product, loadCarousel } from '../library/data';
import { Link } from 'react-router-dom';

type CarouselProducts = Product;

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
    <div className="container">
      <div className="grid grid-cols-1">
        <div className="flex justify-center">
          <Indicators
            thisIsCurrent={handleCurrent}
            count={carousel.length}
            current={activeIndex}
          />
        </div>
        <div className="flex justify-center items-center">
          <FaChevronLeft
            className="text-primary w-20 h-20  cursor-pointer"
            onClick={handlePrevious}
          />
          <Link to={`/details/${carousel[activeIndex]?.productId}`}>
            <img
              className="rounded w-full aspect-square my-6 lg:w-[700px] lg:h-[700px]"
              src={carousel[activeIndex]?.image}
            />
          </Link>
          <FaChevronRight
            className="text-primary w-20 h-20  cursor-pointer"
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
}
