import PropTypes from "prop-types";

const Modal = ({ showModal, setShowModal, lore, name }) => {
  if (!showModal) return null; // Don't render the modal if showModal is false

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/3">
        <h2 className="text-4xl font-bold mb-4">{name} Lore:</h2>
        <p className="text-xl text-gray-800">{lore}</p>
        <button
          onClick={() => setShowModal(false)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};
Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  lore: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Modal;
