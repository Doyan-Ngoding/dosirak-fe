import axios from 'axios';
import React, { 
    createContext, 
    useContext,
    useEffect,
    useState,
} from 'react'
import { useMediaQuery } from 'react-responsive'

const RestaurantContext = createContext(null)

const Restaurant = ({children }) => {

    const [listNearRestaurant, setListNearRestaurant] = useState([]);
    const [selectedNearReastaurant, setSelectedNearReastaurant] = useState();

    const getListRestauran = () => {
        axios.get(`${import.meta.env.VITE_API_BE}/restaurants`)
        .then(res => {
            setListNearRestaurant(res.data.results)
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    useEffect(() => {
        getListRestauran();
    }, []);

    const state = {
        listNearRestaurant, setListNearRestaurant,
        selectedNearReastaurant, setSelectedNearReastaurant,
    }   

    return (
        <RestaurantContext.Provider value={state}>
            {children}
        </RestaurantContext.Provider>
    );
}

export const useRestaurant = () => {
    const context = useContext(RestaurantContext);
    if (context === undefined) {
        throw new Error(`useRestaurant must be use within a Network Performance`)
    };
    return context;
};

export default Restaurant
