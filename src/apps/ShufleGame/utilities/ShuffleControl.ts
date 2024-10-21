import { ShufleGameStore } from "../context/ShufleGameStore";
import { GameUtil, Local } from "./ShuffleUtilities";

const typing = (input: string) => {
    let data = ShufleGameStore.get()

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