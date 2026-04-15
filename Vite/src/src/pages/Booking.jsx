import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReservations } from '../context/ReservationsContext';
import { useAuth } from '../context/AuthContext';
import { SNACKS, TICKET_TYPES, SHOWTIMES, generateSeats } from '../api/ugcData';

const STEPS = ['SÉANCE', 'SIÈGES', 'SNACKS', 'PAIEMENT', 'CONFIRMATION'];

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie, day, cinema } = location.state || {};
  const { addReservation } = useReservations();
  const { user } = useAuth();

  const [step, setStep] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedType, setSelectedType] = useState(TICKET_TYPES[0]);
  const [seats] = useState(() => generateSeats());
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [snacks, setSnacks] = useState({});
  const [cardNum, setCardNum] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [paying, setPaying] = useState(false);

  if (!movie) return (
    <div className="page">
      <button className="back-btn" onClick={() => navigate(-1)}>✕</button>
      <p className="empty-msg" style={{marginTop:'80px'}}>Données de réservation manquantes.</p>
    </div>
  );

  const snacksTotal = Object.entries(snacks).reduce((acc, [id, qty]) => {
    const item = SNACKS.find((s) => s.id === id);
    return acc + (item ? item.price * qty : 0);
  }, 0);
  const ticketsTotal = selectedType.price * Math.max(selectedSeats.length, 1);
  const total = ticketsTotal + snacksTotal;

  const toggleSeat = (seat) => {
    if (seat.taken) return;
    setSelectedSeats((prev) =>
      prev.includes(seat.id) ? prev.filter((s) => s !== seat.id) : [...prev, seat.id]
    );
  };

  const updateSnack = (id, delta) => {
    setSnacks((prev) => {
      const qty = Math.max(0, (prev[id] || 0) + delta);
      if (qty === 0) { const { [id]: _, ...rest } = prev; return rest; }
      return { ...prev, [id]: qty };
    });
  };

  const handlePay = () => {
    if (!user) { navigate('/login'); return; }
    setPaying(true);
    setTimeout(() => {
      const resa = {
        movie: { id: movie.id, title: movie.title, poster_path: movie.poster_path },
        cinema: cinema?.name || 'UGC Ciné Cité Les Halles',
        date: day ? `${day.num} ${day.month}` : 'Date inconnue',
        dateISO: day?.dateISO || new Date().toISOString(),
        time: selectedTime || '19h00',
        seats: selectedSeats.length > 0 ? selectedSeats : ['E5'],
        ticketType: selectedType.label,
        snacks: Object.entries(snacks).map(([id, qty]) => ({ ...SNACKS.find((s) => s.id === id), qty })),
        total,
      };
      addReservation(resa);
      setPaying(false);
      setStep(4);
    }, 1800);
  };

  const rows = useMemo(() => {
    const map = {};
    seats.forEach((s) => { if (!map[s.row]) map[s.row] = []; map[s.row].push(s); });
    return Object.entries(map);
  }, [seats]);

  return (
    <div className="page booking-page">
      <div className="booking-header">
        <button className="back-btn-inline" onClick={() => step > 0 ? setStep(step - 1) : navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <h2 className="booking-title">{movie.title}</h2>
      </div>

      {/* Steps indicator */}
      <div className="steps-bar">
        {STEPS.map((s, i) => (
          <div key={s} className={`step-item${i <= step ? ' done' : ''}${i === step ? ' current' : ''}`}>
            <div className="step-dot">{i < step ? '✓' : i + 1}</div>
            <span className="step-label">{s}</span>
          </div>
        ))}
      </div>

      <div className="booking-content">
        {/* STEP 0 : Séance */}
        {step === 0 && (
          <div className="booking-step">
            <h3>Choisissez votre séance</h3>
            <p className="booking-cinema">{cinema?.name}</p>
            <p className="booking-date">{day ? `${day.label} ${day.num} ${day.month}` : ''}</p>
            <div className="time-grid">
              {SHOWTIMES.map((t) => (
                <button key={t} className={`time-btn${selectedTime === t ? ' active' : ''}`} onClick={() => setSelectedTime(t)}>{t}</button>
              ))}
            </div>
            <div className="ticket-types">
              <h4>Type de billet</h4>
              {TICKET_TYPES.map((tt) => (
                <button key={tt.id} className={`ticket-type-btn${selectedType.id === tt.id ? ' active' : ''}`} onClick={() => setSelectedType(tt)}>
                  <span>{tt.label}</span>
                  <span>{tt.price === 0 ? 'Inclus' : `${tt.price.toFixed(2)} €`}</span>
                </button>
              ))}
            </div>
            <button className="cta-btn" disabled={!selectedTime} onClick={() => setStep(1)}>CHOISIR MES SIÈGES</button>
          </div>
        )}

        {/* STEP 1 : Sièges */}
        {step === 1 && (
          <div className="booking-step">
            <h3>Choisissez vos sièges</h3>
            <div className="screen-label">ÉCRAN</div>
            <div className="screen-bar"/>
            <div className="seat-map">
              {rows.map(([row, rowSeats]) => (
                <div key={row} className="seat-row">
                  <span className="row-label">{row}</span>
                  <div className="seat-row-seats">
                    {rowSeats.map((seat) => (
                      <button
                        key={seat.id}
                        className={`seat ${seat.taken ? 'taken' : selectedSeats.includes(seat.id) ? 'selected' : 'free'}`}
                        onClick={() => toggleSeat(seat)}
                        title={seat.id}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="seat-legend">
              <span className="seat free"/> Libre
              <span className="seat selected"/> Sélectionné
              <span className="seat taken"/> Pris
            </div>
            <p className="seat-selected-info">{selectedSeats.length} siège(s) : {selectedSeats.join(', ')}</p>
            <button className="cta-btn" disabled={selectedSeats.length === 0} onClick={() => setStep(2)}>CONTINUER</button>
          </div>
        )}

        {/* STEP 2 : Snacks */}
        {step === 2 && (
          <div className="booking-step">
            <h3>Boissons & Friandises</h3>
            {['boissons', 'friandises', 'repas'].map((cat) => (
              <div key={cat} className="snack-category">
                <h4 className="snack-cat-title">{cat.charAt(0).toUpperCase() + cat.slice(1)}</h4>
                {SNACKS.filter((s) => s.category === cat).map((s) => (
                  <div key={s.id} className="snack-item">
                    <span className="snack-emoji">{s.emoji}</span>
                    <div className="snack-info">
                      <span className="snack-name">{s.name}</span>
                      <span className="snack-price">{s.price.toFixed(2)} €</span>
                    </div>
                    <div className="snack-qty">
                      <button className="qty-btn" onClick={() => updateSnack(s.id, -1)}>-</button>
                      <span>{snacks[s.id] || 0}</span>
                      <button className="qty-btn" onClick={() => updateSnack(s.id, 1)}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <button className="cta-btn" onClick={() => setStep(3)}>PASSER AU PAIEMENT</button>
          </div>
        )}

        {/* STEP 3 : Paiement */}
        {step === 3 && (
          <div className="booking-step">
            <h3>Paiement fictif</h3>
            <div className="order-summary">
              <div className="summary-line"><span>Billets ({selectedSeats.length}x {selectedType.label})</span><span>{ticketsTotal.toFixed(2)} €</span></div>
              {snacksTotal > 0 && <div className="summary-line"><span>Snacks</span><span>{snacksTotal.toFixed(2)} €</span></div>}
              <div className="summary-line summary-total"><span>TOTAL</span><span>{total.toFixed(2)} €</span></div>
            </div>
            <div className="payment-form">
              <div className="form-group">
                <label>Numéro de carte</label>
                <input className="form-input" placeholder="1234 5678 9012 3456" value={cardNum} maxLength={19}
                  onChange={(e) => setCardNum(e.target.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim())} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiration</label>
                  <input className="form-input" placeholder="MM/AA" value={cardExp} maxLength={5}
                    onChange={(e) => setCardExp(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>CVC</label>
                  <input className="form-input" placeholder="123" value={cardCvc} maxLength={3}
                    onChange={(e) => setCv(e.target.value)} />
                </div>
              </div>
            </div>
            <button className="cta-btn cta-btn--green" onClick={handlePay} disabled={paying}>
              {paying ? 'Traitement...' : `PAYER ${total.toFixed(2)} €`}
            </button>
          </div>
        )}

        {/* STEP 4 : Confirmation */}
        {step === 4 && (
          <div className="booking-step booking-confirm">
            <div className="confirm-icon">✓</div>
            <h3>Réservation confirmée !</h3>
            <p>Votre e-billet a été envoyé par email.</p>
            <div className="confirm-details">
              <p><strong>{movie.title}</strong></p>
              <p>{cinema?.name}</p>
              <p>{day ? `${day.label} ${day.num} ${day.month}` : ''} à {selectedTime}</p>
              <p>Sièges : {selectedSeats.join(', ')}</p>
            </div>
            <button className="cta-btn" onClick={() => navigate('/reservations')}>VOIR MES RÉSAS</button>
            <button className="link-btn" style={{marginTop:'12px'}} onClick={() => navigate('/')}>Retour à l'accueil</button>
          </div>
        )}
      </div>
    </div>
  );
}
