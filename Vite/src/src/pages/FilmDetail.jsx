import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getPosterUrl, getBackdropUrl } from '../api/tmdb';
import { useWatchlist } from '../context/WatchlistContext';
import { UGC_CINEMAS } from '../api/ugcData';

const DAYS = ['VEN', 'SAM', 'DIM', 'LUN', 'MAR'];

export default function FilmDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const inWl = movie && isInWatchlist(movie.id);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(id).then((d) => { setMovie(d); setLoading(false); });
  }, [id]);

  if (loading) return <div className="page-loading"><div className="spinner"/></div>;
  if (!movie || movie.status_code) return <div className="page"><p className="empty-msg">Film introuvable.</p></div>;

  const director = movie.credits?.crew?.find((c) => c.job === 'Director');
  const runtime = movie.runtime ? `${movie.runtime} min` : '';
  const overview = movie.overview || 'Aucune description disponible.';
  const shortOverview = overview.length > 200 ? overview.slice(0, 200) + '...' : overview;

  const today = new Date();
  const days = DAYS.map((d, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return { label: d, num: date.getDate(), month: date.toLocaleString('fr-FR', { month: 'short' }).toUpperCase().replace('.',''), dateISO: date.toISOString() };
  });

  return (
    <div className="page film-detail-page">
      {movie.backdrop_path && (
        <div className="film-detail-backdrop">
          <img src={getBackdropUrl(movie.backdrop_path)} alt="" />
          <div className="backdrop-overlay"/>
        </div>
      )}
      <button className="back-btn" onClick={() => navigate(-1)}>✕</button>
      <div className="film-detail-content">
        <div className="film-detail-top">
          <img className="film-detail-poster" src={getPosterUrl(movie.poster_path, 'w342')} alt={movie.title} />
          <div className="film-detail-meta">
            <h1 className="film-detail-title">{movie.title}</h1>
            <p className="film-detail-sub">
              {director && <><span>Réalisation : {director.name}</span><br/></>}
              {runtime && <><span>Temps : {runtime}</span><br/></>}
              {movie.release_date && <span>Sortie : {movie.release_date}</span>}
            </p>
          </div>
        </div>
        <div className="film-detail-overview">
          <p>{expanded ? overview : shortOverview}</p>
          {overview.length > 200 && <button className="link-btn" onClick={() => setExpanded(!expanded)}>{expanded ? 'Voir MOINS' : 'Voir PLUS'}</button>}
        </div>
        <div className="film-detail-actions">
          <button className="action-btn" onClick={() => inWl ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            {inWl ? '✓ WATCHLIST' : 'WATCHLIST'}
          </button>
          <button className="action-btn" onClick={() => navigator.share?.({ title: movie.title, url: window.location.href })}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            PARTAGER
          </button>
        </div>
        <div className="film-days">
          {days.map((d, i) => (
            <button key={i} className={`day-btn${selectedDay === i ? ' active' : ''}`} onClick={() => { setSelectedDay(i); navigate(`/booking/${movie.id}`, { state: { movie, day: d, cinema: UGC_CINEMAS[0] } }); }}>
              <span className="day-label">{d.label}</span>
              <span className="day-num">{d.num}</span>
              <span className="day-month">{d.month}</span>
            </button>
          ))}
          <button className="day-btn"><span className="day-label" style={{fontSize:'9px',lineHeight:'1.2'}}>PLUS DE DATE</span></button>
        </div>
        <div className="film-bottom-actions">
          <button className="bottom-action-btn" onClick={() => inWl ? removeFromWatchlist(movie.id) : addToWatchlist(movie)}>★ FAVORIS</button>
          <button className="bottom-action-btn" onClick={() => navigate('/cinemas')}>À PROXIMITÉ</button>
        </div>
        {movie.similar?.results?.length > 0 && (
          <section className="home-section" style={{marginTop:'24px'}}>
            <div className="section-tag">SIMILAIRES</div>
            <div className="films-scroll">
              {movie.similar.results.slice(0,5).map((m) => (
                <div key={m.id} className="film-card film-card--sm" onClick={() => navigate(`/film/${m.id}`)}>
                  <img src={getPosterUrl(m.poster_path,'w185')} alt={m.title} loading="lazy"/>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
