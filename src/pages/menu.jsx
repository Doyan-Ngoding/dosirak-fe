import React from 'react'
import AuthProvider from '../context/AuthContext'
import MenuComp from '../components/module/menu'
import MenuProvider from '../context/MenuContext'
import OrderProvider from '../context/OrderContext'
import RestaurantProvider from '../context/RestaurantContext'

export default function MenuPage() {
    return (
        <>
            <AuthProvider>
                <MenuProvider>
                    <OrderProvider>
                        <RestaurantProvider>
                            <MenuComp />
                        </RestaurantProvider>
                    </OrderProvider>
                </MenuProvider>
            </AuthProvider>
        </>
    )
}
