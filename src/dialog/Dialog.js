import "./Dialog.css";
import logo from "../logo.svg";

export default function Dialog({ title, open, children, onCancel }) {
  return (
    <dialog className="dialog__container" open={open}>
      <div className="dialog">
        <header className="dialog__header">
          <img
            width="28"
            height="28"
            src={logo}
            className="dialog__logo"
            alt="black and white pillar"
          />
          <h2 className="dialog__title">{title}</h2>
          <menu className="dialog__menu">
            <button className="button button--icon" onClick={onCancel}>
              X
            </button>
          </menu>
        </header>
        <div className="dialog__body">{children}</div>
      </div>
    </dialog>
  );
}
