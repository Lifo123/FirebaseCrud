import { ShufleGameStore } from "../context/ShufleGameStore";

const typing = (input: string) => {
    let data = ShufleGameStore.get()
    let updateGameState = data?.gameState

    console.log('Escribiendo', updateGameState);
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