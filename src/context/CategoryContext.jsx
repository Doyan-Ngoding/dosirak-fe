import axios from 'axios';
import React, { 
    createContext, 
    useContext,
    useEffect,
    useState,
} from 'react'

const CategoryContext = createContext(null)

const Category = ({children }) => {

    const [listCategory, setListCategory] = useState([]);

    const getListCategory = () => {
        axios.get(`${import.meta.env.VITE_API_BE}/categories`)
        .then(res => {
            setListCategory(res.data.results)
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getListCategory()
    }, []);

    const state = {
        listCategory, setListCategory,
    }

    return (
        <CategoryContext.Provider value={state}>
            {children}
        </CategoryContext.Provider>
    );
}

export const useCategory = () => {
    const context = useContext(CategoryContext);
    if (context === undefined) {
        throw new Error(`useCategory must be use within a Network Performance`)
    };
    return context;
};

export default Category
