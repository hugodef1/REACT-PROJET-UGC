import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Watchlist.module.css';

const IMG_URL = 'https://image.tmdb.org/t/p/w342';

function Watchlist() {
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);
  const [activeTab, setActiveTab] = useState('watchlist'); // 'watchlist' | 'aNoter'

  useEffect(() => {
    const wl = JSON.parse(localStorage.getItem('ugc_watchlist') || '[]');
    setWatchlist(wl);
  }, []);

  const removeFromWatchlist = (id) => {
    const newWl = watchlist.filter(m => m.id !== id);
    localStorage.setItem('ugc_watchlist', JSON.stringify(newWl));
    setWatchlist(newWl);
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>←</button>
        <h1 className={styles.headerTitle}>MA WATCHLIST</h1>
      </div>

      {/* TABS */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'aNoter' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('aNoter')}
        >
          <span className={styles.tabIcon}>⭐</span> MES FILMS À NOTER
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'watchlist' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('watchlist')}
        >
          <span className={styles.tabIcon}>👁️</span> MA WATCHLIST
        </button>
      </div>

      {/* COMPTEUR */}
      {activeTab === 'watchlist' && (
        <div className={styles.counter}>
          <span className={styles.counterIcon}>👁️</span>
          <span>MES FILMS À VOIR</span>
          <span className={styles.counterBadge}>{watchlist.length}</span>
        </div>
      )}

      {activeTab === 'aNoter' && (
        <div className={styles.counter}>
          <span className={styles.counterIcon}>⭐</span>
          <span>MES FILMS À NOTER</span>
          <span className={styles.counterBadge}>0</span>
        </div>
      )}

      {/* GRILLE DE FILMS */}
      {activeTab === 'watchlist' && (
        <div className={styles.grid}>
          {watchlist.length === 0 ? (
            <div className={styles.empty}>
              <p>👁️</p>
              <p>Votre watchlist est vide</p>
              <p>Ajoutez des films depuis leur page de détail</p>
            </div>
          ) : (
            watchlist.map(film => (
              <div key={film.id} className={styles.card} onClick={() => navigate(`/film/${film.id}`)}>
                <img
                  src={film.poster_path ? `${IMG_URL}${film.poster_path}` : 'https://via.placeholder.com/150x220/000B4D/white?text=N/A'}
                  alt={film.title}
                  className={styles.poster}
                />
                <button
                  className={styles.removeBtn}
                  onClick={(e) => { e.stopPropagation(); removeFromWatchlist(film.id); }}
                >✕</button>
                <div className={styles.overlay}>
                  <span className={styles.movieTitle}>{film.title}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'aNoter' && (
        <div className={styles.empty}>
          <p>⭐</p>
          <p>Aucun film à noter</p>
          <p>Les films que vous avez vus apparaîtront ici</p>
        </div>
      )}
    </div>
  );
}

export default Watchlist;
