import { StackKey } from './types';

export interface StackItem {
  name: string;
  src: string;
  /** Logo de un solo color oscuro: en el tema oscuro se aclara para que se vea */
  mono?: boolean;
}

// Nombres de marca: no se traducen. Los títulos de grupo viven en el contenido por idioma.
export const STACK_GROUPS: { key: StackKey; items: StackItem[] }[] = [
  {
    key: 'backend',
    items: [
      { name: 'Java', src: '/logos/svg/java.svg' },
      { name: 'Spring Boot', src: '/logos/svg/spring-boot.svg' },
      { name: 'Kafka', src: '/logos/svg/kafka.svg', mono: true },
      { name: 'gRPC', src: '/logos/svg/grpc.svg' },
      { name: 'GraphQL', src: '/logos/svg/graphql.svg' },
    ],
  },
  {
    key: 'frontend',
    items: [{ name: 'Angular', src: '/logos/svg/angular.svg' }],
  },
  {
    key: 'security',
    items: [{ name: 'Keycloak', src: '/logos/svg/keycloak.svg', mono: true }],
  },
  {
    key: 'data',
    items: [
      { name: 'Oracle', src: '/logos/svg/oracle-db.svg' },
      { name: 'PostgreSQL', src: '/logos/svg/postgresql.svg' },
      { name: 'MySQL', src: '/logos/svg/mysql.svg' },
      { name: 'PL/SQL', src: '/logos/svg/plsql.svg' },
      { name: 'MongoDB', src: '/logos/svg/mongodb.svg' },
      { name: 'Redis', src: '/logos/svg/redis.svg' },
    ],
  },
  {
    key: 'devops',
    items: [
      { name: 'Docker', src: '/logos/svg/docker.svg' },
      { name: 'GitLab', src: '/logos/svg/gitlab.svg' },
      { name: 'Linux', src: '/logos/webp/linux.webp' },
    ],
  },
];
