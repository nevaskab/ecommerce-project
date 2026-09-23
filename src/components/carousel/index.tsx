import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  images: string[];
}

export function Carousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg"></div>
    );
  }

  const goToPrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto group p-10">
      <div
        className="w-full h-96 bg-center bg-cover duration-500 rounded-2xl"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}></div>

      <div className="lg:hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-(--ruge-black)/20 text-white cursor-white hover:bg-(--ruge-black)/40 transition-all">
        <ChevronLeft onClick={goToPrev} size={30} />
      </div>

      <div className="lg:hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-(--ruge-black)/20 text-white cursor-white hover:bg-(--ruge-black)/40 transition-all">
        <ChevronRight onClick={goToNext} size={30} />
      </div>

      <div className="flex top-4 justify-center py-2 gap-1 mt-4">
        {images.map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`w-3 h-3 rounded-full mx-1 cursor-pointer transition-all ${
              currentIndex === slideIndex
                ? "bg-(--slate-indigo)/80 scale-125"
                : "bg-(--terciary-font-color)/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
