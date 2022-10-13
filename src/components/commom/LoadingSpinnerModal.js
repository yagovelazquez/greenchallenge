
import LoadingSpinner from "./LoadingSpinner";
import Modal from "./Modal";



function LoadingSpinnerModal({ enabled }) {
  return (
    <Modal className={" bg-black bg-opacity-30 backdrop-blur-sm overflow-x-hidden fixed top-0 right-0 flex items-center justify-center !h-screen left-0 z-50 w-screen md:inset-0  md:h-full"} isModal={enabled.isLoading}>
      <LoadingSpinner /> 
    </Modal>
  );
}

export default LoadingSpinnerModal;
