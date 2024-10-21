import { DicDB } from "@Services/fireDictionary";
import { get, ref } from "firebase/database";
import { GameUtil } from "../utilities/ShuffleUtilities";


export const getWordDB = async (lang : string, length : number)  => {
    try {
        const dicRef = ref(DicDB, `${lang}/gameDefault/d${length}`);
        const dicSnapshot = await get(dicRef);
        const arr = dicSnapshot.val()
        const randomIndex = GameUtil.generateRandom(arr.length);
        return arr[randomIndex];

    } catch (e) {
        console.log('Error fetching word:', e);
        throw e;
    }

}