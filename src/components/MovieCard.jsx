import { useNavigate } from 'react-router-dom';
import styles from './MovieCard.module.css';

function MovieCard({ id, image, badge, showHeart, onRemove }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/film/${id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img src={image} alt="Affiche" className={styles.poster} />
      
      {badge && (
        <div className={styles.badge}>{badge}</div>
      )}

      {showHeart && (
        <div className={styles.heart}>🤍</div>
      )}

      {/* Bouton pour supprimer de la watchlist*/}
      {onRemove && (
        <button 
          className={styles.removeBtn} 
          onClick={(e) => {
            e.stopPropagation(); // empêche de cliquer sur la carte quand on clique sur supprimer
            onRemove(id);
          }}
        >
          ➖
        </button>
      )}
    </div>
  );
}

export default MovieCard;