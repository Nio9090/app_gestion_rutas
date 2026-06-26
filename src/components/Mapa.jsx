import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Configurar iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Icono para lugares visitados (VERDE)
const iconoVisitado = new L.Icon({
  iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'marcador-visitado'
});

// Icono para lugares NO visitados (ROJO)
const iconoNoVisitado = new L.Icon({
  iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'marcador-no-visitado'
});

// Icono para ubicación del usuario
const iconoUsuario = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2196F3" stroke="white" stroke-width="2">
      <circle cx="12" cy="12" r="10" fill="#2196F3" stroke="white" stroke-width="2"/>
      <circle cx="12" cy="12" r="4" fill="white"/>
    </svg>
  `),
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15]
});

function Mapa({ lugares, lugarSeleccionado, onLugarClick, onMarcarVisitado }) {
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const mapContainerRef = useRef(null);
  const userMarkerRef = useRef(null);
  const [ubicacionUsuario, setUbicacionUsuario] = useState(null);
  const [buscandoUbicacion, setBuscandoUbicacion] = useState(false);

  const PEDERNALES = { lat: 0.0671, lng: -80.0515 };

  // Contar visitados para mostrar en la leyenda
  const lugaresVisitados = lugares.filter(l => l.visitado).length;
  const lugaresPendientes = lugares.length - lugaresVisitados;
  const porcentaje = lugares.length > 0 ? Math.round((lugaresVisitados / lugares.length) * 100) : 0;

  // Obtener ubicación del usuario
  const obtenerUbicacion = () => {
    setBuscandoUbicacion(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUbicacionUsuario({ lat: latitude, lng: longitude });
          setBuscandoUbicacion(false);
          
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 14);
            if (userMarkerRef.current) {
              mapRef.current.removeLayer(userMarkerRef.current);
            }
            userMarkerRef.current = L.marker([latitude, longitude], { 
              icon: iconoUsuario,
              zIndexOffset: 1000
            })
              .addTo(mapRef.current)
              .bindPopup('📍 Tu ubicación actual')
              .openPopup();
          }
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
          setBuscandoUbicacion(false);
          if (mapRef.current) {
            mapRef.current.setView([PEDERNALES.lat, PEDERNALES.lng], 11);
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setBuscandoUbicacion(false);
      if (mapRef.current) {
        mapRef.current.setView([PEDERNALES.lat, PEDERNALES.lng], 11);
      }
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        center: [PEDERNALES.lat, PEDERNALES.lng],
        zoom: 11,
        zoomControl: true,
        fadeAnimation: true,
        attributionControl: true
      });

      // Tiles de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        minZoom: 8
      }).addTo(mapRef.current);

      // Control de geolocalización
      const controlGeoloc = L.control({ position: 'topleft' });
      controlGeoloc.onAdd = function() {
        const div = L.DomUtil.create('div', 'control-geoloc');
        div.innerHTML = `
          <button style="
            background: white;
            border: 2px solid rgba(0,0,0,0.2);
            border-radius: 4px;
            padding: 8px 12px;
            cursor: pointer;
            font-size: 16px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            gap: 5px;
          ">
            <span>📍</span>
            <span style="font-size: 12px;">Mi Ubicación</span>
          </button>
        `;
        div.querySelector('button').onclick = obtenerUbicacion;
        return div;
      };
      controlGeoloc.addTo(mapRef.current);

      // LEYENDA MEJORADA con contadores
      const legend = L.control({ position: 'bottomright' });
      legend.onAdd = function() {
        const div = L.DomUtil.create('div', 'map-legend');
        div.innerHTML = `
          <div style="
            background: white;
            padding: 12px 15px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            font-size: 13px;
            min-width: 180px;
          ">
            <div style="font-weight: bold; color: #1a3a5c; margin-bottom: 8px; text-align: center;">
              📊 Progreso de Visitas
            </div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
              <span style="color: #4CAF50; font-size: 20px;">📍</span>
              <span>Visitados: <strong style="color: #4CAF50;">${lugaresVisitados}</strong></span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
              <span style="color: #ff4444; font-size: 20px;">📍</span>
              <span>Pendientes: <strong style="color: #ff4444;">${lugaresPendientes}</strong></span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="color: #2196F3; font-size: 20px;">🔵</span>
              <span>Tu ubicación</span>
            </div>
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee; text-align: center;">
              <div style="background: #e0e0e0; height: 6px; border-radius: 3px; overflow: hidden;">
                <div style="background: #4CAF50; height: 100%; width: ${porcentaje}%; transition: width 0.5s ease;"></div>
              </div>
              <div style="font-size: 11px; color: #666; margin-top: 4px;">
                ${porcentaje}% completado (${lugaresVisitados}/${lugares.length})
              </div>
            </div>
          </div>
        `;
        return div;
      };
      legend.addTo(mapRef.current);

      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
        }
      }, 100);

      setTimeout(() => {
        obtenerUbicacion();
      }, 500);
    }

    // Limpiar marcadores anteriores
    Object.values(markersRef.current).forEach(marker => {
      if (mapRef.current) {
        mapRef.current.removeLayer(marker);
      }
    });
    markersRef.current = {};

    // Agregar marcadores de lugares con colores según visitado
    lugares.forEach(lugar => {
      if (lugar.lat && lugar.lng) {
        const icon = lugar.visitado ? iconoVisitado : iconoNoVisitado;
        const marker = L.marker([lugar.lat, lugar.lng], { 
          icon,
          title: lugar.nombre
        })
          .addTo(mapRef.current)
          .bindPopup(`
            <div style="min-width: 220px; max-width: 320px;">
              <strong style="font-size: 16px; color: #1a3a5c;">${lugar.nombre}</strong><br>
              <span style="color: #666; font-size: 13px;">🏘️ ${lugar.comunidad || 'Pedernales'}</span><br>
              ${lugar.descripcion ? lugar.descripcion.substring(0, 120) + '...' : ''}
              <br><br>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button onclick="window.selectLugar('${lugar.id}')" 
                        style="background: #2d5a8a; color: white; border: none; padding: 6px 12px; border-radius: 5px; cursor: pointer; flex:1; font-size: 12px;">
                  📋 Ver detalles
                </button>
                <button onclick="window.marcarVisitado('${lugar.id}')" 
                        style="background: ${lugar.visitado ? '#ff9800' : '#4CAF50'}; color: white; border: none; padding: 6px 12px; border-radius: 5px; cursor: pointer; flex:1; font-size: 12px;">
                  ${lugar.visitado ? '❌ Desmarcar' : '✅ Marcar visitado'}
                </button>
              </div>
              <div style="margin-top: 8px; font-size: 12px; padding: 4px 8px; border-radius: 4px; background: ${lugar.visitado ? '#e8f5e9' : '#fff3e0'};">
                ${lugar.visitado ? '✅ Ya visitado' : '⏳ Pendiente por visitar'}
              </div>
            </div>
          `, {
            maxWidth: 300,
            className: 'popup-lugar'
          });

        marker.on('click', () => {
          onLugarClick(lugar);
        });

        markersRef.current[lugar.id] = marker;
      }
    });

    // Si hay lugar seleccionado, centrar y abrir popup
    if (lugarSeleccionado && lugarSeleccionado.lat && lugarSeleccionado.lng) {
      mapRef.current.setView(
        [lugarSeleccionado.lat, lugarSeleccionado.lng], 
        14,
        { animate: true, duration: 1 }
      );
      
      const marker = markersRef.current[lugarSeleccionado.id];
      if (marker) {
        setTimeout(() => {
          marker.openPopup();
        }, 300);
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lugares, lugarSeleccionado, onLugarClick]);

  // Funciones globales para los popups
  useEffect(() => {
    window.selectLugar = (id) => {
      const lugar = lugares.find(l => l.id === id);
      if (lugar) {
        onLugarClick(lugar);
      }
    };

    window.marcarVisitado = async (id) => {
      if (onMarcarVisitado) {
        await onMarcarVisitado(id);
        setTimeout(() => {
          if (mapRef.current) {
            mapRef.current.invalidateSize();
          }
        }, 100);
      }
    };

    return () => {
      delete window.selectLugar;
      delete window.marcarVisitado;
    };
  }, [lugares, onLugarClick, onMarcarVisitado]);

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      {buscandoUbicacion && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '15px 25px',
          borderRadius: '10px',
          zIndex: 1000,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '30px', marginBottom: '10px' }}>📍</div>
          <div>Obteniendo tu ubicación...</div>
        </div>
      )}
      <div ref={mapContainerRef} id="mapa" style={{ height: '100%', width: '100%' }} />
    </div>
  );
}

export default Mapa;