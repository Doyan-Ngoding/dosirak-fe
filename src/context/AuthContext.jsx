import React, { 
    createContext, 
    useContext,
    useState,
} from 'react'

const AuthContext = createContext(null)

const Auth = ({children }) => {

    const isLogin = localStorage.getItem('token')

    const [modalLogin, setModalLogin] = useState(false);
    const [modalOtp, setModalOtp] = useState(false);

    const state = {
        modalLogin, setModalLogin,
        modalOtp, setModalOtp,
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
