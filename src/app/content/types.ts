export type Lang = 'es' | 'en';

export type StackKey = 'backend' | 'frontend' | 'security' | 'data' | 'devops';

export interface NavItem {
  id: string;
  label: string;
}

export interface SectionIntro {
  title: string;
  intro: string;
}

export interface ProjectRow {
  title: string;
  stack: string;
  problem: string;
  solution: string;
  result: string;
}

export interface Content {
  skipLink: string;
  cvUrl: string;
  newTab: string;
  seo: {
    title: string;
    description: string;
    imageAlt: string;
    jobTitle: string;
  };
  nav: {
    label: string;
    menu: string;
    closeMenu: string;
    theme: string;
    items: NavItem[];
  };
  footer: {
    rights: string;
    top: string;
  };
  hero: {
    name: string;
    role: string;
    summary: string;
    projects: string;
    cv: string;
    tags: string[];
    card: {
      label: string;
      role: string;
      location: string;
      openTo: string[];
    };
  };
  about: SectionIntro & {
    lead: string;
    body: string[];
    photoAlt: string;
    photo: string;
    facts: { title: string; text: string }[];
  };
  stack: SectionIntro & {
    groups: Record<StackKey, { title: string; note: string }>;
    also: string;
  };
  architecture: SectionIntro & {
    daily: {
      title: string;
      intro: string;
      items: {
        key: 'hexagonal' | 'microservices' | 'events' | 'layers';
        title: string;
        text: string;
      }[];
    };
    patterns: {
      title: string;
      intro: string;
      groups: { name: string; items: { name: string; use: string }[] }[];
    };
    scale: {
      title: string;
      intro: string;
      client: string;
      balancer: string;
      balancerNote: string;
      cluster: string;
      manager: string;
      worker: string;
      replicasLabel: string;
      emptySlot: string;
      points: { title: string; text: string }[];
    };
    evidence: {
      title: string;
      intro: string;
      note: string;
      scrollHint: string;
      prev: string;
      next: string;
      slideLabel: string;
      slides: {
        key: 'components' | 'class' | 'sequence';
        tab: string;
        title: string;
        caption: string;
        alt: string;
      }[];
    };
  };
  ai: SectionIntro & {
    level: { title: string; text: string; marks: string[]; current: number; badge: string };
    flow: {
      title: string;
      intro: string;
      outputLabel: string;
      steps: { title: string; text: string; output: string }[];
    };
    toolkit: {
      title: string;
      intro: string;
      items: { key: 'agents' | 'skills' | 'design' | 'impeccable'; title: string; text: string }[];
    };
    session: {
      title: string;
      label: string;
      lines: { kind: 'user' | 'agent' | 'ok'; text: string }[];
    };
    loop: {
      title: string;
      text: string;
      nodes: { title: string; text: string }[];
      center: string;
    };
  };
  projects: SectionIntro & {
    labels: { problem: string; solution: string; result: string };
    featured: ProjectRow & {
      meta: string;
      chain: string[];
      activeNode: number;
      tags: string[];
    };
    more: ProjectRow[];
  };
  experience: SectionIntro & {
    items: { date: string; role: string; company: string; points: string[] }[];
  };
  testimonials: SectionIntro & {
    source: string;
    viewProfile: string;
    items: {
      text: string;
      who: string;
      role: string;
      date: string;
      context: string;
      url?: string;
      note?: string;
    }[];
  };
  contact: SectionIntro & {
    links: { label: string; text: string; href: string }[];
    cv: string;
    form: {
      name: string;
      email: string;
      message: string;
      send: string;
      sending: string;
      sent: string;
      error: string;
      required: string;
      invalidEmail: string;
    };
  };
}
