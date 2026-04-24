import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import Cinema from './pages/Cinema';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cinemas" element={<Cinema />} /> 
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;