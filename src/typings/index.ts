import {ROLES} from '@/constants'

export interface ApiError extends Error {
  status: number
}

export interface User {
  permissions: string[]
  _id: string
  userName: string
}

export interface UserWithRoles extends User {
  roles: typeof ROLES[]
}

export interface Note {
  _id: string | null
  title: string | null
  note: string | null
  labels: string[]
  publication_date: string | null
}

export type CreatableNote = Omit<Note, '_id'>

export type CreatableNote2 = Omit<Note, '_id' | 'publication_date'>
export type CreatableNote3 = Partial<Note> // пример
export type CreatableNote4 = CreatableNote & { _id?: string } // пример2
