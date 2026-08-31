export const SPEAKERS = [
  {
    id: 'sp-touza',
    name: 'Javier Touza',
    role: 'Presidente de ARVI (Cooperativa de Armadores de Pesca de Vigo)',
    organization: 'ARVI / Puerto de Vigo',
    image: `${import.meta.env.BASE_URL}images/speakers/speaker_touza.jpg`,
    specialty: 'Armadores & Flota Pesquera',
    topic: 'Mesa Redonda: Descarbonización del Sector Naval & Flota Pesquera',
    bio: 'Referente indiscutible del sector pesquero y armador a nivel internacional. Defensor activo de una transición energética realista, justa y técnicamente viable para la flota de Gran Sol y buques congeladores.',
    highlight: true,
    sessions: ['Mesa Redonda Principal (Jornada 2 - 17:00h)']
  },
  {
    id: 'sp-ghenova',
    name: 'Dirección Técnica GHENOVA',
    role: 'Líderes en Ingeniería Naval y Descarbonización',
    organization: 'GHENOVA Naval Engineering',
    image: `${import.meta.env.BASE_URL}images/speakers/speaker_ghenova.jpg`,
    specialty: 'Ingeniería Naval & Dual-Fuel',
    topic: 'OPS a Bordo y Vectores Criogénicos (Metanol y H2)',
    bio: 'Multinacional de ingeniería puntera en el diseño de buques de última generación, sistemas de propulsión alternativa dual-fuel y conversión de cuadros eléctricos para conexión a tierra.',
    highlight: true,
    sessions: ['Suministro OPS (09:30h)', 'Combustibles Alternativos (15:00h)']
  },
  {
    id: 'sp-apvigo',
    name: 'Autoridad Portuaria de Vigo',
    role: 'División de Sostenibilidad, Obras y Green Port',
    organization: 'Puerto de Vigo',
    image: `${import.meta.env.BASE_URL}images/speakers/speaker_apvigo.jpg`,
    specialty: 'Infraestructura Portuaria OPS',
    topic: 'Despliegue de Redes OPS en Dársenas Industriales',
    bio: 'Puerto pionero europeo en la iniciativa Blue Growth y despliegue de infraestructuras de electrificación en muelle para buques de pesca fresca, congelada y terminales Ro-Ro.',
    highlight: true,
    sessions: ['Bloque 1: OPS & Electrificación (09:30h)']
  },
  {
    id: 'sp-varela',
    name: 'Dra. Helena Varela',
    role: 'Investigadora en Propulsión Marina Sostenible',
    organization: 'Centro de Investigación Marina (CIM) - UVigo',
    image: `${import.meta.env.BASE_URL}images/speakers/speaker_varela.jpg`,
    specialty: 'Termodinámica & E-Fuels',
    topic: 'Análisis de Combustión Dual-Fuel y E-Fuels Marítimos',
    bio: 'Especialista en termodinámica marina y modelización computacional de emisiones en motores de combustión alimentados con e-metanol y mezclas de amoníaco.',
    highlight: false,
    sessions: ['Bloque 3: Combustibles Alternativos (15:00h)']
  },
  {
    id: 'sp-castro',
    name: 'Dr. Manuel Castro',
    role: 'Especialista en Buques Offshore & Eólica Marina',
    organization: 'Consorcio Tecnológico Eólico Atlántico',
    image: `${import.meta.env.BASE_URL}images/speakers/speaker_castro.jpg`,
    specialty: 'CSOV & Eólica Flotante',
    topic: 'Diseño de Buques de Apoyo CSOV/SOV para Eólica Flotante',
    bio: 'Doctor ingeniero naval con más de 20 años de experiencia en el dimensionamiento y construcción de plataformas marinas y buques de apoyo en aguas ultra profundas.',
    highlight: false,
    sessions: ['Bloque 2: Renovables Marinas (11:45h)']
  }
];

