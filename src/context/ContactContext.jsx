import axios from 'axios';
import React, { 
    createContext, 
    useContext,
    useEffect,
    useState,
} from 'react'

const ContactContext = createContext(null)

const Contact = ({children }) => {


    const state = {

    }

    return (
        <ContactContext.Provider value={state}>
            {children}
        </ContactContext.Provider>
    );
}

export const useContact = () => {
    const context = useContext(ContactContext);
    if (context === undefined) {
        throw new Error(`useContact must be use within a Network Performance`)
    };
    return context;
};

export default Contact
