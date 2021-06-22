import {createStore} from 'vuex'
import {Note, User} from '@/typings'
import {InjectionKey} from 'vue'
import {doLogin, getUser, registration, doLogout, getNotes} from '@/plugins/api'

type ActionError = Error | null | { [K: string]: any }

const initialState = {
    user: null as User | null,
    notes: [] as Note[],
    errors: {
        getUserInfo: null as ActionError,
        authRequest: null as ActionError,
        registrationRequest: null as ActionError,
        getNotes: null as ActionError,
    }
}
type State = typeof initialState
//
// const setError = (state: State, value: {key: keyof State['errors'], error: Error | null}) => {
//     state.errors[value.key] = value.error
// }
//
// setError(initialState, {key: 'getUser2', error: null})

export const store = createStore<State>({
    state: initialState,
    mutations: {
        setError(state, value: { action: keyof State['errors'], error: Error | null }) {
            if ((value.error as any)?.response) {
                state.errors[value.action] = (value.error as any).response.data || null
            } else {
                state.errors[value.action] = value.error
            }
        },
        setUser(state, user: User) {
            state.user = user
        },
        setNotes(state, notes: Note[]) {
            state.notes = notes
        }
    },
    actions: {
        async getUserInfo({commit}) {
            commit('setError', {action: 'getUserInfo', error: null})

            try {
                const user = await getUser()
                commit('setUser', user)
            } catch (err) {
                commit('setError', {action: 'getUserInfo', error: err})
                console.error(err)
            }
        },
        async authRequest({commit, dispatch}, loginForm) {
            commit('setError', {action: 'authRequest', error: null})

            try {
                const user = await doLogin(loginForm)
                commit('setUser', user)
            } catch (err) {
                commit('setError', {action: 'authRequest', error: err})
                console.error(err)
            }
        },
        async registrationRequest({commit, dispatch}, registrationForm) {
            commit('setError', {action: 'registrationRequest', error: null})

            try {
                const user = await registration(registrationForm)
                commit('setUser', user)
            } catch (err) {
                commit('setError', {action: 'registrationRequest', error: err})
                console.error(err)
            }
        },
        async logoutRequest({commit, dispatch}) {
            await doLogout()
            dispatch('getUserInfo')
            commit('setUser', null)
        },
        async getNotes({commit}) {
            commit('setError', {action: 'getNotes', error: null})

            try {
                const result = await getNotes()
                commit('setNotes', result.notes)
            } catch (err) {
                commit('setError', {action: 'getNotes', error: err})
                console.error(err)
            }
        },
    },
    modules: {}
})

export type Store = typeof store
export const storeInjectionKey: InjectionKey<Store> = Symbol()
