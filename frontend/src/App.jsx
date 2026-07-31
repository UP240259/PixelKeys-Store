import { useEffect, useState } from 'react';
import api from './api';

function App() {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Peticion GET a NestJS
    api.get('/juegos')
      .then((res) => {
        setJuegos(res.data);
        setCargando(false);
      })
      .catch((err) => {
        console.error('Error al obtener juegos:', err);
        setCargando(false);
      });
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🎮 PixelKeys Store</h1>
      
      {cargando ? (
        <p>Cargando juegos...</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {juegos.map((juego) => (
            <div key={juego.id_juego} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
              <h3>{juego.titulo}</h3>
              <p>{juego.descripcion}</p>
              <p><strong>${juego.precio}</strong></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
