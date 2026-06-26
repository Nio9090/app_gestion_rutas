import React from 'react';

function DetalleLugar({ lugar, onEditar, onEliminar, onCerrar, onMarcarVisitado }) {
  const obtenerIcono = (categoria) => {
    const iconos = {
      playa: '🏖️',
      montaña: '⛰️',
      rio: '🌊',
      cultura: '🏛️',
      gastronomia: '🍽️',
      naturaleza: '🌿',
      rural: '🌾',
      urbano: '🏙️'
    };
    return iconos[categoria] || '📍';
  };

  const obtenerTipoIcono = (tipo) => {
    const tipos = {
      cabecera: '🏛️',
      costera: '🌊',
      rural: '🌾',
      turístico: '📸',
      urbano: '🏙️'
    };
    return tipos[tipo] || '📍';
  };

  const abrirEnGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${lugar.lat},${lugar.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="detalle-lugar">
      <div className="detalle-header">
        <h2>
          {obtenerIcono(lugar.categoria)} {lugar.nombre}
        </h2>
        <button className="btn-cerrar" onClick={onCerrar}>✕</button>
      </div>

      <div className="detalle-estado-visita">
        <div className={`estado-visita ${lugar.visitado ? 'visitado' : 'no-visitado'}`}>
          {lugar.visitado ? '✅ Visitado' : '⬜ Pendiente de visitar'}
        </div>
        <button 
          className={`btn-marcar-visita ${lugar.visitado ? 'desmarcar' : 'marcar'}`}
          onClick={onMarcarVisitado}
        >
          {lugar.visitado ? '❌ Desmarcar' : '✅ Marcar como visitado'}
        </button>
      </div>

      <div className="detalle-contenido">
        <div className="detalle-seccion">
          <h3>Comunidad</h3>
          <p>{lugar.comunidad || 'Pedernales'}</p>
        </div>

        {lugar.tipo && (
          <div className="detalle-seccion">
            <h3>Tipo</h3>
            <p>{obtenerTipoIcono(lugar.tipo)} {lugar.tipo}</p>
          </div>
        )}

        {lugar.descripcion && (
          <div className="detalle-seccion">
            <h3>Descripción</h3>
            <p>{lugar.descripcion}</p>
          </div>
        )}

        {lugar.direccion && (
          <div className="detalle-seccion">
            <h3>Dirección</h3>
            <p>{lugar.direccion}</p>
          </div>
        )}

        <div className="detalle-seccion">
          <h3>Coordenadas</h3>
          <p>Lat: {lugar.lat}, Lng: {lugar.lng}</p>
          <button 
            onClick={abrirEnGoogleMaps}
            style={{
              marginTop: '8px',
              background: '#4285f4',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '13px'
            }}
          >
            🗺️ Abrir en Google Maps
          </button>
        </div>

        {lugar.horario && (
          <div className="detalle-seccion">
            <h3>Horario</h3>
            <p>{lugar.horario}</p>
          </div>
        )}

        {lugar.contacto && (
          <div className="detalle-seccion">
            <h3>Contacto</h3>
            <p>{lugar.contacto}</p>
          </div>
        )}
      </div>

      <div className="detalle-acciones">
        <button className="btn-editar" onClick={onEditar}>
          ✏️ Editar
        </button>
        <button className="btn-eliminar" onClick={onEliminar}>
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
}

export default DetalleLugar;