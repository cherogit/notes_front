import {createStore} from 'vuex'
import {User} from '@/typings'
import {InjectionKey} from 'vue'
import {doLogin, getUser, registration, doLogout} from '@/plugins/api'

const initialState = {
    user: null as User | null,
    errors: {
        getUserInfo: null as Error | null,
        authRequest: null as Error | null,
        registrationRequest: null as Error | null,
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
        async authRequest({commit, dispatch}, loginForm) {
            commit('setError', {action: 'authRequest', error: null})

            try {
                await doLogin(loginForm)
                dispatch('getUserInfo')
            } catch (err) {
                commit('setError', {action: 'authRequest', error: err})
                console.error(err)
            }
        },
        async registrationRequest({commit, dispatch}, registrationForm) {
            commit('setError', {action: 'registrationRequest', error: null})

            try {
                await registration(registrationForm)
                dispatch('authRequest', {login: registrationForm.login, password: registrationForm.password})
            } catch (err) {
                commit('setError', {action: 'registrationRequest', error: err})
                console.error(err)
            }
        },
        async logoutRequest({commit, dispatch}) {
            await doLogout()
            dispatch('getUserInfo')
            commit('setUser', null)

        }
    },
    modules: {}
})

export type Store = typeof store
export const storeInjectionKey: InjectionKey<Store> = Symbol()
