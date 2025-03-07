import React from 'react'
import AuthProvider from '../../context/AuthContext'
import CmsComp from '../../components/module/cms/dashbord'
import SummaryProvider from '../../context/SummaryContext'

export default function CmsPage() {
    return (
        <>
            <AuthProvider>
                <SummaryProvider>
                    <CmsComp />
                </SummaryProvider>
            </AuthProvider>
        </>
    )
}
