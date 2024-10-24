import { atom } from "nanostores";

const isBrowser = typeof window !== 'undefined'

export const initialState = {
    gameState: {
        word: '',
        wordArr: [
            '',
            '',
            '',
            '',
            ''
        ],
        swaps: [],
        guess: '',
        valid: [
            [
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null }
            ], [
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null }
            ], [
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null }
            ],
            [
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null }
            ],
            [
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null },
                { char: '', isValid: null }
            ]

        ],
        isWin: false,
        isRestarting: true,
        currentLetter: 0,
        currentRow: 0
    },
    gameSettings: {
        Length: 5,
        Tries: 5,
        Language: 'ES',
        dicName: null
    }

}

export const initialStateStadistic = {
    tries: 0,
    success: 0,
    fails: 0
}


//ShufleGame Store
export const ShufleGameStore = atom(isBrowser ? JSON.parse(localStorage.getItem('F-Shuffle') || JSON.stringify(initialState)) : initialState)
export const ShuffleStadisticStore = atom(isBrowser ? JSON.parse(localStorage.getItem('F-ShuffleStadistic') || JSON.stringify(initialStateStadistic)) : initialStateStadistic)

export const validWordStore = atom({ valid: null, custom: null })