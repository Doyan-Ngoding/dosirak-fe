import axios from 'axios';
import React, { 
    createContext, 
    useContext,
    useEffect,
    useState,
} from 'react'

const MenuContext = createContext(null)

const Menu = ({children }) => {

    const [menuSearched, setMenuSearched] = useState();

    const [listCategory, setListCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Best Seller');
    const [tabCategory, setTabCategory] = useState([]);

    const [listMenu, setListMenu] = useState([]);
    const [listMenuGrouped, setListMenuGrouped] = useState([]);

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

    const getListMenuGrouped = () => {
        axios.get(`${import.meta.env.VITE_API_BE}/main-menu`)
        .then(res => {
            setListMenu(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const groupedMenu = (menu, category) => {
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
    
        setListMenuGrouped([...groupedMenus, ...additionalCategories])
    }

    useEffect(() => {
        getListCategory();
        getListMenuGrouped();
    }, []);

    useEffect(() => {
        groupedMenu(listMenu, tabCategory)
    }, [listMenu, tabCategory]);

    const state = {
        menuSearched, setMenuSearched,

        listCategory, setListCategory,
        selectedCategory, setSelectedCategory,
        tabCategory, setTabCategory,

        listMenu, setListMenu,
        listMenuGrouped, setListMenuGrouped,
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
