import React from 'react'
import AuthProvider from '../context/AuthContext'
import AboutComp from '../components/module/about'
import OrderProvider from '../context/OrderContext'

export default function AboutPage() {
    return (
        <>
            <AuthProvider>
                <OrderProvider>
                    <AboutComp />
                </OrderProvider>
            </AuthProvider>
        </>
    )
}
