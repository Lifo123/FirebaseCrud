import { ShufleGameStore } from "../context/ShufleGameStore";

export const shuffle = (word: string, salt: string) => {
    let array = word.split('');
    let saltValue  = salt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    for (let i = array.length - 1; i > 0; i--) {
        const j = (saltValue + i) % array.length;  
        [array[i], array[j]] = [array[j], array[i]]; 
    }

    return { word: word, shuffle: array.join('') };
}

export const GenerateRandom = (max: number) => {
    return Math.floor(Math.random() * ((max || 100) + 1));
}

export const saveLocal = (node: string, newValue: any) => {
    if (node.endsWith('/')) {
        node = node.slice(0, -1);
    }

    const currentNode = node.split('/');
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

export const getLocal = (node: string) => {
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