import React from 'react'
import AuthProvider from '../context/AuthContext'
import OrderProvider from '../context/OrderContext'
import FinishComp from '../components/module/order/complete/finish'

export default function FinishPage() {
    return (
        <>
            <AuthProvider>
                <OrderProvider>
                    <FinishComp />
                </OrderProvider>
            </AuthProvider>
        </>
    )
}
