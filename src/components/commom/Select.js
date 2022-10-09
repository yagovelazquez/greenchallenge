function Select({ options, selectClasses, onChange, selectValue }) {
  return (
    <div className="flex justify-center">
      <div className="mb-3 xl:w-96">
        <select
          onChange={onChange}
          value={selectValue}
          className={`form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${selectClasses}`}
          aria-label="Default select example"
        >
          <option>Choose a category</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Select;
