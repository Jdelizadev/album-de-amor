import { useState, useEffect, useMemo } from 'react';

export default function Album() {
  const totalFotos = 40; 
  const [fotosMostradas, setFotosMostradas] = useState(0);
  const [faseFinal, setFaseFinal] = useState(0);

  // Generamos posiciones distribuidas por toda la pantalla
  const posiciones = useMemo(() => {
    return Array.from({ length: totalFotos }).map(() => ({
      topMobile: Math.floor(Math.random() * 65) + 2,
      topDesktop: Math.floor(Math.random() * 20) + 2,
      
      leftMobile: Math.floor(Math.random() * 40) + 2,
      leftDesktop: Math.floor(Math.random() * 40) + 15,

      rotate: `${Math.floor(Math.random() * 40) - 20}deg`,
      scale: (Math.random() * 0.1 + 1).toFixed(2), // Escala base un poco más robusta
    }));
  }, []);

  const skipToEnd = () => {
    setFotosMostradas(totalFotos);
    setFaseFinal(1);
  };

  useEffect(() => {
    if (fotosMostradas < totalFotos && faseFinal === 0) {
      const timer = setTimeout(() => {
        setFotosMostradas(prev => prev + 1);
      }, 4000); 
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
      }, 10000); 
      return () => clearTimeout(timer);
    }
  }, [faseFinal]);

  return (
    <div className="h-screen w-full bg-black relative overflow-hidden flex items-center justify-center">
      
      {/* Botón secreto esquina superior derecha */}
      <button 
        onClick={skipToEnd}
        className="absolute top-0 right-0 w-20 h-20 z-[999] opacity-0 cursor-default"
      />

      {Array.from({ length: Math.min(fotosMostradas, totalFotos) }).map((_, index) => {
        const pos = posiciones[index];
        return (
          <div
            key={index}
            // Aumentamos el tamaño base: w-72 para celular y w-[420px] para computadora
            className="absolute w-72 md:w-[420px] bg-white p-3 md:p-5 shadow-2xl rounded-sm transition-all duration-500 ease-out"
            style={{
              top: `${pos.topMobile}%`,
              left: `${pos.leftMobile}%`,
              transform: `rotate(${pos.rotate}) scale(${pos.scale})`,
              zIndex: index, 
            }}
          >
            <div className="w-full">
              <style>{`
                @media (min-width: 768px) {
                  div[style*="z-index: ${index}"] {
                    top: ${pos.topDesktop}% !important;
                    left: ${pos.leftDesktop}% !important;
                  }
                }
              `}</style>
              <img
                src={`/fotos/foto-${index + 1}.jpeg`}
                alt={`Memoria ${index + 1}`}
                className="w-full h-auto border border-gray-200 pointer-events-none object-cover"
              />
            </div>
          </div>
        );
      })}

      <div 
        className={`absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-1000 ${faseFinal > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        
        <div className={`absolute px-8 max-w-4xl transition-opacity duration-1000 ${faseFinal === 1 ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-xl md:text-4xl font-serif text-center text-white leading-relaxed drop-shadow-lg px-4">
            Amor, sé que hay dias dificiles, complicados, otros más bellos y llenos de cosas bonitas, pero lo importante es que siempre haya amor , y que sepas que jamás me apartare de tu lado porque quiero estar contigo toda mi vida.
          </h1>
        </div>

        <div className={`absolute flex flex-col items-center justify-center transition-opacity duration-1000 ${faseFinal === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <img 
            src="/fotos/perrito.jpg" 
            alt="Perrito enviando corazón" 
            className="w-52 md:w-80 mb-6 drop-shadow-[0_0_20px_rgba(236,72,153,0.6)]" 
          />
          <h1 className="text-3xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500 px-6 max-w-4xl leading-tight">
            Te amo más que a nada en el mundo mi pollita ❤️
          </h1>
        </div>

      </div>
    </div>
  );
}