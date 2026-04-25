import styles from './MesResas.module.css';
import ReservationCard from '../components/ReservationCard';

function MesResas() {
  // Ici, tu pourrais plus tard faire un fetch() vers TON API pour récupérer les réservations de l'utilisateur.
  // Pour l'instant, on simule ces données, en utilisant des images TMDB pour rester cohérent avec ta page d'accueil.
  const reservations = [
    {
      id: 1,
      title: "The Dark Knight",
      date: "8 Février 2026 à 21:30",
      cinema: "UGC Ciné Cité Les Halles",
      seats: "2 place(s) - E7, E8",
      format: "IMAX",
      status: "CONFIRMÉ",
      image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" // Affiche TMDB
    },
    {
      id: 2,
      title: "Inception",
      date: "12 Février 2026 à 19:00",
      cinema: "UGC Bercy",
      seats: "1 place(s) - F5",
      format: "3D",
      status: "EN ATTENTE",
      image: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwObsVNl.jpg" // Affiche TMDB
    },
    {
      id: 3,
      title: "Interstellar",
      date: "15 Février 2026 à 20:15",
      cinema: "UGC Montparnasse",
      seats: "3 place(s) - G10, G11, G12",
      format: "IMAX",
      status: "CONFIRMÉ",
      image: "https://image.tmdb.org/t/p/w500/gEU2QlsEOWepjpB2pX7Hpwv92vS.jpg" // Affiche TMDB
    }
  ];

  return (
    <div className={styles.mesResasContainer}>
      
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>Mes Réservations</h1>
        <p className={styles.subtitle}>Gérez vos séances à venir</p>
      </div>

      {/* COMPTEURS (Actives / Vues) */}
      <div className={styles.statsContainer}>
        <div className={styles.statBox}>
          <span className={styles.statNumber}>3</span>
          <span className={styles.statLabel}>Réservations actives</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statNumber}>6</span>
          <span className={styles.statLabel}>Films vus ce mois</span>
        </div>
      </div>

      {/* LISTE DES RÉSERVATIONS */}
      <div className={styles.reservationsList}>
        <h2 className={styles.sectionTitle}>À venir</h2>
        
        {reservations.map((resa) => (
          <ReservationCard 
            key={resa.id}
            title={resa.title}
            date={resa.date}
            cinema={resa.cinema}
            seats={resa.seats}
            format={resa.format}
            status={resa.status}
            image={resa.image}
          />
        ))}
      </div>

    </div>
  );
}

export default MesResas;