import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import { FaHome, FaListAlt, FaCog, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import logo from "../assets/logo_to_do_sans_bg.png";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="menu-toggle" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="header-content">
            <img src={logo} alt="Logo" className="logoNavbar" />
            <span>To-Do App</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <NavLink 
            to="/todos" 
            className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            onClick={() => window.innerWidth < 992 && setIsOpen(false)}
          >
            <FaListAlt /> <span>Mes Tâches</span>
          </NavLink>

          <NavLink 
            to="/logout" 
            className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
            onClick={() => window.innerWidth < 992 && setIsOpen(false)}
          >
            <FaSignOutAlt /> <span>Déconnexion</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
}