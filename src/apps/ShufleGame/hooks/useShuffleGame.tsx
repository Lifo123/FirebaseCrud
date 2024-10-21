import { saveLocal, shuffle } from "../utilities/ShuffleUtilities";
import { useStore } from "@nanostores/react";
import { ShufleGameStore } from "../context/ShufleGameStore";
import { getWordDB } from "../services/ShuffleServices";
import { generateSalt } from "@Utilities/Hashing";

export default function useShuffleGame() {
    //Store
    const GS = useStore(ShufleGameStore);

    const getWord = async () => {
        try {
            const salt = generateSalt();
            const wordGenerated = await getWordDB(GS.gameSettings.Language, GS.gameSettings.WordLength);
            const shuffleData = shuffle(wordGenerated, salt);

            saveLocal('F-Shuffle/gameState/word', shuffleData.shuffle);
            ShufleGameStore.set({
                ...GS, gameState: {
                    ...GS.gameState,
                    word: shuffleData.shuffle,
                    salt: salt
                }
            });
        } catch (e) {
            console.log(e);
        }
    }



    return {
        getWord
    }
}