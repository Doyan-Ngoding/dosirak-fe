import axios from 'axios';
import dayjs from 'dayjs';
import React, { 
    createContext, 
    useContext,
    useEffect,
    useState,
} from 'react'

const SummaryContext = createContext(null)

const Summary = ({children }) => {

    const [listOrderSuccess, setListOrderSuccess] = useState([]);
    const [listMonth, setListMonth] = useState([]);
    const [selectedMonthOrder, setSelectedMonthOrder] = useState(dayjs().format("YYMM"));
    const [listAllOrder, setListAllOrder] = useState([]);

    const [totalUser, setTotalUser] = useState(0)
    const [totalOrder, setTotalOrder] = useState(0)
    const [totalRevenue, setTotalRevenue] = useState();

    const getListOrderSuccess = (date) => {
        axios.get(`${import.meta.env.VITE_API_BE}/orders-success?year_month=${date}`)
        .then(res => {
            setListOrderSuccess(res.data.orders)
        })
        .catch(err => {
            console.log(err.message);
        }) 
    }

    const generateMonthList = () => {
        const currentYear = new Date().getFullYear();
        const months = [];
    
        for (let i = 0; i < 12; i++) {
            const month = (i + 1).toString().padStart(2, '0'); 
            const value = `${currentYear.toString().slice(-2)}${month}`;
    
            months.push({
                label: new Date(currentYear, i).toLocaleString('en-US', { month: 'long' }),
                value: value
            });
        }

        setListMonth(months)
    };

    const getTotalUser = () => {
        axios.get(`${import.meta.env.VITE_API_BE}/users/total-users`)
        .then(res => {
            setTotalUser(res.data.Users)
        })
        .catch(err => {
            console.log(err.message);
        }) 
    }

    const getTotaRevenue = () => {
        axios.get(`${import.meta.env.VITE_API_BE}/orders-pendapatan`)
        .then(res => {
            setTotalRevenue(res.data.total_pendapatan)
        })
        .catch(err => {
            console.log(err.message);
        }) 
    }

    const getTotalOrder = () => {
        axios.get(`${import.meta.env.VITE_API_BE}/orders-success?year_month=all`)
        .then(res => {
            setTotalOrder(res.data.orders.length)
            setListAllOrder(res.data.orders);
        })
        .catch(err => {
            console.log(err.message);
        }) 
    }

    useEffect(() => {
        generateMonthList();
        getTotalUser();
        getTotalOrder();
        getTotaRevenue();
    }, []);

    useEffect(() => {
        getListOrderSuccess(selectedMonthOrder);
    }, [selectedMonthOrder]);

    const state = {
        listOrderSuccess, setListOrderSuccess,
        listMonth, setListMonth,
        selectedMonthOrder, setSelectedMonthOrder,
        listAllOrder, setListAllOrder,

        totalUser, setTotalUser,
        totalOrder, setTotalOrder,
        totalRevenue, setTotalRevenue,
    }

    return (
        <SummaryContext.Provider value={state}>
            {children}
        </SummaryContext.Provider>
    );
}

export const useSummary = () => {
    const context = useContext(SummaryContext);
    if (context === undefined) {
        throw new Error(`useSummary must be use within a Network Performance`)
    };
    return context;
};

export default Summary
