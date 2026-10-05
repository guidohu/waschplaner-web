import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('./views/HomeView.vue') },
  { path: '/pricing', name: 'pricing', component: () => import('./views/PricingView.vue') },
  // The planner runs entirely in the browser; its sticky action bar replaces the footer.
  { path: '/planner', alias: '/planer', name: 'planner', component: () => import('./planner/PlannerView.vue'), meta: { hideFooter: true } },
  {
    path: '/docs',
    component: () => import('./views/docs/DocsLayout.vue'),
    children: [
      { path: '', name: 'docs', component: () => import('./views/docs/DocsIndex.vue') },
      { path: ':slug', name: 'doc', component: () => import('./views/docs/DocsPage.vue'), props: true },
    ],
  },
  { path: '/privacy', name: 'privacy', component: () => import('./views/LegalView.vue'), props: { page: 'privacy' } },
  { path: '/imprint', name: 'imprint', component: () => import('./views/LegalView.vue'), props: { page: 'imprint' } },
  // Short and German addresses people may type or print.
  { path: '/self-hosting', redirect: '/docs/self-hosting' },
  { path: '/selbst-hosten', redirect: '/docs/self-hosting' },
  { path: '/preise', redirect: '/pricing' },
  { path: '/hilfe', redirect: '/docs' },
  { path: '/datenschutz', redirect: '/privacy' },
  { path: '/impressum', redirect: '/imprint' },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./views/NotFoundView.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    // Below the sticky header.
    if (to.hash) return { el: to.hash, top: 72 }
    return { top: 0 }
  },
})
