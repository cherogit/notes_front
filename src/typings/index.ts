export interface User {
    _id: string
    userName: string
}

export interface Note {
    _id: string
    title: string
    note: string
    labels: string[]
    publication_date: string
}

export type CreatableNote = Omit<Note, '_id'>

export type CreatableNote2 = Omit<Note, '_id' | 'publication_date'>
export type CreatableNote3 = Partial<Note> // пример
export type CreatableNote4 = CreatableNote & {_id?: string} // пример2