import { useEffect } from "react";
function useOutsideClick({ ref, value, callback }) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref?.current &&
        !ref?.current.contains(event.target) &&
        event.target.value !== value
      ) {
        callback(event.target);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, value]);
}

export default useOutsideClick;
