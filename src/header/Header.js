import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../authenticate/modal/LoginModal";
import SignUpModal from "../authenticate/modal/SignUpModal";
import logo from "../logo.jpg";
import { authentication } from "../utility/authentication";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const loggedIn = authentication.loggedIn;
  const onSearch = (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    navigate(`/?term=${formData.term}`)
  };
  return (
    <header className="App-header">
      <img
        onClick={(e) => navigate("/")}
        src={logo}
        className="App-logo"
        alt="logo"
        height="24"
        width="24"
      />
      <h1 onClick={(e) => navigate("/")} className="app__title">
        Learner Support
      </h1>
      <form className="search-bar" onSubmit={onSearch}>
        <label>
          Search
          <input type="search" name="term" />
        </label>
      </form>
      {loggedIn ? (
        <>
          <button className="button" onClick={(e) => navigate("/ask")}>
            +Ask Question
          </button>
          <button
            className="button"
            onClick={(e) => {
              authentication.signOut();
              navigate("/");
            }}
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <button className="button" onClick={(e) => setLoginOpen(true)}>
            Login
          </button>
          <button className="button" onClick={(e) => setSignUpOpen(true)}>
            Sign Up
          </button>
        </>
      )}
      <SignUpModal
        open={isSignUpOpen}
        onCancel={() => setSignUpOpen(false)}
        onSuccess={(creds) => {
          authentication.signUp(creds);
          setSignUpOpen(false);
        }}
      />
      <LoginModal
        open={isLoginOpen}
        onCancel={() => setLoginOpen(false)}
        onSuccess={(creds) => {
          authentication.logIn(creds);
          setLoginOpen(false);
        }}
      />
    </header>
  );
}
