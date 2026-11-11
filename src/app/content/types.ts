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
