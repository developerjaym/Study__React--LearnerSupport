import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
