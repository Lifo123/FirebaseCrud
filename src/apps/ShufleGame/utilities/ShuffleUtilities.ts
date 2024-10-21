import { ShufleGameStore } from "../context/ShufleGameStore";

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

const saveLocal = (node: string, newValue: any) => {
    if (node.endsWith('/')) {
        node = node.slice(0, -1);
    }

    const currentNode = node.split('/');
    if (currentNode.length === 1) {
        localStorage.setItem(node, JSON.stringify(newValue));
        return
    }

    let Data = ShufleGameStore.get();

    let current = Data;

    for (let i = 1; i < currentNode.length; i++) {
        const key = currentNode[i];

        // Si llegamos al último nivel, asignamos el nuevo valor
        if (i === currentNode.length - 1) {
            current[key] = newValue;
        } else {
            // Si el nivel no existe, lo creamos como un objeto vacío
            if (!current[key]) {
                current[key] = {};
            }
            // Avanzamos al siguiente nivel
            current = current[key];
        }
    }

    localStorage.setItem(currentNode[0], JSON.stringify(Data));

}

const getLocal = (node: string) => {
    if (node.endsWith('/')) {
        node = node.slice(0, -1);
    }

    const currentNode = node.split('/');
    if (currentNode.length === 1) {
        return JSON.parse(localStorage.getItem(node || '') || '{}');
    }


    let Data = JSON.parse(localStorage.getItem(currentNode[0]) || '{}');

    let current = Data;

    for (let i = 1; i < currentNode.length; i++) {
        const key = currentNode[i];

        // Si llegamos al último nivel, devolvemos el valor
        if (i === currentNode.length - 1) {
            return current[key];
        } else {
            // Si el nivel no existe, devolvemos undefined
            if (!current[key]) {
                return undefined;
            }
            // Avanzamos al siguiente nivel
            current = current[key];
        }
    }


}

const updateNode = (node: string, newValue: any) => {

}

export const GameUtil = {
    shuffle,
    generateRandom,
    saveLocal,
    getLocal,
    updateNode
}