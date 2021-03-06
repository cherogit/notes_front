import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Home from '../views/Home.vue'
import Users from '../views/Users.vue'
import Auth from '../views/Auth.vue'
import Registration from '../views/Registration.vue'
import Notes from '../views/Notes.vue'
import Note from '../views/Note.vue'
import CreateNote from '../views/CreateNote.vue'
import UpdateNote from '@/views/UpdateNote.vue'
import NotFound from '@/views/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes
  },
  {
    path: '/note/:id',
    name: 'Note',
    component: Note
  },
  {
    path: '/create-note',
    name: 'CreateNote',
    component: CreateNote
  },
  {
    path: '/update/:id',
    name: 'UpdateNote',
    component: UpdateNote
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
