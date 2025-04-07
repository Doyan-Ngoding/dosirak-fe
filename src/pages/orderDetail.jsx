import React from 'react'
import OrderComp from '../components/module/order'
import OrderProvider from '../context/OrderContext'
import AuthProvider from '../context/AuthContext'
import PaymentDetailsPage from "../components/module/order/payment/paymentDetails";


export default function OrderDetail() {
    return (
        <>
            <AuthProvider>
                <OrderProvider>
                    <PaymentDetailsPage />
                </OrderProvider>
            </AuthProvider>
        </>
    )
}
