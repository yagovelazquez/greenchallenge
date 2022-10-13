function Modal(props) {
  const { isModal , className } = props;

  return (
    <>
      {isModal && (
        <div
          className={className ? className : "bg-black bg-opacity-30 backdrop-blur-sm overflow-x-hidden fixed top-0 right-0 flex items-bottom justify-center !h-screen left-0 z-50 w-screen md:inset-0  md:h-full"}
        >
          {props.children}
        </div>
      )}
    </>
  );
}

export default Modal;
