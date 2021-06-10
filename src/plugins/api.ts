import axios from 'axios'
import {User} from '@/typings'

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