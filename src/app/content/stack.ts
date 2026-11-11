import { StackKey } from './types';

export interface StackItem {
  name: string;
  src: string;
}

// Nombres de marca: no se traducen. Los títulos de grupo viven en el contenido por idioma.
export const STACK_GROUPS: { key: StackKey; items: StackItem[] }[] = [
  {
    key: 'backend',
    items: [
      { name: 'Java', src: '/logos/svg/java.svg' },
      { name: 'Spring Boot', src: '/logos/svg/spring-boot.svg' },
    ],
  },
  {
    key: 'frontend',
    items: [{ name: 'Angular', src: '/logos/svg/angular.svg' }],
  },
  {
    key: 'data',
    items: [
      { name: 'Oracle', src: '/logos/svg/oracle-db.svg' },
      { name: 'PostgreSQL', src: '/logos/svg/postgresql.svg' },
      { name: 'MySQL', src: '/logos/svg/mysql.svg' },
      { name: 'PL/SQL', src: '/logos/svg/plsql.svg' },
    ],
  },
  {
    key: 'devops',
    items: [
      { name: 'Docker', src: '/logos/svg/docker.svg' },
      { name: 'Linux', src: '/logos/webp/linux.webp' },
    ],
  },
];
