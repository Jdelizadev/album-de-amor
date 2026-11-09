import { useState, useRef } from 'react';
import Terminal from './components/Terminal';
import Album from './components/Album'; // Ya importado correctamente

function App() {
  const [desbloqueado, setDesbloqueado] = useState(false);
  const audioRef = useRef(null);

  const iniciarSecuencia = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.6; 
      audioRef.current.currentTime = 12; // Salta los primeros 11 segundos de silencio
      audioRef.current.play().catch(error => console.log("Audio autoplay bloqueado:", error));
    }
    setDesbloqueado(true);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      <audio ref={audioRef} src="/brillas.mp3" loop />
      
      {!desbloqueado ? (
        <Terminal onUnlock={iniciarSecuencia} />
      ) : (
        <div className="animate-fade-in w-full">
          <Album />
        </div>
      )}
    </div>
  );
}

export default App;