const Price = ({ price, discountPercentage }) => {
  const hasValidPrice = price !== undefined && price !== null && price !== "";

  return (
    <>
      <p className="text-lg font-semibold text-tekst">
        {hasValidPrice ? `Price: $${price}` : "Price not available"}
      </p>
      <p className="text-sm text-tekst/70">
        {discountPercentage && (
          <span className="text-lg font-bold text-button">
            Save {discountPercentage}%
          </span>
        )}
      </p>
    </>
  );
};

export default Price;
