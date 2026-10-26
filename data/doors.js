/**
 * Base de Datos Integral del Asesor de Puertas
 * Modelos, catálogo técnico, acabados y lógica de ponderación
 */

export const DOORS_DATABASE = [
  {
    id: "volker-monumental-pivot",
    name: "Völker Monumental Pivot P-900",
    tagline: "Presencia monumental, apertura pivotante fluida y nobleza de materiales.",
    category: "exterior",
    locationSuitable: ["exterior_principal", "oficina_comercial"],
    openingType: "pivot",
    openingLabel: "Pivotante de Eje Oculto (Hasta 350 kg)",
    material: "Nogal Americano Macizo con alma de Acero Galvanizado y Poliestireno Extruido",
    style: "Arquitectónico Escultural / Gran Formato",
    securityLevel: 4,
    securityLabel: "Grado 4 (Alta Seguridad Anti-Intrusión)",
    acousticRating: "42 dB",
    thermalRating: "U = 1.1 W/m²K (Clima extremo)",
    basePriceMXN: 48500,
    priceCategory: "high",
    image: "assets/images/pivot-walnut.jpg",
    dimensionsAvailable: [
      "1.20m x 2.40m (Monumental Estándar)",
      "1.50m x 2.80m (Gran Formato)",
      "1.60m x 3.00m (Suelo a Techo Custom)"
    ],
    badges: ["Pivotante Oculto 350kg", "Aislamiento 42dB", "Nogal Macizo", "Grado 4 Seguridad"],
    specs: {
      estructura: "Bastidor perimetral en acero al carbono con rotura de puente térmico y refuerzos diagonales.",
      herrajes: "Pivote de suelo hidráulico FritsJurgens / Dorma con freno ajustable a 90° y cierre amortiguado.",
      cerradura: "Cerradura multipunto de 5 bulones de acero templado con opción a sensor biométrico invisible en el tirador.",
      garantia: "10 años en estructura y 5 años en sistema pivotante y sellos."
    },
    pros: [
      "Impacto visual impresionante para fachadas residenciales modernas.",
      "Maniobrabilidad ultraligera a pesar de sus más de 120 kg de peso gracias a las físicas del pívot.",
      "Excelente hermeticidad con burletes de compresión automáticos perimetrales."
    ],
    idealFor: "Casas residenciales que buscan una entrada imponente, techos altos y diseño vanguardista."
  },
  {
    id: "kronos-armor-security",
    name: "Kronos Armor Security A-400",
    tagline: "El escudo definitivo de tranquilidad con acabado industrial contemporáneo.",
    category: "exterior",
    locationSuitable: ["exterior_principal", "exterior_secundario", "oficina_comercial"],
    openingType: "batiente",
    openingLabel: "Batiente Acorazada Reforzada con 4 rodamientos axiales",
    material: "Chapa de Acero Electro-zincado texturizado Antracita y panel fonoaislante multicapa",
    style: "Industrial Contemporáneo / Alta Resistencia",
    securityLevel: 5,
    securityLabel: "Grado 5 Certificado (Máximo Blindaje Residencial)",
    acousticRating: "46 dB",
    thermalRating: "U = 1.2 W/m²K",
    basePriceMXN: 34800,
    priceCategory: "mid_high",
    image: "assets/images/security-anthracite.jpg",
    dimensionsAvailable: [
      "0.90m x 2.10m (Medida estándar universal)",
      "1.00m x 2.20m (Paso amplio)",
      "1.10m x 2.40m (Formato alto)"
    ],
    badges: ["Blindaje Grado 5", "Smart Biométrico", "Anti-Bumping / Ganzúa", "Resistencia al Fuego 60min"],
    specs: {
      estructura: "Doble chapa de acero de 2mm con 4 omegas de refuerzo longitudinal y chapa de manganeso antitaladro.",
      herrajes: "3 pernios de seguridad de acero con rodamientos regulables en 3 dimensiones y 6 pivotes antipalanca traseros.",
      cerradura: "Cerradura inteligente con teclado digital capacitivo, escáner dactilar 3D y cilindro europeo de alta seguridad.",
      garantia: "15 años en blindaje estructural y 3 años en componentes electrónicos inteligentes."
    },
    pros: [
      "Insuperable nivel de protección contra intentos de forzado, palanca o taladro.",
      "Aislamiento térmico y acústico sobresaliente.",
      "Cero preocupación por llaves gracias a su integración biométrica y domótica."
    ],
    idealFor: "Propietarios cuya prioridad número uno es la seguridad de su familia y patrimonio sin sacrificar buen gusto."
  },
  {
    id: "aurea-invisible-oak",
    name: "Aurea Invisible Flush Oak I-200",
    tagline: "Elegancia sutil y purismo arquitectónico. La puerta que se funde con el espacio.",
    category: "interior",
    locationSuitable: ["interior_recamara", "oficina_comercial", "interior_paso"],
    openingType: "enrasada",
    openingLabel: "Enrasada a Ras de Muro (Marco de Aluminio Oculto)",
    material: "Chapa natural de Roble Blanco Nórdico alistonado con barniz ecológico mate sedoso",
    style: "Minimalista Escandinavo / Ras de Pared",
    securityLevel: 2,
    securityLabel: "Grado 2 (Confort Interior y Privacidad)",
    acousticRating: "38 dB",
    thermalRating: "U = 1.5 W/m²K",
    basePriceMXN: 18900,
    priceCategory: "mid",
    image: "assets/images/interior-oak.jpg",
    dimensionsAvailable: [
      "0.80m x 2.10m (Interior habitación)",
      "0.90m x 2.10m (Paso estándar)",
      "0.90m x 2.60m (Enrasada de piso a cielo raso)"
    ],
    badges: ["Marco Oculto In-Wall", "Picaporte Magnético", "Roble Blanco", "Bisagras 3D Ocultas"],
    specs: {
      estructura: "Bastidor de madera maciza estabilizada con alma celular fonoabsorbente de alta compresión.",
      herrajes: "Bisagras invisibles regulables en 3 ejes (Anselmi / Simonswerk) con acabado titanio mate.",
      cerradura: "Picaporte magnético patentado silencioso (la lengüeta no roza el marco, accionamiento suave al 100%).",
      garantia: "7 años en hoja y herrajes mecánicos."
    },
    pros: [
      "Estética limpia de alta costura arquitectónica: sin molduras ni marcos visibles.",
      "Cierre suave e insonoro sin ruidos metálicos molestos por las noches.",
      "Disponible en alturas completas de piso a techo para crear continuidad visual."
    ],
    idealFor: "Departamentos, residencias de diseño y espacios donde se busca un ambiente despejado y sereno."
  },
  {
    id: "lumina-fluted-glass",
    name: "Lumina Ribbed Fluted Glass G-300",
    tagline: "Luz natural tamizada, privacidad elegante y ligereza visual inconfundible.",
    category: "interior",
    locationSuitable: ["interior_bano", "interior_paso", "oficina_comercial", "interior_recamara"],
    openingType: "pivot_glass",
    openingLabel: "Pivotante o Corredera Suspendida Slim",
    material: "Vidrio Templado Fluted (Acanalado vertical) de 10mm con perfilería de Aluminio Negro Mate",
    style: "Contemporáneo Transparente / Textura Vidrio",
    securityLevel: 3,
    securityLabel: "Grado 3 (Vidrio de Seguridad Templado Anti-Impacto)",
    acousticRating: "35 dB",
    thermalRating: "U = 2.0 W/m²K",
    basePriceMXN: 24500,
    priceCategory: "mid_high",
    image: "assets/images/fluted-glass.jpg",
    dimensionsAvailable: [
      "0.85m x 2.15m (Paso interior)",
      "1.00m x 2.40m (Pivotante interior amplia)",
      "1.20m x 2.60m (Corredera o mampara divisoria)"
    ],
    badges: ["Cristal Acanalado 10mm", "Perfil Slim 18mm", "Privacidad Difusa", "Resistente a Humedad"],
    specs: {
      estructura: "Perfiles de aluminio extruido con recubrimiento de pintura electrostática en polvo curada al horno.",
      herrajes: "Pivote superior e inferior integrado en perfilería con tope magnético de retención.",
      cerradura: "Tirador ergonómico integrado de 60 cm con condena de privacidad para baño o despacho.",
      garantia: "5 años en perfilería y vidrio templado bajo norma EN 12150."
    },
    pros: [
      "Inmune a la humedad: jamás se hincha ni se deteriora, perfecta para baños, vestidores y cocinas.",
      "Permite el paso de luminosidad preservando total intimidad gracias al relieve estriado.",
      "Aporta una sensación de amplitud y ligereza visual inigualable."
    ],
    idealFor: "Baños de diseño, separadores de ambientes (suite/vestidor, cocina/comedor) y despachos ejecutivos."
  },
  {
    id: "valiant-thermo-exterior",
    name: "Valiant Thermo-Alu Exterior T-500",
    tagline: "Cero mantenimiento, alta resistencia al intemperismo y hermeticidad extrema.",
    category: "exterior",
    locationSuitable: ["exterior_secundario", "exterior_principal"],
    openingType: "batiente",
    openingLabel: "Batiente Hermética con Rotura de Puente Térmico (RPT)",
    material: "Aluminio Estructural Anodizado con núcleo de resina termo-aislante y acabado imitación madera o antracita",
    style: "Moderno Resistente / Clima Severo",
    securityLevel: 3,
    securityLabel: "Grado 3 (Seguridad Reforzada Exterior)",
    acousticRating: "41 dB",
    thermalRating: "U = 1.3 W/m²K (Excelente contra sol y frío)",
    basePriceMXN: 22800,
    priceCategory: "mid",
    image: "assets/images/security-anthracite.jpg",
    dimensionsAvailable: [
      "0.90m x 2.10m (Medida estándar)",
      "1.00m x 2.20m (Paso amplio)"
    ],
    badges: ["Cero Mantenimiento", "Hermética al Viento/Lluvia", "Rotura Puente Térmico", "Garantía 10 Años"],
    specs: {
      estructura: "Perfilería tubular multicámara de aluminio de 75mm con poliamidas aislantes de 34mm.",
      herrajes: "Bisagras de solape de alta capacidad con juntas de estanqueidad perimetrales de caucho EPDM.",
      cerradura: "Cerradura mecánica de 3 puntos con ganchos basculantes anti-retorno.",
      garantia: "10 años en acabado intemperie (sin decoloración por rayos UV ni corrosión)."
    },
    pros: [
      "No requiere barnices, lijados ni tratamientos contra el sol o la lluvia.",
      "Hermética frente a filtraciones de aire, agua, polvo o corrientes frías.",
      "Excelente relación durabilidad/precio para accesos a jardín o terrazas expuestas."
    ],
    idealFor: "Puertas que reciben sol directo constante, zonas costeras o accesos a terrazas y jardines."
  },
  {
    id: "silentium-acoustic-studio",
    name: "Silentium Master Acoustic H-100",
    tagline: "El santuario del silencio: máxima insonorización para el descanso y el enfoque.",
    category: "interior",
    locationSuitable: ["interior_recamara", "oficina_comercial"],
    openingType: "batiente",
    openingLabel: "Batiente Fonoaislante con Guillotina Inferior Automática",
    material: "Núcleo denso multicapa de fibra fonoaislante, placas viscoelásticas y madera noble",
    style: "Clásico Contemporáneo / Confort Premium",
    securityLevel: 3,
    securityLabel: "Grado 3 (Aislamiento & Solidez)",
    acousticRating: "47 dB (Aislamiento Grado Estudio)",
    thermalRating: "U = 1.4 W/m²K",
    basePriceMXN: 26900,
    priceCategory: "mid_high",
    image: "assets/images/interior-oak.jpg",
    dimensionsAvailable: [
      "0.85m x 2.10m",
      "0.90m x 2.10m",
      "0.90m x 2.40m"
    ],
    badges: ["Aislamiento 47dB", "Guillotina Suelo Automática", "Sello Acústico 360°", "Descanso Total"],
    specs: {
      estructura: "Hoja de 54mm de espesor con doble lámina viscoelástica de desacople y madera estabilizada.",
      herrajes: "3 bisagras de alta fricción con rodamiento y burlete perimetral de estanqueidad fónica.",
      cerradura: "Mecanismo silencioso con manilla de diseño ergonómico macizo y cilindro fónico.",
      garantia: "8 años de garantía en comportamiento acústico."
    },
    pros: [
      "Bloquea conversaciones, ruido de televisión, pasos o ruidos exteriores casi al 100%.",
      "La guillotina inferior baja automáticamente al cerrar la puerta, sellando la holgura contra el piso.",
      "Proporciona una sensación de solidez y peso excepcional al abrir y cerrar."
    ],
    idealFor: "Recámaras principales para dormir sin interrupciones, oficinas de trabajo remoto, bibliotecas o home theaters."
  }
];

