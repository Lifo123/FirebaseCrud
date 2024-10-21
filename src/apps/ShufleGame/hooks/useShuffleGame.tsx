import { GameUtil } from "../utilities/ShuffleUtilities";
import { useStore } from "@nanostores/react";
import { ShufleGameStore } from "../context/ShufleGameStore";
import { getWordDB } from "../services/ShuffleServices";
import { generateSalt } from "@Utilities/Hashing";
import { useEffect } from "react";
import { control } from "../utilities/ShuffleControl";

export function useShuffleGame() {
    //Store
    const GS = useStore(ShufleGameStore);

    const getWord = async () => {
        try {
            const salt = generateSalt();
            const wordGenerated = await getWordDB(GS.gameSettings.Language, GS.gameSettings.WordLength);
            const shuffleData = GameUtil.shuffle(wordGenerated, salt);
            let updateGame = GS
            updateGame = {
                ...GS, gameState: {
                    ...GS.gameState,
                    word: shuffleData.shuffle,
                    salt: salt
                }
            }

            GameUtil.saveLocal('F-Shuffle', updateGame)
            ShufleGameStore.set(updateGame);
        } catch (e) {
            console.log(e);
        }
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

    useEffect(() => {
        console.log('Add Envet');

        window?.addEventListener('keydown', handleKeyDown)

        return () => {
            window?.removeEventListener('keydown', handleKeyDown)
        }

    }, [])


    return {
        getWord
    }
}