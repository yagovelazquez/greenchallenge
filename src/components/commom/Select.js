import ReactSelect from "react-select";

function Select({
  options,
  onChange,
  placeholder,
  styles,
  isSearchable,
  defaultValue,
  width,
  value
}) {
  const defaultStyles = {
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected ? "#e5e7eb" : "white",
      "&:hover": {
        background: "#e5e7eb",
        cursor: "pointer",
      },
      color: state.isSelected ? "gray" : "gray",
    }),
    control: (provided) => ({
      ...provided,
      boxShadow: "none",
      borderColor: "rgb(229, 231, 235)",
      "&:hover": {
        borderColor: "#e5e7eb",
        color: "gray",
      },
    }),
    container: (provided) => ({
      ...provided,
      width: width,
    }),
  };

  return (
    <div className="flex justify-center">
      <ReactSelect
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        styles={styles || defaultStyles}
        className={`font-garamond font-medium `}
        onChange={onChange}
        options={options}
        isSearchable={isSearchable ? isSearchable : true}
      ></ReactSelect>
    </div>
  );
}

export default Select;
