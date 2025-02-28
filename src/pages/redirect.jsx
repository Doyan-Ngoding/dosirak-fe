import React from 'react'
import AuthProvider from '../context/AuthContext'
import OrderProvider from '../context/OrderContext'
import RedirectComp from '../components/module/order/payment/redirect'

export default function RedirectPage() {
    return (
        <>
            <AuthProvider>
                <OrderProvider>
                    <RedirectComp />
                </OrderProvider>
            </AuthProvider>
        </>
    )
}
