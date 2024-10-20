
import { useEffect, useState } from "react"
import { ref, get, set } from "firebase/database";
import { db } from "@Services/firebase";
import { toast } from "sonner";

interface User {
    user: string;
    password: string;
    salt: string;
    createAt: number;
}

export default function Count() {
    //States
    const [Users, setUsers] = useState<any[]>([])

    //Functions
    const getUsers = async () => {
        const refUsers = ref(db, 'users');
        const usersSnapshot = await get(refUsers);
        if (usersSnapshot.val()) {
            const usersArray = Object.values(usersSnapshot.val()) as User[];
            const sortedUsers = usersArray.sort((a, b) => a.createAt - b.createAt);
            setUsers(sortedUsers);
        }
    }

    //Effects
    useEffect(() => {
        toast.promise(getUsers(), {
            loading: 'Loading Data...',
            error: 'Error Loading Data',
            duration: 1000
        })

    }, [])

    return (
        <>
            {
                Users?.length > 0 ? (
                    <table className="excel-table br-10 o-hidden mx-auto mt-5 sd-3">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th className="table-pass o-hidden">Password</th>
                                <th>Salt</th>
                                <th>Create time</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Users?.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{user?.user}</td>
                                            <td className="table-pass o-hidden">{user?.password}</td>
                                            <td>{user?.salt}</td>
                                            <td>{user?.createAt}</td>
                                            <td>Edit</td>
                                            <td>Delete</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                ) : null
            }
        </>
    )
}