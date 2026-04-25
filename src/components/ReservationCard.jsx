import styles from './ReservationCard.module.css';

function ReservationCard({ title, date, cinema, seats, format, status, image }) {
  // Petite logique pour changer la couleur du statut selon s'il est confirmé ou en attente
  const isConfirmed = status === "CONFIRMÉ";

  return (
    <div className={styles.card}>
      
      {/* HAUT : Les infos du film */}
      <div className={styles.cardContent}>
        <img src={image} alt={`Affiche de ${title}`} className={styles.poster} />
        
        <div className={styles.details}>
          <h3 className={styles.title}>{title}</h3>
          
          <div className={styles.infoRow}>
            <span className={styles.icon}>📅</span>
            <span>{date}</span>
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.icon}>📍</span>
            <span>{cinema}</span>
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.icon}>🎟️</span>
            <span>{seats}</span>
          </div>

          {/* Les badges */}
          <div className={styles.badges}>
            {format && <span className={styles.badgeFormat}>{format}</span>}
            <span className={`${styles.badgeStatus} ${isConfirmed ? styles.confirmed : styles.pending}`}>
              {status}
            </span>
          </div>
        </div>
      </div>

      {/* BAS : Les boutons d'action */}
      <div className={styles.actions}>
        <button className={styles.actionBtn}>
          <span>⬇️</span> E-Billet
        </button>
        <div className={styles.divider}></div>
        <button className={styles.actionBtn}>
          <span>🔗</span> Partager
        </button>
        <div className={styles.divider}></div>
        <button className={`${styles.actionBtn} ${styles.cancelBtn}`}>
          <span>🗑️</span> Annuler
        </button>
      </div>

    </div>
  );
}

export default ReservationCard;