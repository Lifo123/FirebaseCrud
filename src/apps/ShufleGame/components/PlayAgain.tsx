import { useEffect, useRef } from "react";
import { ShufleGameStore } from "../context/ShufleGameStore";

interface PlayAgainProps {
    funct: () => void; // Definir el tipo correcto de la función
}

const PlayAgain: React.FC<PlayAgainProps> = ({ funct }) => {
    const play: any = useRef(null);

    useEffect(() => {
        const INFO = ShufleGameStore.get();
        setTimeout(() => {
            play.current.classList.remove('d-none')
        }, INFO.gameSettings.Length * 260)
    }, [])

    return (
        <span className='btn btn-blue br-6 w-max mx-auto mt-3 d-none' onClick={() => funct()} ref={play}>
            Play again
        </span>
    )

};

export default PlayAgain;
