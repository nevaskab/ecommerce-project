import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  images: string[];
  title: string;
}

export function Carousel({ images, title }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-slate-50 text-sm text-slate-500">
        No product photos available
      </div>
    );
  }

  const goToPrev = () => {
    setCurrentIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  };

  const goToNext = () => {
    setCurrentIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  };

  return (
    <div className="w-full">
      <div className="group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-5 sm:p-8">
        <img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt={`${title} — image ${currentIndex + 1} of ${images.length}`}
          className="h-full w-full object-contain transition-opacity duration-300"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Show previous product image"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:left-4 sm:h-11 sm:w-11"
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Show next product image"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:right-4 sm:h-11 sm:w-11"
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex snap-x gap-3 overflow-x-auto pb-1" aria-label="Choose a product image">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Show product image ${index + 1}`}
              aria-pressed={currentIndex === index}
              className={`h-16 w-16 shrink-0 snap-start overflow-hidden rounded-xl border-2 bg-slate-50 p-1 transition sm:h-20 sm:w-20 ${
                currentIndex === index
                  ? "border-indigo-600"
                  : "border-transparent hover:border-slate-300"
              }`}
            >
              <img src={image} alt="" loading="lazy" className="h-full w-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
