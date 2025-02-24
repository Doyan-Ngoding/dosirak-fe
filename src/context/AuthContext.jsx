import axios from 'axios'
import React, { 
    createContext, 
    useContext,
    useEffect,
    useState,
} from 'react'
import { useMediaQuery } from 'react-responsive'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLocalStorage } from "react-use"

const AuthContext = createContext(null)

const Auth = ({children }) => {

    const navigate = useNavigate()
    const location = useLocation()
    const pathname = location.pathname
    
    const isStandard = useMediaQuery({ minWidth: 1024 })
    const isMobile = useMediaQuery({ maxWidth: 767 })
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 })

    const setSize = (standard, tablet, mobile) => {
        return isStandard ? standard : ( isTablet ? tablet : mobile )   
    }

    const routes = {
        1: '/',
        2: '/menu',
        3: '/order',
        4: '/contact',
        5: '/cms',
        6: '/cms/login',
        7: '/cms/product',
        8: '/cms/user',
        9: '/cms/category',
        10: '/cms/restaurant',
    }

    const allowAdmin = ['/cms', '/cms/product', '/cms/user', '/cms/category', '/cms/restaurant'] 
    const allowUser = ['/order-summary', '/payment-method', '/complete']
    const allowGeneral = ['/', '/menu', '/order']

    const [modalLogin, setModalLogin] = useState(false);
    const [modalSignup, setModalSignup] = useState(false);
    const [modalOtp, setModalOtp] = useState(false);
    const [modalForgot, setModalForgot] = useState(false);
    const [modalReset, setModalReset] = useState(false);

    const [token, setToken, removeToken] = useLocalStorage("token", null);
    const [authUser, setAuthUser] = useState();

    const [isLoding, setIsLoding] = useState(false);

    const getUserAuth = async (token) => {
        await axios.get(`${import.meta.env.VITE_API_BE}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(res => {
            setAuthUser(res.data.user)
        })
        .catch(err => {
            console.log(err)
        })   
    }

    const handleLogin = async (rule) => {
        setIsLoding(true);
        await axios.post(`${import.meta.env.VITE_API_BE}/login`, rule)
        .then(res => {
            const token = res.data.results.token;
            setToken(token);
            getUserAuth(token);
            setIsLoding(false);
            if (authUser) {
                if (pathname === '/cms/login') {
                    if (authUser?.role === 'superadmin') {
                        navigate('/cms');
                    } else {
                        navigate('/cms/login')
                    }
                } else if (pathname === '/order') {
                    if (authUser?.role === 'user') {
                        setModalLogin(false);
                        if (localStorage.getItem("cart")) {
                            navigate('/order-summary');
                        } else {
                            navigate('/order');
                        }
                    } else {
                        navigate('/')
                    }
                } 
            }
        })
        .catch(err => {
            console.log(err)
            setIsLoding(false);
        })
    }

    useEffect(() => {
        if (token) getUserAuth(token)
    }, [token]);

    useEffect(() => {
        if (token) {
            if (!allowUser.includes(pathname) && authUser?.role === "user") {
                navigate("/")
            } else if (!allowAdmin.includes(pathname) && authUser?.role === "superadmin") {
                navigate("/cms")
            }
        } else {
            if (!allowGeneral.includes(pathname)) {
                navigate("/")
            }
        }
    }, [pathname, token]);
    
    const state = {
        modalLogin, setModalLogin,
        modalSignup, setModalSignup,
        modalOtp, setModalOtp,
        modalReset, setModalReset,
        modalForgot, setModalForgot,

        setSize,
        isStandard, isTablet, isMobile,

        routes,

        handleLogin,
        isLoding, setIsLoding,
        token, setToken, removeToken,
        authUser, setAuthUser
    }

    return (
        <AuthContext.Provider value={state}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error(`useAuth must be use within a Network Performance`)
    };
    return context;
};

export default Auth
