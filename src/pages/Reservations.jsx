import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Reservations.module.css';

const RESERVATIONS = [
  {
    id: 1,
    film: 'The Dark Knight',
    cinema: 'UGC Ciné Cité Les Halles',
    date: '4 Février 2026 à 21h30',
    salle: '7',
    places: ['22A4G31 - G1', '22A4G31 - G2'],
    statut: 'CONFIRMÉE',
    image: 'https://image.tmdb.org/t/p/w342/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  },
  {
    id: 2,
    film: 'Inception',
    cinema: 'UGC Bercy',
    date: '12 Février 2026 à 19h00',
    salle: '3',
    places: ['12C2G15 - F3'],
    statut: 'ANNULÉE',
    image: 'https://image.tmdb.org/t/p/w342/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
  },
];

function Reservations() {
  const navigate = useNavigate();
  const [activeResa, setActiveResa] = useState(null);

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Mes Réservations</h1>
        <p className={styles.headerSub}>Gérez vos séances à venir</p>
      </div>

      {/* STATS */}
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>3</span>
          <span className={styles.statLabel}>Réservations à venir</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>6</span>
          <span className={styles.statLabel}>Films vus ce mois</span>
        </div>
      </div>

      {/* SECTION À VENIR */}
      <div className={styles.sectionTitle}>À venir</div>

      <div className={styles.resaList}>
        {RESERVATIONS.map(resa => (
          <div
            key={resa.id}
            className={`${styles.resaCard} ${activeResa === resa.id ? styles.resaExpanded : ''}`}
            onClick={() => setActiveResa(activeResa === resa.id ? null : resa.id)}
          >
            <div className={styles.resaTop}>
              <img src={resa.image} alt={resa.film} className={styles.resaPoster} />
              <div className={styles.resaInfos}>
                <h3 className={styles.resaTitle}>{resa.film}</h3>
                <p className={styles.resaCinema}>📍 {resa.cinema}</p>
                <p className={styles.resaDate}>📅 {resa.date}</p>
                <p className={styles.resaDate}>🎭 Salle {resa.salle}</p>
                <p className={styles.resaDate}>🎟️ {resa.places.join(', ')}</p>
                <span className={`${styles.statutBadge} ${resa.statut === 'ANNULÉE' ? styles.statutAnnule : styles.statutConfirme}`}>
                  {resa.statut}
                </span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className={styles.resaActions}>
              <button className={styles.resaBtn}>
                <span>📱</span> E-billet
              </button>
              <button className={styles.resaBtn}>
                <span>📤</span> Partager
              </button>
              {resa.statut !== 'ANNULÉE' && (
                <button className={`${styles.resaBtn} ${styles.resaBtnCancel}`}>
                  Annuler
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* HISTORIQUE */}
      <div className={styles.sectionTitle}>Historique</div>
      <div className={styles.emptyHistory}>
        <p>🎬</p>
        <p>Aucun historique</p>
      </div>
    </div>
  );
}

export default Reservations;
