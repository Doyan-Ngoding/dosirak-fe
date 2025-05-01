import React from 'react'
import AuthProvider from '../context/AuthContext'
import OrderProvider from '../context/OrderContext'
import CartComp from '../components/module/cart'

export default function CartPage() {
    return (
        <>
            <AuthProvider>
                <OrderProvider>
                    <CartComp />
                </OrderProvider>
            </AuthProvider>
        </>
    )
}
