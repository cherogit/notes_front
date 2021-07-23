import axios from 'axios'
import {User, Note, CreatableNote} from '@/typings'

export const api = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 1000,
    withCredentials: true
})

export const getUser = async (): Promise<User> => {
    return (await api.get('/self')).data
}

export const doLogin = async (loginForm: { login: string, password: string }): Promise<User> => {
    return (await api.post('/auth', loginForm)).data
}

export const registration = async (registrationForm: { login: string, userName: string, password: string }): Promise<User> => {
    return (await api.post('/registration', registrationForm)).data
}

export const doLogout = async (): Promise<void> => {
    await api.get('/logout')
}

export const getNotes = async (): Promise<{ notes: Note[] }> => {
    return (await api.get('/notes')).data
}

export const createNote = async (noteCreationFormData: { title: string, note: string, labels: string, publication_date: string }): Promise<CreatableNote> => {
    return (await api.post('/create-note', noteCreationFormData)).data
}

export const deleteNote = async (nodeId: string): Promise<void> => {
    if (Math.random() >= 0.1) {
        const error = new Error('SOME_ERROR')
        throw error
    }
    await api.delete(`/note/${nodeId}`)
}