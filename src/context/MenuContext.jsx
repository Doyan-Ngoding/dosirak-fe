import React, { 
    createContext, 
    useContext,
    useState,
} from 'react'

const exMenu = [
    {
        id: 1,
        image: '@/assets/menu/gyoza.jpg',
        name: 'Ddeok Bokki (Spicy Rice Cake)',
        desc: 'Korean rice pancake with vegetables, egg, and fish cooked in traditional way sjldkajldjal kdjaljdakld salkdjalkd ksdak',
        price: 840000,
        stock: 19,
        restaurant: 'Paik Noodles',
    },
    {
        id: 2,
        image: '/assets/menu/gyoza.jpg',
        name: 'Ddeok Bokki (Spicy Rice Cake)',
        desc: 'Korean rice pancake with vegetables, egg, and fish cooked in traditional way sjldkajldjal kdjaljdakld salkdjalkd ksdak',
        price: 840000,
        stock: 19,
        restaurant: 'Paik Noodles',
    },
    {
        id: 3,
        image: '@/assets/menu/gyoza.jpg',
        name: 'Ddeok Bokki (Spicy Rice Cake)',
        desc: 'Korean rice pancake with vegetables, egg, and fish cooked in traditional way sjldkajldjal kdjaljdakld salkdjalkd ksdak',
        price: 840000,
        stock: 19,
        restaurant: 'Paik Noodles',
    },
    {
        id: 4,
        image: '@/assets/menu/gyoza.jpg',
        name: 'Ddeok Bokki (Spicy Rice Cake)',
        desc: 'Korean rice pancake with vegetables, egg, and fish cooked in traditional way sjldkajldjal kdjaljdakld salkdjalkd ksdak',
        price: 840000,
        stock: 19,
        restaurant: 'Paik Noodles',
    },
    {
        id: 5,
        image: '@/assets/menu/gyoza.jpg',
        name: 'Ddeok Bokki (Spicy Rice Cake)',
        desc: 'Korean rice pancake with vegetables, egg, and fish cooked in traditional way sjldkajldjal kdjaljdakld salkdjalkd ksdak',
        price: 840000,
        stock: 19,
        restaurant: 'Paik Noodles',
    },
    {
        id: 6,
        image: '@/assets/menu/gyoza.jpg',
        name: 'Ddeok Bokki (Spicy Rice Cake)',
        desc: 'Korean rice pancake with vegetables, egg, and fish cooked in traditional way sjldkajldjal kdjaljdakld salkdjalkd ksdak',
        price: 840000,
        stock: 19,
        restaurant: 'Paik Noodles',
    },
    {
        id: 7,
        image: '@/assets/menu/gyoza.jpg',
        name: 'Ddeok Bokki (Spicy Rice Cake)',
        desc: 'Korean rice pancake with vegetables, egg, and fish cooked in traditional way sjldkajldjal kdjaljdakld salkdjalkd ksdak',
        price: 840000,
        stock: 19,
        restaurant: 'Paik Noodles',
    },
];

const MenuContext = createContext(null)

const Menu = ({children }) => {

    const [menuSearched, setMenuSearched] = useState();

    const [listCategory, setListCategory] = useState([
        'Best Seller',
        'Rice Sets',
        'Bento Boxes',
        'Vegetarian',
        'Desserts',
        'Beverages',
    ]);
    const [selectedCategory, setSelectedCategory] = useState('Best Seller');

    const [listMenu, setListMenu] = useState([
        {
            key: '1',
            category: 'Best Seller', 
            menu: exMenu
        },
    ]);

    const state = {
        menuSearched, setMenuSearched,

        listCategory, setListCategory,
        selectedCategory, setSelectedCategory,

        listMenu, setListMenu,
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
