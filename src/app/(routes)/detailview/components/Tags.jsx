const Tags = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-block rounded-full bg-button/10 px-3 py-1 text-sm font-medium text-button"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default Tags;
