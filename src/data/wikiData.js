export const WIKI_ARTICLES = [
  {
    id: 'ops-cold-ironing',
    slug: 'ops-cold-ironing',
    category: 'ops',
    categoryName: 'OPS & Electrificación',
    title: 'Onshore Power Supply (OPS): Retos de Suministro y Conexión en Muelle',
    subtitle: 'Aspectos electrotécnicos, convertidores de frecuencia 50/60 Hz y sincronización buque-puerto',
    readTime: '6 min de lectura',
    badge: 'Infraestructura Portuaria',
    summary: 'El suministro eléctrico en puerto (OPS o Cold Ironing) permite a los buques apagar sus motores auxiliares y conectarse a la red eléctrica terrestre durante su estancia en muelle, reduciendo a cero las emisiones locales de NOx, SOx, partículas (PM) y ruido acústico.',
    keyStats: [
      { label: 'Reducción de Emisiones Locales', value: '100%' },
      { label: 'Tensiones Típicas de Red', value: '6.6 kV / 11 kV' },
      { label: 'Conversión Frecuencia', value: '50 Hz ⇄ 60 Hz' },
      { label: 'Meta UE (AFIR / Fit for 55)', value: 'Obligatorio 2030' },
    ],
    sections: [
      {
        heading: '1. Arquitectura Técnica de un Sistema OPS',
        content: `Un sistema OPS moderno consta de tres subsistemas fundamentales:
        
1. **Subestación de Transformación y Conversión Terrestre:** Recibe la energía de la red de distribución general (habitualmente a 15-45 kV, 50 Hz en Europa) y mediante convertidores estáticos de frecuencia (SFC - Static Frequency Converters) y transformadores la acondiciona a la tensión y frecuencia del buque (habitualmente 6.6 kV o 440 V a 60 Hz en navegación internacional).
2. **Sistema de Gestión de Cable (CMS - Cable Management System):** Brazos articulados, carretes motorizados o grúas de pescante en muelle que entregan los cables blindados y las mangueras de fibra óptica de control al buque garantizando el margen de marea y movimientos de estiba.
3. **Cuadro de Conexión a Bordo y Sincronización:** Interruptores automáticos de potencia, sistemas de transferencia de carga en rampa sin corte de suministro (Blackout-free seamless transfer) e interbloqueos de seguridad certificados según norma IEC/IEEE 80005-1.`
      },
      {
        heading: '2. Principales Retos Técnicos en Dársenas Pesqueras e Industriales',
        content: `A diferencia de las terminales de cruceros o portacontenedores de gran porte, las dársenas con flota pesquera o buques de mediano porte presentan especificidades complejas:

- **Simultaneidad y Picos de Carga:** En momentos de descarga masiva, buques congeladores requieren entre 300 kW y 1.2 MW cada uno para mantener túneles y bodegas a -25°C, sumando picos de demanda simultáneos de hasta 15-20 MW en dársenas concentradas como las del Puerto de Vigo (Bouzas / O Berbés).
- **Heterogeneidad de la Flota:** Coexistencia de buques con cuadros a 400V 50Hz, 440V 60Hz y 690V 60Hz, lo que exige convertidores modulares multinivel (MMC).
- **Seguridad en Atmósferas Marinas Salinas:** Conectores robustos de acoplamiento rápido con protección IP67/IP68 y monitorización continua del aislamiento a tierra.`
      },
      {
        heading: '3. Marco Normativo Europeo (AFIR & Directiva Fit for 55)',
        content: `El Reglamento Europeo de Infraestructuras de Combustibles Alternativos (AFIR) estipula que a partir del 1 de enero de 2030, todos los puertos de la red transeuropea RTE-T deberán suministrar electricidad en muelle a los buques portacontenedores y buques de pasaje de más de 5.000 GT. En puertos pesqueros líderes, las bonificaciones tarifarias portuarias (tasas T1/T2) están actuando como catalizador para adelantar la adopción a la flota de altura.`
      }
    ]
  },
  {
    id: 'vectores-energeticos',
    slug: 'vectores-energeticos',
    category: 'combustibles',
    categoryName: 'Combustibles Alternativos',
    title: 'Vectores Energéticos Cero Emisiones: Matriz Comparativa',
    subtitle: 'Análisis de densidad volumétrica, criogenia, seguridad toxicológica y madurez tecnológica (H2 vs Metanol vs Amoníaco)',
    readTime: '8 min de lectura',
    badge: 'Propulsión Marina',
    summary: 'La descarbonización del transporte marítimo exige sustituir los combustibles fósiles tradicionales (VLSFO y MGO) por vectores de energía limpia. No existe una solución única: cada vector presenta compromisos entre densidad de almacenamiento, seguridad y coste de reconversión.',
    interactiveMatrix: true,
    fuelComparison: [
      {
        name: 'Diésel Marino (MGO / VLSFO)',
        type: 'Fósil Referencia',
        densityVolumetric: 36.0, // MJ/L
        densityGravimetric: 42.6, // MJ/kg
        storageTemp: 'Ambiente (15°C - 40°C)',
        storagePressure: '1 bar (Atmosférica)',
        cargoVolumePenalty: '1.0x (Línea base)',
        toxicity: 'Baja',
        ghgReduction: '0% (Emisor neto)',
        trl: 9,
        safetyCode: 'SOLAS convencional',
        status: 'Fósil en sustitución gradual'
      },
      {
        name: 'Metanol Verde (e-Metanol / Bio-metanol)',
        type: 'Sintético / Biogénico',
        densityVolumetric: 15.8, // MJ/L
        densityGravimetric: 19.9, // MJ/kg
        storageTemp: 'Ambiente (Líquido)',
        storagePressure: '1 bar (Atmosférica)',
        cargoVolumePenalty: '2.3x respecto a MGO',
        toxicity: 'Media (Inflamable, toxicidad por ingestión)',
        ghgReduction: '90 - 95% (Well-to-Wake)',
        trl: 8,
        safetyCode: 'Directrices IMO IGF (MSC.1/Circ.1621)',
        status: 'Alta madurez comercial inmediata en nueva construcción'
      },
      {
        name: 'Amoníaco Verde (e-NH3)',
        type: 'Sintético libre de carbono',
        densityVolumetric: 12.7, // MJ/L
        densityGravimetric: 18.6, // MJ/kg
        storageTemp: '-33°C (Refrigerado) o 8.5 bar',
        storagePressure: '1 - 10 bar',
        cargoVolumePenalty: '2.8x respecto a MGO',
        toxicity: 'Alta (Muy tóxico para humanos y fauna acuática)',
        ghgReduction: '95 - 100% (Cero CO2 en combustión)',
        trl: 6,
        safetyCode: 'Código IGF en desarrollo / Código IGC',
        status: 'En pruebas piloto en motores 2 tiempos para grandes rutas'
      },
      {
        name: 'Hidrógeno Líquido (LH2)',
        type: 'Criogénico puro',
        densityVolumetric: 8.5, // MJ/L
        densityGravimetric: 120.0, // MJ/kg (Muy alta en peso)
        storageTemp: '-253°C (Ultra criogénico)',
        storagePressure: '1 - 5 bar (Tanques tipo C / aislamiento vacío)',
        cargoVolumePenalty: '4.5x a 5.0x respecto a MGO',
        toxicity: 'Baja (Alta inflamabilidad / riesgo de fuga y boil-off)',
        ghgReduction: '100% (Cero emisiones netas)',
        trl: 5,
        safetyCode: 'Directrices provisionales IMO LH2',
        status: 'Idóneo para ferris costeros, remolcadores y pilas de combustible'
      },
      {
        name: 'Baterías LFP / NMC',
        type: 'Electroquímico',
        densityVolumetric: 1.5, // MJ/L
        densityGravimetric: 0.9, // MJ/kg
        storageTemp: '20°C (Gestión térmica activa)',
        storagePressure: 'N/A',
        cargoVolumePenalty: '25x - 30x respecto a MGO',
        toxicity: 'Riesgo de Thermal Runaway (embalamiento térmico)',
        ghgReduction: '100% (Operación local)',
        trl: 8,
        safetyCode: 'Normas de clase DNV / Bureau Veritas',
        status: 'Perfecto para rutas cortas (<2h) y apoyo híbrido (peak shaving)'
      }
    ],
    sections: [
      {
        heading: '1. Comparativa de Densidad Volumétrica y Penalización de Carga',
        content: `Uno de los mayores cuellos de botella en arquitectura naval es el volumen requerido por los tanques de combustible alternativo. Mientras que el fuelóleo marino almacena 36 MJ por litro, el metanol necesita 2.3 veces más volumen, el amoníaco 2.8 veces y el hidrógeno líquido hasta 4.5 veces más volumen (sin contar el peso del sistema criogénico y doble pared de aislamiento).`
      },
      {
        heading: '2. Seguridad a Bordo: Toxicidad vs. Inflamabilidad',
        content: `El **Amoníaco (NH3)** tiene la inmensa ventaja de no poseer ningún átomo de carbono (cero emisiones de CO2 directas), pero su extrema toxicidad (Límite IDLH de 300 ppm) exige dobles tuberías con detección óptica de gas, sistemas de lavado con agua (scrubbers) para venteos de emergencia y cámaras de motor estancas.

El **Metanol (CH3OH)**, al ser líquido a temperatura y presión ambiente, permite utilizar tanques de doble fondo con modificaciones menores y recubrimientos epoxídicos resistentes, convirtiéndose en el combustible de menor coste de retrofit en la actualidad.`
      }
    ]
  },
  {
    id: 'flota-pesquera',
    slug: 'flota-pesquera',
    category: 'pesca',
    categoryName: 'Flota Pesquera & Transición Justa',
    title: 'Transición Energética de la Flota Pesquera: Desafíos Críticos de Reconversión',
    subtitle: 'Bodegas frigoríficas a -25°C, autonomía de navegación en altura y propuestas del sector (Javier Touza / ARVI)',
    readTime: '7 min de lectura',
    badge: 'Sector Pesquero Estratégico',
    summary: 'La flota pesquera de altura y gran altura (Gran Sol, Atlántico Sur, caladeros internacionales) presenta unos condicionantes operativos únicos en el sector naval: campañas de 30 a 90 días, consumo intensivo en congelación y una estricta limitación de espacio en bodegas.',
    keyStats: [
      { label: 'Temperatura de Bodega', value: '-25°C a -30°C' },
      { label: 'Autonomía de Campaña', value: '45 - 90 Días' },
      { label: 'Ahorro Potencial con Hibridación', value: '18 - 25%' },
      { label: 'Edad Media de la Flota', value: '>28 Años' },
    ],
    sections: [
      {
        heading: '1. El Dilema del Espacio: Bodega de Pescado vs. Tanques de Combustible Cero Emisiones',
        content: `En un buque arrastrero congelador de 50 a 80 metros de eslora, la rentabilidad económica depende directamente del volumen útil de las bodegas frigoríficas. 

Si se instalaran tanques de hidrógeno comprimido a 350 bar o hidrógeno líquido, el volumen restado a las bodegas oscilaría entre el 25% y el 40%, haciendo inviable la viabilidad financiera de la marea. Tal como subraya Javier Touza (Presidente de ARVI), la transición de la flota pesquera requiere soluciones adaptadas a su realidad operativa y no una transposición ciega de modelos de la marina mercante de grandes buques portacontenedores.`
      },
      {
        heading: '2. Rutas Tecnológicas Viables a Corto y Medio Plazo (2025-2035)',
        content: `Las soluciones con mayor consenso técnico para buques pesqueros incluyen:
        
1. **Hibridación Diésel-Eléctrica con Baterías para Peak Shaving:** Los arrastreros sufren variaciones bruscas de carga durante el largado, arrastre y virado del aparejo. Un banco de baterías de 500 kWh a 1 MWh absorbe las puntas de par motor, permitiendo operar los generadores diésel en su punto óptimo de rendimiento específico (SFOC), logrando reducciones de consumo de entre el 15% y el 22%.
2. **Uso de Biocombustibles Avanzados y HVO (Hydrotreated Vegetable Oil):** Como combustible "Drop-in" directo sin requerir reformas estructurales en motores ni pérdida de volumen de bodega.
3. **Optimización Hidrodinámica e Inteligencia Artificial:** Diseño de proas bulbosas optimizadas para olas atlánticas, toberas de propulsión de alto empuje, timones con perfil flap y monitorización de consumo por milla pescada mediante IoT.`
      },
      {
        heading: '3. Marco de Financiación y Fondos FEMPA',
        content: `La descarbonización de la flota exige un esfuerzo inversor masivo. Los armadores reclaman mayor flexibilidad en las directrices de ayudas de la UE (Fondo Europeo Marítimo, de Pesca y de Acuicultura - FEMPA) para permitir la sustitución y modernización de buques obsoletos por nuevas unidades eficientes sin que compute restrictivamente como aumento de capacidad pesquera bruta (GT).`
      }
    ]
  }
];
