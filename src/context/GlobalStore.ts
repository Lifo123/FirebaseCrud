import { atom } from 'nanostores'

const isBrowser = typeof window !== 'undefined'


//DarkMode Store
export const DarkModeStore = atom(isBrowser ? localStorage.getItem('DMstate') === 'true' : false)
export const UserStore = atom(isBrowser ? JSON.parse(localStorage.getItem('F-User') || '') : {})