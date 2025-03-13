import axios from 'axios';
import React, { 
    createContext, 
    useContext,
    useEffect,
    useState,
} from 'react'
import { useMediaQuery } from 'react-responsive'
import { useAuth } from './AuthContext';
import { useOrder } from './OrderContext';
import { useLocalStorage } from 'react-use';

const RestaurantContext = createContext(null)

const Restaurant = ({children }) => {

    const { authUser } = useAuth()

    const { selectedResto } = useOrder() || {};

    const [listRestaurant, setListRestaurant] = useState([]);
    const [listNearRestaurant, setListNearRestaurant] = useState([]);
    const [selectedNearReastaurant, setSelectedNearReastaurant] = useState();
    const [selectedRestaurant, setSelectedRestaurant] = useState();
    const [detailRestaurant, setDetailRestaurant] = useState();
    
    const [modalAddRestaurant, setModalAddRestaurant] = useState(false);
    const [modalEditRestaurant, setModalEditRestaurant] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [resMessage, setResMessage] = useState();

    const [listSubRestaurant, setListSubRestaurant] = useState([]);
    const [selectedSubRestaurant, setSelectedSubRestaurant] = useState("");
    const [subRestoAddress, setSubRestoAddress] = useLocalStorage("subRestoAddress");

    const getListRestauran = () => {
        axios.get(`${import.meta.env.VITE_API_BE}/restaurants`)
        .then(res => {
            setListNearRestaurant(res.data.results)
            setListRestaurant(res.data.results)
            setSelectedRestaurant(res.data.results.length > 0 && res.data.results?.[0].name)
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
        const formData = new FormData();
        formData.append("name", rules.name);
        formData.append("image", rules.image);
        formData.append("created_by", authUser && authUser.name);
        await axios.post(`${import.meta.env.VITE_API_BE}/restaurants`, formData)
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
        const formData = new FormData();
        formData.append("name", rules.name);
        formData.append("image", rules.image?.originFileObj);
        formData.append("updated_by", authUser && authUser.name);
        await axios.patch(`${import.meta.env.VITE_API_BE}/restaurants/${detailRestaurant.id}`, formData)
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
        await axios.delete(`${import.meta.env.VITE_API_BE}/restaurants/${id}`, { data: { deleted_by: authUser && authUser.name } })
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

    const getListSubRestaurant = () => {
        axios.get(`${import.meta.env.VITE_API_BE}/sub-restaurants?restaurant_name=${selectedResto ? selectedResto : ""}`)
        .then(res => {
            setListSubRestaurant(res.data.results)
            setSelectedSubRestaurant(res.data.results.length > 0 && res.data.results?.[0].id)
            setSubRestoAddress(res.data.results.length > 0 && (
                {
                    coordinates: {
                        lat: res.data.results?.[0].latitude,
                        lng: res.data.results?.[0].longitude
                    },
                    address: res.data.results?.[0].address
                }
            ))
        })
        .catch(err => {
            // setResMessage(['error', err.response?.data?.message || "Failed Get Restaurants!"])
            console.log(err)
        })
    }

    const getDetailSubRestaurant = (id) => {
        axios.get(`${import.meta.env.VITE_API_BE}/sub-restaurants/${id}`)
        .then(res => {
            setDetailRestaurant(res.data.results)
            setSubRestoAddress(
                {
                    coordinates: {
                        lat: res.data.results?.latitude,
                        lng: res.data.results?.longitude
                    },
                    address: res.data.results?.address
                }
            )
        })
        .catch(err => {
            setResMessage(['error', err.response?.data?.message || "Failed Get Restaurant!"])
        }) 
    }

    useEffect(() => {
        getListRestauran();
        getListSubRestaurant();
    }, []);

    useEffect(() => {
        getListSubRestaurant()
    }, [selectedResto]);

    const state = {
        listRestaurant, setListRestaurant,
        listNearRestaurant, setListNearRestaurant,
        selectedNearReastaurant, setSelectedNearReastaurant,
        selectedRestaurant, setSelectedRestaurant,
        detailRestaurant, setDetailRestaurant,

        modalAddRestaurant, setModalAddRestaurant,
        modalEditRestaurant, setModalEditRestaurant,
        isLoading, setIsLoading,
        resMessage, setResMessage,

        handleAddRestaurant,
        getDetailRestaurant,
        handleEditRestaurant,
        handleDeleteRestaurant,

        listSubRestaurant, setListSubRestaurant,
        selectedSubRestaurant, setSelectedSubRestaurant,
        subRestoAddress, setSubRestoAddress,
        getDetailSubRestaurant,
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
