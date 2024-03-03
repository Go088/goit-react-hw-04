import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ImageModal({
  isOpen,
  onClose,
  image: { urls, alt_descriptions },
}) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
        <button onClick={onClose}>close</button>
        <div>I am a modal</div>
        <div>
          <img src={urls.regular} alt={alt_descriptions} />
        </div>
      </Modal>
    </div>
  );
}
