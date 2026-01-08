import ReactDOM from "react-dom";

export default function Modal({
  title,
  content,
  show,
  onClose,
  onConfirm,
}) {
  return ReactDOM.createPortal (
      <div className="modal-container">
        <div className="modal">
          <h2>{title}</h2>
          <p>{content}</p>
          <button onClick={onClose}>Annulla</button>
          <button onClick={onConfirm}>Conferma</button>
        </div>
      </div>,
      document.getElementById("modal-root")
  );
}
