import { useNavigate } from 'react-router-dom';
import styles from './MovieCard.module.css';

// Composant réutilisable pour afficher une affiche de film
function MovieCard({ id, image, badge, showHeart, onRemove }) {
  const navigate = useNavigate();

  // Gestion du clic sur l'affiche
  const handleClick = () => {
    navigate(`/film/${id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img src={image} alt="Affiche" className={styles.poster} />
      
      {/* On affiche le badge seulement s'il y a du texte */}
      {badge && (
        <div className={styles.badge}>{badge}</div>
      )}

      {/* Le petit coeur blanc pour la home */}
      {showHeart && (
        <div className={styles.heart}>🤍</div>
      )}

      {/* Bouton pour supprimer de la watchlist (uniquement si onRemove est passé en prop) */}
      {onRemove && (
        <button 
          className={styles.removeBtn} 
          onClick={(e) => {
            e.stopPropagation(); // Hyper important : empêche de cliquer sur la carte quand on clique sur supprimer
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