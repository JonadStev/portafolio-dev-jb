import { Content } from './types';

// Los textos marcados con [corchetes] son provisionales y se reemplazan con datos reales.
export const ES: Content = {
  skipLink: 'Saltar al contenido',
  cvUrl: '/cv/Jonathan-Burgos-CV-es.pdf',
  newTab: '(se abre en una pestaña nueva)',
  seo: {
    title: 'Jonathan Burgos | Líder de arquitectura y desarrollo de software',
    description:
      'Portafolio de Jonathan Burgos, líder de arquitectura y desarrollo de software en Guayaquil. Java, Spring Boot, Angular, Kafka y Oracle para pagos y banca virtual.',
    imageAlt: 'Jonathan Burgos, líder de arquitectura y desarrollo de software',
    jobTitle: 'Líder de arquitectura y desarrollo de software',
  },
  nav: {
    label: 'Principal',
    menu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    theme: 'Cambiar tema',
    items: [
      { id: 'sobre', label: 'Sobre mí' },
      { id: 'stack', label: 'Stack' },
      { id: 'arquitectura', label: 'Arquitectura' },
      { id: 'ia', label: 'IA' },
      { id: 'proyectos', label: 'Proyectos' },
      { id: 'experiencia', label: 'Experiencia' },
      { id: 'contacto', label: 'Contacto' },
    ],
  },
  footer: {
    rights: '© 2026 Jonathan Burgos · Guayaquil, Ecuador',
    top: 'Volver arriba',
  },
  hero: {
    name: 'Jonathan Burgos',
    role: 'Líder de arquitectura y desarrollo de software',
    summary:
      'Defino cómo se comunican los sistemas de un banco: pagos, canales financieros y banca virtual. Java, Spring Boot y Angular desde Guayaquil.',
    projects: 'Ver proyectos',
    cv: 'Descargar CV',
    tags: ['#Backend', '#Java', '#Spring', '#Angular'],
    card: {
      label: 'Ejemplo de respuesta de una API con mi perfil',
      role: 'Líder de arquitectura',
      location: 'Guayaquil, EC',
      openTo: ['empleo', 'freelance'],
    },
  },
  about: {
    title: 'Sobre mí',
    intro: 'Ingeniero en sistemas, con foco en backend y arquitectura.',
    lead: 'Líder de arquitectura y desarrollo de software con más de 6 años de experiencia, especializado en el sector bancario.',
    body: [
      'Responsable de definir la arquitectura de proyectos de alto impacto como integración de pagos, canales financieros y banca virtual, así como de estandarizar el desarrollo mediante arquetipos, dependencias core y repositorios centrales de Maven (GitLab).',
      'Stack principal: Java 21 (Spring Boot 4 y 3, Quarkus), TypeScript (Angular), Python, Oracle (PL/SQL), Docker, Kafka y gRPC.',
      'Entre los proyectos destacados: integración con Banred, canales financieros con Western Union, refactorización del pago de nómina con arquitectura distribuida y mensajería síncrona/asíncrona, e implementación de autenticación de doble factor (OAuth 2.0 + Keycloak) y OTP para banca virtual.',
    ],
    photoAlt: 'Retrato de Jonathan Burgos',
    photo: '/images/jonathan.webp',
    facts: [
      {
        title: 'Educación',
        text: 'Ingeniero en Sistemas Computacionales, Universidad de Guayaquil (2013–2020)',
      },
      {
        title: 'Certificaciones',
        text: 'Scrum Foundation (SFPC) y cursos de Java SE y backend en Platzi',
      },
      { title: 'Idiomas', text: 'Español nativo. Inglés intermedio.' },
    ],
  },
  stack: {
    title: 'Stack',
    intro: 'Lo que uso a diario, agrupado por capa.',
    groups: {
      backend: {
        title: 'Backend',
        note: 'Servicios, mensajería e infraestructura digital',
      },
      frontend: { title: 'Frontend', note: 'Interfaces y canales digitales' },
      security: { title: 'Seguridad', note: 'Autenticación y autorización' },
      data: { title: 'Bases de datos', note: 'Relacionales, NoSQL y PL/SQL' },
      devops: { title: 'DevOps y Linux', note: 'Contenedores, CI/CD y despliegue' },
    },
    also: 'También: Quarkus, Python, TypeScript y Traefik.',
  },
  architecture: {
    title: 'Arquitectura',
    intro:
      'Cómo diseño y documento un sistema para que todo el equipo sepa qué construye cada quien.',
    daily: {
      title: 'La arquitectura que uso a diario',
      intro: 'No hay una sola respuesta: elijo según el problema y las combino.',
      items: [
        {
          key: 'hexagonal',
          title: 'Hexagonal (puertos y adaptadores)',
          text: 'El dominio no conoce la base de datos ni el banco externo. Todo entra y sale por puertos, y los adaptadores se cambian sin tocar la lógica.',
        },
        {
          key: 'microservices',
          title: 'Microservicios',
          text: 'Servicios pequeños con una sola responsabilidad, detrás de un gateway. Cada uno se despliega y escala por separado.',
        },
        {
          key: 'events',
          title: 'Orientada a eventos',
          text: 'Los servicios se hablan por mensajes con Kafka. Quien publica no espera, y quien consume procesa a su ritmo.',
        },
        {
          key: 'layers',
          title: 'Capas y arquetipos',
          text: 'Controlador, servicio, repositorio. Un arquetipo Maven deja a todos los proyectos nuevos con la misma estructura desde el primer día.',
        },
      ],
    },
    patterns: {
      title: 'Patrones de diseño que implemento',
      intro: 'Elige una familia y mira dónde aparece cada patrón en mis proyectos.',
      groups: [
        {
          name: 'Creacionales',
          items: [
            {
              name: 'Factory Method',
              use: 'Elegir el conector correcto según el tipo de pago o canal.',
            },
            {
              name: 'Builder',
              use: 'Armar mensajes y solicitudes con muchos campos opcionales sin constructores gigantes.',
            },
            {
              name: 'Singleton',
              use: 'Un solo cliente por recurso compartido, gestionado por el contenedor de Spring.',
            },
          ],
        },
        {
          name: 'Estructurales',
          items: [
            {
              name: 'Adapter',
              use: 'Traducir el formato de un banco o proveedor externo al modelo interno.',
            },
            { name: 'Facade', use: 'Una sola puerta de entrada a varios servicios internos.' },
            {
              name: 'Decorator',
              use: 'Sumar auditoría, trazas y reintentos sin modificar la lógica base.',
            },
          ],
        },
        {
          name: 'Comportamiento',
          items: [
            {
              name: 'Strategy',
              use: 'Reglas de validación o cálculo intercambiables según el producto.',
            },
            {
              name: 'Observer',
              use: 'Reaccionar a eventos del negocio: notificar, auditar, conciliar.',
            },
            {
              name: 'Template Method',
              use: 'Un flujo base de proceso con pasos que cada caso redefine.',
            },
          ],
        },
        {
          name: 'Sistemas distribuidos',
          items: [
            {
              name: 'API Gateway',
              use: 'Autenticación, enrutamiento y límites de uso en un único punto.',
            },
            {
              name: 'Circuit Breaker',
              use: 'Cortar las llamadas a un servicio caído para que no arrastre al resto.',
            },
            {
              name: 'Saga',
              use: 'Transacciones largas entre servicios con compensación si algo falla.',
            },
            {
              name: 'Outbox',
              use: 'Guardar el evento junto al dato y publicarlo después, sin perder mensajes.',
            },
          ],
        },
      ],
    },
    scale: {
      title: 'Escalar horizontalmente con Docker y Swarm',
      intro:
        'En vez de un servidor más grande, más copias del mismo servicio. Cambia el número de réplicas y mira cómo se reparten.',
      client: 'Clientes',
      balancer: 'Traefik',
      balancerNote: 'Reparte las peticiones',
      cluster: 'Clúster Docker Swarm',
      manager: 'Nodo manager',
      worker: 'Nodo worker',
      replicasLabel: 'Réplicas del servicio',
      emptySlot: 'libre',
      points: [
        {
          title: 'Servicios sin estado',
          text: 'Cualquier réplica puede atender cualquier petición. La sesión y los datos viven fuera.',
        },
        {
          title: 'Balanceo automático',
          text: 'Swarm publica el servicio y Traefik descubre las réplicas nuevas sin configurar nada a mano.',
        },
        {
          title: 'Actualización sin corte',
          text: 'Rolling update: se reemplaza una réplica a la vez y, si falla el chequeo de salud, se revierte.',
        },
      ],
    },
    evidence: {
      title: 'Evidencia: los diagramas que entrego al equipo',
      intro:
        'Antes de escribir código dejo tres vistas del mismo sistema: qué piezas hay, cómo se organizan por dentro y qué pasa en el tiempo.',
      note: 'Ejemplo ilustrativo de un pago interbancario, redibujado para este portafolio.',
      scrollHint: 'Desliza para ver el diagrama completo',
      prev: 'Diagrama anterior',
      next: 'Diagrama siguiente',
      slideLabel: 'Ir al diagrama',
      slides: [
        {
          key: 'components',
          tab: 'Componentes',
          title: 'Diagrama de componentes',
          caption:
            'La vista macro: qué servicios existen, quién habla con quién y dónde viven los datos. Sirve para repartir responsabilidades entre equipos.',
          alt: 'Diagrama de componentes: un cliente web llama a un API Gateway, que enruta a los servicios de autenticación, pagos y notificaciones. Pagos usa Oracle, publica eventos en Kafka y se conecta con la red interbancaria.',
        },
        {
          key: 'class',
          tab: 'Clases',
          title: 'Diagrama de clases',
          caption:
            'La vista interna de un servicio: el dominio depende de interfaces (puertos) y los adaptadores las implementan. Así se escribe el código sin acoplarlo.',
          alt: 'Diagrama de clases: PaymentController usa la interfaz PaymentUseCase, implementada por PaymentService. PaymentService depende de los puertos PaymentGateway y PaymentRepository, implementados por BanredAdapter y OraclePaymentRepository.',
        },
        {
          key: 'sequence',
          tab: 'Secuencia',
          title: 'Diagrama de secuencia',
          caption:
            'La vista en el tiempo: el orden exacto de los mensajes en un pago, con la validación del token y el evento final.',
          alt: 'Diagrama de secuencia: el cliente envía el pago al gateway, este valida el token y lo reenvía al servicio de pagos, que consulta a la red interbancaria, publica un evento en Kafka y devuelve la confirmación.',
        },
      ],
    },
  },
  ai: {
    title: 'Inteligencia artificial',
    intro: 'Cómo trabajo con Claude Code para llevar un sistema de la idea a producción.',
    level: {
      title: 'Mi nivel con Claude Code',
      text: 'Avanzado, no experto. Creo sistemas escalables desde cero y los pongo en producción en poco tiempo, apoyado en mi experiencia en desarrollo y arquitectura. La herramienta acelera; el criterio sigue siendo mío.',
      marks: ['Básico', 'Intermedio', 'Avanzado', 'Experto'],
      current: 2,
      badge: 'Aquí estoy',
    },
    flow: {
      title: 'Cómo construyo un backend con IA',
      intro:
        'Primero analizo y diseño, después genero código. Toca un paso para ver qué hago en él.',
      outputLabel: 'Entregable',
      steps: [
        {
          title: 'Requerimientos',
          text: 'Con Claude levanto y ordeno los requerimientos funcionales y no funcionales, y detecto huecos y ambigüedades antes de diseñar.',
          output: 'requerimientos.md',
        },
        {
          title: 'Casos de uso',
          text: 'Convierto los requerimientos en casos de uso con actores, flujo principal y flujos alternos.',
          output: 'casos-de-uso.md',
        },
        {
          title: 'Arquitectura',
          text: 'Defino componentes, patrones y la forma de desplegar, y reviso cada decisión con sus alternativas.',
          output: 'arquitectura.md',
        },
        {
          title: 'Modelo entidad-relación',
          text: 'Diseño las tablas, las relaciones y los índices, y dejo el modelo listo para crear la base de datos.',
          output: 'modelo-er.sql',
        },
        {
          title: 'Código asistido',
          text: 'Claude escribe el código siguiendo el diseño anterior. Yo reviso cada cambio y mantengo la estructura limpia.',
          output: 'código fuente',
        },
        {
          title: 'Pruebas internas',
          text: 'Se ejecutan pruebas para comprobar que todo funciona y se corrige hasta dejarlo limpio, escalable y funcional.',
          output: 'pruebas en verde',
        },
        {
          title: 'Producción',
          text: 'Empaquetado en Docker y desplegado en el clúster, con el mismo cuidado que cualquier otro servicio.',
          output: 'servicio en línea',
        },
      ],
    },
    toolkit: {
      title: 'Lo que he construido dentro de Claude',
      intro:
        'Claude Code se puede extender. Estas son las piezas que uso para que trabaje a mi manera.',
      items: [
        {
          key: 'agents',
          title: 'Agentes',
          text: 'Agentes especializados, cada uno con su rol, para repartir el trabajo en tareas claras.',
        },
        {
          key: 'skills',
          title: 'Skills propias',
          text: 'Instrucciones reutilizables que enseñan a Claude mis convenciones y mis procesos.',
        },
        {
          key: 'design',
          title: 'frontend-design',
          text: 'Skill que uso mucho para que las interfaces tengan una dirección visual propia y no se vean genéricas.',
        },
        {
          key: 'impeccable',
          title: 'impeccable',
          text: 'Skill para diseñar, revisar y pulir interfaces: jerarquía, tipografía, color, accesibilidad y responsive.',
        },
      ],
    },
    session: {
      title: 'Una sesión típica',
      label: 'Ilustración de una sesión de trabajo con Claude Code',
      lines: [
        { kind: 'user', text: 'Levanta los requerimientos del módulo de pagos' },
        { kind: 'agent', text: 'Agente analista → requerimientos.md' },
        { kind: 'user', text: 'Genera el modelo entidad-relación' },
        { kind: 'agent', text: 'Agente de datos → modelo-er.sql' },
        { kind: 'user', text: 'Implementa el servicio y ejecuta las pruebas' },
        { kind: 'ok', text: 'Pruebas en verde. Listo para revisión' },
      ],
    },
    loop: {
      title: 'El criterio es mío, la velocidad es de la herramienta',
      text: 'Cada ciclo pasa por mí antes y después: yo decido qué se construye y reviso lo que vuelve.',
      center: 'Ciclo de trabajo',
      nodes: [
        { title: 'Yo defino', text: 'Alcance, arquitectura y reglas' },
        { title: 'Claude ejecuta', text: 'Genera y ajusta el código' },
        { title: 'Las pruebas verifican', text: 'Comprueban que funciona' },
        { title: 'Yo reviso', text: 'Valido, limpio y despliego' },
      ],
    },
  },
  projects: {
    title: 'Proyectos',
    intro: 'Casos de estudio: el problema, la solución y el resultado.',
    labels: { problem: 'Problema', solution: 'Solución', result: 'Resultado' },
    featured: {
      title: 'Pago directo con Banred',
      meta: 'Banco del Litoral · Líder de arquitectura',
      problem:
        'Integrar pagos interbancarios y canales B2B con autenticación fuerte y sin riesgo para las transacciones.',
      solution:
        'Arquitectura distribuida con OAuth 2.0 y Keycloak, sobre artefactos core en Java 21 y Spring Boot 4.',
      result:
        'Pagos directos y canales B2B integrados con autenticación fuerte, sobre artefactos core que otros proyectos reutilizan.',
      stack: '',
      chain: ['Cliente B2B', 'Keycloak', 'Spring Boot', 'Banred'],
      activeNode: 2,
      tags: ['Java 21', 'Spring Boot 4', 'OAuth 2.0', 'Keycloak'],
    },
    more: [
      {
        title: 'Pago de nómina distribuido',
        stack: 'Kafka, gRPC, Spring Boot',
        problem: 'El proceso de pagos de nómina necesitaba escalar y tolerar fallos.',
        solution: 'Arquitectura distribuida con mensajería síncrona y asíncrona.',
        result:
          'Un proceso de nómina desacoplado: los servicios se comunican por mensajería y cada parte puede escalar por separado.',
      },
      {
        title: 'Doble factor y OTP en banca virtual',
        stack: 'OAuth 2.0, Keycloak, Java 21',
        problem:
          'La banca virtual requería un segundo factor de autenticación para operar con seguridad.',
        solution: 'Motor de autenticación de doble factor con OTP sobre Keycloak.',
        result:
          'Segundo factor y OTP disponibles en la banca virtual, con un motor de autenticación reutilizable.',
      },
      {
        title: 'Arquetipos y repositorio central',
        stack: 'Maven, GitLab, Docker Swarm, Traefik',
        problem: 'Cada proyecto Spring Boot arrancaba con convenciones distintas.',
        solution:
          'Repositorio Maven central, arquetipos, dependencias core y despliegues en GitLab.',
        result:
          'Proyectos nuevos que arrancan con las mismas convenciones, dependencias y despliegues, sin repetir configuración.',
      },
    ],
  },
  experience: {
    title: 'Experiencia',
    intro: 'Más de seis años en banca, telecomunicaciones y manufactura.',
    items: [
      {
        date: '04-2026 – Actualidad',
        role: 'Líder de arquitectura de software',
        company: 'Banco del Litoral',
        points: [
          'Arquitectura distribuida para pagos, canales financieros y banca virtual.',
          'OAuth 2.0 y Keycloak en Pago Directo con Banred; doble factor en banca virtual.',
          'Repositorio Maven central, arquetipos y despliegue con Docker Swarm y Traefik.',
        ],
      },
      {
        date: '08-2022 – 03-2026',
        role: 'Ingeniero de software',
        company: 'Telconet S.A.',
        points: [
          'Microservicios Spring Boot para activar y suspender Internet, NetlifePlay y LigaPRO.',
          'Comunicación con Kafka y gRPC; paquetes y funciones PL/SQL en Oracle 19c.',
          'CI/CD con GitLab y metodología Scrum.',
        ],
      },
      {
        date: '08-2021 – 07-2022',
        role: 'Ingeniero de software',
        company: 'Industrias Lácteas Indulac S.A.',
        points: [
          'Servicios web en Java para integrar con el SRI y Dynamics AX 2012.',
          'Módulo de firma electrónica para facturación electrónica sobre Oracle.',
        ],
      },
      {
        date: '08-2018 – 08-2021',
        role: 'Desarrollador en fábrica de software',
        company: 'Sudamericana de Software S.A.',
        points: [
          'PL/SQL y servicios Java de autenticación para el portal Mi Claro.',
          'Automatización de procesos batch y procesos de negocio en Hadoop.',
        ],
      },
    ],
  },
  testimonials: {
    title: 'Referencias',
    intro: 'Lo que dicen quienes trabajaron conmigo.',
    items: [
      {
        text: 'Desde el primer día estuvo siempre abierto a ayudarme y a enseñarme, con una paciencia enorme y sin hacerme sentir nunca que una duda era demasiado básica. … Su acompañamiento me dio la confianza para enfrentar un proyecto real en un entorno bancario y empezar a aportar de verdad al equipo. … Jonathan combina solidez técnica con una vocación genuina por enseñar.',
        who: 'Jose Paredes',
        url: 'https://www.linkedin.com/in/jose-paredes-32a884271/',
        role: 'BA in Computer Science & Business Analytics, The George Washington University',
        date: '10 de noviembre de 2026',
        context: 'Jonathan supervisaba a Jose',
      },
    ],
    source: 'Recomendación de LinkedIn',
    viewProfile: 'Ver perfil',
  },
  contact: {
    title: 'Contacto',
    intro: 'Busco un rol de arquitectura o backend, y proyectos freelance.',
    links: [
      {
        label: 'Correo',
        text: 'stevenjonathan1@hotmail.com',
        href: 'mailto:stevenjonathan1@hotmail.com',
      },
      {
        label: 'LinkedIn',
        text: '/in/developer-jonathan-burgos-vargas',
        href: 'https://www.linkedin.com/in/developer-jonathan-burgos-vargas/',
      },
      { label: 'GitHub', text: '/JonadStev', href: 'https://github.com/JonadStev' },
    ],
    cv: 'Descargar CV en PDF',
    form: {
      name: 'Dime tu nombre',
      email: 'Déjame tu correo',
      message: 'Enviame tu mensaje',
      send: 'Enviar mensaje',
      sending: 'Enviando…',
      sent: 'Mensaje enviado. Te responderé pronto.',
      error: 'No se pudo enviar el mensaje. Escríbeme por correo o LinkedIn.',
      required: 'Este campo es obligatorio.',
      invalidEmail: 'Escribe un correo válido, por ejemplo nombre@dominio.com.',
    },
  },
};
