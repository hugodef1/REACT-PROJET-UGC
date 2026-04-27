import { useState, useEffect } from 'react';
import styles from './Compte.module.css';
import MovieCard from '../components/MovieCard';

function Compte() {
  // Bidouille pour faire deux pages en une : 'accueil' ou 'watchlist'
  const [vueActuelle, setVueActuelle] = useState('accueil');
  const [watchlist, setWatchlist] = useState([]);

  // Récupère les données enregistrées par FilmDetail.jsx
  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem('ugc_watchlist') || '[]');
    setWatchlist(savedMovies);
  }, [vueActuelle]); // On recharge à chaque fois qu'on ouvre l'onglet

  // Fonction pour enlever un film directement depuis la liste
  const removeFromWatchlist = (idToRemove) => {
    const updatedList = watchlist.filter(film => film.id !== idToRemove);
    setWatchlist(updatedList);
    localStorage.setItem('ugc_watchlist', JSON.stringify(updatedList)); // maj du localstorage
  };

  // ==========================================
  // VUE 2 : LA WATCHLIST DYNAMIQUE
  // ==========================================
  if (vueActuelle === 'watchlist') {
    return (
      <div className={styles.compteContainer}>
        
        <div className={styles.headerWatchlist}>
          <button className={styles.backBtn} onClick={() => setVueActuelle('accueil')}>
            ⬅️
          </button>
        </div>

        <div className={styles.filterContainer}>
          <div className={styles.filterPill}>
            <div className={styles.pillLeft}>
              <span>👁️</span> MES FILMS À VOIR
            </div>
            {/* Affiche le vrai nombre de films ! */}
            <span className={styles.pillCount}>{watchlist.length}</span>
          </div>
        </div>

        <div className={styles.moviesGrid}>
          {watchlist.length === 0 ? (
            <p style={{textAlign: "center", width: "100%", gridColumn: "span 2"}}>
              Ta watchlist est vide. Va ajouter des films !
            </p>
          ) : (
            watchlist.map((film) => (
              <MovieCard 
                key={film.id} 
                id={film.id}
                image={`https://image.tmdb.org/t/p/w500${film.poster_path}`} 
                showHeart={false} 
                onRemove={removeFromWatchlist} // On passe la fonction de suppression
              />
            ))
          )}
        </div>

      </div>
    );
  }

  // ==========================================
  // VUE 1 : MENU DU COMPTE
  // ==========================================
  return (
    <div className={styles.compteContainer}>
      
      <div className={styles.headerCompte}>
        <h1 className={styles.title}>Bonjour, Jean</h1>
        <button className={styles.settingsBtn}>⚙️</button>
      </div>

      <h2 className={styles.sectionSubtitle}>MES FILMS</h2>

      <div className={styles.actionGrid}>
        <button className={styles.actionCard}>
          <span className={styles.cardIcon}>⭐</span>
          <span className={styles.cardText}>FILMS A NOTER</span>
        </button>

        {/* Clic pour switch sur la vue watchlist */}
        <button className={styles.actionCard} onClick={() => setVueActuelle('watchlist')}>
          <span className={styles.cardIcon}>👁️</span>
          <span className={styles.cardText}>MA WATCHLIST</span>
        </button>

        <button className={`${styles.actionCard} ${styles.fullWidth}`}>
          <span className={styles.cardText}>MA COLLECTION<br/>UGC</span>
        </button>
      </div>

    </div>
  );
}

export default Compte;