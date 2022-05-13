import axios from 'axios'
import {ApiError, CreatableNote, Note, User, UserWithRoles} from '@/typings'

export const api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 1000,
  withCredentials: true
})

export const getUser = async (): Promise<User> => {
  try {
    return (await api.get('/self')).data
  } catch (err: any) {
    if (typeof err?.response?.data?.error?.message === "string") {
      const error = new Error(err.response.data.error.message) as ApiError
      error.status = err.response.data.error.status
      throw error
    }
    throw err
  }
}

export const getListOfUsers = async (): Promise<{ users: UserWithRoles[] }> => {
  return (await api.get('/users')).data
}

export const doLogin = async (loginForm: { login: string, password: string }): Promise<User> => {
  try {
    return (await api.post('/auth', loginForm)).data
  } catch (err: any) {
    if (Array.isArray(err?.response?.data?.errors)) {
      throw err?.response?.data?.errors
    } else {
      const error = new Error(err.response.data.error.message) as ApiError
      error.status = err.response.data.error.status
      throw error
    }
  }
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

export const loadNoteById = async (noteId: string): Promise<Note> => {
  return (await api.get(`/note/${noteId}`)).data
}

export const createNote = async (noteCreationFormData: { title: string, note: string, labels: string, publication_date: string }): Promise<CreatableNote> => {
  return (await api.post('/create-note', noteCreationFormData)).data
}

export const updateNote = async (noteId: string, noteUpdatingFormData: { title: string, note: string, labels: string, publication_date: string }): Promise<Note> => {
  return (await api.put(`/update/${noteId}`, noteUpdatingFormData)).data
}

export const deleteNote = async (nodeId: string): Promise<void> => {
  if (Math.random() >= 0.9) {
    const error = new Error('SOME_ERROR')
    throw error
  }
  await api.delete(`/note/${nodeId}`)
}

export const updateUsers = async (users: [{ id: string, roles: [] }]): Promise<{ users: UserWithRoles[] }> => {
  return (await api.put(`/updateUsers`, users)).data
}