/**
 * Preguntas del Asesor Guiado Paso a Paso
 */
export const WIZARD_STEPS = [
  {
    id: "step_location",
    stepNumber: 1,
    title: "¿Dónde estará ubicada la puerta?",
    subtitle: "El entorno determina las exigencias de intemperie, seguridad y resistencia.",
    options: [
      {
        id: "exterior_principal",
        icon: "fa-home",
        title: "Acceso Principal Residencial",
        desc: "La entrada principal de la casa o departamento. Requiere alta seguridad e impacto estético.",
        matchCategories: ["exterior"],
        weight: { security: 4, aesthetic: 5, weather: 4 }
      },
      {
        id: "interior_recamara",
        icon: "fa-bed",
        title: "Recámara o Estudio Privado",
        desc: "Busca silencio, confort térmico, privacidad y una integración visual refinada.",
        matchCategories: ["interior"],
        weight: { acoustic: 5, aesthetic: 4, privacy: 5 }
      },
      {
        id: "interior_bano",
        icon: "fa-shower",
        title: "Baño o Zona Húmeda",
        desc: "Requiere materiales 100% resistentes a condensación, vapor y humedad constante.",
        matchCategories: ["interior"],
        weight: { moisture: 5, privacy: 4, easy_clean: 4 }
      },
      {
        id: "exterior_secundario",
        icon: "fa-tree",
        title: "Terraza, Jardín o Entrada Trasera",
        desc: "Expuesta a lluvia, sol directo y cambios de temperatura; busca practicidad y durabilidad.",
        matchCategories: ["exterior"],
        weight: { weather: 5, durability: 5, security: 3 }
      },
      {
        id: "oficina_comercial",
        icon: "fa-building",
        title: "Oficina, Despacho o Consultorio",
        desc: "Alto tráfico, presencia corporativa profesional o control de acceso inteligente.",
        matchCategories: ["interior", "exterior"],
        weight: { traffic: 4, aesthetic: 4, security: 3 }
      }
    ]
  },
  {
    id: "step_priority",
    stepNumber: 2,
    title: "¿Cuál es tu prioridad número uno?",
    subtitle: "Esto nos ayuda a calibrar la ingeniería interna y los herrajes del modelo.",
    options: [
      {
        id: "max_security",
        icon: "fa-shield-halved",
        title: "Máxima Seguridad & Protección",
        desc: "Blindaje estructural, cilindros anti-bumping, cerrojos multipunto o cerradura inteligente.",
        weightMultiplier: { security: 2.0, durability: 1.5 }
      },
      {
        id: "architectural_luxury",
        icon: "fa-gem",
        title: "Diseño Arquitectónico & Wow Factor",
        desc: "Puerta monumental, sistema pivotante, maderas exóticas o acabados ras de pared.",
        weightMultiplier: { aesthetic: 2.2, format: 1.8 }
      },
      {
        id: "acoustic_comfort",
        icon: "fa-volume-xmark",
        title: "Silencio Absoluto & Aislamiento Acústico",
        desc: "Atenuar ruidos externos, guillotina inferior y núcleo fonoabsorbente de alta densidad.",
        weightMultiplier: { acoustic: 2.2, comfort: 1.6 }
      },
      {
        id: "weather_low_maintenance",
        icon: "fa-cloud-sun-rain",
        title: "Cero Mantenimiento & Alta Intemperie",
        desc: "Resistente al sol intenso, humedad o salitre sin necesidad de barnizar cada año.",
        weightMultiplier: { weather: 2.0, low_maintenance: 2.0 }
      },
      {
        id: "best_value",
        icon: "fa-scale-balanced",
        title: "Equilibrio Calidad / Precio / Estilo",
        desc: "Materiales nobles, gran rendimiento y estética contemporánea con inversión prudente.",
        weightMultiplier: { value: 1.8, aesthetic: 1.2 }
      }
    ]
  },
  {
    id: "step_style",
    stepNumber: 3,
    title: "¿Qué estética o material prefieres?",
    subtitle: "La textura y acabado que mejor dialogan con tu arquitectura.",
    options: [
      {
        id: "wood_walnut_oak",
        icon: "fa-tree",
        title: "Madera Noble Natural (Nogal / Roble)",
        desc: "Calidez atemporal, vetas vivas seleccionadas y presencia orgánica refinada.",
        preferredMaterials: ["Nogal", "Roble"]
      },
      {
        id: "dark_metal_anthracite",
        icon: "fa-cube",
        title: "Metal Antracita / Acero Grafito",
        desc: "Sensación moderna, industrial sobrio, paneles geométricos y líneas limpias.",
        preferredMaterials: ["Acero", "Aluminio"]
      },
      {
        id: "fluted_glass_metal",
        icon: "fa-border-none",
        title: "Cristal Acanalado con Perfilería Slim",
        desc: "Luz translúcida, textura estriada de vanguardia y sofisticación ligera.",
        preferredMaterials: ["Vidrio"]
      },
      {
        id: "flush_invisible",
        icon: "fa-compress",
        title: "Enrasada Oculta / Minimalismo Puro",
        desc: "La puerta integrada sin molduras al mismo nivel del muro, casi imperceptible.",
        preferredMaterials: ["Enrasada", "Aluminio Oculto"]
      }
    ]
  },
  {
    id: "step_format",
    stepNumber: 4,
    title: "¿Qué tipo de formato y apertura imaginas?",
    subtitle: "Configuración espacial según el vano y la circulación de tu hogar.",
    options: [
      {
        id: "pivot_monumental",
        icon: "fa-arrows-split-up-and-left",
        title: "Pivotante de Gran Formato",
        desc: "Gira sobre un eje vertical oculto. Ideal para entradas amplias (1.20m a 1.60m de ancho).",
        preferredOpening: "pivot"
      },
      {
        id: "hinge_standard",
        icon: "fa-door-open",
        title: "Batiente Tradicional Reforzada",
        desc: "Apertura convencional sobre bisagras laterales de alta fricción o pernios ocultos.",
        preferredOpening: "batiente"
      },
      {
        id: "flush_frameless",
        icon: "fa-arrows-to-dot",
        title: "Enrasada Invisible de Piso a Techo",
        desc: "Sin travesaño superior; altura monumental hasta el cielo raso para un paso limpio.",
        preferredOpening: "enrasada"
      },
      {
        id: "sliding_pocket",
        icon: "fa-arrows-left-right",
        title: "Corredera o Suspendida Minimalista",
        desc: "Ideal para optimizar metros cuadrados y comunicar recámaras, vestidores o baños.",
        preferredOpening: "pivot_glass"
      }
    ]
  },
  {
    id: "step_budget",
    stepNumber: 5,
    title: "¿Cuál es tu rango de presupuesto estimado?",
    subtitle: "Todas nuestras soluciones son de calidad arquitectónica garantizada.",
    options: [
      {
        id: "budget_standard",
        icon: "fa-coins",
        title: "Gama Confort ($16,000 - $25,000 MXN)",
        desc: "Excelente ingeniería interior, picaportes silenciosos y maderas/perfiles certificados.",
        targetCategory: ["mid"]
      },
      {
        id: "budget_premium",
        icon: "fa-award",
        title: "Gama Premium ($25,000 - $40,000 MXN)",
        desc: "Blindajes certificados, cristales acanalados, herrajes de autor y aislación avanzada.",
        targetCategory: ["mid_high", "mid"]
      },
      {
        id: "budget_luxury",
        icon: "fa-crown",
        title: "Alta Gama Arquitectónica ($40,000+ MXN)",
        desc: "Gran formato pivotante monumental, domótica biométrica y acabados esculturales.",
        targetCategory: ["high", "mid_high"]
      }
    ]
  }
];

