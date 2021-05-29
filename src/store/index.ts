import {createStore} from 'vuex'
import {User} from '@/typings'
import {InjectionKey} from 'vue'
import {doLogin, getUser} from '@/plugins/api'

const initialState = {
    user: null as User | null,
    errors: {
        getUserInfo: null as Error | null,
        authRequest: null as Error | null,
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
        setError(state, value: {action: keyof State['errors'], error: Error | null}) {
            state.errors[value.action] = value.error
        },
        setUser(state, value) {
            console.log('setUser', state, value)
            state.user = value
            console.log('setUser update', state, value)
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
        async authRequest({commit}, loginForm) {
            commit('setError', {action: 'authRequest', error: null})
            commit('setError', {action: 'getUserInfo', error: null})

            try {
                const user = await doLogin(loginForm)
                commit('setUser', user)
            } catch (err) {
                commit('setError', {action: 'authRequest', error: err})
                console.error(err)
            }
        }
    },
    modules: {}
})

export type Store = typeof store
export const storeInjectionKey: InjectionKey<Store> = Symbol()
