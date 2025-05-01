import React from 'react'
import AuthProvider from '../context/AuthContext'
import OrderProvider from '../context/OrderContext'
import OrderSummaryComp from '../components/module/order/summary'
import OrderSummaryCompNew from '../components/module/order/summary/indexv2'

export default function OrderSummaryPage() {
    return (
        <>
            <AuthProvider>
                <OrderProvider>
                    {/* <OrderSummaryComp /> */}
                    <OrderSummaryCompNew />
                </OrderProvider>
            </AuthProvider>
        </>
    )
}
