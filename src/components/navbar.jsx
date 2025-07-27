import { FaListAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import logo from "../assets/logo_to_do_sans_bg.png";

export default function Sidebar({ isOpen, onToggle }) {
  return (
    <>
      {/* Bouton toggle pour mobile */}
      <button className="menu-toggle" onClick={onToggle}>
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>
      
      {/* Overlay pour fermer le sidebar en cliquant à côté */}
      {isOpen && <div className="sidebar-overlay" onClick={onToggle} />}
      
      {/* Sidebar principal */}
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
            className="sidebar-link" 
            onClick={() => window.innerWidth < 993 && onToggle()}
          >
            <FaListAlt /> <span>My Tâches</span>
          </NavLink>
          
          <NavLink 
            to="/logout" 
            className="sidebar-link" 
            onClick={() => window.innerWidth < 993 && onToggle()}
          >
            <FaSignOutAlt /> <span>Déconnexion</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
}