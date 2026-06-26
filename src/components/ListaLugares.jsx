import React, { useState } from 'react';

function ListaLugares({ lugares, onSeleccionar }) {
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [filtroVisitado, setFiltroVisitado] = useState('todos');

  // Calcular estadísticas de la lista
  const totalLugares = lugares.length;
  const visitados = lugares.filter(l => l.visitado).length;
  const pendientes = totalLugares - visitados;
  const porcentaje = totalLugares > 0 ? Math.round((visitados / totalLugares) * 100) : 0;

  // Obtener categorías únicas
  const categorias = ['todas', ...new Set(lugares.map(l => l.categoria).filter(Boolean))];

  const getIcon = (categoria) => {
    const iconos = {
      'playa': '🏖️',
      'montaña': '⛰️',
      'rio': '🌊',
      'cultura': '🏛️',
      'gastronomia': '🍽️',
      'naturaleza': '🌿',
      'rural': '🌾',
      'urbano': '🏙️'
    };
    return iconos[categoria] || '📍';
  };

  const getNombreCategoria = (categoria) => {
    const nombres = {
      'playa': 'Playas y Balnearios',
      'montaña': 'Montañas y Miradores',
      'rio': 'Ríos y Cascadas',
      'cultura': 'Cultura y Tradiciones',
      'naturaleza': 'Naturaleza y Ecosistemas',
      'rural': 'Comunidades Rurales',
      'urbano': 'Zonas Urbanas'
    };
    return nombres[categoria] || categoria;
  };

  const getIconoTipo = (tipo) => {
    const tipos = {
      'cabecera': '🏛️',
      'costera': '🌊',
      'rural': '🌾',
      'urbano': '🏙️',
      'turístico': '📸'
    };
    return tipos[tipo] || '📍';
  };

  // Filtrar lugares
  const lugaresFiltrados = lugares.filter(lugar => {
    const textoBusqueda = `${lugar.nombre} ${lugar.descripcion || ''} ${lugar.comunidad || ''}`.toLowerCase();
    const coincideBusqueda = textoBusqueda.includes(busqueda.toLowerCase());
    const coincideCategoria = filtroCategoria === 'todas' || lugar.categoria === filtroCategoria;
    const coincideVisitado = filtroVisitado === 'todos' || 
                            (filtroVisitado === 'visitados' && lugar.visitado) ||
                            (filtroVisitado === 'pendientes' && !lugar.visitado);
    return coincideBusqueda && coincideCategoria && coincideVisitado;
  });

  // Agrupar por categoría
  const lugaresPorCategoria = {};
  lugaresFiltrados.forEach(lugar => {
    const cat = lugar.categoria || 'otros';
    if (!lugaresPorCategoria[cat]) {
      lugaresPorCategoria[cat] = [];
    }
    lugaresPorCategoria[cat].push(lugar);
  });

  const ordenCategorias = ['urbano', 'playa', 'montaña', 'rio', 'cultura', 'naturaleza', 'rural'];
  const categoriasOrdenadas = Object.keys(lugaresPorCategoria).sort((a, b) => {
    const indexA = ordenCategorias.indexOf(a);
    const indexB = ordenCategorias.indexOf(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <div className="lista-lugares">
      {/* RESUMEN DE VISITAS */}
      <div className="resumen-visitas">
        <div className="resumen-item">
          <span className="resumen-numero">{totalLugares}</span>
          <span className="resumen-label">Total</span>
        </div>
        <div className="resumen-item visitado">
          <span className="resumen-numero">{visitados}</span>
          <span className="resumen-label">✅ Visitados</span>
        </div>
        <div className="resumen-item pendiente">
          <span className="resumen-numero">{pendientes}</span>
          <span className="resumen-label">⏳ Pendientes</span>
        </div>
        <div className="resumen-item porcentaje">
          <span className="resumen-numero">{porcentaje}%</span>
          <span className="resumen-label">Completado</span>
        </div>
      </div>

      {/* Barra de progreso pequeña */}
      <div className="barra-progreso-lista">
        <div 
          className="barra-lleno" 
          style={{ width: `${porcentaje}%` }}
        />
      </div>

      <div className="filtros">
        <input
          type="text"
          placeholder="🔍 Buscar lugar..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-busqueda"
        />
        
        <select 
          value={filtroCategoria} 
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="select-filtro"
        >
          <option value="todas">📂 Todas las categorías</option>
          {categorias.filter(c => c !== 'todas').map(cat => (
            <option key={cat} value={cat}>
              {getIcon(cat)} {getNombreCategoria(cat)}
            </option>
          ))}
        </select>

        <select 
          value={filtroVisitado} 
          onChange={(e) => setFiltroVisitado(e.target.value)}
          className="select-filtro"
        >
          <option value="todos">📋 Todos</option>
          <option value="visitados">✅ Visitados ({visitados})</option>
          <option value="pendientes">⏳ Pendientes ({pendientes})</option>
        </select>
      </div>

      <div className="contador-lugares">
        📍 Mostrando {lugaresFiltrados.length} de {lugares.length} lugares
        {filtroCategoria !== 'todas' && ` en ${getNombreCategoria(filtroCategoria)}`}
      </div>

      <div className="lista">
        {lugaresFiltrados.length === 0 ? (
          <p className="sin-resultados">No se encontraron lugares</p>
        ) : (
          categoriasOrdenadas.map(categoria => (
            <div key={categoria} className="categoria-grupo">
              <div className="categoria-header">
                <span className="categoria-icono">{getIcon(categoria)}</span>
                <span className="categoria-nombre">{getNombreCategoria(categoria)}</span>
                <span className="categoria-contador">
                  ({lugaresPorCategoria[categoria].length})
                </span>
              </div>
              {lugaresPorCategoria[categoria].map(lugar => (
                <div 
                  key={lugar.id} 
                  className={`item-lugar ${lugar.visitado ? 'visitado' : ''}`}
                  onClick={() => onSeleccionar(lugar)}
                >
                  <div className="item-icon">
                    {getIcon(lugar.categoria)}
                  </div>
                  <div className="item-info">
                    <div className="item-header">
                      <h3>{lugar.nombre}</h3>
                      <span className="item-estado">
                        {lugar.visitado ? '✅' : '⏳'}
                      </span>
                    </div>
                    <p>{lugar.descripcion ? lugar.descripcion.substring(0, 80) + '...' : ''}</p>
                    <div className="item-tags">
                      {lugar.comunidad && (
                        <span className="item-comunidad">
                          {getIconoTipo(lugar.tipo)} {lugar.comunidad}
                        </span>
                      )}
                      {lugar.tipo && lugar.tipo !== 'rural' && (
                        <span className="item-tipo">
                          {getIconoTipo(lugar.tipo)} {lugar.tipo}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ListaLugares;