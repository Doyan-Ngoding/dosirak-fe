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

    const state = {
        listNearRestaurant, setListNearRestaurant,
        selectedNearReastaurant, setSelectedNearReastaurant,
        menuSearched, setMenuSearched,

        selectedMenu, setSelectedMenu,
        subTotal, setSubTotal,
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
