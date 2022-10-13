function Modal(props) {
  const { isModal } = props;

  return (
    <>
      {isModal && (
        <div className="overflow-y-auto bg-black bg-opacity-30 backdrop-blur-sm overflow-x-hidden fixed top-0 right-0 flex items-center justify-center left-0 z-50 w-full md:inset-0 h-modal md:h-full">
          {props.children}
        </div>
      )}
    </>
  );
}

export default Modal;
