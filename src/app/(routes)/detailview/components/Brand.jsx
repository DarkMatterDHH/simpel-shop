const Brand = ({ brand }) => {
  return (
    <p className="text-lg font-semibold text-tekst">
      {brand || "Brand not available"}
    </p>
  );
};

export default Brand;
