import localforage from 'localforage';

const almacen = localforage.createInstance({
  name: 'PedernalesRutas',
  storeName: 'lugares'
});

// TODAS LAS 44 COMUNIDADES DE PEDERNALES
const DATOS_INICIALES = [
  // URBANO (5)
  {
    id: '1',
    nombre: 'Pedernales (Centro)',
    descripcion: 'Cabecera cantonal, centro administrativo y comercial de Pedernales',
    lat: 0.0671,
    lng: -80.0515,
    categoria: 'urbano',
    comunidad: 'Pedernales',
    visitado: false,
    tipo: 'cabecera',
    direccion: 'Calle Principal, Pedernales'
  },
  {
    id: '2',
    nombre: 'Barrio El Centro',
    descripcion: 'Zona comercial y financiera con tiendas, bancos y restaurantes',
    lat: 0.0689,
    lng: -80.0523,
    categoria: 'urbano',
    comunidad: 'Pedernales',
    visitado: false,
    tipo: 'urbano',
    direccion: 'Av. Principal, Pedernales'
  },
  {
    id: '3',
    nombre: 'Barrio 10 de Agosto',
    descripcion: 'Barrio residencial con mercado municipal y comercios locales',
    lat: 0.0654,
    lng: -80.0498,
    categoria: 'urbano',
    comunidad: 'Pedernales',
    visitado: false,
    tipo: 'urbano',
    direccion: 'Calle 10 de Agosto, Pedernales'
  },
  {
    id: '4',
    nombre: 'Barrio La Florida',
    descripcion: 'Zona residencial al norte con áreas verdes y parques',
    lat: 0.0723,
    lng: -80.0489,
    categoria: 'urbano',
    comunidad: 'Pedernales',
    visitado: false,
    tipo: 'urbano',
    direccion: 'Calle La Florida, Pedernales'
  },
  {
    id: '5',
    nombre: 'Barrio Miraflores',
    descripcion: 'Barrio residencial con vista al mar y clima agradable',
    lat: 0.0645,
    lng: -80.0534,
    categoria: 'urbano',
    comunidad: 'Pedernales',
    visitado: false,
    tipo: 'urbano',
    direccion: 'Calle Miraflores, Pedernales'
  },
  // PLAYA (6)
  {
    id: '6',
    nombre: 'Cojimies',
    descripcion: 'Principal balneario con playas vírgenes, manglares y gastronomía',
    lat: 0.4362,
    lng: -80.0367,
    categoria: 'playa',
    comunidad: 'Cojimies',
    visitado: false,
    tipo: 'costera',
    direccion: 'Vía Cojimies, Pedernales'
  },
  {
    id: '7',
    nombre: 'La Punta',
    descripcion: 'Comunidad pesquera con playas tranquilas y vistas al mar',
    lat: 0.0893,
    lng: -80.0621,
    categoria: 'playa',
    comunidad: 'La Punta',
    visitado: false,
    tipo: 'costera',
    direccion: 'Vía La Punta, Pedernales'
  },
  {
    id: '8',
    nombre: 'La Playita',
    descripcion: 'Pequeña playa familiar con aguas tranquilas y servicios básicos',
    lat: 0.1023,
    lng: -80.0489,
    categoria: 'playa',
    comunidad: 'La Playita',
    visitado: false,
    tipo: 'costera',
    direccion: 'Vía La Playita, Pedernales'
  },
  {
    id: '9',
    nombre: 'Playa de Pedernales',
    descripcion: 'Playa urbana con arena negra y oleaje fuerte, ideal para surfistas',
    lat: 0.0671,
    lng: -80.0555,
    categoria: 'playa',
    comunidad: 'Pedernales',
    visitado: false,
    tipo: 'turístico',
    direccion: 'Malecón de Pedernales'
  },
  {
    id: '10',
    nombre: 'Playa de Cojimies',
    descripcion: 'Playa virgen con arena blanca y aguas cristalinas',
    lat: 0.4423,
    lng: -80.0345,
    categoria: 'playa',
    comunidad: 'Cojimies',
    visitado: false,
    tipo: 'turístico',
    direccion: 'Vía a la Playa de Cojimies'
  },
  {
    id: '11',
    nombre: 'El Morro',
    descripcion: 'Formaciones rocosas y vistas espectaculares al mar',
    lat: 0.0789,
    lng: -80.0712,
    categoria: 'playa',
    comunidad: 'El Morro',
    visitado: false,
    tipo: 'costera',
    direccion: 'Vía El Morro, Pedernales'
  },
  // MONTAÑA (5)
  {
    id: '12',
    nombre: 'Cerro de Hojas',
    descripcion: 'Mirador natural con vista panorámica de toda la costa de Pedernales',
    lat: 0.0392,
    lng: -80.0668,
    categoria: 'montaña',
    comunidad: 'Pedernales',
    visitado: false,
    tipo: 'turístico',
    direccion: 'Vía al Cerro de Hojas'
  },
  {
    id: '13',
    nombre: 'San Gabriel',
    descripcion: 'Comunidad en estribaciones de la cordillera con clima fresco',
    lat: 0.0456,
    lng: -80.0589,
    categoria: 'montaña',
    comunidad: 'San Gabriel',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía San Gabriel, Pedernales'
  },
  {
    id: '14',
    nombre: 'Los Ángeles',
    descripcion: 'Vistas panorámicas al océano Pacífico y clima agradable',
    lat: 0.1423,
    lng: -80.0189,
    categoria: 'montaña',
    comunidad: 'Los Ángeles',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía Los Ángeles, Pedernales'
  },
  {
    id: '15',
    nombre: 'Santa Martha',
    descripcion: 'Hermosos paisajes, clima agradable y cultivos de café',
    lat: 0.0891,
    lng: -80.0891,
    categoria: 'montaña',
    comunidad: 'Santa Martha',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía Santa Martha, Pedernales'
  },
  {
    id: '16',
    nombre: 'El Mirador',
    descripcion: 'Punto más alto con vista de 360° y atardeceres espectaculares',
    lat: 0.0345,
    lng: -80.0789,
    categoria: 'montaña',
    comunidad: 'El Mirador',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía El Mirador, Pedernales'
  },
  // RIO (3)
  {
    id: '17',
    nombre: 'Río Pedernales',
    descripcion: 'Río que cruza el cantón con áreas de recreación y baño',
    lat: 0.0809,
    lng: -80.0486,
    categoria: 'rio',
    comunidad: 'Pedernales',
    visitado: false,
    tipo: 'turístico',
    direccion: 'Puente del Río Pedernales'
  },
  {
    id: '18',
    nombre: 'Río Cojimies',
    descripcion: 'Hermosos paisajes naturales y áreas de recreación',
    lat: 0.4234,
    lng: -80.0456,
    categoria: 'rio',
    comunidad: 'Cojimies',
    visitado: false,
    tipo: 'turístico',
    direccion: 'Vía Río Cojimies'
  },
  {
    id: '19',
    nombre: 'Cascada El Salto',
    descripcion: 'Hermosa caída de agua natural con pozas para bañarse',
    lat: 0.0954,
    lng: -80.0423,
    categoria: 'rio',
    comunidad: 'El Salto',
    visitado: false,
    tipo: 'turístico',
    direccion: 'Vía Cascada El Salto, Pedernales'
  },
  // CULTURA (4)
  {
    id: '20',
    nombre: 'Río Verde',
    descripcion: 'Turismo comunitario, artesanías y gastronomía local',
    lat: 0.1245,
    lng: -80.0312,
    categoria: 'cultura',
    comunidad: 'Río Verde',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía Río Verde, Pedernales'
  },
  {
    id: '21',
    nombre: 'San José de Chamanga',
    descripcion: 'Tradición cultural, artesanal y gastronómica',
    lat: 0.1125,
    lng: -80.0256,
    categoria: 'cultura',
    comunidad: 'San José de Chamanga',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía Chamanga, Pedernales'
  },
  {
    id: '22',
    nombre: 'El Carmen',
    descripcion: 'Tradición pesquera, artesanal y gastronómica',
    lat: 0.1567,
    lng: -80.0456,
    categoria: 'cultura',
    comunidad: 'El Carmen',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía El Carmen, Pedernales'
  },
  {
    id: '23',
    nombre: 'El Rosario',
    descripcion: 'Capilla histórica, tradiciones religiosas y artesanías',
    lat: 0.0678,
    lng: -80.0789,
    categoria: 'cultura',
    comunidad: 'El Rosario',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía El Rosario, Pedernales'
  },
  // NATURALEZA (5)
  {
    id: '24',
    nombre: 'Boca de Cojimies',
    descripcion: 'Manglares y ecosistema costero, avistamiento de aves',
    lat: 0.4123,
    lng: -80.0423,
    categoria: 'naturaleza',
    comunidad: 'Boca de Cojimies',
    visitado: false,
    tipo: 'costera',
    direccion: 'Vía Boca de Cojimies'
  },
  {
    id: '25',
    nombre: 'La Boca',
    descripcion: 'Desembocadura del río, ideal para avistamiento de aves',
    lat: 0.0789,
    lng: -80.0556,
    categoria: 'naturaleza',
    comunidad: 'La Boca',
    visitado: false,
    tipo: 'costera',
    direccion: 'Vía La Boca, Pedernales'
  },
  {
    id: '26',
    nombre: 'Manglares de Cojimies',
    descripcion: 'Biodiversidad única y aves migratorias',
    lat: 0.4567,
    lng: -80.0345,
    categoria: 'naturaleza',
    comunidad: 'Cojimies',
    visitado: false,
    tipo: 'turístico',
    direccion: 'Vía a los Manglares, Cojimies'
  },
  {
    id: '27',
    nombre: 'Estero La Boca',
    descripcion: 'Ecosistema de manglar con diversidad de aves y vida acuática',
    lat: 0.0789,
    lng: -80.0567,
    categoria: 'naturaleza',
    comunidad: 'La Boca',
    visitado: false,
    tipo: 'costera',
    direccion: 'Vía Estero La Boca, Pedernales'
  },
  {
    id: '28',
    nombre: 'Laguna de Pedernales',
    descripcion: 'Espejo de agua con aves acuáticas y paisajes tranquilos',
    lat: 0.0789,
    lng: -80.0456,
    categoria: 'naturaleza',
    comunidad: 'Pedernales',
    visitado: false,
    tipo: 'turístico',
    direccion: 'Vía Laguna de Pedernales'
  },
  // RURAL (16)
  {
    id: '29',
    nombre: 'El Matal',
    descripcion: 'Producción de cacao, café y frutas tropicales',
    lat: 0.0523,
    lng: -80.0387,
    categoria: 'rural',
    comunidad: 'El Matal',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía El Matal, Pedernales'
  },
  {
    id: '30',
    nombre: 'El Salto',
    descripcion: 'Cascadas, pozas naturales y paisajes',
    lat: 0.0954,
    lng: -80.0423,
    categoria: 'rural',
    comunidad: 'El Salto',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía El Salto, Pedernales'
  },
  {
    id: '31',
    nombre: 'El Cucal',
    descripcion: 'Agricultura diversificada y ganadería',
    lat: 0.0345,
    lng: -80.0456,
    categoria: 'rural',
    comunidad: 'El Cucal',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía El Cucal, Pedernales'
  },
  {
    id: '32',
    nombre: 'El Porvenir',
    descripcion: 'Ecoturismo y agroindustria',
    lat: 0.1567,
    lng: -80.0234,
    categoria: 'rural',
    comunidad: 'El Porvenir',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía El Porvenir, Pedernales'
  },
  {
    id: '33',
    nombre: 'San Antonio',
    descripcion: 'Producción de lácteos y agricultura',
    lat: 0.0234,
    lng: -80.0678,
    categoria: 'rural',
    comunidad: 'San Antonio',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía San Antonio, Pedernales'
  },
  {
    id: '34',
    nombre: 'La Esperanza',
    descripcion: 'Desarrollo sostenible y turismo comunitario',
    lat: 0.1856,
    lng: -80.0156,
    categoria: 'rural',
    comunidad: 'La Esperanza',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía La Esperanza, Pedernales'
  },
  {
    id: '35',
    nombre: 'Palmar',
    descripcion: 'Plantaciones de palma africana y cacao',
    lat: 0.1987,
    lng: -80.0089,
    categoria: 'rural',
    comunidad: 'Palmar',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía Palmar, Pedernales'
  },
  {
    id: '36',
    nombre: 'La Laguna',
    descripcion: 'Pesca deportiva y ecoturismo',
    lat: 0.1123,
    lng: -80.0389,
    categoria: 'rural',
    comunidad: 'La Laguna',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía La Laguna, Pedernales'
  },
  {
    id: '37',
    nombre: 'San Vicente',
    descripcion: 'Agricultura y ganadería cerca del río',
    lat: 0.0456,
    lng: -80.0456,
    categoria: 'rural',
    comunidad: 'San Vicente',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía San Vicente, Pedernales'
  },
  {
    id: '38',
    nombre: 'La Concordia',
    descripcion: 'Producción agrícola y ganadera',
    lat: 0.0789,
    lng: -80.0345,
    categoria: 'rural',
    comunidad: 'La Concordia',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía La Concordia, Pedernales'
  },
  {
    id: '39',
    nombre: 'Nuevo Amanecer',
    descripcion: 'Comunidad en crecimiento con proyectos productivos',
    lat: 0.1345,
    lng: -80.0456,
    categoria: 'rural',
    comunidad: 'Nuevo Amanecer',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía Nuevo Amanecer, Pedernales'
  },
  {
    id: '40',
    nombre: 'La Chorrera',
    descripcion: 'Producción de cultivos diversos',
    lat: 0.0567,
    lng: -80.0789,
    categoria: 'rural',
    comunidad: 'La Chorrera',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía La Chorrera, Pedernales'
  },
  {
    id: '41',
    nombre: 'Chiquimbe',
    descripcion: 'Paisajes naturales y agricultura',
    lat: 0.0456,
    lng: -80.0891,
    categoria: 'rural',
    comunidad: 'Chiquimbe',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía Chiquimbe, Pedernales'
  },
  {
    id: '42',
    nombre: 'Táchira',
    descripcion: 'Tradición agrícola y ganadera',
    lat: 0.0789,
    lng: -80.0987,
    categoria: 'rural',
    comunidad: 'Táchira',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía Táchira, Pedernales'
  },
  {
    id: '43',
    nombre: 'Mediano',
    descripcion: 'Producción de cultivos tropicales',
    lat: 0.0678,
    lng: -80.0678,
    categoria: 'rural',
    comunidad: 'Mediano',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía Mediano, Pedernales'
  },
  {
    id: '44',
    nombre: 'El Guayabo',
    descripcion: 'Producción de frutas y agricultura diversificada',
    lat: 0.0567,
    lng: -80.0891,
    categoria: 'rural',
    comunidad: 'El Guayabo',
    visitado: false,
    tipo: 'rural',
    direccion: 'Vía El Guayabo, Pedernales'
  }
];

