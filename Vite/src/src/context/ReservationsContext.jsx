import { createContext, useContext, useState } from 'react';

const ReservationsContext = createContext(null);

export function ReservationsProvider({ children }) {
  const [reservations, setReservations] = useState(() => {
    const saved = localStorage.getItem('ugc_reservations');
    return saved ? JSON.parse(saved) : [];
  });

  const save = (list) => {
    setReservations(list);
    localStorage.setItem('ugc_reservations', JSON.stringify(list));
  };

  const addReservation = (reservation) => {
    const newResa = {
      ...reservation,
      id: Date.now(),
      status: 'CONFIRMÉ',
      createdAt: new Date().toISOString(),
    };
    save([newResa, ...reservations]);
    return newResa;
  };

  const cancelReservation = (id) => {
    save(reservations.map((r) => r.id === id ? { ...r, status: 'ANNULÉ' } : r));
  };

  const getUpcoming = () => {
    const now = new Date();
    return reservations.filter(
      (r) => r.status !== 'ANNULÉ' && new Date(r.dateISO) >= now,
    );
  };

  const getPast = () => {
    const now = new Date();
    return reservations.filter((r) => new Date(r.dateISO) < now);
  };

  return (
    <ReservationsContext.Provider value={{ reservations, addReservation, cancelReservation, getUpcoming, getPast }}>
      {children}
    </ReservationsContext.Provider>
  );
}

export const useReservations = () => useContext(ReservationsContext);
