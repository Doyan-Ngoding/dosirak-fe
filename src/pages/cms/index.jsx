import React from 'react'
import AuthProvider from '../../context/AuthContext'
import CmsComp from '../../components/module/cms/dashbord'

export default function CmsPage() {
    return (
        <>
            <AuthProvider>
                <CmsComp />
            </AuthProvider>
        </>
    )
}
