const set = (path: string, value: any) => {
    const Nodes = normalizeNode(path)
    if (Nodes.length === 1) {
        localStorage.setItem(Nodes[0], JSON.stringify(value));
        return
    }

    const KeyStorage = Nodes[0]

    const nodeExists = localStorage.getItem(KeyStorage)
    let Data: any = nodeExists ? JSON.parse(nodeExists) : {};
    let current: any = Data;

    for (let i = 1; i < Nodes.length; i++) {
        const key = Nodes[i];

        // Si llegamos al último nivel, asignamos el nuevo valor
        if (i === Nodes.length - 1) {
            current[key] = value;
        } else if (!current[key]) {
            current[key] = {};
        } else {
            current = current[key];
        }
    }

    localStorage.setItem(KeyStorage, JSON.stringify(Data));

    return Data;

}

const get = (path: string) => {
    const Nodes = normalizeNode(path);
    const KeyStorage = Nodes[0];

    const nodeExists = localStorage.getItem(KeyStorage);
    if (!nodeExists) {
        console.log('Storage not found');
        return null;
    }

    let Data = JSON.parse(nodeExists);
    let current: any = Data;

    // Traverse to the last node
    for (let i = 1; i < Nodes.length; i++) {
        const node = Nodes[i];
        if (!current[node]) {
            console.log('Node not found');
            return null;
        }
        current = current[node];
    }
    return { storage: Data, content: current };
}

const remove = (key: string) => {
    let exists = localStorage.getItem(key);
    if (!exists) {
        console.log('Storage not found');
        return;
    }
    localStorage.removeItem(key)
}

const updateNode = (path: string, { value, obj }: { value: any, obj: any }) => {
    const Nodes = normalizeNode(path);
    
    if (Nodes.length === 1) {
        // Si solo hay un nodo, actualizamos el nodo principal directamente
        obj[Nodes[0]] = value;
        return obj;
    }

    let current: any = obj;

    // Recorremos los nodos para llegar al último y actualizar el valor
    for (let i = 0; i < Nodes.length; i++) {
        const key = Nodes[i];
        const isArrayIndex = !isNaN(Number(key));

        // Si llegamos al último nivel, asignamos el nuevo valor
        if (i === Nodes.length - 1) {
            if (isArrayIndex) {
                if (!Array.isArray(current)) {
                    current = [];
                }
                current[Number(key)] = value;
            } else {
                current[key] = value;
            }
        } else {
            // Si es un índice de array, continuamos en la estructura y creamos un array si no existe
            if (isArrayIndex) {
                if (!Array.isArray(current[key])) {
                    current[key] = [];
                }
                current = current[key];
            } else {
                // Si es una clave de objeto, creamos un objeto si no existe
                if (!current[key]) {
                    current[key] = {};
                }
                current = current[key];
            }
        }
    }

    return obj;
};

const updateNodes = (path: string, { value, obj }: { value: any[], obj: any }) => {
    const mainPath = path.split('/')[0];  // Extraemos el nodo padre
    const childNodes = path.split('/').slice(1).join().split(',');  // Extraemos los nodos hijos

    if (childNodes.length !== value.length) {
        throw new Error("El número de valores no coincide con el número de nodos.");
    }

    // Hacemos una copia inmutable del objeto `obj`
    let updatedObj = { ...obj };
    let current = updatedObj[mainPath] ? { ...updatedObj[mainPath] } : {};  // Copia del objeto principal

    // Iteramos sobre los nodos hijos y les asignamos sus valores correspondientes
    for (let i = 0; i < childNodes.length; i++) {
        const key = childNodes[i].trim();
        current[key] = value[i];
    }

    updatedObj[mainPath] = current;  // Actualizamos el objeto principal

    return updatedObj;  // Devolvemos la copia actualizada
};


const normalizeNode = (node: string) => {
    if (node.endsWith('/')) {
        node = node.slice(0, -1);
    }

    const parts = node.split('/').filter(part => part !== '');

    return parts.length > 0 ? parts : [];
};

export const Local = {
    set,
    get,
    remove,
    updateNode,
    updateNodes
}