import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cinema from './pages/Cinema';
import FilmDetail from './pages/FilmDetail';
import Watchlist from './pages/Watchlist';
import Reservations from './pages/Reservations';
import Compte from './pages/Compte';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/films" element={<Home />} />
          <Route path="/cinemas" element={<Cinema />} />
          <Route path="/film/:id" element={<FilmDetail />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/compte" element={<Compte />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;