import { Local } from "@Utilities/Local";

const shuffle = (word: string, salt: string) => {
    const a = word.length + salt.length;

    const saltValue = Array.from(salt).reduce((acc, char) => acc + char.charCodeAt(0), 0);

    let b = word.split('').sort((a: string, b: string) => a.localeCompare(b));

    // Crear dos mitades a partir del array de caracteres
    let c = b.slice(0, Math.floor(b.length / 2));
    let d = b.slice(Math.floor(b.length / 2));

    for (let i = 0; i < a; i++) {
        const cIndex = i % c.length;
        const dIndex = (i + saltValue) % d.length;

        [c[cIndex], d[dIndex]] = [d[dIndex], c[cIndex]];
    }

    const shuffledArray = [...c, ...d];

    return { word: word, shuffle: shuffledArray.join('') };
}

const generateRandom = (max: number) => {
    return Math.floor(Math.random() * ((max || 100) + 1));
}

export const GameUtil = {
    shuffle,
    generateRandom
}

export { Local }
