// login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import './login.css';
import logo from "../assets/logo_to_do_sans_bg.png";
import { Link } from 'react-router-dom';


export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', form.email);
      }
      navigate('/todos');
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">

      <form className="login-form" onSubmit={handleLogin}>
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="login-title">Bienvenue de nouveau !</h1>

        <div className="input-group">
          <input
            type="email"
            placeholder=" "
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder=" "
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <label>Mot de passe</label>
        </div>

        <div className="remember-forgot">
          <div className="remember-me">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember">Se souvenir de moi</label>
          </div>
          <a href="/forgot-password" className="forgot-password">Mot de passe oublié ?</a>
        </div>

        <button type="submit" className="login-button">Connexion</button>
        <div className="signup-link">
          Vous n'avez pas encore de compte ? <Link to="/register">Créer un compte !</Link>
        </div>
      </form>
    </div>
  );
}
