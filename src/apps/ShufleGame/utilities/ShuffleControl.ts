import { ShufleGameStore } from "../context/ShufleGameStore";
import { GameUtil, Local } from "./ShuffleUtilities";

const typing = (input: string) => {
    let data = ShufleGameStore.get().gameState;
    let updateDate = Local.test(`valid/char,isValid/hola/test`, {
        value: [input, null],
        obj: data
    });



}
const backspace = () => {
    console.log('Escribiendo');
}
const enter = () => {
    console.log('Escribiendo');
}


export const control = {
    typing,
    backspace,
    enter
};