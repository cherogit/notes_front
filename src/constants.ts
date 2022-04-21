export enum DeletionStates {
    IDLE = 'IDLE',
    PREPARING = 'PREPARING',
    DELETING = 'DELETING',
    DONE = 'DONE'
}

export enum CallStates {
    NOT_CALLED = 'NOT_CALLED',
    PENDING = 'PENDING',
    RESOLVED = 'RESOLVED',
    REJECTED = 'REJECTED'
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