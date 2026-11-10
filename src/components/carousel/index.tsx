import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const LENS_SIZE = 240;
const ZOOM_SCALE = 2;

interface CarouselProps {
  images: string[];
  title: string;
}

export function Carousel({ images, title }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomPosition, setZoomPosition] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [isZoomLocked, setIsZoomLocked] = useState(false);
  const [canUseMagnifier, setCanUseMagnifier] = useState(false);
  const imageStageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateHoverSupport = () => setCanUseMagnifier(hoverQuery.matches);

    updateHoverSupport();
    hoverQuery.addEventListener("change", updateHoverSupport);
    return () => hoverQuery.removeEventListener("change", updateHoverSupport);
  }, []);

  if (!images.length) {
    return (
      <div className="flex aspect-4/3 items-center justify-center rounded-2xl bg-slate-50 text-sm text-slate-500">
        No product photos available
      </div>
    );
  }

  const goToPrev = () => {
    setCurrentIndex((index) => (index === 0 ? images.length - 1 : index - 1));
    setZoomPosition(null);
    setIsZoomLocked(false);
  };

  const goToNext = () => {
    setCurrentIndex((index) => (index === images.length - 1 ? 0 : index + 1));
    setZoomPosition(null);
    setIsZoomLocked(false);
  };

  const updateZoomPosition = (clientX: number, clientY: number) => {
    const stage = imageStageRef.current;
    if (!stage) return;

    const bounds = stage.getBoundingClientRect();
    const horizontalMargin = Math.min(LENS_SIZE / 2, bounds.width / 2);
    const verticalMargin = Math.min(LENS_SIZE / 2, bounds.height / 2);

    setZoomPosition({
      x: Math.min(
        Math.max(clientX - bounds.left, horizontalMargin),
        bounds.width - horizontalMargin,
      ),
      y: Math.min(
        Math.max(clientY - bounds.top, verticalMargin),
        bounds.height - verticalMargin,
      ),
      width: bounds.width,
      height: bounds.height,
    });
  };

  const showZoomAtCenter = () => {
    const bounds = imageStageRef.current?.getBoundingClientRect();
    if (!bounds) return;
    updateZoomPosition(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
  };

  return (
    <div className="w-full">
      <div className="group relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-5 sm:p-8">
        <div ref={imageStageRef} className="relative h-full w-full">
          <button
            type="button"
            aria-label={canUseMagnifier ? "Toggle product image zoom" : undefined}
            aria-pressed={canUseMagnifier ? isZoomLocked : undefined}
            disabled={!canUseMagnifier}
            onPointerEnter={(event) => {
              if (canUseMagnifier && event.pointerType === "mouse") {
                updateZoomPosition(event.clientX, event.clientY);
              }
            }}
            onPointerMove={(event) => {
              if (
                canUseMagnifier &&
                (event.pointerType === "mouse" || isZoomLocked)
              ) {
                updateZoomPosition(event.clientX, event.clientY);
              }
            }}
            onPointerLeave={() => {
              if (!isZoomLocked) setZoomPosition(null);
            }}
            onClick={(event) => {
              if (!canUseMagnifier) return;

              if (isZoomLocked) {
                setIsZoomLocked(false);
                setZoomPosition(null);
                return;
              }

              setIsZoomLocked(true);
              if (event.detail === 0) showZoomAtCenter();
              else updateZoomPosition(event.clientX, event.clientY);
            }}
            className="absolute inset-0 z-0 flex cursor-zoom-in items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-default"
          >
            <img
              key={images[currentIndex]}
              src={images[currentIndex]}
              alt={`${title} — image ${currentIndex + 1} of ${images.length}`}
              draggable={false}
              className="h-full w-full select-none object-contain transition-opacity duration-300"
            />
          </button>

          {canUseMagnifier && zoomPosition && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute z-10 box-border overflow-hidden rounded-full bg-white/90 ring-4 ring-white shadow-xl"
              style={{
                width: LENS_SIZE,
                height: LENS_SIZE,
                left: zoomPosition.x - LENS_SIZE / 2,
                top: zoomPosition.y - LENS_SIZE / 2,
              }}
            >
              <img
                src={images[currentIndex]}
                alt=""
                draggable={false}
                className="absolute max-w-none select-none object-contain"
                style={{
                  width: zoomPosition.width,
                  height: zoomPosition.height,
                  left: LENS_SIZE / 2 - zoomPosition.x,
                  top: LENS_SIZE / 2 - zoomPosition.y,
                  transform: `scale(${ZOOM_SCALE})`,
                  transformOrigin: `${zoomPosition.x}px ${zoomPosition.y}px`,
                }}
              />
            </div>
          )}
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Show previous product image"
              className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:left-4 sm:h-11 sm:w-11"
            >
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Show next product image"
              className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:right-4 sm:h-11 sm:w-11"
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
              onClick={() => {
                setCurrentIndex(index);
                setZoomPosition(null);
                setIsZoomLocked(false);
              }}
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

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500 [@media(hover:none)]:hidden">
        <ZoomIn size={15} aria-hidden="true" />
        Hover over the image to zoom
      </p>
    </div>
  );
}
