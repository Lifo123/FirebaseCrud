import { useEffect } from "react";
import { toast } from "sonner";
import { db } from "@Services/firebase";
import { ref, set, get } from "firebase/database";


export default function AddBTN() {
    //Functions

    const handleAdd = async () => {
        let Data = getInputs();

        if (Data[0].value === '' || Data[1].value === '' || Data[2].value === '') {
            toast.dismiss();
            toast.error('Please fill all the fields');
            return;
        }

        try {
            const productsRef = ref(db, `products/${Data[0].value}`);
            const productsSnapshot = await get(productsRef)
        
            await set(productsRef, {
                name: Data[0].value,
                price: Number(Data[1].value),
                stock: Number(Data[2].value),
                createAt: new Date().getTime()
            });

            if (productsSnapshot.exists()) {
                toast.dismiss();
                toast.success('Product Updated',{
                    duration: 1000
                });
                return;
            }
        } catch (e) {
            toast.dismiss();
            toast.error('Error adding product');
            return;
        }

        toast.dismiss();
        toast.success('Product added successfully');

    }

    const getInputs = () => {
        const Name = document.querySelector('[name="name"]') as HTMLInputElement;
        const Price = document.querySelector('[name="price"]') as HTMLInputElement;
        const Price1 = document.querySelector('[name="stock"]') as HTMLInputElement;

        return [Name, Price, Price1];
    }

    useEffect(() => {
        let Data = getInputs();
        Data.forEach(input => {
            input?.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    handleAdd();
                }
            })
        })
    }, [])


    return (
        <span className="btn f-row btn-blue br-6 w-max mt-2 f-justify-self-end" onClick={handleAdd}>Add Product</span>
    )
}