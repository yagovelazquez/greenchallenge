import LoadingSpinner from "./LoadingSpinner";
import Modal from "./Modal";

function LoadingSpinnerModal({ enabled }) {
  return (
    <Modal
      isModal={enabled.isLoading}
      variation={"middleCentered"}
    >
      <LoadingSpinner />
    </Modal>
  );
}

export default LoadingSpinnerModal;
