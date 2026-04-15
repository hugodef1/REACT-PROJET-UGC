import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { login, register, user } = useAuth();
  const [mode, setMode] = useState(params.get('mode') === 'register' ? 'register' : 'login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (user) navigate('/compte'); }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        login(email, password);
      } else {
        register(name, email, password);
      }
      navigate('/compte');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page login-page">
      <button className="back-btn-inline" onClick={() => navigate(-1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      <div className="login-logo">UGC</div>

      <div className="login-tabs">
        <button className={`login-tab${mode === 'login' ? ' active' : ''}`} onClick={() => setMode('login')}>
          Connexion
        </button>
        <button className={`login-tab${mode === 'register' ? ' active' : ''}`} onClick={() => setMode('register')}>
          Inscription
        </button>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        {mode === 'register' && (
          <div className="form-group">
            <label>Prénom et Nom</label>
            <input className="form-input" type="text" placeholder="Jean Dupont" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        )}
        <div className="form-group">
          <label>Email</label>
          <input className="form-input" type="email" placeholder="exemple@email.fr" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input className="form-input" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button className="cta-btn" type="submit" disabled={loading}>
          {loading ? 'Chargement...' : mode === 'login' ? 'SE CONNECTER' : 'CRÉER MON COMPTE'}
        </button>

        {mode === 'login' && (
          <button type="button" className="link-btn" style={{ marginTop: '12px' }}>
            Mot de passe oublié ?
          </button>
        )}
      </form>

      <p className="login-switch">
        {mode === 'login' ? 'Pas encore de compte ? ' : 'Déjà un compte ? '}
        <button className="link-btn" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          {mode === 'login' ? 'Créer un compte' : 'Se connecter'}
        </button>
      </p>
    </div>
  );
}
