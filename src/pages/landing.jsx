import React from 'react'
import LandingComp from '../components/module/landing'
import AuthProvider from '../context/AuthContext'

export default function LandingPage() {
  return (
    <>
      <AuthProvider>
        <LandingComp />
      </AuthProvider>
    </>
  )
}
