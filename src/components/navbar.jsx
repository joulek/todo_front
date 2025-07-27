// Navbar.jsx
import { NavLink } from 'react-router-dom';
import './navbar.css';
import { FaListAlt, FaSignOutAlt } from 'react-icons/fa';
import logo from "../assets/logo_to_do_sans_bg.png";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logoNavbar" />
        <span className="navbar-title">To-Do App</span>
      </div>
      <div className="navbar-right">
        <NavLink to="/logout" className="navbar-link">
          <FaSignOutAlt /> <span>Déconnexion</span>
        </NavLink>
      </div>
    </div>
  );
}
