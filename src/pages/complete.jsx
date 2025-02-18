import React from 'react'
import AuthProvider from '../context/AuthContext'
import OrderProvider from '../context/OrderContext'
import CompleteComp from '../components/module/order/complete'

export default function CompletePage() {
    return (
        <>
            <AuthProvider>
                <OrderProvider>
                    <CompleteComp />
                </OrderProvider>
            </AuthProvider>
        </>
    )
}
