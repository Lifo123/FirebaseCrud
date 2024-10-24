import './Shuffle.css'
import { useStore } from "@nanostores/react";
import { useShuffleGame } from './hooks/useShuffleGame';
import { ShufleGameStore } from "./context/ShufleGameStore";
import Row from "./components/Row";

//Components
import Loading from '@Components/Loading/Loading';
import { useEffect } from 'react';
import PlayAgain from './components/PlayAgain';



export default function ShuffleGame() {
    //Stores
    const GS = useStore(ShufleGameStore);

    //Hook Game
    const GF = useShuffleGame();

    return (
        <section className="game-container f-col g-2 mt-5 mx-auto">
            <>
                <div className='game-header f-row g-2 mx-auto'>
                    {
                        GS.gameState.wordArr.map((box: any, index: number) => (
                            <span className={`box-letter br-6 f-center fs-6 fw-900 ${box ? '' : 'load'}`} key={index}>{box || ''}</span>
                        ))
                    }
                </div>
                <div className='game-board f-col g-2 mx-auto mt-3'>
                    {
                        GS.gameState.valid.map((row: any, index: number) => (
                            <Row key={index} data={row} id={index} />
                        ))
                    }
                </div>
            </>

            {
                GS?.gameState?.isWin ? (
                    <PlayAgain funct={GF.restartGame} />
                ) : null
            }
        </section>
    )
}



