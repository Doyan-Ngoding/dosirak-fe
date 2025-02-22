import React from 'react'
import AuthProvider from '../context/AuthContext'
import MenuComp from '../components/module/menu'
import MenuProvider from '../context/MenuContext'

export default function MenuPage() {
    return (
        <>
            <AuthProvider>
                <MenuProvider>
                    <MenuComp />
                </MenuProvider>
            </AuthProvider>
        </>
    )
}
