function Image(props) {
  const { url, alt, className, containerClassName } = props;
  return <div className={containerClassName}>
    <img className={className} src={url} alt={alt} />
    </div>;
}

export default Image;
