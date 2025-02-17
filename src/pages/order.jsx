import React from 'react'
import OrderComp from '../components/module/order'
import OrderProvider from '../context/OrderContext'
import MenuProvider from '../context/MenuContext'
import AuthProvider from '../context/AuthContext'

export default function OrderPage() {
    return (
        <>
            <AuthProvider>
                <OrderProvider>
                    <MenuProvider>
                        <OrderComp />
                    </MenuProvider>
                </OrderProvider>
            </AuthProvider>
        </>
    )
}
