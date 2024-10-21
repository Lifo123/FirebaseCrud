import { Local } from "@Utilities/Local";
import { ShufleGameStore } from "../context/ShufleGameStore";

const length = (num: number) => {
    let data = ShufleGameStore.get()
    let updateGameSettings = Local.updateNode('gameSettings/Length', {
        value: num,
        obj: data
    })

    console.log('Update Tries to ', tries);

}

const tries = (tries: number) => {
    let data = ShufleGameStore.get()
    let updateGameSettings = Local.updateNode('gameSettings/Tries', {
        value: tries,
        obj: data
    })

    console.log('Update Tries to ', tries);


}

const language = (lang: string) => {
    let data = ShufleGameStore.get()
    let updateGameSettings = Local.updateNode('gameSettings/Language', {
        value: lang,
        obj: data
    })

    console.log('Update Language to ', lang);

}


export const Setting = {
    length,
    tries,
    language
};