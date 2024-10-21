import './css/Shuffle.css'
import { useStore } from "@nanostores/react";
import { useShuffleGame } from './hooks/useShuffleGame';
import { ShufleGameStore } from "./context/ShufleGameStore";

//Components
import Loading from '@Components/Loading/Loading';


export default function ShuffleGame() {
    //Stores
    const GS = useStore(ShufleGameStore);

    //Hook Game
    const GF = useShuffleGame();

    const handleGenerate = async () => {
        GF.getWord();
    };


    return (
        <section className="game-container f-col g-2 mt-5 mx-auto">
            {
                GS?.gameState?.word ? (
                    <>
                        <div className='game-header f-row g-2 mx-auto'>
                            {
                                GS.gameState.word.split('').map((char: string, index: number) => (
                                    <span className='box-in br-6 f-center fs-6 fw-900' key={index}>{char}</span>
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
                ) : <Loading styleParent={{ scale: '0.45', marginBottom: 10 }} line={{ strokeWidth: 8 }} />
            }

            <span className='btn btn-blue br-6 w-max mt-5' onClick={handleGenerate}>
                Generate New
            </span>
        </section>
    )
}

type RowProps = {
    data: any;
    id: number;
};

const Row = ({ data, id }: RowProps) => {

    return (
        <div className='game-row f-row g-2' data-row={id}>
            {
                data?.map((char: any, index: number) => (
                    <span className='box-in br-6 f-center fs-6 fw-900' key={index} data-char={index}>{char.char}</span>
                ))
            }
        </div>
    )
}