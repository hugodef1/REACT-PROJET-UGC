import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWatchlist } from '../context/WatchlistContext';
import { useReservations } from '../context/ReservationsContext';

export default function Compte() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { watchlist } = useWatchlist();
  const { reservations } = useReservations();

  if (!user) {
    return (
      <div className="page compte-page">
        <div className="auth-prompt">
          <div className="auth-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="64" height="64">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h2>Mon Compte</h2>
          <p>Connectez-vous pour accéder à votre profil.</p>
          <button className="cta-btn" onClick={() => navigate('/login')}>SE CONNECTER</button>
          <button className="link-btn" style={{ marginTop: '12px' }} onClick={() => navigate('/login?mode=register')}>
            Créer un compte
          </button>
        </div>
      </div>
    );
  }

  const upcoming = reservations.filter((r) => r.status !== 'ANNULÉ' && new Date(r.dateISO) >= new Date());

  return (
    <div className="page compte-page">
      <div className="compte-header">
        <h1 className="compte-greeting">Bonjour, {user.name.split(' ')[0]}</h1>
        <button className="settings-btn" title="Paramètres">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
          </svg>
        </button>
      </div>

      <div className="compte-section-label">MES FILMS</div>

      <div className="compte-grid">
        <button className="compte-card" onClick={() => navigate('/reservations')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span>FILMS À NOTER</span>
        </button>

        <button className="compte-card" onClick={() => navigate('/watchlist')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <span>MA WATCHLIST</span>
          {watchlist.length > 0 && <span className="compte-badge">{watchlist.length}</span>}
        </button>

        <button className="compte-card compte-card--wide">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
            <rect x="2" y="2" width="20" height="20" rx="2"/>
            <path d="M7 2v20M17 2v20M2 12h20"/>
          </svg>
          <span>MA COLLECTION UGC</span>
        </button>
      </div>

      {upcoming.length > 0 && (
        <div className="compte-section-label" style={{ marginTop: '24px' }}>PROCHAINES SÉANCES</div>
      )}
      {upcoming.slice(0, 2).map((r) => (
        <div key={r.id} className="compte-resa-mini" onClick={() => navigate('/reservations')}>
          <span className="compte-resa-title">{r.movie?.title}</span>
          <span className="compte-resa-date">{r.date} à {r.time}</span>
        </div>
      ))}

      <div className="compte-footer">
        <button className="compte-link" onClick={() => {}}>Mes informations</button>
        <button className="compte-link" onClick={() => {}}>Carte UGC Illimité</button>
        <button className="compte-link" onClick={() => {}}>Aide & Contact</button>
        <button className="compte-link compte-link--danger" onClick={() => { logout(); }}>
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
