import React from 'react'
import AuthProvider from '../../context/AuthContext'
import UserProvider from '../../context/UserContext'
import CmsUserComp from '../../components/module/cms/user'

export default function CmsUserPage() {
    return (
        <>
            <AuthProvider>
                <UserProvider>
                    <CmsUserComp />
                </UserProvider>
            </AuthProvider>
        </>
    )
}
