import { useState } from "react";
import ModalContext from "./modalProvider";

function ModalProvider(props) {
  const [modalState, setModal] = useState({ isModal: false });

  const modalStateHandler = (e) => {  
    setModal(e);
  };

  const modalContext = {
    modalState,
    onModal: modalStateHandler,
  };

  return (
    <ModalContext.Provider value={modalContext}>
      {props.children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
