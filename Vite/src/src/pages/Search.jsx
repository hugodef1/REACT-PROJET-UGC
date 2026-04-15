import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMovies, getPopular, getPosterUrl } from '../api/tmdb';
import FilmCard from '../components/ui/FilmCard';

const RECENT_KEY = 'ugc_recent_searches';
const TABS = ['TOUT', 'CINÉMAS', 'FILMS'];

export default function Search() {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('TOUT');
  const [results, setResults] = useState([]);
  const [popular, setPopular] = useState([]);
  const [recent, setRecent] = useState(() => {
    const s = localStorage.getItem(RECENT_KEY);
    return s ? JSON.parse(s) : ['Oppenheimer', 'Dune', 'Avatar'];
  });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPopular().then((d) => setPopular(d.results?.slice(0, 8) || []));
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const timer = setTimeout(() => {
      setLoading(true);
      searchMovies(query).then((d) => {
        setResults(d.results || []);
        setLoading(false);
      });
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (q) => {
    setQuery(q);
    if (q.trim()) {
      const updated = [q, ...recent.filter((r) => r !== q)].slice(0, 5);
      setRecent(updated);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    }
  };

  const clearRecent = () => {
    setRecent([]);
    localStorage.removeItem(RECENT_KEY);
  };

  return (
    <div className="page search-page">
      {/* Barre de recherche */}
      <div className="search-bar-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" className="search-bar-icon">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <input
          ref={inputRef}
          className="search-input"
          placeholder="Rechercher un film, réalisateur, acteur..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
        />
        {query && (
          <button className="search-clear" onClick={() => setQuery('')}>✕</button>
        )}
      </div>

      {/* Tabs */}
      <div className="search-tabs">
        {TABS.map((t) => (
          <button key={t} className={`search-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {/* Résultats */}
      {query ? (
        <div className="search-results">
          {loading && <div className="page-loading"><div className="spinner"/></div>}
          {!loading && results.length === 0 && (
            <p className="empty-msg">Aucun résultat pour « {query} »</p>
          )}
          <div className="films-grid">
            {results.map((m) => <FilmCard key={m.id} movie={m} size="sm" />)}
          </div>
        </div>
      ) : (
        <>
          {/* Recherches récentes */}
          {recent.length > 0 && (
            <section className="search-section">
              <div className="search-section-header">
                <h3>Recherches récentes</h3>
                <button className="link-btn" onClick={clearRecent}>Effacer</button>
              </div>
              <div className="tags-row">
                {recent.map((r) => (
                  <button key={r} className="tag-btn" onClick={() => handleSearch(r)}>{r}</button>
                ))}
              </div>
            </section>
          )}

          {/* Films populaires */}
          <section className="search-section">
            <h3>Films populaires</h3>
            <div className="films-grid films-grid--4">
              {popular.map((m) => (
                <div key={m.id} className="search-popular-card" onClick={() => navigate(`/film/${m.id}`)}>
                  <img src={getPosterUrl(m.poster_path, 'w185')} alt={m.title} loading="lazy" />
                  <p>{m.title}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
