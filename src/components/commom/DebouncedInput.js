import React from "react";

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  searchOption,
  ...props
}) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);

  console.log(props)

  return (
    <input
      {...props}
      value={value}
      
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default DebouncedInput;
