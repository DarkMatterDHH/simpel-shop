const Rating = ({ rating }) => {
  return (
    <p className="text-lg font-semibold text-tekst">
      {rating || "Rating not available"}
    </p>
  );
};

export default Rating;
