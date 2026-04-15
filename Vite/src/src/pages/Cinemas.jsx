import { useState } from 'react';
import { UGC_CINEMAS } from '../api/ugcData';

export default function Cinemas() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = UGC_CINEMAS.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) ||
           c.city.toLowerCase().includes(search.toLowerCase())
  );

  const cities = [...new Set(UGC_CINEMAS.map((c) => c.city))];

  return (
    <div className="page cinemas-page">
      <h1 className="page-title">CINÉMAS UGC</h1>
      <p className="page-subtitle">{UGC_CINEMAS.length} cinémas en France</p>

      <div className="search-bar-wrap" style={{ margin: '0 0 16px' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" className="search-bar-icon">
          <circle cx="11" cy="11" r="8"/>
          <path d="M21 21l-4.35-4.35"/>
        </svg>
        <input
          className="search-input"
          placeholder="Rechercher une ville ou un cinéma..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && <button className="search-clear" onClick={() => setSearch('')}>✕</button>}
      </div>

      {!search && (
        <div className="city-tags">
          {cities.map((c) => (
            <button key={c} className="tag-btn" onClick={() => setSearch(c)}>{c}</button>
          ))}
        </div>
      )}

      <div className="cinemas-list">
        {filtered.map((cinema) => (
          <div
            key={cinema.id}
            className={`cinema-card${selected?.id === cinema.id ? ' active' : ''}`}
            onClick={() => setSelected(selected?.id === cinema.id ? null : cinema)}
          >
            <div className="cinema-card-header">
              <div>
                <h3 className="cinema-name">{cinema.name}</h3>
                <p className="cinema-address">{cinema.address}</p>
              </div>
              <div className="cinema-screens">{cinema.screens} salles</div>
            </div>
            {selected?.id === cinema.id && (
              <div className="cinema-details">
                <p className="cinema-phone">📞 {cinema.phone}</p>
                <div className="cinema-services">
                  {cinema.services.map((s) => (
                    <span key={s} className="resa-tag">{s}</span>
                  ))}
                </div>
                <a
                  className="cta-btn"
                  style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginTop: '12px' }}
                  href={`https://maps.google.com/?q=${encodeURIComponent(cinema.address)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  VOIR SUR LA CARTE
                </a>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="empty-msg">Aucun cinéma trouvé pour "{search}"</p>
        )}
      </div>
    </div>
  );
}
