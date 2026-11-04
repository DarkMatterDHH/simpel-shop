const Description = ({ description }) => {
  return (
    <article>
      <h2 className="text-lg font-semibold">Product description</h2>
      <p className="mt-2 text-tekst/70">
        {description || "No description is available for this product."}
      </p>
    </article>
  );
};

export default Description;
