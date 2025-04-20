import React from 'react'
import AuthProvider from '../context/AuthContext'
import ContactProvider from '../context/ContactContext'
import ContactComp from '../components/module/contact'

export default function ContactPage() {
  return (
    <>
      <AuthProvider>
        <ContactProvider>
          <ContactComp />
        </ContactProvider>
      </AuthProvider>
    </>
  )
}
