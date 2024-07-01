import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home/IndexView.vue'),
      alias: ['/home'],
      meta: { requireAuth: false }
    },
    {
      path: '/sign-in',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      alias: ['/login'],
      meta: { requireAuth: false }
    },
    {
      path: '/admin',
      name: 'admin',
      components: {
        default: () => import('../views/AdminView.vue'),
        LeftSidebar: () => import('../components/Sidebar.vue')
      },
      meta: { requireAuth: true }
    },
    {
      path: '/queue',
      name: 'queue',
      component: () => import('../views/QueueView.vue'),
      meta: { requireAuth: false }
    },


  ]
})

router.beforeEach((to, from) => {
  const auth = useAuthStore();
  const token = auth.token

  if (!token && to.meta.requireAuth) {
    return { name: "queue" }
  } else if (token && !to.meta.requireAuth) {
    return { name: "admin" }
  }
})



export default router
