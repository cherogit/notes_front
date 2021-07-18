import {createStore} from 'vuex'
import {Note, User} from '@/typings'
import {InjectionKey} from 'vue'
import * as api from '@/plugins/api'

type ActionError = Error | null | { [K: string]: any }

const initialState = {
    user: null as User | null,
    notes: [] as Note[],
    errors: {
        getUserInfo: null as ActionError,
        authRequest: null as ActionError,
        registrationRequest: null as ActionError,
        getNotes: null as ActionError,
        createNote: null as ActionError,
        deleteNote: null as ActionError
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
        },
        appendNote(state, note: Note) {
            const existingNoteIndex = state.notes.findIndex(item => item._id === note._id)
            if (existingNoteIndex !== -1) {
                state.notes[existingNoteIndex] = note
            } else {
                state.notes.push(note)
            }
        },
        removeNote(state, noteId: Note['_id']) {
            const existingNoteIndex = state.notes.findIndex(item => item._id === noteId)
            if (existingNoteIndex) {
                state.notes.splice(existingNoteIndex, 1)
            }
        }
    },
    actions: {
        async getUserInfo({commit}) {
            commit('setError', {action: 'getUserInfo', error: null})

            try {
                const user = await api.getUser()
                commit('setUser', user)
            } catch (err) {
                commit('setError', {action: 'getUserInfo', error: err})
                console.error(err)
            }
        },
        async authRequest({commit}, loginForm) {
            commit('setError', {action: 'authRequest', error: null})

            try {
                const user = await api.doLogin(loginForm)
                commit('setUser', user)
            } catch (err) {
                commit('setError', {action: 'authRequest', error: err})
                console.error(err)
            }
        },
        async registrationRequest({commit}, registrationForm) {
            commit('setError', {action: 'registrationRequest', error: null})

            try {
                const user = await api.registration(registrationForm)
                commit('setUser', user)
            } catch (err) {
                commit('setError', {action: 'registrationRequest', error: err})
                console.error(err)
            }
        },
        async logoutRequest({commit, dispatch}) {
            await api.doLogout()
            dispatch('getUserInfo')
            commit('setUser', null)
        },
        async getNotes({commit}) {
            commit('setError', {action: 'getNotes', error: null})

            try {
                const result = await api.getNotes()
                commit('setNotes', result.notes)
            } catch (err) {
                commit('setError', {action: 'getNotes', error: err})
                console.error(err)
            }
        },
        async createNoteRequest({commit}, noteCreationFormData) {
            commit('setError', {action: 'createNote', error: null})

            try {
                const note = await api.createNote(noteCreationFormData)
                commit('appendNote', note)
            } catch (err) {
                commit('setError', {action: 'createNote'})
            }
        },
        async deleteNote({commit, dispatch}, noteId) {
            commit('setError', {action: 'deleteNote', error: null})

            try {
                await api.deleteNote(noteId)
                commit('removeNote', noteId)
            } catch (err) {
                commit('setError', {action: 'deleteNote', error: err})
                console.error(err)
            }
        },
    }
})

export type Store = typeof store
export const storeInjectionKey: InjectionKey<Store> = Symbol()
