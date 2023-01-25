import { useState } from "react";
import LoginModal from "../authenticate/modal/LoginModal";
import SignUpModal from "../authenticate/modal/SignUpModal";
import logo from "../logo.jpg";
import "./Header.css";

export default function Header() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" height="24" width="24" />
      <h1 className="app__title">Learner Support</h1>
      <label className="search-bar">
        Search
        <input type="search" />
      </label>
      <button className="button" onClick={(e) => setLoginOpen(true)}>
        Login
      </button>
      <button className="button" onClick={(e) => setSignUpOpen(true)}>
        Sign Up
      </button>
      <SignUpModal
        open={isSignUpOpen}
        onCancel={() => setSignUpOpen(false)}
        onSuccess={() => console.log("auth success")}
      />
      <LoginModal
        open={isLoginOpen}
        onCancel={() => setLoginOpen(false)}
        onSuccess={() => console.log("auth success")}
      />
    </header>
  );
}
