import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import './login.css'; // On réutilise le CSS de login
import logo from "../assets/logo_to_do_sans_bg.png";

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert("Inscription réussie !");
      navigate('/login');
    } catch (err) {
      alert("Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="login-container">
      <div className="wave"></div>

      <form className="login-form" onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="login-title">Créer un compte</h1>
        <div className="input-group">
          <input
            type="text"
            placeholder=" "
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
            style={{
              width: '90%',
              padding: '15px 20px',
              border: '2px solid #ffb6c1',
              borderRadius: '30px',
              fontSize: '16px',
              backgroundColor: '#fff0f6',
              fontFamily: "'Comic Neue', cursive",
              transition: 'all 0.3s ease'
            }}
          />
          <label>Nom</label>
        </div>


        <div className="input-group">
          <input
            type="email"
            placeholder=" "
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <label>Email</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder=" "
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
          <label>Mot de passe</label>
        </div>

        <button type="submit" className="login-button">S'inscrire</button>

        <div className="signup-link">
          Vous avez déjà un compte ? <Link to="/login">Connectez-vous ici !</Link>
        </div>
      </form>
    </div>
  );
}
