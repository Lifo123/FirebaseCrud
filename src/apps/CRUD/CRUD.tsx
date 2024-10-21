import { db } from "@Services/firebase";
import { limitToLast, onValue, orderByChild, query, ref, remove } from "firebase/database";
import { useEffect, useState } from "react"
import { toast } from "sonner";

interface Product {
    name: string;
    price: number;
    stock: number;
    createAt: number;
}

export default function CRUDts() {
    //States
    const [Products, setProducts] = useState<any[]>([])

    //Functions
    const handleDelete = async (id: string) => {
        try {
            const productsRef = ref(db, `products/${id.replace('.', ',')}`);
            await remove(productsRef);
            toast.dismiss();
            toast.success('Product deleted successfully');
        } catch (e) {
            toast.dismiss();
            toast.error('Error deleting product');
        }
    }

    //Suscribe
    const subscribe = () => {
        const refProducts = ref(db, 'products');
        const queryProducts = query(refProducts, orderByChild('createAt'), limitToLast(10));

        return new Promise((resolve, reject) => {
            onValue(queryProducts, (snapshot) => {
                const products = snapshot.val() as Product[];
                if (products) {
                    const sortedProducts = Object.values(products).sort((a, b) => b.createAt - a.createAt);
                    setProducts(sortedProducts);
                    resolve(sortedProducts);
                } else {
                    reject("No se encontraron productos");
                }
            }, (error) => {
                reject(error);
            });
        });
    }

    useEffect(() => {
        subscribe();
    }, [])

    return (
        Products.length > 0 ? (
            <table className="excel-table br-10 o-hidden mx-auto mt-4 sd-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Products?.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product?.name}</td>
                                    <td>{product?.price}</td>
                                    <td>{product?.stock}</td>
                                    <td className="td-delete pointer" onClick={() => handleDelete(product?.name)}>Delete</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        ) : <p >Loading...</p>
    )
}