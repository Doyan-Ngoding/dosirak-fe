import React from 'react'
import AuthProvider from '../context/AuthContext'
import OrderProvider from '../context/OrderContext'
import PaymentComp from '../components/module/order/payment'

export default function PaymentMethodPage() {
    return (
        <>
            <AuthProvider>
                <OrderProvider>
                    <PaymentComp />
                </OrderProvider>
            </AuthProvider>
        </>
    )
}
