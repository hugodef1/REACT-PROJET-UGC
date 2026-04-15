import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './src/context/AuthContext';
import { WatchlistProvider } from './src/context/WatchlistContext';
import { ReservationsProvider } from './src/context/ReservationsContext';
import Header from './src/components/layout/Header';
import Home from './src/pages/Home';
import Search from './src/pages/Search';
import FilmDetail from './src/pages/FilmDetail';
import Booking from './src/pages/Booking';
import Reservations from './src/pages/Reservations';
import Watchlist from './src/pages/Watchlist';
import Cinemas from './src/pages/Cinemas';
import Compte from './src/pages/Compte';
import Login from './src/pages/Login';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WatchlistProvider>
          <ReservationsProvider>
            <div className="app-shell">
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/film/:id" element={<FilmDetail />} />
                  <Route path="/booking/:id" element={<Booking />} />
                  <Route path="/reservations" element={<Reservations />} />
                  <Route path="/watchlist" element={<Watchlist />} />
                  <Route path="/cinemas" element={<Cinemas />} />
                  <Route path="/compte" element={<Compte />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </main>
            </div>
          </ReservationsProvider>
        </WatchlistProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
