import {defineStore} from 'pinia'
import {Note, User, UserWithRoles} from '@/typings'
import * as api from '@/plugins/api'
import {delay} from "@/util"

type ActionError = Error | null | { [K: string]: any }

interface State {
  user: User | null,
  users: UserWithRoles[],
  notes: Note[],
  errors: Record<string, ActionError>
}

const randomFallAsync = async (str: string, ms: number) => {
  console.log(Date.now(), 'start')
  await delay(ms)
  console.log(Date.now(), 'finish')

  if (Math.random() > 0.8) {
    throw new Error('123')
  } else {
    return str.toUpperCase() + str
  }
}

export const useUserStore = defineStore('main', {
  state: (): State => ({
    user: null,
    users: [],
    notes: [],
    errors: {}
  }),
  getters: {
    checkPermission: (state) => (permission: string): boolean => {
      if (state.user) {
        return state.user.permissions.includes(permission)
      }

      return false
    },
    noteById: (state) => (_id: string): Note | null => {
      return state.notes.find(note => note._id === _id) || null
    }
  },
  actions: {
    setError(value: { action: keyof State['errors'], error: Error | null }) {
      if ((value.error as any)?.response) {
        this.errors[value.action] = (value.error as any).response.data || null
      } else {
        this.errors[value.action] = value.error
      }
    },
    randomFallAction: async (str: string) => {
      return await randomFallAsync(str, 1000)
    },
    setUser(payload: any) {
      this.user = payload
    },
    async getUserInfo() {
      const res = await api.getUser()
      this.setUser(res)
    },
    async authRequest(loginForm: { login: string, password: string }) {
      const res = await api.doLogin(loginForm)

      this.setUser(res)
    },
    async logoutRequest() {
      await api.doLogout()

      this.setUser(null)
    },
  }
})
