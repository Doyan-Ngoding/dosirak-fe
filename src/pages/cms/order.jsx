import React from 'react'
import AuthProvider from '../../context/AuthContext'
import CmsOrderComp from '../../components/module/cms/order'
import SummaryProvider from '../../context/SummaryContext'

export default function CmsOrderPage() {
    return (
        <>
            <AuthProvider>
                <SummaryProvider>
                    <CmsOrderComp />
                </SummaryProvider>
            </AuthProvider>
        </>
    )
}
