function Image(props) {
  const { url, alt, className } = props;
  return (
   
      <img className={className} src={url} alt={alt} />

  );
}

export default Image;
