import { FaStar, FaRegStar } from "react-icons/fa";

const Rating = ({ rating }) => {
  const numericRating = Number(rating) || 0;
  const safeRating = Math.min(Math.max(numericRating, 0), 5);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => {
        const fillAmount = Math.max(0, Math.min(1, safeRating - index));

        return (
          <span
            key={index}
            className="relative inline-block text-lg"
            aria-label={`Star ${index + 1}`}
          >
            <FaRegStar className="text-gray-300" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillAmount * 100}%` }}
            >
              <FaStar className="text-yellow-400" />
            </span>
          </span>
        );
      })}
      <span className="ml-2 text-sm text-gray-500">{rating}</span>
    </div>
  );
};

export default Rating;
