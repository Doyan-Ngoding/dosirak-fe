import axios from 'axios';
import dayjs from 'dayjs';
import React, { 
    createContext, 
    useContext,
    useState,
} from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';
import { useAuth } from './AuthContext';

const OrderContext = createContext(null)

const Order = ({children }) => {

    const { authUser } = useAuth()

    const navigate = useNavigate()

    const [menuSearched, setMenuSearched] = useState();

    const [cart, setCart] = useLocalStorage("cart");
    const [selectedMenu, setSelectedMenu] = useState(cart ? cart : []);
    const [subTotal, setSubTotal] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [packingFee, setPackingFee] = useState(0);
    const [promo, setPromo] = useState(0);
    const [total, setTotal] = useState(0);
    const [formatAmount, setFormatAmount] = useLocalStorage("formatAmount");

    const [currStep, setCurrStep] = useState(1);

    const [orderMethod, setOrderMethod] = useState("IMMEDIATELY");
    const [editAbleAddress, setEditAbleAddress] = useState(false);
    const [addressUser, setAddressUser] = useState();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useLocalStorage("selectedDate");
    const [selectedTempDate, setSelectedTempDate] = useState();
    const [selectedTempTime, setSelectedTempTime] = useState();

    const [isLoading, setIsLoading] = useState(false);
    const [resMessageOrder, setResMessageOrder] = useState();

    const [orderTemp, setOrderTemp] = useLocalStorage("orderTemp");

    const [selectedPayment, setSelectedPayment] = useState(null);
    const [activeKey, setActiveKey] = useState(0);

    const [resPayment, setResPayment] = useLocalStorage("resPayment");
    const [linkPayment, setLinkPayment] = useLocalStorage("linkPayment");
    const [newResPayment, setNewResPayment] = useLocalStorage("newResPayment");
    const [resCallback, setResCallback] = useLocalStorage("resCallback");

    const addQty = (id) => {
        setSelectedMenu((prevCart) => 
            prevCart.map((item) => 
                item.id === id
                    ? { ...item, qty: item.qty + 1, subTotal: (item.qty + 1) * item.price }
                    : item
            )
        );
    };

    const subQty = (id) => {
        setSelectedMenu((prevCart) => {
            const updatedCart = prevCart.map((item) =>
                item.id === id
                    ? { ...item, qty: item.qty - 1, subTotal: (item.qty - 1) * item.price }
                    : item
            ).filter((item) => item.qty > 0); 
            return updatedCart;
        });
    };

    const handleAddOrder = async () => {
        setIsLoading(true)
        await axios.post(`${import.meta.env.VITE_API_BE}/orders`, {
            user_id: authUser.id,
            detail_menus: selectedMenu || cart,
            pre_order: dayjs(selectedDate).format('YYYY-MM-DD HH:mm:ss'),
            amount: total
        })
        .then(res => {
            setOrderTemp(res.data.order)
            console.log(res.data.order);
            
            axios.post(`${import.meta.env.VITE_API_BE}/create-payment`, {
                customer_details: {
                    id: authUser.id,
                    name: authUser.name
                },
                item_details: res.data.order?.detailMenus.map(item => ({
                    description: item.name,
                    quantity: item.qty, 
                    price: item.price,
                })),
                amount: formatAmount,
                payment_type: "payment_link",
                due_days: 1,
                notes: 'tesnote',
                orders_id: res.data.order?.id
            })
            .then(response => {
                setIsLoading(false)
                setResPayment(response.data.data)
                setLinkPayment(response.data?.data.payment_link_url)
                setTimeout(() => {
                    setSelectedMenu()
                    setSelectedDate()
                    setSubTotal()
                    setTotal()
                    setPromo()
                    localStorage.removeItem("cart")
                    localStorage.removeItem("orderTemp")
                    localStorage.removeItem("formatAmount")
                    localStorage.removeItem("selectedDate")
                    navigate('/payment')
                    localStorage.removeItem("formatAmount")
                }, 2000)
            })
            .catch(error => {
                setIsLoading(false)
                setResMessageOrder(['error', error.response?.data?.message || "Failed to Make a Order!"])
            }) 
        })
        .catch(err => {
            setIsLoading(false)
            setResMessageOrder(['error', err.response?.data?.message || "Failed to Make a Order!"])
        }) 
    }

    const handleAddPayment = async () => {
        setIsLoading(true)
        await axios.post(`${import.meta.env.VITE_API_BE}/create-payment`, {
            customer_details: {
                id: authUser.id,
                name: authUser.name
            },
            item_details: orderTemp.detailMenus.map(item => ({
                description: item.name,
                quantity: item.qty, 
                price: item.price,
                item_id: item.id
            })),
            amount: formatAmount,
            payment_type: "payment_link",
            due_days: 1,
            notes: 'tesnote',
        })
        .then(res => {
            setIsLoading(false)
            setResPayment(res.data)
            setTimeout(() => {
                setSelectedMenu()
                setSelectedDate()
                setSubTotal()
                setTotal()
                setPromo()
                localStorage.removeItem("cart")
                localStorage.removeItem("orderTemp")
                localStorage.removeItem("formatAmount")
                navigate('/complete')
                localStorage.removeItem("formatAmount")
            }, 2000)
        })
        .catch(err => {
            setIsLoading(false)
            setResMessageOrder(['error', err.response?.data?.message || "Failed to Make a Order!"])
        }) 
    }

    const handleGetInvoice = async (id) => {
        setIsLoading(true)
        await axios.get(`${import.meta.env.VITE_API_BE}/invoices/${id}`)
        .then(res => {
            setIsLoading(false)
            setNewResPayment(res.data.data)
            axios.post(`${import.meta.env.VITE_URL_BE}/callback`, {
                order_id: res.data.data?.order_id,
                transaction_status: res.data.data?.status,
                fraud_status: "accept"
            })
            .then(res => {
                setIsLoading(false)
                setResCallback(res.data.success);
            })
            .catch(err => {
                setIsLoading(false)
                setResMessageOrder(['error', err.response?.data?.message || "Failed to callback!"])
            }) 
        })
        .catch(err => {
            setIsLoading(false)
            setResMessageOrder(['error', err.response?.data?.message || "Failed to get a Invoice!"])
        }) 
    }

    const state = {
        menuSearched, setMenuSearched,

        cart, setCart,
        selectedMenu, setSelectedMenu,
        subTotal, setSubTotal,
        deliveryFee, setDeliveryFee,
        packingFee, setPackingFee,
        promo, setPromo,
        total, setTotal,
        formatAmount, setFormatAmount,

        currStep, setCurrStep,

        orderMethod, setOrderMethod,

        editAbleAddress, setEditAbleAddress,
        addressUser, setAddressUser,

        showDatePicker, setShowDatePicker,
        selectedDate, setSelectedDate,
        selectedTempDate, setSelectedTempDate,
        selectedTempTime, setSelectedTempTime,

        addQty, subQty,

        isLoading, setIsLoading,
        resMessageOrder, setResMessageOrder,
        handleAddOrder,

        orderTemp, setOrderTemp,

        selectedPayment, setSelectedPayment,
        activeKey, setActiveKey,

        resPayment, setResPayment,
        linkPayment, setLinkPayment,
        newResPayment, setNewResPayment,
        resCallback, setResCallback,

        handleAddPayment,
        handleGetInvoice,
    }

    return (
        <OrderContext.Provider value={state}>
            {children}
        </OrderContext.Provider>
    );
}

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error(`useOrder must be use within a Network Performance`)
    };
    return context;
};

export default Order
