const Tags = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default Tags;
