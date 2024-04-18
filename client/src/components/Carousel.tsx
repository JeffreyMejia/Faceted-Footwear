import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Indicators } from './Indicators';
import { useState, useCallback, useEffect } from 'react';

const footwear = [
  '/public/final-project-photos/Adidas - ZX 10000.png',
  '/public/final-project-photos/Solovair - 8 eye derby.png',
  '/public/final-project-photos/Asics - Gel Lyte iii.png',
  '/public/final-project-photos/Jim Green - African Ranger.png',
  '/public/final-project-photos/Whites - Drifter.png',
  '/public/final-project-photos/Jordan-1-chicago.png',
];

export function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = useCallback(() => {
    setActiveIndex((activeIndex + 1) % footwear.length);
  }, [activeIndex, footwear]);

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
    setActiveIndex((activeIndex - 1 + footwear.length) % footwear.length);
  }

  return (
    <div className="flex relative flex-wrap justify-center">
      <FaChevronLeft
        className="text-primary w-20 h-20 absolute left-0 top-2/4 cursor-pointer"
        onClick={handlePrevious}
      />
      <img className="w-screen my-6" src={footwear[activeIndex]} />
      <FaChevronRight
        className="text-primary w-20 h-20 absolute  right-0   top-2/4 cursor-pointer"
        onClick={handleNext}
      />
      <Indicators
        thisIsCurrent={handleCurrent}
        count={footwear.length}
        current={activeIndex}
      />
    </div>
  );
}
