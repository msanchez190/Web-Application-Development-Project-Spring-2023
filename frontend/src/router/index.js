import { createRouter, createWebHistory } from 'vue-router'

// make all paths and names lowercase for consistency
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes : [
  {
    path: '/',
    props: true,
    component: () => import('../components/homePage.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/login.vue')
  },
  {
    path: '/service/',
    name: 'service',
    component: () => import('../components/service.vue')
  },
  {
    path: '/intakeform',
    name: 'intakeform',
    props: true,
    component: () => import('../components/intakeForm.vue')
  },
  {
    path: '/findclient',
    name: 'findclient',
    component: () => import('../components/findClient.vue')
  },
  {
    path: '/updateclient/:id',
    name: 'updateclient',
    props: true,
    component: () => import('../components/updateClient.vue')
  },
  {
    path: '/eventform',
    name: 'eventform',
    component: () => import('../components/eventForm.vue')
  },
  {
    path: '/findevents',
    name: 'findevents',
    component: () => import('../components/findEvents.vue')
  },
  {
    path: '/eventdetails/:id',
    name: 'eventdetails',
    props: true,
    component: () => import('../components/eventDetails.vue')
  },
  {
    path: '/findservices',
    name: 'findservices',
    component: () => import('../components/FindService.vue')
  },
  {
    path: '/servicedetails/:id',
    name: 'servicedetails',
    props: true,
    component: () => import('../components/serviceDetails.vue')
  }
]
})
export default router
