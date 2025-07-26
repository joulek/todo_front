import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import './login.css';
import logo from "../assets/logo_to_do_sans_bg.png";

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await API.post('/auth/register', form);
      setSuccessMessage("🎉 Compte créé avec succès !");
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setErrorMessage("❌ Une erreur est survenue lors de l'inscription.");
    }
  };

  return (
    <div className="login-container">
      <div className="wave"></div>

      <form className="login-form" onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="login-title">Créer un compte</h1>

        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <div className="input-group">
          <input
            type="text"
            placeholder=" "
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
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