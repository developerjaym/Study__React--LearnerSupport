import logo from "../../logo.jpg";
import "./LoadingSymbol.css";

export default function LoadingSymbol() {
    return (
      <dialog className="dialog__container" open>
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