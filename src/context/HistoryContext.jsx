import axios from 'axios';
import React, { 
    createContext, 
    useContext,
    useEffect,
    useState,
} from 'react'
import { useAuth } from './AuthContext';

const HistoryContext = createContext(null)

const History = ({children }) => {

    const { authUser } = useAuth()

    const [listHistoryOrder, setListHistoryOrder] = useState([]);

    const getListOrderSuccess = () => {
        axios.get(`${import.meta.env.VITE_API_BE}/orders-success-user?user_id=${authUser ? authUser.id : ''}`)
        .then(res => {
            setListHistoryOrder(res.data.orders)
        })
        .catch(err => {
            console.log(err.message);
        }) 
    }

    useEffect(() => {
        getListOrderSuccess()
    }, [authUser]);
    
    const state = {
        listHistoryOrder, setListHistoryOrder,
    }

    return (
        <HistoryContext.Provider value={state}>
            {children}
        </HistoryContext.Provider>
    );
}

export const useHistory = () => {
    const context = useContext(HistoryContext);
    if (context === undefined) {
        throw new Error(`useHistory must be use within a Network Performance`)
    };
    return context;
};

export default History
