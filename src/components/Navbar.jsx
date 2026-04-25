import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

import logoUgcImg from '../assets/logoUGC.png';
import filmsIcon from '../assets/films.png';
import cinemasIcon from '../assets/cinemas.png';
import resasIcon from '../assets/mesresas.png';
import compteIcon from '../assets/compte.png';

function Navbar() {
  const activeStyle = { color: '#1cb3de' };

  return (
    <>
      {/* VERSION ORDINATEUR */}
      <header className={styles.desktopNavbar}>
        
        <div className={styles.logoContainer}>
          <NavLink to="/">
            <img src={logoUgcImg} alt="Logo UGC" className={styles.logoImage} />
          </NavLink>
        </div>

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

        <nav className={styles.navMenu}>
          <NavLink to="/films" className={styles.navItem} style={({ isActive }) => isActive ? activeStyle : {}}>
            <img src={filmsIcon} alt="Films" className={styles.iconImage} />
            <span>FILMS</span>
          </NavLink>
          <NavLink to="/cinemas" className={styles.navItem} style={({ isActive }) => isActive ? activeStyle : {}}>
            <img src={cinemasIcon} alt="Cinémas" className={styles.iconImage} />
            <span>CINÉMAS</span>
          </NavLink>
          <NavLink to="/reservations" className={styles.navItem} style={({ isActive }) => isActive ? activeStyle : {}}>
            <img src={resasIcon} alt="Mes Résas" className={styles.iconImage} />
            <span>MES RÉSAS</span>
          </NavLink>
          <NavLink to="/compte" className={styles.navItem} style={({ isActive }) => isActive ? activeStyle : {}}>
            <img src={compteIcon} alt="Compte" className={styles.iconImage} />
            <span>COMPTE</span>
          </NavLink>
        </nav>
      </header>

      {/* VERSION MOBILE (Barre en bas) */}
      <nav className={styles.mobileNavbar}>
        
        <NavLink to="/films" className={styles.mobileNavItem} style={({ isActive }) => isActive ? activeStyle : {}}>
          <img src={filmsIcon} alt="Films" />
          <span>FILMS</span>
        </NavLink>
        
        <NavLink to="/cinemas" className={styles.mobileNavItem} style={({ isActive }) => isActive ? activeStyle : {}}>
          <img src={cinemasIcon} alt="Cinémas" />
          <span>CINÉMAS</span>
        </NavLink>
        
        {/* BOUTON RECHERCHE CENTRAL */}
        <div className={styles.mobileSearchWrapper}>
          <button className={styles.mobileSearchBtn}>
            <span className={styles.searchIconMobile}>🔍</span>
          </button>
        </div>

        <NavLink to="/reservations" className={styles.mobileNavItem} style={({ isActive }) => isActive ? activeStyle : {}}>
          <img src={resasIcon} alt="Résas" />
          <span>MES RÉSAS</span>
        </NavLink>
        
        <NavLink to="/compte" className={styles.mobileNavItem} style={({ isActive }) => isActive ? activeStyle : {}}>
          <img src={compteIcon} alt="Compte" />
          <span>COMPTE</span>
        </NavLink>
        
      </nav>
    </>
  );
}

export default Navbar;