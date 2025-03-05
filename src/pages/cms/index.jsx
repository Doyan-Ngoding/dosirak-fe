import React from 'react'
import AuthProvider from '../../context/AuthContext'
import CmsComp from '../../components/module/cms/dashbord'
import OrderProvider from '../../context/OrderContext'

export default function CmsPage() {
    return (
        <>
            <AuthProvider>
                <OrderProvider>
                    <CmsComp />
                </OrderProvider>
            </AuthProvider>
        </>
    )
}
