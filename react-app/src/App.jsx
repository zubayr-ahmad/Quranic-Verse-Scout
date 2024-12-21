import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="overlay"></div>
      <Outlet />
    </>
  );
}

export default App;