import React, { 
    createContext, 
    useContext,
    useState,
} from 'react'

const OrderContext = createContext(null)

const Order = ({children }) => {

    const [listNearRestaurant, setListNearRestaurant] = useState([
        'Xin Xin Corn Dog',
        'Smile Kimbab',
        "Paik's Noodle",
        'Beom Chicken',
        'Hongkong Banjum,'
    ]);
    const [selectedNearReastaurant, setSelectedNearReastaurant] = useState();
    const [menuSearched, setMenuSearched] = useState();

    const [selectedMenu, setSelectedMenu] = useState(JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : []);
    const [subTotal, setSubTotal] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [packingFee, setPackingFee] = useState(0);
    const [promo, setPromo] = useState(0);
    const [total, setTotal] = useState(0);

    const [currStep, setCurrStep] = useState(0);

    const [orderMethod, setOrderMethod] = useState("IMMEDIATELY");
    const [editAbleAddress, setEditAbleAddress] = useState(false);
    const [addressUser, setAddressUser] = useState("Jl. Merdeka Barat 88 ");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState();

    const state = {
        listNearRestaurant, setListNearRestaurant,
        selectedNearReastaurant, setSelectedNearReastaurant,
        menuSearched, setMenuSearched,

        selectedMenu, setSelectedMenu,
        subTotal, setSubTotal,
        deliveryFee, setDeliveryFee,
        packingFee, setPackingFee,
        promo, setPromo,
        total, setTotal,

        currStep, setCurrStep,

        orderMethod, setOrderMethod,

        editAbleAddress, setEditAbleAddress,
        addressUser, setAddressUser,

        showDatePicker, setShowDatePicker,
        selectedDate, setSelectedDate,
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
