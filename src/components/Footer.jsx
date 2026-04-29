import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

import logoUgcImg from '../assets/logoUGC.png';
import facebookIcon from '../assets/facebook.png';
import instagramIcon from '../assets/instagram.png';
import twitterIcon from '../assets/twitter.png';
import linkedinIcon from '../assets/linkedin.png';
import youtubeIcon from '../assets/youtube.png';

function Footer() {
  return (
    <footer className={styles.footer}>
      
      {/* 1. RÉSEAUX SOCIAUX & LOGO */}
      <div className={styles.topSection}>
        <div className={styles.socials}>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img src={facebookIcon} alt="Facebook" className={styles.socialIcon} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <img src={instagramIcon} alt="Instagram" className={styles.socialIcon} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <img src={twitterIcon} alt="Twitter" className={styles.socialIcon} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" className={styles.socialIcon} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <img src={youtubeIcon} alt="YouTube" className={styles.socialIcon} />
          </a>
        </div>
        <img src={logoUgcImg} alt="UGC" className={styles.footerLogo} />
      </div>

      {/* 2. LIENS PRINCIPAUX */}
      <nav className={styles.mainNav}>
        <Link to="/aide">Besoin d’aide ?</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/recrutement">UGC Recrute</Link>
        <Link to="/groupe">Groupe UGC</Link>
        <Link to="/rh">Politique RH du Groupe</Link>
        <Link to="/confidentialite">Politique de confidentialité</Link>
        <Link to="/cgv">Conditions générales</Link>
        <Link to="/mentions">Mentions Légales</Link>
      </nav>

      {/* 3. LIENS SECONDAIRES */}
      <nav className={styles.secondaryNav}>
        <Link to="/cookies">Cookies</Link>
        <Link to="/accessibilite">Accessibilité : non conforme</Link>
        <Link to="/charte">Charte des spectateurs</Link>
      </nav>

    </footer>
  );
}

export default Footer;