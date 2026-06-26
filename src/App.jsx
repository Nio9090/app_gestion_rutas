import React, { useState, useEffect } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import Mapa from './components/Mapa';
import ListaLugares from './components/ListaLugares';
import FormularioLugar from './components/FormularioLugar';
import DetalleLugar from './components/DetalleLugar';
import Estadisticas from './components/Estadisticas';
import { lugaresService } from './services/lugaresService';

function App() {
  const [lugares, setLugares] = useState([]);
  const [lugarSeleccionado, setLugarSeleccionado] = useState(null);
  const [modo, setModo] = useState('ver');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarEstadisticas, setMostrarEstadisticas] = useState(false);

  useEffect(() => {
    cargarLugares();
  }, []);

  const cargarLugares = async () => {
    try {
      setCargando(true);
      setError(null);
      const datos = await lugaresService.obtenerTodos();
      console.log('📊 Lugares cargados:', datos.length);
      setLugares(datos);
    } catch (err) {
      console.error('Error cargando lugares:', err);
      setError('Error al cargar los lugares');
    } finally {
      setCargando(false);
    }
  };

  // Función para reiniciar datos (solo para pruebas)
  const reiniciarDatos = async () => {
    if (window.confirm('¿Reiniciar todos los datos a los valores iniciales?')) {
      try {
        await lugaresService.reiniciarDatos();
        await cargarLugares();
        alert('✅ Datos reiniciados correctamente');
      } catch (err) {
        alert('❌ Error al reiniciar datos');
      }
    }
  };

  const agregarLugar = async (nuevoLugar) => {
    try {
      const lugarConId = await lugaresService.agregar(nuevoLugar);
      setLugares([...lugares, lugarConId]);
      setModo('ver');
    } catch (err) {
      console.error('Error agregando lugar:', err);
      alert('Error al agregar el lugar');
    }
  };

  const editarLugar = async (id, datosActualizados) => {
    try {
      await lugaresService.actualizar(id, datosActualizados);
      const actualizados = lugares.map(l => 
        l.id === id ? { ...l, ...datosActualizados } : l
      );
      setLugares(actualizados);
      setModo('ver');
      setLugarSeleccionado(null);
    } catch (err) {
      console.error('Error editando lugar:', err);
      alert('Error al editar el lugar');
    }
  };

  const eliminarLugar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este lugar?')) {
      try {
        await lugaresService.eliminar(id);
        setLugares(lugares.filter(l => l.id !== id));
        setLugarSeleccionado(null);
      } catch (err) {
        console.error('Error eliminando lugar:', err);
        alert('Error al eliminar el lugar');
      }
    }
  };

  const marcarVisitado = async (id) => {
    try {
      await lugaresService.marcarVisitado(id);
      await cargarLugares();
    } catch (err) {
      console.error('Error marcando visitado:', err);
      alert('Error al marcar como visitado');
    }
  };

  const filtrarPorComunidad = (nombreComunidad) => {
    const comunidadLugares = lugares.filter(l => l.comunidad === nombreComunidad);
    if (comunidadLugares.length > 0) {
      setLugarSeleccionado(comunidadLugares[0]);
      setMostrarEstadisticas(false);
    }
  };

  if (cargando) {
    return <div className="cargando-inicial">Cargando aplicación...</div>;
  }

  if (error) {
    return <div className="error-inicial">Error: {error}</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌴 Pedernales - Rutas Turísticas</h1>
        <div className="header-actions">
          <button 
            className="btn-reiniciar"
            onClick={reiniciarDatos}
            title="Reiniciar datos a valores iniciales"
          >
            🔄
          </button>
          <button 
            className={`btn-estadisticas ${mostrarEstadisticas ? 'active' : ''}`}
            onClick={() => setMostrarEstadisticas(!mostrarEstadisticas)}
          >
            📊 Estadísticas
          </button>
          <button 
            className="btn-agregar"
            onClick={() => {
              setModo('agregar');
              setLugarSeleccionado(null);
              setMostrarEstadisticas(false);
            }}
          >
            + Agregar Lugar
          </button>
          <span className="contador">
            {lugares.length} lugares
          </span>
        </div>
      </header>

      <main className="app-main">
        <aside className="sidebar">
          {mostrarEstadisticas ? (
            <Estadisticas onComunidadClick={filtrarPorComunidad} />
          ) : (
            <>
              {modo === 'agregar' && (
                <FormularioLugar 
                  onGuardar={agregarLugar}
                  onCancelar={() => setModo('ver')}
                />
              )}
              
              {modo === 'editar' && lugarSeleccionado && (
                <FormularioLugar 
                  lugar={lugarSeleccionado}
                  onGuardar={(datos) => editarLugar(lugarSeleccionado.id, datos)}
                  onCancelar={() => {
                    setModo('ver');
                    setLugarSeleccionado(null);
                  }}
                />
              )}

              {modo === 'ver' && (
                <>
                  {lugarSeleccionado ? (
                    <DetalleLugar 
                      lugar={lugarSeleccionado}
                      onEditar={() => setModo('editar')}
                      onEliminar={() => eliminarLugar(lugarSeleccionado.id)}
                      onCerrar={() => setLugarSeleccionado(null)}
                      onMarcarVisitado={() => marcarVisitado(lugarSeleccionado.id)}
                    />
                  ) : (
                    <ListaLugares 
                      lugares={lugares}
                      onSeleccionar={setLugarSeleccionado}
                    />
                  )}
                </>
              )}
            </>
          )}
        </aside>

        <section className="map-container">
          <Mapa 
            lugares={lugares}
            lugarSeleccionado={lugarSeleccionado}
            onLugarClick={setLugarSeleccionado}
            onMarcarVisitado={marcarVisitado}
          />
        </section>
      </main>
    </div>
  );
}

export default App;