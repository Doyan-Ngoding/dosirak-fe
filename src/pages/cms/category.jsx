import React from 'react'
import AuthProvider from '../../context/AuthContext'
import CmsCategoryComp from '../../components/module/cms/category'
import CategoryProvider from '../../context/CategoryContext'

export default function CmsCategoryPage() {
    return (
        <>
            <AuthProvider>
                <CategoryProvider>
                    <CmsCategoryComp />
                </CategoryProvider>
            </AuthProvider>
        </>
    )
}
