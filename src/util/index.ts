export const delay = (ms: number) => new Promise(r => setTimeout(r, ms))
export const rejectAfter = (ms: number) => new Promise((_, r) => setTimeout(r, ms))