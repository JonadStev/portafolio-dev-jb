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
      security: { title: 'Seguridad', note: 'Autenticación y autorización: OAuth 2.0 y OTP' },
      data: { title: 'Bases de datos', note: 'Relacionales, NoSQL y PL/SQL' },
      devops: { title: 'DevOps y Linux', note: 'Contenedores, CI/CD y despliegue' },
    },
    also: 'También: Quarkus, Python, TypeScript y Traefik.',
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
