import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/templates',
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../pages/Auth/AuthPage.vue'),
    },
    {
      path: '/templates',
      name: 'templates',
      component: () => import('../pages/Template/TemplatesPage.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: '/templates/edit/:id',
      name: 'template-edit',
      meta: {
        auth: true,
      },
      component: () => import('../pages/Template/OneTemplatePage.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.auth
  const token = localStorage.getItem('token')

  if (requiresAuth && !token) {
    next({ name: 'auth' })
  } else if (to.name === 'auth' && token) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
