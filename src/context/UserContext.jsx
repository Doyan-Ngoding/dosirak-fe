import React, { 
    createContext, 
    useContext,
    useEffect,
    useState,
} from 'react'
import { useMediaQuery } from 'react-responsive'

const UserContext = createContext(null)

const User = ({children }) => {

    const [listUser, setListUser] = useState([]);

    const getListUser = () => {
        axios.get(`${import.meta.env.VITE_API_BE}/main-menu`)
        .then(res => {
            setListUser(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getListUser()
    }, []);

    const state = {
        listUser, setListUser,
    }

    return (
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error(`useUser must be use within a Network Performance`)
    };
    return context;
};

export default User
