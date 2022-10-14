import ReactDOM from "react-dom";

function Modal(props) {
  const { isModal, variation } = props;

  const classVariation = {
   middleCentered: "flex items-center",
  }

  if (!isModal) return;

  return ReactDOM.createPortal(
    <>
      <div
        className={
          "bg-black animate-fadeIn  bg-opacity-30 backdrop-blur-sm  fixed top-0 left-0 bottom-0 right-0 z-1"
        }
      ></div>
      <div className={`z-2 p-5 h-full top-0 animate-fadeIn fixed left-1/2 translate-x-[-50%]  ${classVariation[variation]}`}>
        {props.children}
      </div>
    </>,
    document.getElementById("modal")
  );
}

export default Modal;
