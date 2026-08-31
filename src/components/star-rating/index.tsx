import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
  const safeRating = Math.min(Math.max(rating, 0), 5);
  const percentage = (safeRating / 5) * 100;

  return (
    <div
      className="relative flex w-max self-start"
      title={`Rating: ${safeRating} out of 5`}>
      <div className="flex text-(--terciary-font-color)/30">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={18} fill="currentColor" strokeWidth={0} />
        ))}
      </div>

      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${percentage}%` }}>
        <div className="flex w-max text-amber-400">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} size={18} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
      </div>
    </div>
  );
}
