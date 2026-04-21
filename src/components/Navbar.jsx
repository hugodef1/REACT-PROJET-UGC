import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

// 1. On importe toutes les images de ton dossier assets
import logoUgcImg from '../assets/logoUGC.png';
import filmsIcon from '../assets/films.png';
import cinemasIcon from '../assets/cinemas.png';
import resasIcon from '../assets/mesresas.png';
import compteIcon from '../assets/compte.png';

function Navbar() {
  return (
    <header className={styles.header}>
      
      {/* ZONE LOGO */}
      <div className={styles.logoContainer}>
        <Link to="/">
          <img src={logoUgcImg} alt="Logo UGC" className={styles.logoImage} />
        </Link>
      </div>

      {/* ZONE RECHERCHE (Inchangée) */}
      <div className={styles.searchContainer}>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input 
            type="text" 
            placeholder="Rechercher un film, réalisateur, acteur..." 
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* ZONE NAVIGATION : On remplace les emojis par les images */}
      <nav className={styles.navMenu}>
        
        <Link to="/films" className={styles.navItem}>
          <img src={filmsIcon} alt="Films" className={styles.iconImage} />
          <span>FILMS</span>
        </Link>

        <Link to="/cinemas" className={styles.navItem}>
          <img src={cinemasIcon} alt="Cinémas" className={styles.iconImage} />
          <span>CINÉMAS</span>
        </Link>

        <Link to="/reservations" className={styles.navItem}>
          <img src={resasIcon} alt="Mes Résas" className={styles.iconImage} />
          <span>MES RÉSAS</span>
        </Link>

        <Link to="/compte" className={styles.navItem}>
          <img src={compteIcon} alt="Compte" className={styles.iconImage} />
          <span>COMPTE</span>
        </Link>

      </nav>

    </header>
  );
}

export default Navbar;