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
      { id: 'arquitectura', label: 'Architecture' },
      { id: 'ia', label: 'AI' },
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
    photo: '/images/jonathan-v2.webp',
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
      backend: {
        title: 'Backend',
        note: 'Services, messaging and digital infrastructure',
      },
      frontend: { title: 'Frontend', note: 'Interfaces and digital channels' },
      security: { title: 'Security', note: 'Authentication and authorization' },
      data: { title: 'Databases', note: 'Relational, NoSQL and PL/SQL' },
      devops: { title: 'DevOps and Linux', note: 'Containers, CI/CD and deployment' },
    },
    also: 'Also: Quarkus, Python, TypeScript and Traefik.',
  },
  architecture: {
    title: 'Architecture',
    intro: 'How I design and document a system so the whole team knows what each person builds.',
    daily: {
      title: 'The architecture I use every day',
      intro: 'There is no single answer: I pick by problem and combine them.',
      items: [
        {
          key: 'hexagonal',
          title: 'Hexagonal (ports and adapters)',
          text: 'The domain knows nothing about the database or the external bank. Everything goes in and out through ports, and adapters can be swapped without touching the logic.',
        },
        {
          key: 'microservices',
          title: 'Microservices',
          text: 'Small services with a single responsibility, behind a gateway. Each one is deployed and scaled on its own.',
        },
        {
          key: 'events',
          title: 'Event-driven',
          text: 'Services talk through messages on Kafka. The publisher does not wait, and consumers process at their own pace.',
        },
        {
          key: 'layers',
          title: 'Layers and archetypes',
          text: 'Controller, service, repository. A Maven archetype gives every new project the same structure from day one.',
        },
      ],
    },
    patterns: {
      title: 'Design patterns I implement',
      intro: 'Pick a family and see where each pattern shows up in my projects.',
      groups: [
        {
          name: 'Creational',
          items: [
            {
              name: 'Factory Method',
              use: 'Choosing the right connector for each payment type or channel.',
            },
            {
              name: 'Builder',
              use: 'Building messages and requests with many optional fields, without giant constructors.',
            },
            {
              name: 'Singleton',
              use: 'One client per shared resource, managed by the Spring container.',
            },
          ],
        },
        {
          name: 'Structural',
          items: [
            {
              name: 'Adapter',
              use: 'Translating an external bank or provider format into the internal model.',
            },
            { name: 'Facade', use: 'A single entry point to several internal services.' },
            {
              name: 'Decorator',
              use: 'Adding auditing, tracing and retries without changing the base logic.',
            },
          ],
        },
        {
          name: 'Behavioral',
          items: [
            {
              name: 'Strategy',
              use: 'Interchangeable validation or calculation rules per product.',
            },
            { name: 'Observer', use: 'Reacting to business events: notify, audit, reconcile.' },
            {
              name: 'Template Method',
              use: 'A base process flow whose steps each case redefines.',
            },
          ],
        },
        {
          name: 'Distributed systems',
          items: [
            {
              name: 'API Gateway',
              use: 'Authentication, routing and rate limits in a single place.',
            },
            {
              name: 'Circuit Breaker',
              use: 'Cutting calls to a failing service so it does not drag the rest down.',
            },
            {
              name: 'Saga',
              use: 'Long transactions across services, with compensation if something fails.',
            },
            {
              name: 'Outbox',
              use: 'Storing the event next to the data and publishing it later, without losing messages.',
            },
          ],
        },
      ],
    },
    scale: {
      title: 'Scaling horizontally with Docker and Swarm',
      intro:
        'Instead of a bigger server, more copies of the same service. Change the replica count and watch how they spread out.',
      client: 'Clients',
      balancer: 'Traefik',
      balancerNote: 'Spreads the requests',
      cluster: 'Docker Swarm cluster',
      manager: 'Manager node',
      worker: 'Worker node',
      replicasLabel: 'Service replicas',
      emptySlot: 'free',
      points: [
        {
          title: 'Stateless services',
          text: 'Any replica can serve any request. Sessions and data live outside.',
        },
        {
          title: 'Automatic balancing',
          text: 'Swarm publishes the service and Traefik discovers new replicas with no manual setup.',
        },
        {
          title: 'Zero-downtime updates',
          text: 'Rolling update: one replica is replaced at a time and, if the health check fails, it rolls back.',
        },
      ],
    },
    evidence: {
      title: 'Evidence: the diagrams I hand to the team',
      intro:
        'Before writing code I leave three views of the same system: which pieces exist, how they are organized inside, and what happens over time.',
      note: 'Illustrative example of an interbank payment, redrawn for this portfolio.',
      scrollHint: 'Swipe to see the full diagram',
      prev: 'Previous diagram',
      next: 'Next diagram',
      slideLabel: 'Go to diagram',
      slides: [
        {
          key: 'components',
          tab: 'Components',
          title: 'Component diagram',
          caption:
            'The macro view: which services exist, who talks to whom and where the data lives. It helps split responsibilities across teams.',
          alt: 'Component diagram: a web client calls an API Gateway, which routes to the authentication, payments and notifications services. Payments uses Oracle, publishes events to Kafka and connects to the interbank network.',
        },
        {
          key: 'class',
          tab: 'Classes',
          title: 'Class diagram',
          caption:
            'The inside of one service: the domain depends on interfaces (ports) and adapters implement them. This keeps the code decoupled.',
          alt: 'Class diagram: PaymentController uses the PaymentUseCase interface, implemented by PaymentService. PaymentService depends on the PaymentGateway and PaymentRepository ports, implemented by BanredAdapter and OraclePaymentRepository.',
        },
        {
          key: 'sequence',
          tab: 'Sequence',
          title: 'Sequence diagram',
          caption:
            'The view over time: the exact order of messages in a payment, with token validation and the final event.',
          alt: 'Sequence diagram: the client sends the payment to the gateway, which validates the token and forwards it to the payments service. That service calls the interbank network, publishes an event to Kafka and returns the confirmation.',
        },
      ],
    },
  },
  ai: {
    title: 'Artificial intelligence',
    intro: 'How I work with Claude Code to take a system from idea to production.',
    level: {
      title: 'My level with Claude Code',
      text: 'Advanced, not expert. I build scalable systems from scratch and put them into production quickly, backed by my experience in development and architecture. The tool speeds things up; the judgment is still mine.',
      marks: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      current: 2,
      badge: 'I am here',
    },
    flow: {
      title: 'How I build a backend with AI',
      intro: 'I analyze and design first, then generate code. Tap a step to see what I do in it.',
      outputLabel: 'Deliverable',
      steps: [
        {
          title: 'Requirements',
          text: 'With Claude I gather and organize functional and non-functional requirements, and spot gaps and ambiguities before designing.',
          output: 'requirements.md',
        },
        {
          title: 'Use cases',
          text: 'I turn requirements into use cases with actors, main flow and alternate flows.',
          output: 'use-cases.md',
        },
        {
          title: 'Architecture',
          text: 'I define components, patterns and how to deploy, and review each decision against its alternatives.',
          output: 'architecture.md',
        },
        {
          title: 'Entity-relationship model',
          text: 'I design tables, relationships and indexes, leaving the model ready to create the database.',
          output: 'er-model.sql',
        },
        {
          title: 'Assisted code',
          text: 'Claude writes the code following the previous design. I review every change and keep the structure clean.',
          output: 'source code',
        },
        {
          title: 'Internal tests',
          text: 'Tests run to confirm everything works, and I fix until it is clean, scalable and functional.',
          output: 'green tests',
        },
        {
          title: 'Production',
          text: 'Packaged in Docker and deployed to the cluster, with the same care as any other service.',
          output: 'service online',
        },
      ],
    },
    toolkit: {
      title: 'What I have built inside Claude',
      intro: 'Claude Code can be extended. These are the pieces I use to make it work my way.',
      items: [
        {
          key: 'agents',
          title: 'Agents',
          text: 'Specialized agents, each with its own role, to split the work into clear tasks.',
        },
        {
          key: 'skills',
          title: 'Custom skills',
          text: 'Reusable instructions that teach Claude my conventions and my processes.',
        },
        {
          key: 'design',
          title: 'frontend-design',
          text: 'A skill I use a lot so interfaces have their own visual direction instead of looking generic.',
        },
        {
          key: 'impeccable',
          title: 'impeccable',
          text: 'A skill to design, review and polish interfaces: hierarchy, type, color, accessibility and responsive behavior.',
        },
      ],
    },
    session: {
      title: 'A typical session',
      label: 'Illustration of a working session with Claude Code',
      lines: [
        { kind: 'user', text: 'Gather the requirements for the payments module' },
        { kind: 'agent', text: 'Analyst agent → requirements.md' },
        { kind: 'user', text: 'Generate the entity-relationship model' },
        { kind: 'agent', text: 'Data agent → er-model.sql' },
        { kind: 'user', text: 'Implement the service and run the tests' },
        { kind: 'ok', text: 'Tests green. Ready for review' },
      ],
    },
    loop: {
      title: 'The judgment is mine, the speed is the tool’s',
      text: 'Every cycle goes through me before and after: I decide what gets built and review what comes back.',
      center: 'Work cycle',
      nodes: [
        { title: 'I define', text: 'Scope, architecture and rules' },
        { title: 'Claude executes', text: 'Generates and adjusts the code' },
        { title: 'Tests verify', text: 'Confirm that it works' },
        { title: 'I review', text: 'Validate, clean up and deploy' },
      ],
    },
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
        text: 'Jonathan is a professional who stands out for his willingness to deliver the projects assigned to him and to collaborate on the projects assigned to his colleagues. He researches and keeps up to date with new technologies. He has taken part effectively in the Bank’s projects.',
        who: 'Jose Luis Alcivar Zambrano',
        url: 'https://www.linkedin.com/in/jose-luis-alcivar-zambrano-a9632a28/',
        role: 'National Technology Manager at Banco del Litoral',
        date: 'November 11, 2026',
        context: 'Held a more senior position than Jonathan, but did not supervise him directly',
        note: 'Translated from Spanish',
      },
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
