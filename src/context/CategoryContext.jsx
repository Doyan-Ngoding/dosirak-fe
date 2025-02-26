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
    const [detailCategory, setDetailCategory] = useState();

    const [modalAddCategory, setModalAddCategory] = useState(false);
    const [modalEditCategory, setModalEditCategory] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [resMessage, setResMessage] = useState();

    const getListCategory = () => {
        axios.get(`${import.meta.env.VITE_API_BE}/categories`)
        .then(res => {
            setListCategory(res.data.results)
        })
        .catch(err => {
            setResMessage(['error', err.response?.data?.message || "Failed Get Category!"])
        }) 
    }

    const getDetailCategory = (id) => {
        axios.get(`${import.meta.env.VITE_API_BE}/categories/${id}`)
        .then(res => {
            setDetailCategory(res.data.results)
        })
        .catch(err => {
            setResMessage(['error', err.response?.data?.message || "Failed Get Category!"])
        }) 
    }

    const handleAddCategory = async (rules) => {
        setIsLoading(true)
        await axios.post(`${import.meta.env.VITE_API_BE}/categories`, rules)
        .then(res => {
            setTimeout(() => {
                setIsLoading(false)
                setModalAddCategory(false)
                getListCategory()
            }, 1000)
            setTimeout(() => {
                setResMessage(['success', 'Successfully Added Category'])
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

    const handleEditCategory = async (rules) => {
        setIsLoading(true)
        await axios.patch(`${import.meta.env.VITE_API_BE}/categories/${detailCategory.id}`, rules)
        .then(res => {
            setTimeout(() => {
                setIsLoading(false)
                setModalEditCategory(false)
                getListCategory()
            }, 1000)
            setTimeout(() => {
                setResMessage(['success', 'Successfully Edited Category'])
            }, 2000)
        })
        .catch(err => {
            setIsLoading(false)
            setResMessage(['error', err.response?.data?.message || "Failed to Edit Category!"])
        }) 
        .finally(() => {
            setResMessage()
        })
    }

    const handleDeleteCategory = async (id) => {
        setIsLoading(true)
        await axios.delete(`${import.meta.env.VITE_API_BE}/categories/${id}`)
        .then(res => {
            setTimeout(() => {
                setIsLoading(false)
                getListCategory()
            }, 1000)
            setTimeout(() => {
                setResMessage(['success', 'Successfully Deleted Category'])
            }, 2000)
        })
        .catch(err => {
            setIsLoading(false)
            setResMessage(['error', err.response?.data?.message || "Failed to Delete Category!"])
        }) 
        .finally(() => {
            setResMessage()
        })
    }

    useEffect(() => {
        getListCategory()
    }, []);

    const state = {
        listCategory, setListCategory,
        detailCategory, setDetailCategory,

        modalAddCategory, setModalAddCategory,
        modalEditCategory, setModalEditCategory,
        isLoading, setIsLoading,
        resMessage, setResMessage,

        handleAddCategory,
        getDetailCategory,
        handleEditCategory,
        handleDeleteCategory,
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
