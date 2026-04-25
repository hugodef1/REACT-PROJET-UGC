import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Compte.module.css';

function Compte() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('films'); // 'films' | 'watchlist' | 'collection'

  const userName = 'Jean';

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.greeting}>
          <div className={styles.greetingTop}>
            <span>Bonjour, {userName}</span>
            <button className={styles.settingsBtn}>⚙️</button>
          </div>
          <span className={styles.greetingSub}>MES FILMS</span>
        </div>
      </div>

      {/* MENU PRINCIPAL */}
      <div className={styles.mainMenu}>
        <button
          className={`${styles.menuBtn} ${activeTab === 'films' ? styles.menuBtnActive : ''}`}
          onClick={() => setActiveTab('films')}
        >
          <span className={styles.menuIcon}>⭐</span>
          <span>FILMS À NOTER</span>
        </button>
        <button
          className={`${styles.menuBtn} ${activeTab === 'watchlist' ? styles.menuBtnActive : ''}`}
          onClick={() => { setActiveTab('watchlist'); navigate('/watchlist'); }}
        >
          <span className={styles.menuIcon}>👁️</span>
          <span>MA WATCHLIST</span>
        </button>
        <button
          className={`${styles.menuBtn} ${activeTab === 'collection' ? styles.menuBtnActive : ''}`}
          onClick={() => setActiveTab('collection')}
        >
          <span className={styles.menuIcon}>🎬</span>
          <span>MA COLLECTION UGC</span>
        </button>
      </div>

      {/* INFOS CARTE */}
      <div className={styles.carteSection}>
        <div className={styles.carteUgc}>
          <div className={styles.carteHeader}>
            <span className={styles.carteLogo}>UGC</span>
            <span className={styles.carteType}>ILLIMITÉ</span>
          </div>
          <div className={styles.carteBody}>
            <p className={styles.carteName}>Jean Dupont</p>
            <p className={styles.carteNum}>**** **** **** 4521</p>
            <p className={styles.carteExpiry}>Valable jusqu'au 12/2026</p>
          </div>
        </div>
      </div>

      {/* SECTION OPTIONS */}
      <div className={styles.optionsList}>
        <div className={styles.optionGroup}>
          <div className={styles.optionGroupTitle}>MON COMPTE</div>
          {[
            { icon: '👤', label: 'Mon profil' },
            { icon: '🎟️', label: 'Mes réservations', path: '/reservations' },
            { icon: '💳', label: 'Mes moyens de paiement' },
            { icon: '🔔', label: 'Notifications' },
          ].map((opt, i) => (
            <button
              key={i}
              className={styles.option}
              onClick={() => opt.path && navigate(opt.path)}
            >
              <span className={styles.optionIcon}>{opt.icon}</span>
              <span className={styles.optionLabel}>{opt.label}</span>
              <span className={styles.optionArrow}>›</span>
            </button>
          ))}
        </div>

        <div className={styles.optionGroup}>
          <div className={styles.optionGroupTitle}>PRÉFÉRENCES</div>
          {[
            { icon: '🎭', label: 'Genres favoris' },
            { icon: '🌍', label: 'Cinéma favori' },
            { icon: '🔤', label: 'Langue' },
          ].map((opt, i) => (
            <button key={i} className={styles.option}>
              <span className={styles.optionIcon}>{opt.icon}</span>
              <span className={styles.optionLabel}>{opt.label}</span>
              <span className={styles.optionArrow}>›</span>
            </button>
          ))}
        </div>

        <div className={styles.optionGroup}>
          <div className={styles.optionGroupTitle}>AIDE</div>
          {[
            { icon: '❓', label: "Besoin d'aide ?" },
            { icon: '📞', label: 'Nous contacter' },
            { icon: '📋', label: 'CGV' },
          ].map((opt, i) => (
            <button key={i} className={styles.option}>
              <span className={styles.optionIcon}>{opt.icon}</span>
              <span className={styles.optionLabel}>{opt.label}</span>
              <span className={styles.optionArrow}>›</span>
            </button>
          ))}
        </div>

        <button className={styles.logoutBtn}>
          Déconnexion
        </button>
      </div>
    </div>
  );
}

export default Compte;
