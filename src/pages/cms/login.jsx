import React from 'react'
import AuthProvider from '../../context/AuthContext'
import CmsLoginComp from '../../components/module/cms/login'

export default function CmsLoginPage() {
    return (
        <>
            <AuthProvider>
                <CmsLoginComp />
            </AuthProvider>
        </>
    )
}
