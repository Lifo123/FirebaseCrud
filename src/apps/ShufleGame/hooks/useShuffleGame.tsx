//React
import { useEffect } from "react";
import { useStore } from "@nanostores/react";

import { initialState, ShufleGameStore } from "../context/ShufleGameStore";

//Services
import { queryDB } from "../services/ShuffleServices";

//Utils
import { generateSalt } from "@Utilities/Hashing";
import { control } from "../utilities/ShuffleControl";
import { GameUtil, Local, Setting } from "../utilities/ShuffleUtilities";

export function useShuffleGame() {
    //Store
    const GS = useStore(ShufleGameStore);

    const getWord = async () => {
        try {
            const salt = generateSalt();
            const wordGenerated = await queryDB.getWord(GS.gameSettings.Language, GS.gameSettings.Length);
            const shuffleData = GameUtil.shuffle(wordGenerated, salt)   
            let updatedGame = Local.updateNodes('gameState/word,salt', {
                value: [shuffleData.shuffle, salt],
                obj: GS
            });

            await ShufleGameStore.set(updatedGame);
            await Local.set('F-Shuffle', updatedGame);

            return true;
        } catch (e) {
            console.log(e);
            return false
        }
    }

    const restartGame = () => {
        getWord();
    }

    const restartSettings = () => {
        ShufleGameStore.set(initialState);
        Local.set('F-Shuffle', initialState);
    }

    const handleKeyDown = (e: any) => {
        const letterRegex = /^[a-zA-ZñÑ]$/;

        if (letterRegex.test(e.key)) {
            control.typing(e.key)
        }
        if (e.key === 'Backspace') {
            control.backspace()
        }
        if (e.key === 'Enter') {
            control.enter()
        }
    }

    //Effects
    useEffect(() => {
        window?.addEventListener('keydown', handleKeyDown)

        return () => {
            window?.removeEventListener('keydown', handleKeyDown)
        }

    }, [])
    useEffect(() => {
        if (GS?.gameState?.word === '' || GS?.gameState?.salt === '') {
            getWord();
        }
    }, [GS?.gameState?.word, GS?.gameState?.salt]);

    return {
        getWord,
        restartGame,
        restartSettings
    }
}