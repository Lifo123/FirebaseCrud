import { atom } from "nanostores";

const isBrowser = typeof window !== 'undefined'

const initialState = {
    gameState: {
        word: '',
        salt: '',
        guess: '',
        valid: [
            { char: '', isValid: null },
            { char: '', isValid: null },
            { char: '', isValid: null },
            { char: '', isValid: null },
            { char: '', isValid: null }
        ],
        status: 'inProgress',
    },
    gameSettings: {
        WordLength: 5,
        Tries: 3,
        Language: 'ES',
        DicLength: 926
    }

}

//ShufleGame Store
export const ShufleGameStore = atom(isBrowser ? JSON.parse(localStorage.getItem('F-Shuffle') || JSON.stringify(initialState)) : initialState)