import { BLOG_POSTS } from './blogPosts.js';
import { ALL_MANTRAS } from './mantras.js';

export const APP_ROUTES = [
  '/',
  '/mantra-library',
  '/meditation-timer',
  '/about',
  '/contact',
  '/blog',
  '/privacy',
  '/terms',
  '/disclaimer',
];

export const LEGACY_REDIRECTS = [
  { source: '/ram-naam-japa-counter', destination: '/counter/ram-ram' },
  { source: '/radha-naam-japa-counter', destination: '/counter/radhe-radhe' },
  {
    source: '/om-namah-shivaya-counter',
    destination: '/counter/om-namah-shivaya',
  },
  {
    source: '/hanuman-japa-counter',
    destination: '/counter/om-han-hanumate-namah',
  },
  { source: '/freestyle-japa-counter', destination: '/counter/om' },
];

export function getCounterRoutes() {
  return ALL_MANTRAS.map((mantra) => `/counter/${mantra.id}`);
}

export function getBlogRoutes() {
  return BLOG_POSTS.map((post) => `/blog/${post.slug}`);
}

export function getAllPublicRoutes() {
  return [...APP_ROUTES, ...getBlogRoutes(), ...getCounterRoutes()];
}
