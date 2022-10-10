function Image(props) {
  const { url, alt, className } = props;
  return (
    <div className={className}>
      <img  src={url} alt={alt} />
    </div>
  );
}

export default Image;
