import './css/Shuffle.css'
import { useStore } from "@nanostores/react";
import { ShufleGameStore } from "./context/ShufleGameStore";
import { useEffect } from "react";
import useShuffleGame from './hooks/useShuffleGame';


export default function ShuffleGame() {
    //Stores
    const GS = useStore(ShufleGameStore);

    //Hook Game
    const GF = useShuffleGame();




    useEffect(() => {
        if (GS.gameState.word === '' && GS.gameState.salt === '') {
            GF.getWord();
        }
    }, [])

    return (
        <section className="game-container f-col g-2 mt-5 mx-auto">
            <div className='game-board f-row g-2 mx-auto'>
                {
                    GS?.gameState?.valid.map((char: any, index: number) => (
                        <span className='box-in br-6' key={index} data-state={char.isValid}>{char.char}</span>
                    ))
                }
            </div>


            <span className='btn btn-blue br-6 w-max mt-5' onClick={() => { GF.getWord() }}>
                Ver Word
            </span>
        </section>
    )
}