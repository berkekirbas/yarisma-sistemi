import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/Welcome.page';
import GamePage from './pages/Game.page';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
}
