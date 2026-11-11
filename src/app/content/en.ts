import { Content } from './types';

// Texts in [brackets] are placeholders to be replaced with real data.
export const EN: Content = {
  skipLink: 'Skip to content',
  // Provisional: todavía no hay CV en inglés, se usa el de español.
  // Cuando exista, cambia a '/cv/Jonathan-Burgos-CV-en.pdf'.
  cvUrl: '/cv/Jonathan-Burgos-CV-es.pdf',
  newTab: '(opens in a new tab)',
  seo: {
    title: 'Jonathan Burgos | Software architecture and development lead',
    description:
      'Portfolio of Jonathan Burgos, software architecture and development lead in Guayaquil. Java, Spring Boot, Angular, Kafka and Oracle for payments and online banking.',
    imageAlt: 'Jonathan Burgos, software architecture and development lead',
    jobTitle: 'Software architecture and development lead',
  },
  nav: {
    label: 'Main',
    menu: 'Open menu',
    closeMenu: 'Close menu',
    theme: 'Toggle theme',
    items: [
      { id: 'sobre', label: 'About' },
      { id: 'stack', label: 'Stack' },
      { id: 'proyectos', label: 'Projects' },
      { id: 'experiencia', label: 'Experience' },
      { id: 'contacto', label: 'Contact' },
    ],
  },
  footer: {
    rights: '© 2026 Jonathan Burgos · Guayaquil, Ecuador',
    top: 'Back to top',
  },
  hero: {
    name: 'Jonathan Burgos',
    role: 'Software architecture and development lead',
    summary:
      'I define how a bank’s systems talk to each other: payments, financial channels and online banking. Java, Spring Boot and Angular from Guayaquil.',
    projects: 'View projects',
    cv: 'Download CV',
    tags: ['#Backend', '#Java', '#Spring', '#Angular'],
    card: {
      label: 'Example API response with my profile',
      role: 'Architecture lead',
      location: 'Guayaquil, EC',
      openTo: ['employment', 'freelance'],
    },
  },
  about: {
    title: 'About me',
    intro: 'Systems engineer focused on backend and architecture.',
    lead: 'Software architecture and development lead with more than 6 years of experience, specialized in the banking sector.',
    body: [
      'Responsible for defining the architecture of high-impact projects such as payments integration, financial channels and online banking, and for standardizing development through archetypes, core dependencies and central Maven repositories (GitLab).',
      'Main stack: Java 21 (Spring Boot 4 and 3, Quarkus), TypeScript (Angular), Python, Oracle (PL/SQL), Docker, Kafka and gRPC.',
      'Highlighted projects: integration with Banred, financial channels with Western Union, refactoring of payroll payments with a distributed architecture and synchronous/asynchronous messaging, and implementation of two-factor authentication (OAuth 2.0 + Keycloak) and OTP for online banking.',
    ],
    photoAlt: 'Portrait of Jonathan Burgos',
    photo: '/images/jonathan.webp',
    facts: [
      {
        title: 'Education',
        text: 'Computer Systems Engineer, Universidad de Guayaquil (2013–2020)',
      },
      {
        title: 'Certifications',
        text: 'Scrum Foundation (SFPC) and Java SE and backend courses on Platzi',
      },
      { title: 'Languages', text: 'Native Spanish. Intermediate English.' },
    ],
  },
  stack: {
    title: 'Stack',
    intro: 'What I use every day, grouped by layer.',
    groups: {
      backend: { title: 'Backend', note: 'Services and distributed architecture' },
      frontend: { title: 'Frontend', note: 'Interfaces and digital channels' },
      data: { title: 'Databases', note: 'Modeling, PL/SQL and performance' },
      devops: { title: 'DevOps and Linux', note: 'Containers and deployment' },
    },
    also: 'Also: Kafka, gRPC, Keycloak, Quarkus, Python, GitLab CI/CD, Traefik.',
  },
  projects: {
    title: 'Projects',
    intro: 'Case studies: the problem, the solution and the result.',
    labels: { problem: 'Problem', solution: 'Solution', result: 'Result' },
    featured: {
      title: 'Direct payment with Banred',
      meta: 'Banco del Litoral · Architecture lead',
      problem:
        'Integrate interbank payments and B2B channels with strong authentication and no risk to transactions.',
      solution:
        'Distributed architecture with OAuth 2.0 and Keycloak, built on core artifacts in Java 21 and Spring Boot 4.',
      result:
        'Direct payments and B2B channels integrated with strong authentication, on core artifacts that other projects reuse.',
      stack: '',
      chain: ['B2B client', 'Keycloak', 'Spring Boot', 'Banred'],
      activeNode: 2,
      tags: ['Java 21', 'Spring Boot 4', 'OAuth 2.0', 'Keycloak'],
    },
    more: [
      {
        title: 'Distributed payroll payments',
        stack: 'Kafka, gRPC, Spring Boot',
        problem: 'The payroll payment process had to scale and tolerate failures.',
        solution: 'Distributed architecture with synchronous and asynchronous messaging.',
        result:
          'A decoupled payroll process: services talk through messaging and each part can scale on its own.',
      },
      {
        title: 'Two-factor and OTP in online banking',
        stack: 'OAuth 2.0, Keycloak, Java 21',
        problem: 'Online banking needed a second authentication factor to operate securely.',
        solution: 'A two-factor authentication engine with OTP on top of Keycloak.',
        result:
          'Second factor and OTP available in online banking, with a reusable authentication engine.',
      },
      {
        title: 'Archetypes and central repository',
        stack: 'Maven, GitLab, Docker Swarm, Traefik',
        problem: 'Every Spring Boot project started with different conventions.',
        solution:
          'A central Maven repository, archetypes, core dependencies and GitLab deployments.',
        result:
          'New projects that start with the same conventions, dependencies and deployments, without repeating setup.',
      },
    ],
  },
  experience: {
    title: 'Experience',
    intro: 'More than six years in banking, telecommunications and manufacturing.',
    items: [
      {
        date: '04-2026 – Present',
        role: 'Software architecture lead',
        company: 'Banco del Litoral',
        points: [
          'Distributed architecture for payments, financial channels and online banking.',
          'OAuth 2.0 and Keycloak in Direct Payment with Banred; two-factor in online banking.',
          'Central Maven repository, archetypes and deployment with Docker Swarm and Traefik.',
        ],
      },
      {
        date: '08-2022 – 03-2026',
        role: 'Software engineer',
        company: 'Telconet S.A.',
        points: [
          'Spring Boot microservices to activate and suspend Internet, NetlifePlay and LigaPRO.',
          'Communication with Kafka and gRPC; PL/SQL packages and functions on Oracle 19c.',
          'CI/CD with GitLab and the Scrum methodology.',
        ],
      },
      {
        date: '08-2021 – 07-2022',
        role: 'Software engineer',
        company: 'Industrias Lácteas Indulac S.A.',
        points: [
          'Java web services to integrate with the SRI and Dynamics AX 2012.',
          'Electronic signature module for electronic invoicing on Oracle.',
        ],
      },
      {
        date: '08-2018 – 08-2021',
        role: 'Software factory developer',
        company: 'Sudamericana de Software S.A.',
        points: [
          'PL/SQL and Java authentication services for the Mi Claro portal.',
          'Batch process automation and business processes on Hadoop.',
        ],
      },
    ],
  },
  testimonials: {
    title: 'References',
    intro: 'What people who worked with me say.',
    items: [
      {
        text: 'From day one he was always open to helping and teaching me, with enormous patience, and never made me feel that a question was too basic. … His guidance gave me the confidence to take on a real project in a banking environment and start contributing to the team. … Jonathan combines technical strength with a genuine vocation for teaching.',
        who: 'Jose Paredes',
        url: 'https://www.linkedin.com/in/jose-paredes-32a884271/',
        role: 'BA in Computer Science & Business Analytics, The George Washington University',
        date: 'November 10, 2026',
        context: 'Jonathan supervised Jose',
        note: 'Translated from Spanish',
      },
    ],
    source: 'LinkedIn recommendation',
    viewProfile: 'View profile',
  },
  contact: {
    title: 'Contact',
    intro: 'I am looking for an architecture or backend role, and freelance projects.',
    links: [
      {
        label: 'Email',
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
    cv: 'Download CV as PDF',
    form: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send message',
      sending: 'Sending…',
      sent: 'Message sent. I will reply soon.',
      error: 'The message could not be sent. Write to me by email or LinkedIn.',
      required: 'This field is required.',
      invalidEmail: 'Enter a valid email, for example name@domain.com.',
    },
  },
};
