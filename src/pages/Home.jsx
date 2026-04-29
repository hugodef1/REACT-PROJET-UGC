import { useState, useEffect } from 'react';
import styles from './Home.module.css';
import MovieCard from '../components/MovieCard';

function Home() {
  const [films, setFilms] = useState([]);

  // Récupération des films au lancement de la page
  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=919f5085685a29d7fdea8d1652969af7&language=fr-FR&region=FR';
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setFilms(data.results.slice(0, 20)); // On garde juste les 20 premiers pour la grille
        }
      })
      .catch((err) => console.error("Erreur API :", err));
  }, []);

  return (
    <div className={styles.homeContainer}>
      
      {/* Filtres du haut */}
      <div className={styles.topButtons}>
        <button className={styles.pillBtn}><span>🎟️</span> LES DISPOS</button>
        <button className={styles.pillBtn}><span>📅</span> LES JOURS</button>
      </div>

      <div className={styles.sectionHeader}>
        <span className={styles.sectionBadge}>UGC AIME</span>
      </div>
      <div className={styles.carouselContainer}>
      </div>

      <div className={styles.sectionHeader}>
        <span className={styles.sectionBadge}>À L'AFFICHE</span>
      </div>
      
      <div className={styles.moviesGrid}>
        {films.map((film) => {
          const imageUrl = `https://image.tmdb.org/t/p/w500${film.poster_path}`;

          return (
            <MovieCard 
              key={film.id} 
              id={film.id}
              image={imageUrl} 
              badge="" 
              showHeart={true} 
            />
          );
        })}
      </div>

    </div>
  );
}

export default Home;