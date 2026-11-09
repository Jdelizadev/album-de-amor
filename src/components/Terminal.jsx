// src/components/Terminal.jsx
import { useState, useEffect } from 'react';

export default function Terminal({ onUnlock }) {
  const [texto, setTexto] = useState('');
  const [mostrarBoton, setMostrarBoton] = useState(false);
  
  const mensajeTerminal = "> Iniciando secuencia de amor...\n> Analizando memorias de estos 9 meses...\n> Archivos cifrados encontrados.\n> Presiona para desencriptar.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTexto(mensajeTerminal.slice(0, index));
      index++;
      if (index > mensajeTerminal.length) {
        clearInterval(interval);
        setTimeout(() => setMostrarBoton(true), 500);
      }
    }, 50); // Velocidad de escritura
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-green-500 font-mono p-4">
      <div className="w-full max-w-2xl bg-gray-900 rounded-lg shadow-2xl p-6 border border-gray-700">
        <div className="flex space-x-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="whitespace-pre-line mb-6 min-h-[120px]">
          {texto}
          <span className="animate-pulse">_</span>
        </div>
        
        {mostrarBoton && (
          <button 
            onClick={onUnlock}
            className="px-6 py-2 border border-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
          >
            [ INICIAR_SECUENCIA ]
          </button>
        )}
      </div>
    </div>
  );
}