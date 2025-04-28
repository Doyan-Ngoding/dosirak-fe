import React from 'react'
import AuthProvider from '../context/AuthContext'
import AboutComp from '../components/module/about'

export default function AboutPage() {
    return (
        <>
            <AuthProvider>
                <AboutComp />
            </AuthProvider>
        </>
    )
}
