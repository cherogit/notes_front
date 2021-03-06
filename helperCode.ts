// // Awaited, ReturnType, Parameters... ect
// //TODO почитать доку
//
// // Pinia Store
// import {defineStore} from 'pinia'
//
// // Vuex Store
// // import {Action, ActionContext, createStore, Store as VuexStore} from 'vuex'
// import {Note, User, UserWithRoles} from '@/typings'
// import {InjectionKey, Ref} from 'vue'
// import * as api from '@/plugins/api'
// import {delay, rejectAfter} from "@/util"
//
// type ActionError = Error | null | { [K: string]: any }
//
// interface State {
//   user: User | null,
//   users: UserWithRoles[],
//   notes: Note[],
//   errors: Record<string, ActionError>
// }
//
// // type State = typeof initialState
// //
// // const setError = (state: State, value: {key: keyof State['errors'], error: Error | null}) => {
// //     state.errors[value.key] = value.error
// // }
// //
// // setError(initialState, {key: 'getUser2', error: null})
//
// // S - State
// // R - RootState
// // P - Payload
// // type MyActionHandler<S, R, P> = (this: VuexStore<R>, injectee: ActionContext<S, R>, payload: P) => any
//
// // P - Payload
// // R - Result
// // const actionFactory = <P, R>(actionName: string, mutationName: string, payloadGetter: (p: P) => Promise<R>): MyActionHandler<State, State, P> => {
// //     const fn: MyActionHandler<State, State, P> = async ({commit}, params) => {
// //         commit('setError', {action: actionName, error: null})
// //
// //         try {
// //             const result = await payloadGetter(params)
// //             commit(mutationName, result)
// //         } catch (err) {
// //             commit('setError', {action: actionName, error: err})
// //             console.error(err)
// //         }
// //     }
// //
// //     return fn
// // }
//
// const randomFallAsync = async (str: string, ms: number) => {
//   console.log(Date.now(), 'start')
//   await delay(ms)
//   console.log(Date.now(), 'finish')
//
//   if (Math.random() > 0.8) {
//     throw new Error('123')
//   } else {
//     return str.toUpperCase() + str
//   }
// }
//
// export const useStore = defineStore('main', {
//   state: (): State => ({
//     user: null,
//     users: [],
//     notes: [],
//     errors: {}
//   }),
//   getters: {
//     checkPermission: (state) => (permission: string): boolean => {
//       if (state.user) {
//         return state.user.permissions.includes(permission)
//       }
//
//       return false
//     },
//     noteById: (state) => (_id: string): Note | null => {
//       return state.notes.find(note => note._id === _id) || null
//     }
//   },
//   // mutations: {
//   //     setError(state, value: { action: keyof State['errors'], error: Error | null }) {
//   //         if ((value.error as any)?.response) {
//   //             state.errors[value.action] = (value.error as any).response.data || null
//   //         } else {
//   //             state.errors[value.action] = value.error
//   //         }
//   //     },
//   //     setUser(state, user: User) {
//   //         state.user = user
//   //     },
//   //     replaceAllUsers(state, users: UserWithRoles[]) {
//   //         state.users = users
//   //     },
//   //     appendUsers(state, users: UserWithRoles[]) {
//   //         users.forEach(user => {
//   //             const existingUserIndex = state.users.findIndex(stateUser => stateUser._id === user._id)
//   //
//   //             if (existingUserIndex >= 0) {
//   //                 state.users[existingUserIndex] = user
//   //             } else {
//   //                 state.users.push(user)
//   //             }
//   //         })
//   //     },
//   //     setNotes(state, notes: Note[]) {
//   //         state.notes = notes
//   //     },
//   //     appendNote(state, note: Note) {
//   //         const existingNoteIndex = state.notes.findIndex(item => item._id === note._id)
//   //         if (existingNoteIndex !== -1) {
//   //             state.notes[existingNoteIndex] = note
//   //         } else {
//   //             state.notes.push(note)
//   //         }
//   //     },
//   //     removeNote(state, noteId: Note['_id']) {
//   //         const existingNoteIndex = state.notes.findIndex(item => item._id === noteId)
//   //         if (existingNoteIndex != -1) {
//   //             state.notes.splice(existingNoteIndex, 1)
//   //         }
//   //     }
//   // },
//
//   actions: {
//     setError(value: { action: keyof State['errors'], error: Error | null }) {
//       if ((value.error as any)?.response) {
//         this.errors[value.action] = (value.error as any).response.data || null
//       } else {
//         this.errors[value.action] = value.error
//       }
//     },
//     randomFallAction: async (str: string) => {
//       return await randomFallAsync(str, 1000)
//     },
//     setUser(payload: any) {
//       this.user = payload
//     },
//     async getUserInfo() {
//       const res = await api.getUser()
//       this.setUser(res)
//     },
//     async authRequest(loginForm: { login: string, password: string }) {
//       const res = await api.doLogin(loginForm)
//
//       this.setUser(res)
//     },
//     async logoutRequest() {
//       await api.doLogout()
//
//       this.setUser(null)
//     },
//     // getListOfUsers: actionFactory('getListOfUsers', 'replaceAllUsers', async () => {
//     //     const result = await api.getListOfUsers()
//     //     return result.users
//     // }),
//     // registrationRequest: actionFactory('registrationRequest', 'setUser', async registrationForm => {
//     //     return await api.registration(registrationForm)
//     // }),
//     // getNotes: actionFactory('getNotes', 'setNotes', async () => {
//     //     const result = await api.getNotes()
//     //     return result.notes
//     // }),
//     // loadNoteById: actionFactory('loadNoteById', 'appendNote', async (noteId: string) => {
//     //     return await api.loadNoteById(noteId)
//     // }),
//     // createNoteRequest: actionFactory('createNote', 'appendNote', async (noteCreationFormData) => {
//     //     return await api.createNote(noteCreationFormData)
//     // }),
//     // updateNote: actionFactory('updateNote', '', async ([noteId, noteUpdatingFormData]) => {
//     //     return await api.updateNote(noteId, noteUpdatingFormData)
//     // }),
//     // deleteNote: actionFactory('deleteNote', 'removeNote', async (noteId: string) => {
//     //     return await api.deleteNote(noteId)
//     // }),
//     // updateUsers: actionFactory('updateUsers', 'appendUsers', async (users) => {
//     //     const result = await api.updateUsers(users)
//     //     return result.users
//     // }),
//   }
// })
//
// // export type Store = typeof store
// // export const storeInjectionKey: InjectionKey<Store> = Symbol()
