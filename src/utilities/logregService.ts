import { ref, get, set, query, limitToLast } from "firebase/database";
import { analytics, db } from "@Services/firebase";
import { hashPass } from "./Hashing";
import { logEvent } from "firebase/analytics";

export const validateUser = async (userId: string, password: string): Promise<Boolean | Object | String> => {
    logEvent(analytics, 'login', {
        method: 'username',
        userId: userId
    });

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
        const currentTime = new Date().getTime();

        if (userSnapshot.exists()) {
            return 'exists';
        }

        const userData = {
            user: userId,
            password: password,
            salt: salt,
            createAt: currentTime,
        };
        await set(userRef, userData);

        return 'created';

    } catch (e) {
        console.log(e);
        
        return 'error';
    }
}