const Stock = ({ stock }) => {
  return (
    <p className="text-lg font-semibold text-tekst">
      {stock || "Stock not available"}
    </p>
  );
};

export default Stock;