let datosInicializados = false;

export const lugaresService = {
  async reiniciarDatos() {
    try {
      await almacen.setItem('lugares', DATOS_INICIALES);
      await almacen.setItem('inicializado', true);
      datosInicializados = true;
      console.log('✅ Datos reiniciados correctamente');
      return DATOS_INICIALES;
    } catch (error) {
      console.error('Error reiniciando datos:', error);
      throw error;
    }
  },

  async inicializar() {
    if (!datosInicializados) {
      try {
        const existe = await almacen.getItem('inicializado');
        if (!existe) {
          await almacen.setItem('lugares', DATOS_INICIALES);
          await almacen.setItem('inicializado', true);
          console.log('✅ 44 comunidades de Pedernales cargadas correctamente');
        } else {
          const datos = await almacen.getItem('lugares');
          if (!datos || datos.length === 0) {
            await almacen.setItem('lugares', DATOS_INICIALES);
            console.log('✅ Datos recargados (estaban vacíos)');
          }
        }
        datosInicializados = true;
      } catch (error) {
        console.error('Error inicializando almacen:', error);
        try {
          await almacen.setItem('lugares', DATOS_INICIALES);
          await almacen.setItem('inicializado', true);
          datosInicializados = true;
        } catch (e) {
          console.error('Error crítico:', e);
        }
      }
    }
  },

  async obtenerTodos() {
    await this.inicializar();
    try {
      const lugares = await almacen.getItem('lugares');
      if (!lugares || lugares.length === 0) {
        await almacen.setItem('lugares', DATOS_INICIALES);
        return DATOS_INICIALES;
      }
      return lugares;
    } catch (error) {
      console.error('Error obteniendo lugares:', error);
      return DATOS_INICIALES;
    }
  },

  async obtenerPorCategoria(categoria) {
    const todos = await this.obtenerTodos();
    return todos.filter(l => l.categoria === categoria);
  },

  async obtenerCategorias() {
    const todos = await this.obtenerTodos();
    const categorias = {};
    todos.forEach(lugar => {
      if (lugar.categoria) {
        if (!categorias[lugar.categoria]) {
          categorias[lugar.categoria] = [];
        }
        categorias[lugar.categoria].push(lugar);
      }
    });
    return categorias;
  },

  async obtenerComunidades() {
    const todos = await this.obtenerTodos();
    const comunidades = {};
    todos.forEach(lugar => {
      if (lugar.comunidad) {
        if (!comunidades[lugar.comunidad]) {
          comunidades[lugar.comunidad] = {
            nombre: lugar.comunidad,
            visitado: false,
            lugares: [],
            tipo: lugar.tipo || 'rural',
            categoria: lugar.categoria
          };
        }
        comunidades[lugar.comunidad].lugares.push(lugar);
        if (lugar.visitado) {
          comunidades[lugar.comunidad].visitado = true;
        }
      }
    });
    return Object.values(comunidades);
  },

  async marcarVisitado(id) {
    const lugares = await this.obtenerTodos();
    const index = lugares.findIndex(l => l.id === id);
    if (index !== -1) {
      lugares[index].visitado = !lugares[index].visitado;
      await almacen.setItem('lugares', lugares);
      return true;
    }
    return false;
  },

  async obtenerEstadisticas() {
    const comunidades = await this.obtenerComunidades();
    const totalComunidades = comunidades.length;
    const visitadas = comunidades.filter(c => c.visitado).length;
    const faltantes = totalComunidades - visitadas;
    const porcentaje = totalComunidades > 0 ? Math.round((visitadas / totalComunidades) * 100) : 0;

    const totalLugares = (await this.obtenerTodos()).length;
    const lugaresVisitados = (await this.obtenerTodos()).filter(l => l.visitado).length;

    const categorias = await this.obtenerCategorias();
    const statsCategorias = {};
    Object.keys(categorias).forEach(cat => {
      const lugaresCat = categorias[cat];
      const visitadosCat = lugaresCat.filter(l => l.visitado).length;
      statsCategorias[cat] = {
        total: lugaresCat.length,
        visitados: visitadosCat,
        porcentaje: Math.round((visitadosCat / lugaresCat.length) * 100)
      };
    });

    return {
      totalComunidades,
      visitadas,
      faltantes,
      porcentaje,
      totalLugares,
      lugaresVisitados,
      categorias: statsCategorias,
      comunidades
    };
  },

  async agregar(nuevoLugar) {
    await this.inicializar();
    try {
      const lugares = await this.obtenerTodos();
      const nuevoId = Date.now().toString();
      const lugarConId = { 
        ...nuevoLugar, 
        id: nuevoId,
        visitado: false
      };
      lugares.push(lugarConId);
      await almacen.setItem('lugares', lugares);
      return lugarConId;
    } catch (error) {
      console.error('Error agregando lugar:', error);
      throw error;
    }
  },

  async actualizar(id, datosActualizados) {
    await this.inicializar();
    try {
      const lugares = await this.obtenerTodos();
      const index = lugares.findIndex(l => l.id === id);
      if (index !== -1) {
        lugares[index] = { ...lugares[index], ...datosActualizados };
        await almacen.setItem('lugares', lugares);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error actualizando lugar:', error);
      throw error;
    }
  },

  async eliminar(id) {
    await this.inicializar();
    try {
      const lugares = await this.obtenerTodos();
      const filtrados = lugares.filter(l => l.id !== id);
      await almacen.setItem('lugares', filtrados);
      return true;
    } catch (error) {
      console.error('Error eliminando lugar:', error);
      throw error;
    }
  }
};
