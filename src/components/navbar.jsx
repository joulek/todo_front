// Sidebar.jsx
import { NavLink } from 'react-router-dom';
import './navbar.css';
import { FaHome, FaListAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import logo from "../assets/logo_to_do_sans_bg.png";


export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logoNavbar" />
          <span>To-Do App</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="sidebar-link">
          <FaHome /> <span>Dashboard</span>
        </NavLink>

        <NavLink to="/todos" className="sidebar-link">
          <FaListAlt /> <span>My Tâches</span>
        </NavLink>

        <NavLink to="/settings" className="sidebar-link">
          <FaCog /> <span>Profil</span>
        </NavLink>

        <NavLink to="/logout" className="sidebar-link">
          <FaSignOutAlt /> <span>Déconnexion</span>
        </NavLink>
      </nav>
    </div>
  );
}
