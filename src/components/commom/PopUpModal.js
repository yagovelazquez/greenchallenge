import Modal from "./Modal";
import { useRef } from "react";
import useOutsideClick from "./../hooks/useOutsideClick";
import { useContext } from "react";
import ModalContext from "../store/modalProvider";


function PopUpModal({ bodyComponent, children }) {
  const modalCtx = useContext(ModalContext);
  const ref = useRef();

  const clickOutsideHandler = () => {
    modalCtx.onModal({ isModal: false });
  };

  useOutsideClick({
    ref: ref,
    value: "buttons",
    callback: clickOutsideHandler,
  });

  return (
    <Modal isModal={modalCtx.modalState.isModal} onModal={modalCtx.onModal}>
      <div
        ref={ref}
        className="bg-white h-full rounded mt-4 shadow-xl border-gray-300 border-2 w-[350px]"
      >
      {children}
      </div>
    </Modal>
  );
}

export default PopUpModal;
