import { Carousel } from "../carousel";

interface ProductCarouselProps {
  images: string[];
  title: string;
}

export function ProductCarousel({ images, title }: ProductCarouselProps) {
  return <Carousel images={images} title={title} />;
}
