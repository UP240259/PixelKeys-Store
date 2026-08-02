import { useEffect, useState } from 'react';
import { Search, Plus, Pencil, Trash2, X, Gamepad2 } from 'lucide-react';
import api from './api';
import './App.css';

// Imagen de reemplazo cuando la carátula no carga (SVG embebido, no requiere archivo)
const IMAGEN_FALLBACK =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="460" height="215">
        <rect width="460" height="215" fill="#1b2838"/>
        <text x="50%" y="50%" fill="#66c0f4" font-family="sans-serif"
              font-size="20" text-anchor="middle">Sin caratula</text>
      </svg>`
  );

// Estado inicial del formulario
const FORM_VACIO = {
  titulo: '',
  descripcion: '',
  precio: '',
  descuento: 0,
  stock: 0,
  imagen_url: '',
  plataforma: 'Steam (PC)',
  id_desarrollador: '',
};

function App() {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Buscador
  const [busqueda, setBusqueda] = useState('');

  // Modal de crear / editar
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState(FORM_VACIO);
  const [guardando, setGuardando] = useState(false);

  // Confirmación de borrado
  const [juegoABorrar, setJuegoABorrar] = useState(null);

  // ---------- Lectura (GET /juegos) ----------
  const cargarJuegos = async () => {
    try {
      setCargando(true);
      const res = await api.get('/juegos');
      setJuegos(res.data);
      setError('');
    } catch (err) {
      console.error('Error al obtener juegos:', err);
      setError('No se pudo conectar con la API. ¿Está corriendo el backend en el puerto 3000?');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  // ---------- Abrir modal ----------
  const abrirCrear = () => {
    setEditandoId(null);
    setForm(FORM_VACIO);
    setModalAbierto(true);
  };

  const abrirEditar = (juego) => {
    setEditandoId(juego.id_juego);
    setForm({
      titulo: juego.titulo ?? '',
      descripcion: juego.descripcion ?? '',
      precio: juego.precio ?? '',
      descuento: juego.descuento ?? 0,
      stock: juego.stock ?? 0,
      imagen_url: juego.imagen_url ?? '',
      plataforma: juego.plataforma ?? 'Steam (PC)',
      id_desarrollador: juego.id_desarrollador ?? '',
    });
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setEditandoId(null);
    setForm(FORM_VACIO);
  };

  const cambiarCampo = (e) => {
    const { name, value } = e.target;
    setForm((anterior) => ({ ...anterior, [name]: value }));
  };

  // ---------- Crear (POST) y Actualizar (PUT) ----------
  const guardar = async (e) => {
    e.preventDefault();

    // El backend recibe números, no texto: convertimos antes de enviar
    const datos = {
      titulo: form.titulo.trim(),
      descripcion: form.descripcion.trim(),
      precio: Number(form.precio),
      descuento: Number(form.descuento) || 0,
      stock: Number(form.stock) || 0,
      imagen_url: form.imagen_url.trim(),
      plataforma: form.plataforma.trim() || 'Steam (PC)',
      id_desarrollador: form.id_desarrollador ? Number(form.id_desarrollador) : null,
    };

    try {
      setGuardando(true);
      if (editandoId) {
        await api.put(`/juegos/${editandoId}`, datos);
      } else {
        await api.post('/juegos', datos);
      }
      await cargarJuegos();
      cerrarModal();
    } catch (err) {
      console.error('Error al guardar:', err);
      setError('No se pudo guardar el juego. Revisa que todos los campos sean válidos.');
    } finally {
      setGuardando(false);
    }
  };

  // ---------- Eliminar (DELETE) ----------
  const confirmarBorrado = async () => {
    try {
      await api.delete(`/juegos/${juegoABorrar.id_juego}`);
      await cargarJuegos();
      setJuegoABorrar(null);
    } catch (err) {
      console.error('Error al eliminar:', err);
      setError('No se pudo eliminar el juego.');
      setJuegoABorrar(null);
    }
  };

  // ---------- Buscador en tiempo real ----------
  const termino = busqueda.trim().toLowerCase();
  const juegosFiltrados = juegos.filter((juego) => {
    if (!termino) return true;
    return (
      juego.titulo?.toLowerCase().includes(termino) ||
      juego.plataforma?.toLowerCase().includes(termino)
    );
  });

  // Calcula el precio con el descuento aplicado
  const precioFinal = (precio, descuento) => {
    const base = Number(precio) || 0;
    const desc = Number(descuento) || 0;
    return base - (base * desc) / 100;
  };

  return (
    <div className="app">
      <header className="encabezado">
        <div className="marca">
          <Gamepad2 size={32} className="icono-marca" />
          <div>
            <h1>PixelKeys Store</h1>
            <p className="subtitulo">Catálogo de videojuegos digitales</p>
          </div>
        </div>

        <div className="acciones-encabezado">
          <div className="caja-busqueda">
            <Search size={18} className="icono-busqueda" />
            <input
              type="text"
              placeholder="Buscar por título o plataforma..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            {busqueda && (
              <button className="limpiar" onClick={() => setBusqueda('')} title="Limpiar">
                <X size={16} />
              </button>
            )}
          </div>

          <button className="btn btn-primario" onClick={abrirCrear}>
            <Plus size={18} /> Nuevo juego
          </button>
        </div>
      </header>

      {error && (
        <div className="alerta">
          {error}
          <button onClick={() => setError('')}>
            <X size={16} />
          </button>
        </div>
      )}

      <main>
        {cargando ? (
          <p className="mensaje">Cargando juegos...</p>
        ) : juegosFiltrados.length === 0 ? (
          <p className="mensaje">
            {termino
              ? `No hay resultados para "${busqueda}".`
              : 'Todavía no hay juegos en el catálogo.'}
          </p>
        ) : (
          <>
            <p className="contador">
              {juegosFiltrados.length} juego{juegosFiltrados.length !== 1 ? 's' : ''}
              {termino ? ' encontrado(s)' : ' en catálogo'}
            </p>

            <div className="rejilla">
              {juegosFiltrados.map((juego) => (
                <article className="tarjeta" key={juego.id_juego}>
                  <div className="contenedor-imagen">
                    <img
                      src={juego.imagen_url || IMAGEN_FALLBACK}
                      alt={juego.titulo}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = IMAGEN_FALLBACK;
                      }}
                    />
                    {Number(juego.descuento) > 0 && (
                      <span className="etiqueta-descuento">-{juego.descuento}%</span>
                    )}
                    <span className="etiqueta-plataforma">{juego.plataforma}</span>
                  </div>

                  <div className="cuerpo-tarjeta">
                    <h3>{juego.titulo}</h3>
                    <p className="descripcion">{juego.descripcion}</p>

                    <div className="precios">
                      {Number(juego.descuento) > 0 ? (
                        <>
                          <span className="precio-anterior">
                            ${Number(juego.precio).toFixed(2)}
                          </span>
                          <span className="precio-final">
                            ${precioFinal(juego.precio, juego.descuento).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="precio-final">
                          ${Number(juego.precio).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <p className="stock">
                      Stock: <strong>{juego.stock}</strong> unidades
                    </p>

                    <div className="botones-tarjeta">
                      <button className="btn btn-secundario" onClick={() => abrirEditar(juego)}>
                        <Pencil size={16} /> Editar
                      </button>
                      <button className="btn btn-peligro" onClick={() => setJuegoABorrar(juego)}>
                        <Trash2 size={16} /> Eliminar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </main>

      {/* ---------- Modal Crear / Editar ---------- */}
      {modalAbierto && (
        <div className="fondo-modal" onClick={cerrarModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="encabezado-modal">
              <h2>{editandoId ? 'Editar juego' : 'Agregar nuevo juego'}</h2>
              <button className="cerrar" onClick={cerrarModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={guardar}>
              <label>
                Título *
                <input
                  name="titulo"
                  value={form.titulo}
                  onChange={cambiarCampo}
                  required
                  placeholder="Hollow Knight"
                />
              </label>

              <label>
                Descripción
                <textarea
                  name="descripcion"
                  value={form.descripcion}
                  onChange={cambiarCampo}
                  rows={3}
                  placeholder="Juego de acción y aventura en 2D."
                />
              </label>

              <div className="fila">
                <label>
                  Precio *
                  <input
                    name="precio"
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.precio}
                    onChange={cambiarCampo}
                    required
                  />
                </label>

                <label>
                  Descuento (%)
                  <input
                    name="descuento"
                    type="number"
                    min="0"
                    max="100"
                    value={form.descuento}
                    onChange={cambiarCampo}
                  />
                </label>

                <label>
                  Stock
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={cambiarCampo}
                  />
                </label>
              </div>

              <label>
                URL de la carátula *
                <input
                  name="imagen_url"
                  value={form.imagen_url}
                  onChange={cambiarCampo}
                  required
                  placeholder="https://..."
                />
              </label>

              {form.imagen_url && (
                <img
                  className="vista-previa"
                  src={form.imagen_url}
                  alt="Vista previa"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = IMAGEN_FALLBACK;
                  }}
                />
              )}

              <div className="fila">
                <label>
                  Plataforma
                  <input name="plataforma" value={form.plataforma} onChange={cambiarCampo} />
                </label>

                <label>
                  ID desarrollador
                  <input
                    name="id_desarrollador"
                    type="number"
                    min="1"
                    value={form.id_desarrollador}
                    onChange={cambiarCampo}
                    placeholder="1"
                  />
                </label>
              </div>

              <div className="botones-modal">
                <button type="button" className="btn btn-secundario" onClick={cerrarModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primario" disabled={guardando}>
                  {guardando ? 'Guardando...' : editandoId ? 'Guardar cambios' : 'Crear juego'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------- Confirmación de borrado ---------- */}
      {juegoABorrar && (
        <div className="fondo-modal" onClick={() => setJuegoABorrar(null)}>
          <div className="modal modal-chico" onClick={(e) => e.stopPropagation()}>
            <div className="encabezado-modal">
              <h2>Confirmar eliminación</h2>
              <button className="cerrar" onClick={() => setJuegoABorrar(null)}>
                <X size={20} />
              </button>
            </div>

            <p className="texto-confirmacion">
              ¿Seguro que quieres eliminar <strong>{juegoABorrar.titulo}</strong>? Esta acción no se
              puede deshacer.
            </p>

            <div className="botones-modal">
              <button className="btn btn-secundario" onClick={() => setJuegoABorrar(null)}>
                Cancelar
              </button>
              <button className="btn btn-peligro" onClick={confirmarBorrado}>
                <Trash2 size={16} /> Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="pie">
        PixelKeys Store — Bases de Datos Avanzadas · Unidad 3
      </footer>
    </div>
  );
}

export default App;
