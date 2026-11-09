import { useState, useEffect, useMemo } from 'react';

export default function Album() {
  // Asegúrate de poner aquí el número exacto de fotos que tienes sin romper (.jpeg)
  const totalFotos = 40; 
  const [fotosMostradas, setFotosMostradas] = useState(0);
  const [faseFinal, setFaseFinal] = useState(0);

  // Calculamos posiciones restringidas
  const posiciones = useMemo(() => {
    return Array.from({ length: totalFotos }).map(() => ({
      top: `${Math.floor(Math.random() * 23) + 2}%`, 
      left: `${Math.floor(Math.random() * 40) + 15}%`, 
      rotate: `${Math.floor(Math.random() * 40) - 20}deg`,
      scale: (Math.random() * 0.15 + 0.9).toFixed(2),
    }));
  }, []);

  // Función secreta para saltar al final
  const skipToEnd = () => {
    setFotosMostradas(totalFotos); // Escupe todas las fotos al instante
    setFaseFinal(1); // Brinca directo al mensaje largo
  };

  useEffect(() => {
    if (fotosMostradas < totalFotos && faseFinal === 0) {
      const timer = setTimeout(() => {
        setFotosMostradas(prev => prev + 1);
      }, 2500); 
      return () => clearTimeout(timer);
    } else if (fotosMostradas === totalFotos && faseFinal === 0) {
      const timer = setTimeout(() => setFaseFinal(1), 2000);
      return () => clearTimeout(timer);
    }
  }, [fotosMostradas, faseFinal]);

  useEffect(() => {
    if (faseFinal === 1) {
      const timer = setTimeout(() => {
        setFaseFinal(2);
      }, 10000); // 10 segundos leyendo el mensaje largo antes de pasar al perrito
      return () => clearTimeout(timer);
    }
  }, [faseFinal]);

  return (
    <div className="h-screen w-full bg-black relative overflow-hidden flex items-center justify-center">
      
      {/* BOTÓN SECRETO: Esquina superior derecha, 80x80 pixeles, sin cursor de manita */}
      <button 
        onClick={skipToEnd}
        className="absolute top-0 right-0 w-20 h-20 z-[999] opacity-0 cursor-default"
      />

      {Array.from({ length: Math.min(fotosMostradas, totalFotos) }).map((_, index) => (
        <div
          key={index}
          className="absolute w-64 md:w-96 bg-white p-3 md:p-5 shadow-2xl rounded-sm transition-all duration-500 ease-out"
          style={{
            top: posiciones[index].top,
            left: posiciones[index].left,
            transform: `rotate(${posiciones[index].rotate}) scale(${posiciones[index].scale})`,
            zIndex: index, 
          }}
        >
          <img
            src={`/fotos/foto-${index + 1}.jpeg`}
            alt={`Memoria ${index + 1}`}
            className="w-full h-auto border border-gray-200 pointer-events-none"
          />
        </div>
      ))}

      <div 
        className={`absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-1000 ${faseFinal > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        
        <div className={`absolute px-8 max-w-4xl transition-opacity duration-1000 ${faseFinal === 1 ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-2xl md:text-4xl font-serif text-center text-white leading-relaxed drop-shadow-lg">
            Amor, sé que hay dias dificiles, complicados, otros más bellos y llenos de cosas bonitas, pero lo importante es que siempre haya amor , y que sepas que jamás me apartare de tu lado porque quiero estar contigo toda mi vida.
          </h1>
        </div>

        <div className={`absolute flex flex-col items-center justify-center transition-opacity duration-1000 ${faseFinal === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <img 
            src="/fotos/perrito.jpg" 
            alt="Perrito enviando corazón" 
            className="w-64 md:w-80 mb-8 drop-shadow-[0_0_20px_rgba(236,72,153,0.6)]" 
          />
          <h1 className="text-4xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500 px-6 max-w-4xl leading-tight">
            Te amo más que a nada en el mundo mi pollita ❤️
          </h1>
        </div>

      </div>
    </div>
  );
}