import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import Cinema from './pages/Cinema';
import MesResas from './pages/MesResas';
import Compte from './pages/Compte';
import FilmDetail from './pages/FilmDetail';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/film/:id" element={<FilmDetail />} />
          <Route path="/cinemas" element={<Cinema />} /> 
          <Route path="/reservations" element={<MesResas />} />
          <Route path="/compte" element={<Compte />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;