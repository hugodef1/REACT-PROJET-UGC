import { useState, useEffect } from 'react';
import styles from './Home.module.css';
import MovieCard from '../components/MovieCard';

function Home() {
  // 1. Notre boîte de stockage pour les films de l'API (vide au départ)
  const [films, setFilms] = useState([]);

  // 2. On va chercher les films quand la page charge
  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=919f5085685a29d7fdea8d1652969af7&language=fr-FR&region=FR';

    fetch(url)
      .then((reponse) => reponse.json())
      .then((donnees) => {
        // L'API nous renvoie plein de choses, mais les films sont dans "results"
        if (donnees.results) {
          // On garde seulement les 20 premiers films pour coller à ta maquette
          setFilms(donnees.results.slice(0, 20)); 
        }
      })
      .catch((erreur) => console.error("Erreur API :", erreur));
  }, []);

  return (
    <div className={styles.homeContainer}>
      
      {/* BOUTONS HAUT DE PAGE */}
      <div className={styles.topButtons}>
        <button className={styles.pillBtn}><span>🎟️</span> LES DISPOS</button>
        <button className={styles.pillBtn}><span>📅</span> LES JOURS</button>
      </div>

      {/* SECTION CARROUSEL : UGC AIME (Géré plus tard avec d'autres données) */}
      <div className={styles.sectionHeader}>
        <span className={styles.sectionBadge}>UGC AIME</span>
      </div>
      <div className={styles.carouselContainer}>
        {/* On laisse vide ou on met des fausses cartes en attendant */}
      </div>

      {/* SECTION GRILLE : À L'AFFICHE */}
      <div className={styles.sectionHeader}>
        <span className={styles.sectionBadge}>À L'AFFICHE</span>
      </div>
      
      <div className={styles.moviesGrid}>
        {/* 3. LA CORRECTION EST ICI : On utilise "films.map" ! */}
        {films.map((film) => {
          // TMDB donne juste la fin de l'URL de l'image, il faut rajouter le début
          const imageUrl = `https://image.tmdb.org/t/p/w500${film.poster_path}`;

          return (
            <MovieCard 
              key={film.id} 
              image={imageUrl} 
              badge="" /* On pourra mettre des badges dynamiques plus tard */
              showHeart={true} 
            />
          );
        })}
      </div>

    </div>
  );
}

export default Home;