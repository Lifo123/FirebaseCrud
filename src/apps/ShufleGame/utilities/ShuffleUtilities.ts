import { Local } from "@Utilities/Local";
import { Setting } from "./ShuffleSettings";
import { validWordStore } from "../context/ShufleGameStore";

const shuffle = (word: string) => {
    const salt = generateRandom(50)
    const wordArray = word.split('');
    const swaps = [];

    for (let i = 0; i < wordArray.length - 1; i++) {
        const j = (i + salt) % wordArray.length;

        swaps.push([i, j]);

        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    return {
        word: word,
        swaps: swaps,
        shuffled: wordArray.join('')
    };
};

const unshuffle = (shuffledWord: string, swaps: [number, number][]) => {
    const wordArray = shuffledWord.split('');

    for (let i = swaps.length - 1; i >= 0; i--) {
        const [a, b] = swaps[i];
        [wordArray[a], wordArray[b]] = [wordArray[b], wordArray[a]];
    }

    return {
        word: wordArray.join(''),
        arr: wordArray
    };
};

const generateRandom = (max: number) => {
    return Math.floor(Math.random() * ((max || 100) + 1));
}

const verifyWord = async (word: string) => {
    const data: any = validWordStore.get();

    return true

    for (let i = 0; i < data.valid.length; i++) {
        if (data.valid[i].includes(word)) {
            console.log('Valid', word, 'su Key es ', i);
            break;
        }
    }

    console.log('Palabra no existe');



}

const comparingWord = (wordShuffled: string, swaps: [number, number][], guess: string) => {
    const originalWord = unshuffle(wordShuffled, swaps);
    
    let result = []

    for(let i = 0; i < originalWord.arr.length; i++){
        result.push(originalWord.arr[i] === guess[i]);
    }

    return {
        result: result,
        isWin: result.every(Boolean)
    };

}

const GameUtil = {
    shuffle,
    generateRandom,
    verifyWord,
    comparingWord
}

export { Local, Setting, GameUtil }
