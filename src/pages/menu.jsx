import React from 'react'
import AuthProvider from '../context/AuthContext'
import MenuComp from '../components/module/menu'

export default function MenuPage() {
    return (
        <>
            <AuthProvider>
                <MenuComp />
            </AuthProvider>
        </>
    )
}
