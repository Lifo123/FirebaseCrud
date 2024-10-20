import { UserStore } from "@Context/GlobalStore";
import { useStore } from "@nanostores/react";

export default function User() {
    //UserStore
    const userData = useStore(UserStore);

    const handleLogout = () => {
        localStorage.removeItem('F-User');
        window.location.href = '/FirebaseCrud/Login';
    }

    return (
        <div className="f-row g-2 f-center">
            <h3 className="fw-500">
                {userData.user}
            </h3>
            <span className="btn btn-red br-6 fs-1" onClick={handleLogout}>Log out</span>
        </div>
    )
}