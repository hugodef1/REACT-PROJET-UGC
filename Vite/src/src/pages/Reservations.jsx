import { useNavigate } from 'react-router-dom';
import { useReservations } from '../context/ReservationsContext';
import { useAuth } from '../context/AuthContext';
import { getPosterUrl } from '../api/tmdb';

export default function Reservations() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { reservations, cancelReservation, getUpcoming, getPast } = useReservations();

  if (!user) return (
    <div className="page">
      <div className="auth-prompt">
        <h2>Mes Réservations</h2>
        <p>Connectez-vous pour voir vos réservations.</p>
        <button className="cta-btn" onClick={() => navigate('/login')}>SE CONNECTER</button>
      </div>
    </div>
  );

  const upcoming = getUpcoming();
  const past = getPast();

  return (
    <div className="page resas-page">
      <h1 className="page-title">Mes Résas</h1>
      <p className="page-subtitle">Gérez vos séances à venir</p>

      <div className="resas-stats">
        <div className="stat-card">
          <div className="stat-num">{upcoming.length}</div>
          <div className="stat-label">Réservations actives</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{past.length}</div>
          <div className="stat-label">Films vus ce mois</div>
        </div>
      </div>

      {upcoming.length > 0 && (
        <section className="resas-section">
          <h2 className="resas-section-title">À venir</h2>
          {upcoming.map((r) => (
            <ReservationCard key={r.id} resa={r} onCancel={() => cancelReservation(r.id)} />
          ))}
        </section>
      )}

      {past.length > 0 && (
        <section className="resas-section">
          <h2 className="resas-section-title">Passées</h2>
          {past.map((r) => <ReservationCard key={r.id} resa={r} past />)}
        </section>
      )}

      {reservations.length === 0 && (
        <div className="empty-state">
          <p>Vous avez pas encore de réservation.</p>
          <button className="cta-btn" onClick={() => navigate('/')}>DÉCOUVRIR LES FILMS</button>
        </div>
      )}
    </div>
  );
}

function ReservationCard({ resa, onCancel, past }) {
  return (
    <div className={`resa-card${past ? ' resa-card--past' : ''}`}>
      <div className="resa-card-inner">
        <img className="resa-poster" src={getPosterUrl(resa.movie?.poster_path, 'w92')} alt={resa.movie?.title} />
        <div className="resa-info">
          <h3 className="resa-title">{resa.movie?.title}</h3>
          <p className="resa-detail">📅 {resa.date} à {resa.time}</p>
          <p className="resa-detail">📍 {resa.cinema}</p>
          <p className="resa-detail">🎟 {resa.seats?.join(', ')}</p>
          <div className="resa-tags">
            {resa.ticketType && <span className="resa-tag">{resa.ticketType.toUpperCase()}</span>}
            <span className={`resa-status resa-status--${resa.status === 'CONFIRMÉ' ? 'green' : resa.status === 'ANNULÉ' ? 'red' : 'yellow'}`}>
              {resa.status}
            </span>
          </div>
        </div>
      </div>
      {!past && resa.status !== 'ANNULÉ' && (
        <div className="resa-actions">
          <button className="resa-btn">⬇ E-Billet</button>
          <button className="resa-btn">↑ Partager</button>
          <button className="resa-btn resa-btn--danger" onClick={onCancel}>🗑 Annuler</button>
        </div>
      )}
    </div>
  );
}
