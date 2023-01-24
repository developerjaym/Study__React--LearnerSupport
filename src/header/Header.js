import "./Header.css";
import logo from "../logo.jpg";

export default function Header() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="app__title">Learner Support</h1>
      <label className="search-bar">
        Search
        <input type="search" />
      </label>
      <button className="button">Login</button>
      <button className="button">Sign Up</button>
    </header>
  );
}
