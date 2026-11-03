const Reviews = ({ reviews }) => {
  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <div key={index} className="border-b border-gray-200 pb-4">
          <p className="font-medium">{review.author}</p>
          <p className="text-sm text-muted-foreground">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
