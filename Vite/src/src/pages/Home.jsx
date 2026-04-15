import { useState, useEffect } from 'react';
import { getNowPlaying, getPopular, getMoviesByGenre, GENRES } from '../api/tmdb';
import FilmCard from '../components/ui/FilmCard';

const FILTERS_TOP = ['LES DISPOS', 'LES JOURS'];
const FILTERS_MID = ['LABELS', 'ÉVÉNEMENTS', 'EN FAMILLE'];

export default function Home() {
  const [activeTop, setActiveTop] = useState('LES DISPOS');
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [famille, setFamille] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getNowPlaying(),
      getPopular(),
      getMoviesByGenre(GENRES.FAMILLE),
    ]).then(([np, pop, fam]) => {
      setNowPlaying(np.results || []);
      setPopular(pop.results || []);
      setFamille(fam.results || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="page-loading">
      <div className="spinner"/>
    </div>
  );

  const ugcAime = popular.slice(0, 4);
  const ancien = nowPlaying.slice(0, 3);
  const nouveau = nowPlaying.slice(3, 6);

  return (
    <div className="page home-page">
      {/* Filtres haut */}
      <div className="filter-row">
        {FILTERS_TOP.map((f) => (
          <button
            key={f}
            className={`filter-btn${activeTop === f ? ' active' : ''}`}
            onClick={() => setActiveTop(f)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              {f === 'LES DISPOS'
                ? <><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 12h20"/></>
                : <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>
              }
            </svg>
            {f}
          </button>
        ))}
      </div>

      {/* Section UGC Aime */}
      <section className="home-section">
        <div className="section-tag">UGC AIME</div>
        <div className="films-scroll">
          {ugcAime.map((m) => <FilmCard key={m.id} movie={m} size="md" />)}
        </div>
      </section>

      {/* Filtres milieu */}
      <div className="filter-row filter-row--mid">
        <button className="filter-btn filter-btn--icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
          </svg>
        </button>
        {FILTERS_MID.map((f) => (
          <button key={f} className="filter-btn">{f}</button>
        ))}
      </div>

      {/* À l'affiche */}
      <section className="home-section">
        <div className="section-tag section-tag--outline">À L'AFFICHE</div>

        <div className="section-subsection">
          <div className="subsection-label">ANCIEN</div>
          <div className="films-scroll">
            {ancien.map((m) => <FilmCard key={m.id} movie={m} size="md" />)}
          </div>
        </div>

        <div className="section-subsection">
          <div className="subsection-label">NOUVEAU</div>
          <div className="films-scroll">
            {nouveau.map((m) => <FilmCard key={m.id} movie={m} size="md" />)}
          </div>
        </div>
      </section>

      {/* En famille */}
      <section className="home-section">
        <div className="section-tag">EN FAMILLE</div>
        <div className="films-scroll">
          {famille.slice(0, 4).map((m) => <FilmCard key={m.id} movie={m} size="md" />)}
        </div>
      </section>
    </div>
  );
}
