import { createUser, validateUser } from "@Utilities/firebaseCRUD";
import { generateSalt, hashPass, } from "@Utilities/Hashing";
import { useEffect } from "react";
import { toast } from "sonner";

interface LogRegBTNProps {
    mode: 'login' | 'register';
}

export default function LogRegBTN({ mode }: LogRegBTNProps) {

    //Functions
    const handleLogin = async () => {
        const Data = getInputs();

        if (Data[0].value === '' || Data[1].value === '') {
            toast.dismiss();
            toast.error('Please fill all the fields');
            return;
        } else {
            toast.dismiss();
        }

        const isUser = await validateUser(Data[0].value, Data[1].value);
        if (Array.isArray(isUser) && isUser[0] === true) {  
            localStorage.setItem('F-User', JSON.stringify({ user: isUser[1].user, salt: isUser[1].salt}));
            window.location.href = '/FirebaseCrud/';

        } else if (isUser === 'Contraseña incorrecta') {
            toast.error('Contraseña incorrecta');
        } else if (isUser === false) {
            toast.error('User not found');
        }
    }

    const handleRegister = async () => {
        const Data = getInputs();

        if (Data[0].value === '' || Data[1].value === '' || Data[2].value === '') {
            toast.dismiss();
            toast.error('Please fill all the fields');
            return;
        } else {
            toast.dismiss();
        }

        if (Data[1].value !== Data[2].value) {
            toast.dismiss();
            toast.error('Passwords do not match');
            return;
        }

        let salt = generateSalt();
        let pass = hashPass(Data[1].value, salt);
        let isCreated = await createUser(Data[0].value, pass, salt);

        if (isCreated === 'created') {
            //SetToken
            localStorage.setItem('F-User', JSON.stringify({ user: Data[0].value, salt: salt }));

            //Redirect
            window.location.href = '/FirebaseCrud/';

            return;
        } else if (isCreated === 'exists') {
            toast.error('User already exists');
        } else if (isCreated === 'error') {
            toast.error('Error creating user');
        }



    }

    const getInputs = () => {
        const username = document.querySelector('[name="username"]') as HTMLInputElement;
        const password = document.querySelector('[name="password"]') as HTMLInputElement;
        const password1 = document.querySelector('[name="password1"]') as HTMLInputElement;
        const remember = document.querySelector('[name="remember"]') as HTMLInputElement;

        return [username, password, password1, remember];
    }

    //Effects
    useEffect(() => {
        let Data = getInputs();
        Data.forEach(input => {
            input?.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    mode === 'login' ? handleLogin() : handleRegister();
                }
            })
        })

    }, [])

    return (
        <span className="logreg-btn d-flex br-6 pointer mt-3 mb-1 fw-600 f-justify-center" onClick={mode === 'login' ? handleLogin : handleRegister}>
            {mode === 'login' ? 'Sign In' : 'Sing Up'}
        </span>
    )
}