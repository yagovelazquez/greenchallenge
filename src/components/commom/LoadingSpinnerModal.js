import Image from "./Image";
import LoadingSpinner from "./LoadingSpinner";
import Modal from "./Modal";



function LoadingSpinnerModal({ enabled }) {
  return (
    <Modal isModal={enabled.isLoading}>
      <LoadingSpinner /> 
    </Modal>
  );
}

export default LoadingSpinnerModal;
