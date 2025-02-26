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

    const [listRestaurant, setListRestaurant] = useState([]);
    const [listNearRestaurant, setListNearRestaurant] = useState([]);
    const [selectedNearReastaurant, setSelectedNearReastaurant] = useState();
    const [detailRestaurant, setDetailRestaurant] = useState();
    
    const [modalAddRestaurant, setModalAddRestaurant] = useState(false);
    const [modalEditRestaurant, setModalEditRestaurant] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [resMessage, setResMessage] = useState();

    const getListRestauran = () => {
        axios.get(`${import.meta.env.VITE_API_BE}/restaurants`)
        .then(res => {
            setListNearRestaurant(res.data.results)
            setListRestaurant(res.data.results)
            setSelectedNearReastaurant(res.data.results?.[0].name)
        })
        .catch(err => {
            // setResMessage(['error', err.response?.data?.message || "Failed Get Restaurants!"])
            console.log(err)
        })
    }

    const getDetailRestaurant = (id) => {
        axios.get(`${import.meta.env.VITE_API_BE}/restaurants/${id}`)
        .then(res => {
            setDetailRestaurant(res.data.results)
        })
        .catch(err => {
            setResMessage(['error', err.response?.data?.message || "Failed Get Restaurant!"])
        }) 
    }

    const handleAddRestaurant = async (rules) => {
        setIsLoading(true)
        await axios.post(`${import.meta.env.VITE_API_BE}/restaurants`, rules)
        .then(res => {
            setTimeout(() => {
                setIsLoading(false)
                setModalAddRestaurant(false)
                getListRestauran()
            }, 1000)
            setTimeout(() => {
                setResMessage(['success', 'Successfully Added Restaurant'])
            }, 2000)
        })
        .catch(err => {
            setIsLoading(false)
            setResMessage(['error', err.response?.data?.message || "Failed to Add Category!"])
        }) 
        .finally(() => {
            setResMessage()
        })
    }

    const handleEditRestaurant = async (rules) => {
        setIsLoading(true)
        await axios.patch(`${import.meta.env.VITE_API_BE}/restaurants/${detailRestaurant.id}`, rules)
        .then(res => {
            setTimeout(() => {
                setIsLoading(false)
                setModalEditRestaurant(false)
                getListRestauran()
            }, 1000)
            setTimeout(() => {
                setResMessage(['success', 'Successfully Edited Restaurant'])
            }, 2000)
        })
        .catch(err => {
            setIsLoading(false)
            setResMessage(['error', err.response?.data?.message || "Failed to Edit Restaurant!"])
        }) 
        .finally(() => {
            setResMessage()
        })
    }

    const handleDeleteRestaurant = async (id) => {
        setIsLoading(true)
        await axios.delete(`${import.meta.env.VITE_API_BE}/restaurants/${id}`)
        .then(res => {
            setTimeout(() => {
                setIsLoading(false)
                getListRestauran()
            }, 1000)
            setTimeout(() => {
                setResMessage(['success', 'Successfully Deleted Restaurant'])
            }, 2000)
        })
        .catch(err => {
            setIsLoading(false)
            setResMessage(['error', err.response?.data?.message || "Failed to Delete Restaurant!"])
        }) 
        .finally(() => {
            setResMessage()
        })
    }

    useEffect(() => {
        getListRestauran();
    }, []);

    const state = {
        listRestaurant, setListRestaurant,
        listNearRestaurant, setListNearRestaurant,
        selectedNearReastaurant, setSelectedNearReastaurant,
        detailRestaurant, setDetailRestaurant,

        modalAddRestaurant, setModalAddRestaurant,
        modalEditRestaurant, setModalEditRestaurant,
        isLoading, setIsLoading,
        resMessage, setResMessage,

        handleAddRestaurant,
        getDetailRestaurant,
        handleEditRestaurant,
        handleDeleteRestaurant,
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