export const ACCESSORIES_CONFIG = {
  handles: [
    { id: "handle_vertical_brass", name: "Tirador Vertical Latón Cepillado 120cm", price: 3400, type: "exterior" },
    { id: "handle_matte_black", name: "Tirador Tubular Negro Mate 150cm", price: 2900, type: "exterior" },
    { id: "handle_flush_recessed", name: "Tirador Enrasado Integrado a la Madera", price: 2100, type: "interior" },
    { id: "handle_minimal_lever", name: "Manilla Olivari / Dnd Minimalista Italiana", price: 1850, type: "interior" }
  ],
  locks: [
    { id: "lock_smart_biometric", name: "Cerradura Biométrica Smart (Huella + Código + App)", price: 5800, type: "exterior" },
    { id: "lock_multipoint_mechanic", name: "Cerradura Multipunto Mecánica 5 bulones Grado 4", price: 3200, type: "exterior" },
    { id: "lock_magnetic_privacy", name: "Cerradura Magnética Silenciosa con Condena", price: 950, type: "interior" }
  ],
  installation: [
    { id: "inst_turnkey", name: "Instalación Certificada Llave en Mano con Calibración", price: 3500 },
    { id: "inst_supply_only", name: "Solo Suministro en Obra (Flete asegurado)", price: 1200 }
  ]
};
