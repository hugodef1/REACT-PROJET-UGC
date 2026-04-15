import { useNavigate } from 'react-router-dom';
import { useWatchlist } from '../../context/WatchlistContext';
import { getPosterUrl } from '../../api/tmdb';

export default function FilmCard({ movie, size = 'md', showRemove = false }) {
  const navigate = useNavigate();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inWl = isInWatchlist(movie.id);

  const handleHeart = (e) => {
    e.stopPropagation();
    inWl ? removeFromWatchlist(movie.id) : addToWatchlist(movie);
  };

  return (
    <div className={`film-card film-card--${size}`} onClick={() => navigate(`/film/${movie.id}`)}>
      <div className="film-card-poster">
        <img src={getPosterUrl(movie.poster_path)} alt={movie.title} loading="lazy" />
        {showRemove ? (
          <button className="film-remove-btn" onClick={handleHeart}>&#8722;</button>
        ) : (
          <button className={`film-heart-btn${inWl ? ' active' : ''}`} onClick={handleHeart}>
            <svg viewBox="0 0 24 24" fill={inWl ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
          </button>
        )}
      </div>
      {size !== 'sm' && <p className="film-card-title">{movie.title}</p>}
    </div>
  );
}
