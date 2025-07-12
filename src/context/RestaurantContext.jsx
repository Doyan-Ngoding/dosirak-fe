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

    const { selectedResto, addressUserCurr } = useOrder() || {};

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
    const [currSelectedResto, setCurrSelectedResto] = useLocalStorage("currSelectedResto");

    const [newListSubRestaurant, setNewListSubRestaurant] = useState([]);

    const [listRestaurantAdmin, setListRestaurantAdmin] = useState([]);

    const getListRestauran = () => {
        axios.get(`${import.meta.env.VITE_API_BE}/restaurants`)
        .then(res => {
            setListNearRestaurant(res.data.results)
            setListRestaurant(res.data.results)
            setSelectedRestaurant((res.data.results && res.data.results.length > 0) && res.data.results?.[0].name)
        })
        .catch(err => {
            // setResMessage(['error', err.response?.data?.message || "Failed Get Restaurants!"])
            console.log(err)
        })
    }

    const getListRestauranAdmin = () => {
        axios.get(`${import.meta.env.VITE_API_BE}/restaurants/admin`)
        .then(res => {
            setListRestaurantAdmin(res.data.results)
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
                getListRestauranAdmin()
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
                getListRestauranAdmin()
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
                getListRestauranAdmin()
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
            setSelectedSubRestaurant((res.data.results && res.data.results.length > 0) && res.data.results?.[0].id)
            // setSubRestoAddress((res.data.results && res.data.results.length > 0) && (
            //     {
            //         coordinates: {
            //             lat: res.data.results?.[0].latitude,
            //             lng: res.data.results?.[0].longitude
            //         },
            //         address: res.data.results?.[0].address,
            //         id: res.data.results?.[0].id
            //     }
            // ))
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
                    address: res.data.results?.address,
                    id: res.data.results?.id
                }
            )
        })
        .catch(err => {
            setResMessage(['error', err.response?.data?.message || "Failed Get Restaurant!"])
        }) 
    }

    const getListSubRestaurants = () => {
        axios.get(`${import.meta.env.VITE_API_BE}/sub-restaurants?restaurant_name=`)
        .then(res => {
            setNewListSubRestaurant(res.data.results)
        })
        .catch(err => {
            // setResMessage(['error', err.response?.data?.message || "Failed Get Restaurants!"])
            console.log(err)
        })
    }

    const handleEditHide = async (id, rules) => {
        setIsLoading(true)
        await axios.patch(`${import.meta.env.VITE_API_BE}/restaurants/hide/${id}`, {...rules, updated_by: authUser && authUser.name})
        .then(res => {
            setTimeout(() => {
                setIsLoading(false)
                getListRestauranAdmin()
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

    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    useEffect(() => {
        if (addressUserCurr) {
            const userLat = addressUserCurr.coordinates.lat;  
            const userLon = addressUserCurr.coordinates.lng; 
            let nearestResto = null;
            let minDistance = Infinity;

            listSubRestaurant.forEach(resto => {
            const distance = getDistanceFromLatLonInKm(userLat, userLon, resto.latitude, resto.longitude);
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestResto = resto;
                }
            });

            if (nearestResto) {
                setSelectedSubRestaurant(nearestResto && nearestResto?.id)
                setSubRestoAddress(nearestResto && {
                    coordinates: {
                        lat: nearestResto?.latitude,
                        lng: nearestResto?.longitude
                    },
                    address: nearestResto?.address,
                    id: nearestResto?.id
                })
            }
        }
    }, [addressUserCurr, selectedResto]);

    useEffect(() => {
        getListRestauran();
        getListSubRestaurant();
        getListSubRestaurants()
        getListRestauranAdmin()
    }, []);

    useEffect(() => {
        getListSubRestaurant();
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

        newListSubRestaurant, setNewListSubRestaurant,

        handleEditHide,
        listRestaurantAdmin, setListRestaurantAdmin,

        currSelectedResto, setCurrSelectedResto,
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
