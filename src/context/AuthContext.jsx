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
import { useGoogleLogin } from '@react-oauth/google';

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
        12: '/history',
        13: '/about',
    }

    const allowAdmin = ['/cms', '/cms/product', '/cms/user', '/cms/category', '/cms/restaurant'] 
    const allowUser = ['/order-summary', '/payment-method', '/payment', '/complete']
    const allowGeneral = ['/', '/menu', '/order', '/cms/login', '/finish', '/history', '/contact', '/about']

    const [modalLogin, setModalLogin] = useState(false);
    const [modalSignup, setModalSignup] = useState(false);
    const [modalOtp, setModalOtp] = useState(false);
    const [modalForgot, setModalForgot] = useState(false);
    const [modalReset, setModalReset] = useState(false);

    const [token, setToken] = useLocalStorage("token");
    const [authUser, setAuthUser] = useState();

    const [isLoading, setIsLoading] = useState(false);
    const [resMessage, setResMessage] = useState();

    const [isSuccess, setIsSuccess] = useState(false);

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
                    } else if (pathname === '/menu') {
                        if (res.data.user?.role === 'user') {
                            setModalLogin(false);
                            setResMessage(['success', 'Log In Success!'])
                            setTimeout(() => {
                                navigate('/history')
                            }, 2000)
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

    const handleLoginSuccessGoogle = async (credential) => {
        try {
            // setIsLoading(true)
            const googleUserInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                  Authorization: `Bearer ${credential.access_token}`,
                },
            });

            const { email, name } = googleUserInfo.data;

            const res = await axios.post(`${import.meta.env.VITE_API_BE}/google-login`, {
                email,
                name,
            });
          
            setToken(res.data.results.token); 
            getUserAuth(res.data.results.token);
            // setIsLoading(false);
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
                // setIsLoading(false);
                setResMessage(['error', err.response?.data?.message || "Login failed!"])
            })  
          } catch (err) {
            setResMessage(['error', 'Google login failed']);
            console.error(err);
          }
    }

    const handleLoginErrorGoogle = (error) => {
        setResMessage(['error', 'Log In Failed!'])
        console.error('Login Failed:', error);
    };

    const handleLoginGoogle = useGoogleLogin({
        onSuccess: handleLoginSuccessGoogle,
        onError: handleLoginErrorGoogle,
    });

    
    // const handleLoginGoogle = () => {
    //     window.google.accounts.id.initialize({
    //       client_id: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
    //       callback: async (response) => {
    //         try {
    //           const res = await axios.post(`${import.meta.env.VITE_API_BE}/google-login`, {
    //             credential: response.credential,
    //           });
    
    //           const token = res.data.results.token;
    //           localStorage.setItem('token', token);
    
    //           setResMessage(['success', 'Login with Google successful!']);
    //         } catch (err) {
    //           setResMessage(['error', 'Login with Google failed']);
    //         }
    //       },
    //     });
    
    //     // window.google.accounts.id.prompt(); 
    
    //     window.google.accounts.id.renderButton(
    //       document.getElementById('google-btn'),
    //       { theme: 'outline', size: 'large' }
    //     );
    //   };
    
    // const handleLoginGoogle = () => {
    //     window.google.accounts.id.initialize({
    //         client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    //         callback: handleLoginSuccessGoogle, // will receive { credential }
    //     });
    
    //     window.google.accounts.id.prompt(); // shows the One Tap or popup
    // };

    const handleLoginSuccessFacebook = async (res) => {
        try {
            const accessToken = res.accessToken || res.authResponse?.accessToken;
            if (!accessToken) {
                setResMessage(['error', 'No access token returned from Facebook']);
                return;
            }

            const fbRes = await axios.get('https://graph.facebook.com/v22.0/me', {
                params: {
                    access_token: accessToken,
                    fields: 'id,name,email',
                },
            });
    
            const { id, name, email } = fbRes.data;
    
            if (!email) {
                setResMessage(['error', 'Facebook did not return an email']);
                return;
            }
    
            const response = await axios.post(`${import.meta.env.VITE_API_BE}/facebook-login`, {
                id,
                name,
                email,
            });
    
            setToken(response.data.results.token);
            getUserAuth(res.data.results.token);
            // setIsLoading(false);
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
                // setIsLoading(false);
                setResMessage(['error', err.response?.data?.message || "Login failed!"])
            })  
        } catch (err) {
            console.error(err);
            setResMessage(['error', 'Facebook login failed']);
        }
    };    
    
    const handleLoginErrorFacebook = (err) => {
        console.error('Facebook login failed:', err);
        setResMessage(['error', 'Facebook login failed']);
    };
            
    
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

        handleLoginGoogle,
        handleLoginSuccessFacebook,
        handleLoginErrorFacebook,
        
        isSuccess, setIsSuccess,
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
