import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

// Imports des images et icônes (assure-toi d'avoir ces fichiers dans src/assets)
import logoUgcImg from '../assets/logoUGC.png';
import filmsIcon from '../assets/films.png';
import cinemasIcon from '../assets/cinemas.png';
import resasIcon from '../assets/mesresas.png';
import compteIcon from '../assets/compte.png';

function Navbar() {
  return (
    <>
      {/* =======================================
          VERSION ORDINATEUR (Barre en haut) 
      ======================================= */}
      <header className={styles.desktopNavbar}>
        
        {/* LOGO */}
        <div className={styles.logoContainer}>
          <Link to="/">
            <img src={logoUgcImg} alt="Logo UGC" className={styles.logoImage} />
          </Link>
        </div>

        {/* BARRE DE RECHERCHE */}
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

        {/* MENU NAVIGATION */}
        <nav className={styles.navMenu}>
          <Link to="" className={styles.navItem}>
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


      {/* =======================================
          VERSION MOBILE (Barre app en bas) 
      ======================================= */}
      <nav className={styles.mobileNavbar}>
        
        <Link to="" className={styles.mobileNavItem}>
          <img src={filmsIcon} alt="Films" />
          <span>FILMS</span>
        </Link>
        
        <Link to="/cinemas" className={styles.mobileNavItem}>
          <img src={cinemasIcon} alt="Cinémas" />
          <span>CINÉMAS</span>
        </Link>
        
        {/* BOUTON RECHERCHE CENTRAL (Style Squircle) */}
        <div className={styles.mobileSearchWrapper}>
          <button className={styles.mobileSearchBtn}>
            <span className={styles.searchIconMobile}>🔍</span>
          </button>
        </div>

        <Link to="/reservations" className={styles.mobileNavItem}>
          <img src={resasIcon} alt="Résas" />
          <span>MES RÉSAS</span>
        </Link>
        
        <Link to="/compte" className={styles.mobileNavItem}>
          <img src={compteIcon} alt="Compte" />
          <span>COMPTE</span>
        </Link>
        
      </nav>
    </>
  );
}

export default Navbar;