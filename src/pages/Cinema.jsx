import { useState } from 'react';
import styles from './Cinema.module.css';
import { Link } from 'react-router-dom';
import imgHalles from '../assets/halles.png.jpg';
import imgBercy from '../assets/bercy.jpg';
import imgLaDefense from '../assets/ladefense.jpg';
import imgBordeaux from '../assets/bordeaux.jpg';
import imgPartDieu from '../assets/partdieu.jpg';
import imgLille from '../assets/lille.jpg';

function Cinema() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const cinemasList = [
    {
      id: 1,
      name: "UGC Ciné Cité Les Halles",
      status: "OUVERT",
      address: "7 Place de la Rotonde, 75001 Paris",
      distance: "1.2 km",
      rating: "4.5",
      rooms: 27,
      formats: [],
      image: imgHalles
    },
    {
      id: 2,
      name: "UGC Ciné Cité Bercy",
      status: "OUVERT",
      address: "2 Cour Saint-Émilion, 75012 Paris",
      distance: "3.5 km",
      rating: "4.3",
      rooms: 18,
      formats: ["Dolby Atmos"],
      image: imgBercy   
    },
    {
      id: 3,
      name: "UGC Ciné Cité La Défense",
      status: "OUVERT",
      address: "Parvis de La Défense, 92092 Puteaux",
      distance: "7.8 km",
      rating: "4.6",
      rooms: 16,
      formats: ["IMAX", "Dolby Atmos"],
      image: imgLaDefense 
    },
    {
      id: 4,
      name: "UGC Ciné Cité Bordeaux",
      status: "OUVERT",
      address: "13-15 Rue Georges Bonnac, 33000 Bordeaux",
      distance: "2.1 km",
      rating: "4.2",
      rooms: 18,
      formats: ["Dolby Atmos"],
      image: imgBordeaux 
    },
    {
      id: 5,
      name: "UGC Ciné Cité Part-Dieu",
      status: "OUVERT",
      address: "Centre Commercial Part-Dieu, 69003 Lyon",
      distance: "4.3 km",
      rating: "4.4",
      rooms: 18,
      formats: ["IMAX"],
      image: imgPartDieu 
    },
    {
      id: 6,
      name: "UGC Ciné Cité Lille",
      status: "OUVERT",
      address: "40 Rue de Béthune, 59800 Lille",
      distance: "1.5 km",
      rating: "4.1",
      rooms: 14,
      formats: [],
      image: imgLille  
    }
  ];

  const filters = ["Tous", "IMAX", "Dolby Atmos", "4DX"];


  const filteredCinemas = cinemasList.filter(cinema => {
    if (activeFilter === "Tous") return true; 
    return cinema.formats.includes(activeFilter); 
  });

  return (
    <div className={styles.cinemasContainer}>
      <div className={styles.headerTitles}>
        <h1>Nos Cinémas</h1>
        <p>Trouvez le cinéma UGC le plus proche de vous</p>
      </div>

      {/* Filtres */}
      <div className={styles.filtersRow}>
        {filters.map((filter, index) => (
          <button 
            key={index} 
            onClick={() => setActiveFilter(filter)}
            className={`${styles.filterBtn} ${activeFilter === filter ? styles.activeFilter : ''}`}
          >
            {filter}
          </button>
        ))}
      </div>

      
      <div className={styles.cinemasList}>
        {filteredCinemas.map((cinema) => (
          <div key={cinema.id} className={styles.cinemaCard}>
            <div className={styles.cardTop}>
              <img src={cinema.image} alt={cinema.name} className={styles.cinemaImage} />
              <div className={styles.cinemaInfo}>
                <div className={styles.titleRow}>
                  <h2>{cinema.name}</h2>
                  <span className={styles.statusBadge}>{cinema.status}</span>
                </div>
                <div className={styles.formatsRow}>
                  {cinema.formats.map((format, idx) => (
                    <span key={idx} className={styles.formatBadge}>{format}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.cardActions}>
              <button onClick={() => alert(`Les horaires pour ${cinema.name} seront bientôt disponibles !`)}>
                🕒 Horaires
              </button>
              <button onClick={() => window.location.href = "tel:0892700000"}>
                📞 Appeler
              </button>
              <button onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cinema.name + " " + cinema.address)}`, '_blank')}>
                🗺️ Itinéraire
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cinema;