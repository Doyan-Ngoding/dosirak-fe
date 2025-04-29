import React from 'react'
import AuthProvider from '../context/AuthContext'
import ContactProvider from '../context/ContactContext'
import ContactComp from '../components/module/contact'
import OrderProvider from '../context/OrderContext'

export default function ContactPage() {
  return (
    <>
      <AuthProvider>
        <OrderProvider>
          <ContactProvider>
            <ContactComp />
          </ContactProvider>
        </OrderProvider>
      </AuthProvider>
    </>
  )
}
