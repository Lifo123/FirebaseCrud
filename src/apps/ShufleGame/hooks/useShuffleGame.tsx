//React
import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";

import { initialState, ShufleGameStore, validWordStore } from "../context/ShufleGameStore";

//Services
import { queryDB } from "../services/ShuffleServices";

//Utils
import { generateSalt } from "@Utilities/Hashing";
import { control } from "../utilities/ShuffleControl";
import { GameUtil, Local, Setting } from "../utilities/ShuffleUtilities";
import { node } from "lifo-utils";

export function useShuffleGame() {
    //States
    const [loading, setLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    //Store
    const GS = useStore(ShufleGameStore);

    const getWord = async () => {
        setLoading(true);
        try {
            const wordGenerated = await queryDB.getWord(GS.gameSettings.Language, GS.gameSettings.Length);
            const shuffleData = GameUtil.shuffle(wordGenerated)
            let updateData = node.set('gameState/word,swaps', {
                value: [shuffleData.shuffled, shuffleData.swaps],
                data: GS
            })

            await ShufleGameStore.set(updateData);
            await Local.set('F-Shuffle', updateData);

            return true;
        } catch (e) {
            console.log(e);
            return false
        } finally {
            setLoading(false);
        }
    }

    const restartGame = () => {
        getWord();
    }

    const restartSettings = () => {
        ShufleGameStore.set(initialState);
        Local.set('F-Shuffle', initialState);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
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
        setIsMounted(true);
        if (!isMounted) {
            queryDB.getValidWords(GS.gameSettings.Language, GS.gameSettings.Length)
        }

        window?.addEventListener('keydown', handleKeyDown)

        return () => {
            window?.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    useEffect(() => {
        if (!GS?.gameState?.word || !GS?.gameState?.salt) {
            getWord();
        }
    }, [GS?.gameState?.word, GS?.gameState?.salt]);

    return {
        getWord,
        restartGame,
        restartSettings,
        loading
    }
}