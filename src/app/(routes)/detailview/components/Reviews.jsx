const Reviews = ({ reviews }) => {
  return (
    <div className="space-y-4 text-tekst">
      {reviews.map((review, index) => (
        <div key={index} className="border-b border-tekst/20 pb-4">
          <p className="font-medium">{review.author}</p>
          <p className="text-sm">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
