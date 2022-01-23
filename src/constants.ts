export enum DeletionStates {
    IDLE = 'IDLE',
    PREPARING = 'PREPARING',
    DELETING = 'DELETING',
    DONE = 'DONE'
}

export enum ROLES {
    moderator = `moderator`,
    superUser = `superUser`,
    user = `user`,
}

export enum PERMISSIONS {
    createNote = `createNote`,
    updateNote = `updateNote`,
    deleteNote = `deleteNote`,
}