import { useNavigate } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import { getPosterUrl } from '../api/tmdb';

export default function Watchlist() {
  const navigate = useNavigate();
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div className="page watchlist-page">
      <button className="back-btn-inline" onClick={() => navigate(-1)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <h1 className="page-title">MA WATCHLIST</h1>
      <div className="watchlist-count">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        MES FILMS À VOIR
        <span className="count-badge">{watchlist.length}</span>
      </div>

      {watchlist.length === 0 ? (
        <div className="empty-state">
          <p>Votre watchlist est vide.</p>
          <button className="cta-btn" onClick={() => navigate('/')}>DÉCOUVRIR DES FILMS</button>
        </div>
      ) : (
        <div className="watchlist-grid">
          {watchlist.map((m) => (
            <div key={m.id} className="watchlist-card" onClick={() => navigate(`/film/${m.id}`)}>
              <img src={getPosterUrl(m.poster_path)} alt={m.title} loading="lazy" />
              <button
                className="wl-remove-btn"
                onClick={(e) => { e.stopPropagation(); removeFromWatchlist(m.id); }}
              >
                &#8722;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
