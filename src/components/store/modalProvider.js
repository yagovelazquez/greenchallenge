import React from "react";

const ModalContext = React.createContext({
  modalState: {isModal: false},
  modalStateHandler: ()=> {},
});

export default ModalContext;
