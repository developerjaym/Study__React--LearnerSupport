import logo from "../../logo.svg";
import "./LoadingSymbol.css";

export default function LoadingSymbol({ open }) {
  return (
    <dialog className="dialog__container" open={open}>
      <img
        width="56"
        height="56"
        src={logo}
        className="dialog__logo spin"
        alt="black and white pillar"
      />
    </dialog>
  );
}
