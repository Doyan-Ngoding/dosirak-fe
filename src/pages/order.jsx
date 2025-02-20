import React from 'react'
import OrderComp from '../components/module/order'
import OrderProvider from '../context/OrderContext'
import MenuProvider from '../context/MenuContext'
import AuthProvider from '../context/AuthContext'
import RestaurantProvider from '../context/RestaurantContext'

export default function OrderPage() {
    return (
        <>
            <AuthProvider>
                <OrderProvider>
                    <MenuProvider>
                        <RestaurantProvider>
                            <OrderComp />
                        </RestaurantProvider>
                    </MenuProvider>
                </OrderProvider>
            </AuthProvider>
        </>
    )
}
