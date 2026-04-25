import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './FilmDetail.module.css';

const API_KEY = '919f5085685a29d7fdea8d1652969af7';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_URL = 'https://image.tmdb.org/t/p/original';

const SEANCES = [
  { jour: 'VEN', date: '14 FÉVR.' },
  { jour: 'SAM', date: '15 FÉVR.' },
  { jour: 'DIM', date: '16 FÉVR.' },
  { jour: 'LUN', date: '17 FÉVR.' },
  { jour: 'PLUS DE DATE', date: '' },
];

const HORAIRES = ['14h00', '16h30', '19h00', '21h30'];

function FilmDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeJour, setActiveJour] = useState(0);
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`)
      .then(r => r.json())
      .then(data => {
        setFilm(data);
        setLoading(false);
        // Check watchlist
        const wl = JSON.parse(localStorage.getItem('ugc_watchlist') || '[]');
        setInWatchlist(wl.some(m => m.id === data.id));
      })
      .catch(() => setLoading(false));
  }, [id]);

  const toggleWatchlist = () => {
    const wl = JSON.parse(localStorage.getItem('ugc_watchlist') || '[]');
    if (inWatchlist) {
      const newWl = wl.filter(m => m.id !== film.id);
      localStorage.setItem('ugc_watchlist', JSON.stringify(newWl));
      setInWatchlist(false);
    } else {
      wl.push({
        id: film.id,
        title: film.title,
        poster_path: film.poster_path,
        vote_average: film.vote_average,
        release_date: film.release_date,
      });
      localStorage.setItem('ugc_watchlist', JSON.stringify(wl));
      setInWatchlist(true);
    }
  };

  if (loading) return <div className={styles.loading}><div className={styles.spinner}></div></div>;
  if (!film) return <div className={styles.error}>Film introuvable</div>;

  const genres = film.genres?.map(g => g.name).join(' • ') || '';
  const duree = film.runtime ? `${Math.floor(film.runtime / 60)}h${String(film.runtime % 60).padStart(2, '0')}` : '';
  const annee = film.release_date ? film.release_date.slice(0, 4) : '';

  return (
    <div className={styles.container}>
      {/* BACKDROP */}
      <div className={styles.backdropWrapper}>
        {film.backdrop_path && (
          <img
            src={`${BACKDROP_URL}${film.backdrop_path}`}
            alt=""
            className={styles.backdrop}
          />
        )}
        <div className={styles.backdropGradient} />
        <button className={styles.backBtn} onClick={() => navigate(-1)}>✕</button>
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className={styles.content}>
        {/* POSTER + INFOS */}
        <div className={styles.topSection}>
          <img
            src={film.poster_path ? `${IMG_URL}${film.poster_path}` : 'https://via.placeholder.com/120x180/000B4D/white?text=N/A'}
            alt={film.title}
            className={styles.poster}
          />
          <div className={styles.infos}>
            <h1 className={styles.title}>{film.title}</h1>
            <p className={styles.meta}>
              {[genres, duree, annee].filter(Boolean).join(' • ')}
            </p>
            {film.vote_average > 0 && (
              <div className={styles.rating}>
                <span className={styles.star}>⭐</span>
                <span>{film.vote_average.toFixed(1)}/10</span>
              </div>
            )}
          </div>
        </div>

        {/* SYNOPSIS */}
        {film.overview && (
          <p className={styles.synopsis}>{film.overview}</p>
        )}
        <button className={styles.voirPlus}>Voir PLUS</button>

        {/* ACTIONS */}
        <div className={styles.actions}>
          <button
            className={`${styles.actionBtn} ${inWatchlist ? styles.actionActive : ''}`}
            onClick={toggleWatchlist}
          >
            <span className={styles.actionIcon}>👁️</span>
            <span className={styles.actionLabel}>WATCHLIST</span>
          </button>
          <button className={`${styles.actionBtn} ${styles.primaryBtn}`}>
            <span className={styles.actionIcon}>🎬</span>
            <span className={styles.actionLabel}>ÊTRE LE PREMIER À NOTER CE FILM</span>
          </button>
          <button className={styles.actionBtn}>
            <span className={styles.actionIcon}>📤</span>
            <span className={styles.actionLabel}>PARTAGER</span>
          </button>
        </div>

        {/* SÉANCES */}
        <div className={styles.seancesSection}>
          <div className={styles.joursRow}>
            {SEANCES.map((s, i) => (
              <button
                key={i}
                className={`${styles.jourBtn} ${activeJour === i ? styles.jourActive : ''}`}
                onClick={() => setActiveJour(i)}
              >
                <span className={styles.jourLabel}>{s.jour}</span>
                {s.date && <span className={styles.jourDate}>{s.date}</span>}
              </button>
            ))}
          </div>

          <div className={styles.horairesGrid}>
            {HORAIRES.map((h, i) => (
              <button key={i} className={styles.horaireBtn}>{h}</button>
            ))}
          </div>
        </div>

        {/* BARRE DU BAS */}
        <div className={styles.bottomBar}>
          <button className={styles.bottomBtn}>FAVORIS</button>
          <button className={styles.bottomBtnPrimary}>À PROCHAINE</button>
        </div>
      </div>
    </div>
  );
}

export default FilmDetail;
