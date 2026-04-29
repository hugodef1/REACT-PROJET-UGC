import styles from '../pages/Cinema.module.css';

function CinemaCard({ cinema }) {
  return (
    <div className={styles.cinemaCard}>
      <div className={styles.cardTop}>
        <img src={cinema.image} alt={cinema.name} className={styles.cinemaImage} />
        <div className={styles.cinemaInfo}>
          <div className={styles.titleRow}>
            <h2>{cinema.name}</h2>
            <span className={styles.statusBadge}>{cinema.status}</span>
          </div>
          <div className={styles.formatsRow}>
            {cinema.formats.map((format, idx) => (
              <span key={idx} className={styles.formatBadge}>{format}</span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.cardActions}>
        <button onClick={() => alert(`Les horaires pour ${cinema.name} seront bientôt disponibles !`)}>
          🕒 Horaires
        </button>
        <button onClick={() => window.location.href = "tel:0892700000"}>
          📞 Appeler
        </button>
        <button onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cinema.name + " " + cinema.address)}`, '_blank')}>
          🗺️ Itinéraire
        </button>
      </div>
    </div>
  );
}

export default CinemaCard;