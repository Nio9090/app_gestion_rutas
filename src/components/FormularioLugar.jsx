import React, { useState } from 'react';

function FormularioLugar({ lugar, onGuardar, onCancelar }) {
  const [formData, setFormData] = useState({
    nombre: lugar?.nombre || '',
    descripcion: lugar?.descripcion || '',
    lat: lugar?.lat || '',
    lng: lugar?.lng || '',
    categoria: lugar?.categoria || '',
    comunidad: lugar?.comunidad || '',
    direccion: lugar?.direccion || '',
    horario: lugar?.horario || '',
    contacto: lugar?.contacto || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      alert('El nombre es obligatorio');
      return;
    }
    if (!formData.lat || !formData.lng) {
      alert('Las coordenadas son obligatorias');
      return;
    }
    onGuardar(formData);
  };

  return (
    <form className="formulario-lugar" onSubmit={handleSubmit}>
      <h2>{lugar ? '✏️ Editar Lugar' : '➕ Nuevo Lugar'}</h2>
      
      <div className="campo">
        <label>Nombre *</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre del lugar"
          required
        />
      </div>

      <div className="campo">
        <label>Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Describe el lugar..."
          rows="3"
        />
      </div>

      <div className="campo-grid">
        <div className="campo">
          <label>Latitud *</label>
          <input
            type="number"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
            placeholder="-0.0671"
            step="any"
            required
          />
        </div>
        <div className="campo">
          <label>Longitud *</label>
          <input
            type="number"
            name="lng"
            value={formData.lng}
            onChange={handleChange}
            placeholder="-80.0515"
            step="any"
            required
          />
        </div>
      </div>

      <div className="campo">
        <label>Categoría</label>
        <select name="categoria" value={formData.categoria} onChange={handleChange}>
          <option value="">Seleccionar...</option>
          <option value="playa">🏖️ Playa</option>
          <option value="montaña">⛰️ Montaña</option>
          <option value="rio">🌊 Río</option>
          <option value="cultura">🏛️ Cultura</option>
          <option value="gastronomia">🍽️ Gastronomía</option>
          <option value="otro">📍 Otro</option>
        </select>
      </div>

      <div className="campo">
        <label>Comunidad</label>
        <input
          type="text"
          name="comunidad"
          value={formData.comunidad}
          onChange={handleChange}
          placeholder="Ej: Cojimies, Pedernales, etc."
        />
      </div>

      <div className="campo">
        <label>Dirección</label>
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          placeholder="Dirección exacta"
        />
      </div>

      <div className="campo-grid">
        <div className="campo">
          <label>Horario</label>
          <input
            type="text"
            name="horario"
            value={formData.horario}
            onChange={handleChange}
            placeholder="8:00 - 18:00"
          />
        </div>
        <div className="campo">
          <label>Contacto</label>
          <input
            type="text"
            name="contacto"
            value={formData.contacto}
            onChange={handleChange}
            placeholder="Teléfono o email"
          />
        </div>
      </div>

      <div className="acciones-formulario">
        <button type="button" className="btn-cancelar" onClick={onCancelar}>
          Cancelar
        </button>
        <button type="submit" className="btn-guardar">
          {lugar ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}

export default FormularioLugar;