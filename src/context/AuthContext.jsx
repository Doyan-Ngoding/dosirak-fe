import React, { 
    createContext, 
    useContext,
    useState,
} from 'react'
import { useMediaQuery } from 'react-responsive'

const AuthContext = createContext(null)

const Auth = ({children }) => {

    const isLogin = localStorage.getItem('token')
    
    const isStandard = useMediaQuery({ minWidth: 1024 })
    const isMobile = useMediaQuery({ maxWidth: 767 })
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 })

    const setSize = (standard, tablet, mobile) => {
        return isStandard ? standard : ( isTablet ? tablet : mobile )   
    }

    const [modalLogin, setModalLogin] = useState(false);
    const [modalOtp, setModalOtp] = useState(false);
    const [modalForgot, setModalForgot] = useState(false);
    const [modalReset, setModalReset] = useState(false);

    const state = {
        modalLogin, setModalLogin,
        modalOtp, setModalOtp,
        modalReset, setModalReset,
        modalForgot, setModalForgot,

        setSize,
        isStandard, isTablet, isMobile
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
