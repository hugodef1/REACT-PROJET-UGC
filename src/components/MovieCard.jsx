import styles from './MovieCard.module.css';

function MovieCard({ image, badge, showHeart }) {
  return (
    <div className={styles.card}>
      <img src={image} alt="Affiche du film" className={styles.poster} />
      
      {/* Si un badge est fourni, on l'affiche */}
      {badge && (
        <div className={styles.badge}>{badge}</div>
      )}

      {/* Si showHeart est vrai, on affiche le coeur */}
      {showHeart && (
        <div className={styles.heart}>🤍</div>
      )}
    </div>
  );
}

export default MovieCard;