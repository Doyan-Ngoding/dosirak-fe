import axios from 'axios';
import React, { 
    createContext, 
    useContext,
    useEffect,
    useState,
} from 'react'

const UserContext = createContext(null)

const User = ({children }) => {

    const [listUser, setListUser] = useState([]);
    const [detailUser, setDetailUser] = useState();
        
    const [modalAddUser, setModalAddUser] = useState(false);
    const [modalEditUser, setModalEditUser] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [resMessage, setResMessage] = useState();

    const getListUser = () => {
        axios.get(`${import.meta.env.VITE_API_BE}/users`)
        .then(res => {
            setListUser(res.data.results)
        })
        .catch(err => {
            setResMessage(['error', err.response?.data?.message || "Failed Get Users!"])
        })
    }

    const getDetailUser = (id) => {
        axios.get(`${import.meta.env.VITE_API_BE}/users/${id}`)
        .then(res => {
            setDetailUser(res.data.results)
        })
        .catch(err => {
            setResMessage(['error', err.response?.data?.message || "Failed Get User!"])
        }) 
    }

    const handleAddUser = async (rules) => {
        setIsLoading(true)
        await axios.post(`${import.meta.env.VITE_API_BE}/register/users`, rules, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, 
            }
        })
        .then(res => {
            setTimeout(() => {
                setIsLoading(false)
                setModalAddUser(false)
                getListUser()
            }, 1000)
            setTimeout(() => {
                setResMessage(['success', 'Successfully Added User'])
            }, 2000)
        })
        .catch(err => {
            setIsLoading(false)
            setResMessage(['error', err.response?.data?.message || "Failed to Add User!"])
        }) 
        .finally(() => {
            setResMessage()
        })
    }

    const handleEditUser = async (rules) => {
        setIsLoading(true)
        await axios.patch(`${import.meta.env.VITE_API_BE}/users/${detailUser.id}`, rules, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, 
            }
        })
        .then(res => {
            setTimeout(() => {
                setIsLoading(false)
                setModalEditUser(false)
                getListUser()
            }, 1000)
            setTimeout(() => {
                setResMessage(['success', 'Successfully Edited User'])
            }, 2000)
        })
        .catch(err => {
            setIsLoading(false)
            setResMessage(['error', err.response?.data?.message || "Failed to Edit User!"])
        }) 
        .finally(() => {
            setResMessage()
        })
    }

    const handleDeleteUser = async (id) => {
        setIsLoading(true)
        await axios.delete(`${import.meta.env.VITE_API_BE}/users/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`, 
            }
        })
        .then(res => {
            setTimeout(() => {
                setIsLoading(false)
                getListUser()
            }, 1000)
            setTimeout(() => {
                setResMessage(['success', 'Successfully Deleted User'])
            }, 2000)
        })
        .catch(err => {
            setIsLoading(false)
            setResMessage(['error', err.response?.data?.message || "Failed to Delete User!"])
        }) 
        .finally(() => {
            setResMessage()
        })
    }

    useEffect(() => {
        getListUser()
    }, []);

    const state = {
        listUser, setListUser,
        detailUser, setDetailUser,

        modalAddUser, setModalAddUser,
        modalEditUser, setModalEditUser,
        isLoading, setIsLoading,
        resMessage, setResMessage,

        handleAddUser,
        getDetailUser,
        handleEditUser,
        handleDeleteUser,
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
