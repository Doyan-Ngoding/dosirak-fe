import React from 'react'
import AuthProvider from '../context/AuthContext'
import OrderProvider from '../context/OrderContext'
import OrderSummaryComp from '../components/module/order/summary'

export default function OrderSummaryPage() {
    return (
        <>
            <AuthProvider>
                <OrderProvider>
                    <OrderSummaryComp />
                </OrderProvider>
            </AuthProvider>
        </>
    )
}
