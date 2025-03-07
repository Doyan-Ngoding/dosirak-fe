import { message } from 'antd'
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

    const setSize = (standard = '', tablet = '', mobile = '') => {
        return isStandard ? standard : ( isTablet ? tablet : (isMobile ? mobile : '') )   
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
        11: '/cms/order',
    }

    const allowAdmin = ['/cms', '/cms/product', '/cms/user', '/cms/category', '/cms/restaurant'] 
    const allowUser = ['/order-summary', '/payment-method', '/payment', '/complete']
    const allowGeneral = ['/', '/menu', '/order', '/cms/login', '/finish']

    const [modalLogin, setModalLogin] = useState(false);
    const [modalSignup, setModalSignup] = useState(false);
    const [modalOtp, setModalOtp] = useState(false);
    const [modalForgot, setModalForgot] = useState(false);
    const [modalReset, setModalReset] = useState(false);

    const [token, setToken] = useLocalStorage("token");
    const [authUser, setAuthUser] = useState();

    const [isLoading, setIsLoading] = useState(false);
    const [resMessage, setResMessage] = useState();

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
            setResMessage(['error', err.response?.data?.message || "Unauthorized!"])
        })   
    }

    const handleLogin = async (rule) => {
        setIsLoading(true);
        await axios.post(`${import.meta.env.VITE_API_BE}/login`, rule)
        .then(res => {
            setToken(res.data.results.token);
            getUserAuth(res.data.results.token);
            setIsLoading(false);
            axios.get(`${import.meta.env.VITE_API_BE}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${res.data.results.token}`,
                },
            })
            .then(res => {
                setAuthUser(res.data.user)
                if (res.data.user) {
                    if (pathname === '/cms/login') {
                        if (res.data.user?.role === 'superadmin' || res.data.user?.role === 'employee') {
                            setResMessage(['success', 'Log In Success!'])
                            setTimeout(() => {
                                navigate('/cms');
                            }, 2000)
                        } else {
                            setResMessage(['error', 'Log In Failed! Your Not an Admin!'])
                            setTimeout(() => {
                                navigate('/cms/login')  
                            }, 2000)
                        }
                    } else if (pathname === '/order') {
                        if (res.data.user?.role === 'user') {
                            setModalLogin(false);
                            if (localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart")).length > 0) {
                                setResMessage(['success', 'Log In Success!'])
                                setTimeout(() => {
                                    navigate('/order-summary');
                                }, 2000)
                            } else {
                                setResMessage(['success', 'Log In Success!'])
                                setTimeout(() => {
                                    navigate('/order');
                                }, 2000)
                            }
                        } else {
                            setResMessage(['error', 'Log In Failed! Your No a User!'])
                            setTimeout(() => {
                                navigate('/')
                            }, 2000)
                        }
                    } 
                } 
            })
            .catch(err => {
                setIsLoading(false);
                setResMessage(['error', err.response?.data?.message || "Login failed!"])
            })   
        })
        .catch(err => {
            setIsLoading(false);
            setResMessage(['error', err.response?.data?.message || "Login failed!"])
        })
    }

    const handleRegister = async (rule) => {
        setIsLoading(true);
        await axios.post(`${import.meta.env.VITE_API_BE}/register/users`, rule)
        .then(res => {
            setToken(res.data.results.token);
            setAuthUser(res.data.results.user)
            setIsLoading(false);
            setModalSignup(false);
            if (pathname === '/order') {
                if (localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart")).length > 0) {
                    setResMessage(['success', 'Sign Up Success!'])
                    setTimeout(() => {
                        navigate('/order-summary');
                    }, 2000)
                } else {
                    setResMessage(['success', 'Sign Up Success!'])
                    setTimeout(() => {
                        navigate('/order');
                    }, 2000)
                }
            } 
        })
        .catch(err => {
            setIsLoading(false);
            setResMessage(['error', err.response?.data?.message || "Login failed!"])
        })
    }

    useEffect(() => {
        if (token) {
            axios.get(`${import.meta.env.VITE_API_BE}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(res => {
                setAuthUser(res.data.user)
                if (res.data.user) {
                    if (allowUser.includes(pathname) && !res.data.user?.role === "user") {
                        setResMessage(['error', "You Can't Access this Page"])
                        setTimeout(() => {
                            navigate("/")
                        }, 2000)
                    } else if (allowAdmin.includes(pathname) && !res.data.user?.role === "superadmin" && !res.data.user?.role === "employee") {
                        setResMessage(['error', "You Can't Access this Page"])
                        setTimeout(() => {
                            navigate("/cms/login")
                        }, 2000)
                    }
                } else {
                    if (!allowGeneral.includes(pathname)) {
                        setResMessage(['error', 'Log In First!'])
                        localStorage.removeItem("token")
                        setTimeout(() => {
                            navigate("/")
                        }, 2000)
                    } 
                }
            })
            .catch(err => {
                if (err.response?.data?.message === 'jwt expired') {
                    setResMessage(['error', err.response?.data?.message || "Unauthorized!"])
                    localStorage.removeItem("token")
                    setTimeout(() => {
                        navigate("/")
                    }, 2000)
                } else {
                    setResMessage(['error', err.response?.data?.message || "Unauthorized!"])
                }
            }) 
        } else {
            if (!allowGeneral.includes(pathname)) {
                setResMessage(['error', 'Log In First!'])
                localStorage.removeItem("token")
                setTimeout(() => {
                    navigate("/")
                }, 2000)
            }
        }
    }, [token, pathname]);

    const hanldeLogout = () => {
        localStorage.clear()
        setResMessage(['success', 'Log Out Success!'])
        setTimeout(() => {
            navigate("/")
        }, 1000)
    }
    
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
        handleRegister,
        hanldeLogout,
        isLoading, setIsLoading,
        token, setToken,
        getUserAuth,
        authUser, setAuthUser,
        allowAdmin,

        resMessage, setResMessage,
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
