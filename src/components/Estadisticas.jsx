import React, { useState, useEffect } from 'react';
import { lugaresService } from '../services/lugaresService';

function Estadisticas({ onComunidadClick }) {
  const [estadisticas, setEstadisticas] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    setCargando(true);
    const datos = await lugaresService.obtenerEstadisticas();
    setEstadisticas(datos);
    setCargando(false);
  };

  const getIconoTipo = (tipo) => {
    const iconos = {
      'cabecera': '🏛️',
      'costera': '🌊',
      'rural': '🌾',
      'urbano': '🏙️',
      'turístico': '📸'
    };
    return iconos[tipo] || '📍';
  };

  if (cargando) {
    return <div className="estadisticas-cargando">Cargando estadísticas...</div>;
  }

  if (!estadisticas) {
    return <div className="estadisticas-error">Error al cargar estadísticas</div>;
  }

  const { 
    totalComunidades, 
    visitadas, 
    faltantes, 
    porcentaje, 
    totalLugares, 
    lugaresVisitados,
    categorias,
    comunidades 
  } = estadisticas;

  // Calcular lugares pendientes
  const lugaresPendientes = totalLugares - lugaresVisitados;

  return (
    <div className="estadisticas-container">
      {/* Header con números principales */}
      <div className="estadisticas-header">
        <h2>📊 Progreso de Visitas</h2>
        
        {/* Números grandes */}
        <div className="estadisticas-numeros-grandes">
          <div className="numero-grande">
            <span className="numero">{lugaresVisitados}</span>
            <span className="label">✅ Visitados</span>
          </div>
          <div className="numero-grande pendiente">
            <span className="numero">{lugaresPendientes}</span>
            <span className="label">⏳ Pendientes</span>
          </div>
          <div className="numero-grande total">
            <span className="numero">{totalLugares}</span>
            <span className="label">📍 Total</span>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="progreso-barra">
          <div 
            className="progreso-lleno" 
            style={{ width: `${porcentaje}%` }}
          >
            {porcentaje}% Completado
          </div>
        </div>

        {/* Resumen rápido */}
        <div className="resumen-rapido">
          <span>✅ {visitadas} comunidades visitadas</span>
          <span>⏳ {faltantes} comunidades pendientes</span>
          <span>📊 {porcentaje}% de avance</span>
        </div>
      </div>

      {/* Estadísticas por categoría */}
      <div className="estadisticas-categorias">
        <h3>📂 Visitas por Categoría</h3>
        <div className="categorias-grid">
          {Object.keys(categorias).map(cat => {
            const data = categorias[cat];
            const nombreCat = {
              'urbano': '🏙️ Urbano',
              'playa': '🏖️ Playa',
              'montaña': '⛰️ Montaña',
              'rio': '🌊 Río',
              'cultura': '🏛️ Cultura',
              'naturaleza': '🌿 Naturaleza',
              'rural': '🌾 Rural'
            }[cat] || cat;

            return (
              <div key={cat} className="categoria-item">
                <div className="categoria-info">
                  <span className="categoria-nombre">{nombreCat}</span>
                  <span className="categoria-conteo">
                    {data.visitados}/{data.total}
                  </span>
                </div>
                <div className="categoria-barra">
                  <div 
                    className="categoria-progreso" 
                    style={{ width: `${data.porcentaje}%` }}
                  />
                </div>
                <span className="categoria-porcentaje">{data.porcentaje}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lista de comunidades */}
      <div className="comunidades-lista">
        <h3>
          📋 Comunidades
          <span className="comunidades-resumen">
            {visitadas} visitadas · {faltantes} pendientes
          </span>
        </h3>
        {comunidades.map((comunidad, index) => (
          <div 
            key={index} 
            className={`comunidad-item ${comunidad.visitado ? 'visitado' : 'no-visitado'}`}
            onClick={() => onComunidadClick(comunidad.nombre)}
          >
            <div className="comunidad-info">
              <span className="comunidad-icono">
                {comunidad.visitado ? '✅' : '⬜'}
              </span>
              <span className="comunidad-nombre">
                {getIconoTipo(comunidad.tipo)} {comunidad.nombre}
              </span>
              <span className="comunidad-lugares">
                ({comunidad.lugares.length} lugares)
              </span>
            </div>
            <div className="comunidad-estado">
              {comunidad.visitado ? (
                <span className="estado-verde">✅ Visitada</span>
              ) : (
                <span className="estado-rojo">⏳ Pendiente</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Estadisticas;