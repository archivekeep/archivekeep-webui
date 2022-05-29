import { RouteRecordRaw } from 'vue-router'

import LoginPage from 'pages/auth/LoginPage.vue'
import DirectoryPage from 'pages/archive/DirectoryPage.vue'
import HomePage from 'pages/HomePage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: HomePage
      },
      {
        path: '/archives/:archiveName/:currentDirectory*',
        component: DirectoryPage,
        props: true
      }
    ]
  },
  {
    path: '/auth/login',
    component: LoginPage,
    meta: {
      allowedWithoutLogin: true,
      layout: 'simple'
    }
  },

  // always leave this as last one
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
