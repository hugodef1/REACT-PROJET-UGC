import { useState, useEffect } from 'react';
import styles from './Home.module.css';
import MovieCard from '../components/MovieCard';

function Home() {
  const [films, setFilms] = useState([]);
  const [filmsUgcAime, setFilmsUgcAime] = useState([]);

  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=919f5085685a29d7fdea8d1652969af7&language=fr-FR&region=FR';

    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (d.results) {
          setFilmsUgcAime(d.results.slice(0, 6));
          setFilms(d.results.slice(0, 20));
        }
      })
      .catch((e) => console.error('Erreur API :', e));
  }, []);

  return (
    <div className={styles.homeContainer}>
      
      {/* BOUTONS HAUT DE PAGE */}
      <div className={styles.topButtons}>
        <button className={styles.pillBtn}><span>🎟️</span> LES DISPOS</button>
        <button className={styles.pillBtn}><span>📅</span> LES JOURS</button>
      </div>

      {/* SECTION CARROUSEL : UGC AIME */}
      <div className={styles.sectionHeader}>
        <span className={styles.sectionBadge}>UGC AIME</span>
      </div>
      <div className={styles.carouselContainer}>
        {filmsUgcAime.map((film) => (
          <div key={film.id} className={styles.carouselCard}>
            <MovieCard
              image={`https://image.tmdb.org/t/p/w342${film.poster_path}`}
              badge="UGC AIME"
              showHeart={false}
              filmId={film.id}
            />
          </div>
        ))}
      </div>

      {/* SECTION GRILLE : À L'AFFICHE */}
      <div className={styles.sectionHeader}>
        <span className={styles.sectionBadge}>À L'AFFICHE</span>
      </div>
      
      <div className={styles.moviesGrid}>
        {films.map((film) => (
          <MovieCard
            key={film.id}
            image={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
            badge=""
            showHeart={true}
            filmId={film.id}
          />
        ))}
      </div>

    </div>
  );
}

export default Home;