import { useState } from 'react';
import styles from './Compte.module.css';

function Compte() {
  // Cette variable gère ce qu'on affiche : 'accueil' par défaut, ou 'watchlist'
  const [vueActuelle, setVueActuelle] = useState('accueil');

  // Tes films factices pour la watchlist (Images TMDB)
  const watchlistFilms = [
    { id: 1, image: "https://image.tmdb.org/t/p/w500/m1bO3V6N2y1f1m0G1s1rL6bX1Y1.jpg" }, // L'Amour Ouf
    { id: 2, image: "https://image.tmdb.org/t/p/w500/4ucLGcCN4X120H1Q0Fz3Dpx3F6.jpg" }, // Exorcist
    { id: 3, image: "https://image.tmdb.org/t/p/w500/udDclJoHjfpt8o11B1y0y2yQx6.jpg" }, // Joker
    { id: 4, image: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg" }, // Avatar
  ];

  // ==========================================
  // VUE 2 : LA WATCHLIST
  // ==========================================
  if (vueActuelle === 'watchlist') {
    return (
      <div className={styles.compteContainer}>
        {/* En-tête avec bouton retour */}
        <div className={styles.headerWatchlist}>
          <button className={styles.backBtn} onClick={() => setVueActuelle('accueil')}>
            ⬅️
          </button>
        </div>

        {/* Le gros bouton "Mes films à voir" */}
        <div className={styles.filterContainer}>
          <div className={styles.filterPill}>
            <div className={styles.pillLeft}>
              <span>👁️</span> MES FILMS À VOIR
            </div>
            <span className={styles.pillCount}>{watchlistFilms.length}</span>
          </div>
        </div>

        {/* La grille de la watchlist */}
        <div className={styles.moviesGrid}>
          {watchlistFilms.map((film) => (
            <div key={film.id} className={styles.movieCard}>
              <img src={film.image} alt="Affiche" className={styles.poster} />
              {/* Le petit bouton rouge pour supprimer de la liste */}
              <button className={styles.removeBtn}>➖</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // VUE 1 : L'ACCUEIL DU COMPTE (Par défaut)
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

        {/* Le clic sur ce bouton change la vue vers la watchlist ! */}
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