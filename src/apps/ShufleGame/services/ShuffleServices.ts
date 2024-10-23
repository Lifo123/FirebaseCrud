import { DicDB } from "@Services/fireDictionary";
import { get, ref, set } from "firebase/database";
import { GameUtil } from "../utilities/ShuffleUtilities";
import { validWordStore } from "../context/ShufleGameStore";


const getWord = async (lang: string, length: number) => {
    try {
        const dicRef = ref(DicDB, `${lang}/gameDefault/d${length}`);
        const dicSnapshot = await get(dicRef);
        const arr = dicSnapshot.val()
        const randomIndex = GameUtil.generateRandom(arr.length);
        console.log(arr[randomIndex]);

        return arr[randomIndex];

    } catch (e) {
        console.log('Error fetching word:', e);
        throw e;
    }
}

const getValidWords = async (lang: string, length: number, dicName?: string) => {
    return
    
}

const setCustomDictionary = async (lang: string, dicName: string, obj: any) => {
    try {
        const dicRef = ref(DicDB, `${lang}/${dicName}`);
        await set(dicRef, obj);
        console.log('Custom Dictionary set successfully');


        return true

    } catch (e) {
        console.log('Error setting custom Dictionary: ', e);
        throw e;
    }
}



export const queryDB = {
    getWord,
    getValidWords,
    setCustomDictionary
}

