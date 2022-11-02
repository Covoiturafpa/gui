import { useEffect, useState } from "react";
import { UsersTable } from "../component/UsersTable";
import  FetchService  from "../services/FetchService";
import { Loader } from "rsuite";

const UserManagement = () => {
    const [usersData, setUsersData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetch = FetchService.get("/users");
        fetch.then(
            (result) => {
                setUsersData(result);
                setIsLoaded(true);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        );
    }, []);

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div className=' h-full flex justify-center items-center'><Loader size="sm" content="Chargement..." /></div>;
    }else {
        return (<div className='container mx-auto px-4'>
            <h1 className="text-center">Gestion utilisateurs</h1>
            <div className='my-3'>
                <UsersTable users={usersData} />
            </div>
        </div>)
    }
}

export { UserManagement };