export const PROGRAM_DAYS = [
  {
    id: 'day-1',
    dayNumber: 1,
    date: 'Jueves, 18 de Febrero de 2027',
    shortDate: '18 FEB 2027',
    title: 'Apertura Oficial & Marco Estratégico',
    description: 'Sesión inaugural, acreditación de congresistas y conferencia magistral de apertura con autoridades del sector marítimo internacional.',
    sessions: [
      {
        id: 's1-1',
        time: '16:00 - 18:00',
        duration: '120 min',
        category: 'general',
        categoryLabel: 'Acreditación',
        title: 'Inscripciones y Entrega de Acreditaciones',
        location: 'Hall Principal & Foyer Tecnológico',
        speaker: 'Secretaría Técnica IBERNAÚTICA',
        speakerRole: 'Recepción y bienvenida de congresistas',
        description: 'Entrega de pases digitales con chip NFC, documentación técnica del congreso, memorias previas y acceso a la plataforma interactiva del foro.',
        tags: ['Acreditaciones', 'Check-in', 'Documentación']
      },
      {
        id: 's1-2',
        time: '18:00 - 19:30',
        duration: '90 min',
        category: 'general',
        categoryLabel: 'Conferencia Magistral',
        title: 'Conferencia Magistral de Apertura Oficial: Descarbonización 2030-2050',
        location: 'Auditorio Principal Mar de Vigo',
        speaker: 'Comité Científico & Invitados de Honor',
        speakerRole: 'Dirección General de Marina Mercante & OMI / IMO',
        description: 'Análisis geopolítico y normativo de la directiva europea Fit for 55, el régimen ETS marítimo y los objetivos OMI de reducción de emisiones netas para 2050.',
        tags: ['Estrategia OMI', 'Fit for 55', 'ETS Marítimo', 'Apertura'],
        highlight: true
      },
      {
        id: 's1-3',
        time: '19:30 - 21:00',
        duration: '90 min',
        category: 'general',
        categoryLabel: 'Networking',
        title: 'Cóctel de Bienvenida & Encuentro B2B',
        location: 'Terraza Panorámica Ría de Vigo',
        speaker: 'Patrocinadores Institucionales',
        speakerRole: 'Espacio de intercambio profesional',
        description: 'Punto de encuentro entre astilleros, ingenierías navales, autoridades portuarias, armadores y proveedores de tecnología cero emisiones.',
        tags: ['Networking', 'Cóctel', 'B2B']
      }
    ]
  },
  {
    id: 'day-2',
    dayNumber: 2,
    date: 'Viernes, 19 de Febrero de 2027',
    shortDate: '19 FEB 2027',
    title: 'Bloques Técnicos Intensivos & Mesa Redonda',
    description: 'Jornada completa de análisis técnico: electrificación en muelle (OPS), renovables offshore, combustibles alternativos y transición de la flota pesquera.',
    sessions: [
      {
        id: 's2-1',
        time: '09:00 - 09:30',
        duration: '30 min',
        category: 'general',
        categoryLabel: 'Documentación',
        title: 'Inscripciones y Entrega de Documentación',
        location: 'Hall de Congresos',
        speaker: 'Secretaría Técnica',
        speakerRole: 'Acreditaciones de segunda jornada',
        description: 'Apertura de puertas para delegados técnicos y preparación de sistemas de votación interactiva para las mesas redondas.',
        tags: ['Registro']
      },
      {
        id: 's2-2',
        time: '09:30 - 11:15',
        duration: '105 min (2x45 min + 15 min coloquio)',
        category: 'ops',
        categoryLabel: 'Bloque 1: OPS & Electrificación',
        title: 'Suministro de energía en puerto (OPS / Onshore Power Supply)',
        location: 'Auditorio Principal',
        speaker: 'GHENOVA & Autoridad Portuaria de Vigo',
        speakerRole: 'Ponencias destacadas técnicas de ingeniería y gestión portuaria',
        description: 'Dos conferencias técnicas especializadas de 45 minutos seguidas de 15 minutos de coloquio y preguntas en directo:',
        subTalks: [
          {
            time: '09:30 - 10:15',
            title: 'Despliegue de subestaciones OPS en media tensión y gestión de picos de demanda en dársenas pesqueras y comerciales',
            speaker: 'Dpto. de Sostenibilidad y Obras, Autoridad Portuaria de Vigo'
          },
          {
            time: '10:15 - 11:00',
            title: 'Sistemas a bordo para conexión a tierra (Cold Ironing): Convertidores de frecuencia 50/60 Hz y sincronización segura',
            speaker: 'Dirección Técnica de GHENOVA Naval Engineering'
          },
          {
            time: '11:00 - 11:15',
            title: 'Coloquio abierto con los asistentes y preguntas del foro en directo',
            speaker: 'Mesa conjunta AP Vigo + GHENOVA'
          }
        ],
        tags: ['OPS', 'Cold Ironing', 'Media Tensión', 'GHENOVA', 'Puerto de Vigo'],
        highlight: true
      },
      {
        id: 's2-3',
        time: '11:15 - 11:45',
        duration: '30 min',
        category: 'general',
        categoryLabel: 'Pausa',
        title: 'Pausa Café & Exposición de Tecnologías Navales',
        location: 'Área Expo & Demostraciones',
        speaker: 'Área Comercial',
        speakerRole: 'Networking técnico',
        description: 'Café de trabajo y visita a los stands con maquetas de sistemas de propulsión de metanol, sistemas de velas rígidas y cargadores marinos de alta potencia.',
        tags: ['Coffee Break', 'Expo']
      },
      {
        id: 's2-4',
        time: '11:45 - 13:30',
        duration: '105 min (2x45 min + 15 min coloquio)',
        category: 'renovables',
        categoryLabel: 'Bloque 2: Renovables Marinas',
        title: 'Energías renovables marinas (Offshore, eólica flotante y maremotriz)',
        location: 'Auditorio Principal',
        speaker: 'Consorcios Eólicos Offshore & Centros Tecnológicos',
        speakerRole: 'Especialistas en ingeniería marina de aguas profundas',
        description: 'Dos conferencias de 45 minutos y 15 minutos de debate sobre la integración de la energía del mar en la navegación y las costas:',
        subTalks: [
          {
            time: '11:45 - 12:30',
            title: 'Diseño de buques de servicio para eólica marina flotante (CSOV / SOV): Nuevas demandas para los astilleros ibéricos',
            speaker: 'Dr. Manuel Castro (Especialista en Buques Offshore)'
          },
          {
            time: '12:30 - 13:15',
            title: 'Generación undimotriz e hidrocinética en rías: Puertos autónomos y boyas de recarga para buques costeros',
            speaker: 'Instituto Tecnológico del Mar y Energías Renovables'
          },
          {
            time: '13:15 - 13:30',
            title: 'Coloquio y preguntas de los asistentes',
            speaker: 'Ponentes del bloque de renovables'
          }
        ],
        tags: ['Eólica Flotante', 'CSOV / SOV', 'Undimotriz', 'Offshore']
      },
      {
        id: 's2-5',
        time: '13:30 - 15:00',
        duration: '90 min',
        category: 'general',
        categoryLabel: 'Almuerzo',
        title: 'Almuerzo de trabajo & Presentación de Posters Técnicos',
        location: 'Restaurante del Congreso & Zona Póster',
        speaker: 'Investigadores Nóveles y Empresas',
        speakerRole: 'Presentaciones breves',
        description: 'Almuerzo buffet para congresistas con exhibición de 18 pósteres técnicos de tesis doctorales y proyectos CDTI de descarbonización.',
        tags: ['Almuerzo', 'Posters']
      },
      {
        id: 's2-6',
        time: '15:00 - 16:45',
        duration: '105 min (2x45 min + 15 min coloquio)',
        category: 'combustibles',
        categoryLabel: 'Bloque 3: Combustibles Alternativos',
        title: 'Combustibles alternativos en el sector naval (Metanol verde, Amoníaco, H2)',
        location: 'Auditorio Principal',
        speaker: 'Sociedades de Clasificación & Fabricantes de Motores Dual-Fuel',
        speakerRole: 'Líderes mundiales en propulsión marina limpia',
        description: 'Dos conferencias especializadas de 45 minutos y 15 minutos de coloquio técnico:',
        subTalks: [
          {
            time: '15:00 - 15:45',
            title: 'E-Metanol frente a Hidrógeno Líquido: Almacenamiento, volumetric energy density y retrofit en buques existentes',
            speaker: 'Equipo de I+D Propulsión Naval Alternativa'
          },
          {
            time: '15:45 - 16:30',
            title: 'Amoníaco verde como combustible marítimo: Seguridad según códigos IGF, tratamiento de fugas (scrubbers) y combustión en motores de 2 y 4 tiempos',
            speaker: 'Sociedad de Clasificación Naval (Bureau Veritas / DNV)'
          },
          {
            time: '16:30 - 16:45',
            title: 'Coloquio con los asistentes y resolución de preguntas votadas en el foro',
            speaker: 'Panel técnico de combustibles alternativos'
          }
        ],
        tags: ['Metanol Verde', 'Amoníaco NH3', 'Hidrógeno H2', 'Dual-Fuel', 'IGF Code'],
        highlight: true
      },
      {
        id: 's2-7',
        time: '16:45 - 17:00',
        duration: '15 min',
        category: 'general',
        categoryLabel: 'Pausa',
        title: 'Pausa Café',
        location: 'Foyer',
        speaker: 'Organización',
        speakerRole: 'Pausa breve previa al panel de cierre',
        description: 'Café rápido previo a la sesión plenaria de debate sobre la flota pesquera.',
        tags: ['Coffee Break']
      },
      {
        id: 's2-8',
        time: '17:00 - 18:00',
        duration: '60 min',
        category: 'pesca',
        categoryLabel: 'Mesa Redonda Principal',
        title: 'Mesa Redonda: Descarbonización del Sector Naval con Especial Enfoque en la Flota Pesquera',
        location: 'Auditorio Principal Mar de Vigo',
        speaker: 'Javier Touza (Presidente de ARVI) & Panel de Armadores y Diseñadores Navales',
        speakerRole: 'Ponente Invitado de Honor y Representantes de la Industria Pesquera',
        description: 'Debate estratégico de máxima relevancia práctica sobre la reconversión y futuro de los buques pesqueros de Gran Sol, arrastreros congeladores y artes menores frente a los retos de volumen de bodega (-25°C), autonomía de 60-90 días, seguridad de tripulación y costes de transformación.',
        roundTableParticipants: [
          { name: 'Javier Touza', role: 'Presidente de la Cooperativa de Armadores de Pesca del Puerto de Vigo (ARVI)' },
          { name: 'Representante de Astilleros Gallegos', role: 'Director de Innovación Naval' },
          { name: 'Ingeniero Consultor Senior', role: 'Especialista en Hibridación Pesquera' },
          { name: 'Secretaría General de Pesca', role: 'Políticas de Renovación y Fondos FEMPA' }
        ],
        tags: ['Javier Touza', 'Flota Pesquera', 'ARVI', 'Bodegas Refrigeradas', 'Gran Sol', 'Mesa Redonda'],
        highlight: true,
        specialBadge: 'SESIÓN PLENARIA DESTACADA'
      },
      {
        id: 's2-9',
        time: '18:00 - 18:30',
        duration: '30 min',
        category: 'general',
        categoryLabel: 'Clausura',
        title: 'Clausura Oficial y Presentación del Manifiesto IBERNAÚTICA 27',
        location: 'Auditorio Principal',
        speaker: 'Comité de Dirección IBERNAÚTICA 27',
        speakerRole: 'Lectura de conclusiones y entrega de distinciones',
        description: 'Resumen ejecutivo de las jornadas, votación del documento de conclusiones técnicas y convocatoria de los grupos de trabajo permanentes.',
        tags: ['Clausura', 'Conclusiones', 'Manifiesto']
      }
    ]
  }
];

export const PROGRAM_CATEGORIES = [
  { id: 'all', label: 'Todas las Sesiones', icon: 'Layers' },
  { id: 'ops', label: 'OPS / Conexión Muelle', icon: 'Zap', color: 'cyan' },
  { id: 'renovables', label: 'Renovables Marinas', icon: 'Wind', color: 'emerald' },
  { id: 'combustibles', label: 'Combustibles (H2/Metanol/NH3)', icon: 'Flame', color: 'amber' },
  { id: 'pesca', label: 'Flota Pesquera (Touza)', icon: 'Ship', color: 'blue' },
];
