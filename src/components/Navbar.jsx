import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  const toggleDarkMode = () => {
    document.body.classList.toggle("bg-dark");
    document.body.classList.toggle("text-white");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <h5 className="text-white">Dashboard</h5>
      <div>
        <button
          className="btn btn-outline-light btn-sm me-2"
          onClick={toggleDarkMode}
        >
          <i className="bi bi-moon"></i>
        </button>
        <button className="btn btn-danger btn-sm" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
