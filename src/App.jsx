import { useState } from 'react';
import './App.css';
import Hero from './components/Hero';
import GameConceptModal from './components/GameConceptModal';

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="app">
      <Hero onStartGame={() => setModalOpen(true)} />

      {modalOpen && (
        <GameConceptModal onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}

export default App;
