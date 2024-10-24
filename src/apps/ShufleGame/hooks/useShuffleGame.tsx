//React
import { useEffect } from "react";
import { useStore } from "@nanostores/react";

import { initialState, ShufleGameStore, validWordStore } from "../context/ShufleGameStore";

//Services
import { queryDB } from "../services/ShuffleServices";

//Utils
import { control } from "../utilities/ShuffleControl";
import { GameUtil, Local, Setting } from "../utilities/ShuffleUtilities";
import { node } from "lifo-utils";

export function useShuffleGame() {
    //Store
    const GS = useStore(ShufleGameStore);

    const getWord = async () => {
        try {
            const wordGenerated = await queryDB.getWord(GS.gameSettings.Language, GS.gameSettings.Length);
            const shuffleData = GameUtil.shuffle(wordGenerated)
            let updateData = node.set('gameState/word,wordArr,swaps', {
                value: [shuffleData.shuffled, shuffleData.shuffled.split(''), shuffleData.swaps],
                data: GS
            })

            await ShufleGameStore.set(updateData);
            await Local.set('F-Shuffle', updateData);

            return true;
        } catch (e) {
            console.log(e);
            return false
        }
    }

    const restartGame = () => {
        Local.set('F-Shuffle', initialState);
        window.location.reload();
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
        if (GS?.gameState?.isWin) {
            window?.removeEventListener('keydown', handleKeyDown);
        } else {
            window?.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window?.removeEventListener('keydown', handleKeyDown)
        }
    }, [GS?.gameState?.isWin])

    useEffect(() => {
        if (GS?.gameState?.isRestarting) {
            getWord();
            GS.gameState.isRestarting = false;
        }
    }, [GS?.gameState?.isRestarting]);

    return {
        getWord,
        restartGame,
        restartSettings
    }
}