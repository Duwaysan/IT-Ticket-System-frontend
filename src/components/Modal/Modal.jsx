import "./styles.css";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">{title}</h3>
        <div className="modal-content">{children}</div>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}