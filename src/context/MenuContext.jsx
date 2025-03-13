import axios from 'axios';
import React, { 
    createContext, 
    useContext,
    useEffect,
    useState,
} from 'react'
import { useAuth } from './AuthContext';

const MenuContext = createContext(null)

const Menu = ({children }) => {

    const {
        authUser
    } = useAuth()

    const [menuSearched, setMenuSearched] = useState();

    const [listCategory, setListCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Best Seller');
    const [tabCategory, setTabCategory] = useState([]);

    const [listRestaurant, setListRestaurant] = useState([]);
    const [tabRestaurant, setTabRestaurant] = useState([]);
    
    const [listMenu, setListMenu] = useState([]);
    const [listMenuGroupedRestaurant, setListMenuGroupedRestaurant] = useState([]);
    const [listMenuGroupedCategory, setListMenuGroupedCategory] = useState([]);

    const [modalAddMenu, setModalAddMenu] = useState(false);
    const [modalEditMenu, setModalEditMenu] = useState(false);
    
    const [detailMenu, setDetailMenu] = useState();

    const [isLoading, setIsLoading] = useState(false);
    const [resMessage, setResMessage] = useState();

    const getListCategory = () => {
        axios.get(`${import.meta.env.VITE_API_BE}/categories`)
        .then(res => {
            setListCategory(res.data.results)
            setTabCategory(res.data.results?.map(item => item.name))
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getListRestauran = () => {
        axios.get(`${import.meta.env.VITE_API_BE}/restaurants`)
        .then(res => {
            setListRestaurant(res.data.results)
            setTabRestaurant(res.data.results?.map(item => item.name))
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getListMenuGrouped = () => {
        axios.get(`${import.meta.env.VITE_API_BE}/main-menu`)
        .then(res => {
            setListMenu(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const groupedMenuRestaurant = (menu, restaurant, listResto) => {
        console.log(listResto, 'disni')
        const grouped = restaurant.reduce((acc, restaurant) => {
            acc[restaurant] = []; 
            return acc;
        }, {});
    
        menu.forEach(item => {
            const restaurant = item.restaurant_name || "Uncategorized"; 
            if (!grouped[restaurant]) {
                grouped[restaurant] = []; 
            }
            grouped[restaurant].push(item);
        });
    
        const groupedMenus = restaurant.map(restaurant => ({
            restaurant,
            restaurant_image: listResto.find(key => key.name === restaurant) ? listResto.find(key => key.name === restaurant).image : '',
            menu: grouped[restaurant] || [] 
        }));
    
        const additionalRestaurants = Object.keys(grouped)
            .filter(restaurant => !restaurant.includes(restaurant))
            .map(restaurant => ({
                restaurant,
                restaurant_image: listResto.find(key => key.name === restaurant) ? listResto.find(key => key.name === restaurant).image : '',
                menu: grouped[restaurant]
            }));
    
        setListMenuGroupedRestaurant([...groupedMenus, ...additionalRestaurants])
    }

    const groupedMenuCategory = (menu, category) => {
        const grouped = category.reduce((acc, category) => {
            acc[category] = []; 
            return acc;
        }, {});
    
        menu.forEach(item => {
            const category = item.category_name || "Uncategorized"; 
            if (!grouped[category]) {
                grouped[category] = []; 
            }
            grouped[category].push(item);
        });
    
        const groupedMenus = category.map(category => ({
            category,
            menu: grouped[category] || [] 
        }));
    
        const additionalCategories = Object.keys(grouped)
            .filter(category => !category.includes(category))
            .map(category => ({
                category,
                menu: grouped[category]
            }));
    
        setListMenuGroupedCategory([...groupedMenus, ...additionalCategories])
    }

    const handleAddMenu = (rules) => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append("category_name", rules.category_name);
        formData.append("restaurant_name", rules.restaurant_name);
        formData.append("name", rules.name);
        formData.append("description", rules.description);
        formData.append("price", rules.price);
        formData.append("created_by", authUser && authUser?.name);
        formData.append("image", rules.image);
        axios.post(`${import.meta.env.VITE_API_BE}/main-menu`, formData)
        .then(res => {
            setTimeout(() => {
                setIsLoading(false)
                setModalAddMenu(false)
                getListMenuGrouped()
            }, 1000)
            setTimeout(() => {
                setResMessage(['success', 'Successfully Added Product'])
            }, 2000)
        })
        .catch(err => {
            setIsLoading(false)
            setResMessage(['error', err.response?.data?.message || "Failed to Add Product!"])
        }) 
        .finally(() => {
            setResMessage()
        })
    }

    const getDetailMenu = (id) => {
        axios.get(`${import.meta.env.VITE_API_BE}/main-menu/${id}`)
        .then(res => {
            setDetailMenu(res.data.results)
        })
        .catch(err => {
            setResMessage(['error', err.response?.data?.message || "Failed Get Menu!"])
        }) 
    }

    const handleEditMenu = (rules) => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append("category_name", rules.category_name);
        formData.append("restaurant_name", rules.restaurant_name);
        formData.append("name", rules.name);
        formData.append("description", rules.description);
        formData.append("price", rules.price);
        formData.append("updated_by", authUser && authUser?.name);
        formData.append("image", rules.image?.originFileObj);
        axios.patch(`${import.meta.env.VITE_API_BE}/main-menu/${detailMenu.id}`, formData)
        .then(res => {
            setTimeout(() => {
                setIsLoading(false)
                setModalEditMenu(false)
                getListMenuGrouped()
            }, 1000)
            setTimeout(() => {
                setResMessage(['success', 'Successfully Edit Product'])
            }, 2000)
        })
        .catch(err => {
            setIsLoading(false)
            setResMessage(['error', err.response?.data?.message || "Failed to Add Product!"])
        }) 
        .finally(() => {
            setResMessage()
        })
    }

    const handleDeleteMenu = async (id) => {
        setIsLoading(true)
        await axios.delete(`${import.meta.env.VITE_API_BE}/main-menu/${id}`, { data: { deleted_by: authUser && authUser.name } })
        .then(res => {
            setTimeout(() => {
                setIsLoading(false)
                getListMenuGrouped()
            }, 1000)
            setTimeout(() => {
                setResMessage(['success', 'Successfully Deleted Product'])
            }, 2000)
        })
        .catch(err => {
            setIsLoading(false)
            setResMessage(['error', err.response?.data?.message || "Failed to Delete Product!"])
        }) 
        .finally(() => {
            setResMessage()
        })
    }

    useEffect(() => {
        getListCategory();
        getListMenuGrouped();
        getListRestauran()
    }, []);

    useEffect(() => {
        groupedMenuRestaurant(listMenu, tabRestaurant, listRestaurant)
    }, [listMenu, tabRestaurant, listRestaurant]);

    useEffect(() => {
        groupedMenuCategory(listMenu, tabCategory)
    }, [listMenu, tabCategory]);

    const state = {
        menuSearched, setMenuSearched,

        listCategory, setListCategory,
        selectedCategory, setSelectedCategory,
        tabCategory, setTabCategory,

        listRestaurant, setListRestaurant,
        tabRestaurant, setTabRestaurant,

        listMenu, setListMenu,
        listMenuGroupedRestaurant, setListMenuGroupedRestaurant,
        listMenuGroupedCategory, setListMenuGroupedCategory,

        modalAddMenu, setModalAddMenu,
        modalEditMenu, setModalEditMenu,
        
        detailMenu, setDetailMenu,

        isLoading, setIsLoading,
        resMessage, setResMessage,

        handleAddMenu,
        getDetailMenu,
        handleEditMenu,
        handleDeleteMenu,
    }

    return (
        <MenuContext.Provider value={state}>
            {children}
        </MenuContext.Provider>
    );
}

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (context === undefined) {
        throw new Error(`useMenu must be use within a Network Performance`)
    };
    return context;
};

export default Menu
