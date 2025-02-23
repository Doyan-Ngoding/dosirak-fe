import React from 'react'
import AuthProvider from '../../context/AuthContext'
import MenuProvider from '../../context/MenuContext'
import CmsProductComp from '../../components/module/cms/product'

export default function CmsProductPage() {
    return (
        <>
            <AuthProvider>
                <MenuProvider>
                    <CmsProductComp />
                </MenuProvider>
            </AuthProvider>
        </>
    )
}
