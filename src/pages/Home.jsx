import styles from './Home.module.css';

function Home() {
  // Liste de tes catégories de filtres
  const categories = [
    "LABELS", "ÉVÉNEMENTS", "EN FAMILLE", "ACTION", "DRAME", "ROMANCE", "SCIENCE FICTION"
  ];

  // La liste des films de ta maquette avec leurs badges
  const films = [
    { id: 1, image: "https://image.tmdb.org/t/p/w500/2Lg24EHKvjWvWcEvb9XJjQoO9yP.jpg", badge: "ANCIEN" }, // Tontons Flingueurs
    { id: 2, image: "https://image.tmdb.org/t/p/w500/m1bO3V6N2y1f1m0G1s1rL6bX1Y1.jpg", badge: "UGC AIME" }, // L'Amour Ouf (Placeholder)
    { id: 3, image: "https://image.tmdb.org/t/p/w500/A0v41sHItO4eX2M0wK0G3b7P3F.jpg", badge: "" }, // Indiana Jones
    { id: 4, image: "https://image.tmdb.org/t/p/w500/4ucLGcCN4X120H1Q0Fz3Dpx3F6.jpg", badge: "" }, // L'Exorciste
    { id: 5, image: "https://image.tmdb.org/t/p/w500/udDclJoHjfpt8o11B1y0y2yQx6.jpg", badge: "UGC AIME" }, // Joker
    { id: 6, image: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg", badge: "UGC AIME" }, // Avatar
    { id: 7, image: "https://image.tmdb.org/t/p/w500/1X1C1N3E10Wp2uV3W1pA2R1yX1.jpg", badge: "" }, // Gladiator (Placeholder)
    { id: 8, image: "https://image.tmdb.org/t/p/w500/7E1F2b2v9K3y1Q8G2M1rL6bX1Y1.jpg", badge: "ANCIEN" } // Les Tuche (Placeholder)
  ];

  return (
    <div className={styles.homeContainer}>
      
      {/* 1. LES FILTRES GLOBAUX (Favoris / Jours) */}
      <div className={styles.globalFilters}>
        <button className={styles.filterBtn}>
          <span>🎫</span> Tous mes favoris
        </button>
        <button className={styles.filterBtn}>
          <span>📅</span> Tous les jours
        </button>
      </div>

      {/* 2. LES FILTRES DE GENRES */}
      <div className={styles.categoryFilters}>
        <button className={styles.iconBtn}>⚙️</button>
        {categories.map((cat, index) => (
          <button key={index} className={styles.categoryBtn}>
            {cat}
          </button>
        ))}
      </div>

      {/* 3. LA GRILLE DE FILMS */}
      <div className={styles.moviesGrid}>
        {films.map((film) => (
          <div key={film.id} className={styles.movieCard}>
            <img src={film.image} alt="Affiche du film" className={styles.poster} />
            
            {/* On n'affiche le badge que s'il y a du texte dedans */}
            {film.badge && (
              <div className={styles.badge}>{film.badge}</div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

export default Home;