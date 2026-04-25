import { useNavigate } from 'react-router-dom';
import styles from './MovieCard.module.css';

function MovieCard({ image, badge, showHeart, filmId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (filmId) navigate(`/film/${filmId}`);
  };

  return (
    <div className={styles.card} onClick={handleClick} style={{ cursor: filmId ? 'pointer' : 'default' }}>
      <img src={image} alt="Affiche du film" className={styles.poster} />
      
      {badge && (
        <div className={styles.badge}>{badge}</div>
      )}

      {showHeart && (
        <div className={styles.heart}>🤍</div>
      )}
    </div>
  );
}

export default MovieCard;