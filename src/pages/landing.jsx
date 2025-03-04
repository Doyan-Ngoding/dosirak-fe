import React from 'react'
import LandingComp from '../components/module/landing'
import AuthProvider from '../context/AuthContext'
import HeaderComp from '../components/global/layout/header'
import RestaurantProvider from '../context/RestaurantContext'
import MenuProvider from '../context/MenuContext'
import OrderProvider from '../context/OrderContext'

export default function LandingPage() {
  return (
    <>
      <AuthProvider>
        <RestaurantProvider>
          <MenuProvider>
            <OrderProvider>
              <LandingComp />
            </OrderProvider>
          </MenuProvider>
        </RestaurantProvider>
      </AuthProvider>
    </>
  )
}
