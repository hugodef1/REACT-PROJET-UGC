import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { to: '/', label: 'FILMS', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="2"/>
      <path d="M7 2v20M17 2v20M2 12h20M2 7h5M17 7h5M2 17h5M17 17h5"/>
    </svg>
  )},
  { to: '/cinemas', label: 'CINÉMAS', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  )},
  { to: '/reservations', label: 'MES RÉSAS', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )},
  { to: '/compte', label: 'COMPTE', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  )},
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  return (
    <>
      {/* Top bar */}
      <header className="top-header">
        <div className="top-header-inner">
          <button className="qr-btn" title="QR Code">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
              <rect x="5" y="5" width="3" height="3"/><rect x="16" y="5" width="3" height="3"/>
              <rect x="5" y="16" width="3" height="3"/>
              <path d="M14 14h3v3M17 17h3M14 20h3"/>
            </svg>
          </button>
          <div className="ugc-logo" onClick={() => navigate('/')}>UGC</div>
          <div className="header-right">
            {user ? (
              <span className="header-user">{user.name.split(' ')[0]}</span>
            ) : (
              <button className="login-btn-header" onClick={() => navigate('/login')}>
                Connexion
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Bottom navigation */}
      <nav className="bottom-nav">
        {NAV.slice(0, 2).map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}

        {/* Search button (centre) */}
        <NavLink to="/search" className={({ isActive }) => `nav-search-btn${isActive ? ' active' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="26" height="26">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
        </NavLink>

        {NAV.slice(2).map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
