import { ref, get, set } from "firebase/database";
import { db } from "@Services/firebase";
import { hashPass } from "./Hashing";

export const getUser = async (userId: string) => {
    const userRef = ref(db, `users/${userId}`);
    const userSnapshot = await get(userRef);

    if (userSnapshot.exists()) {
        return userSnapshot.val();
    } else {
        return null;
    }
}

export const validateUser = async (userId: string, password: string): Promise<Boolean | Object | String> => {
    const userRef = ref(db, `users/${userId}`);
    const userSnapshot = await get(userRef);

    if (userSnapshot.exists()) {
        const userData = userSnapshot.val();
        const hashedInputPassword = hashPass(password, userData?.salt);

        if (userData.password === hashedInputPassword) {
            return [true, {
                user: userId,
                salt: userData.salt
            }];
        } else {
            return 'Contraseña incorrecta';
        }
    } else {
        return false;
    }

}

export const createUser = async (userId: string, password: string, salt: string) => {
    try {
        const userRef = ref(db, `users/${userId}`);
        const userSnapshot = await get(userRef);

        if (userSnapshot.exists()) {
            return 'exists';
        }

        const userData = {
            password: password,
            salt: salt,
        };
        await set(userRef, userData);

        return 'created';

    } catch (e) {
        return 'error';
    }
}