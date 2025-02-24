import React from 'react'
import AuthProvider from '../../context/AuthContext'
import RestaurantProvider from '../../context/RestaurantContext'
import CmsRestaurantComp from '../../components/module/cms/restaurant'

export default function CmsRestaurantPage() {
    return (
        <>
            <AuthProvider>
                <RestaurantProvider>
                    <CmsRestaurantComp />
                </RestaurantProvider>
            </AuthProvider>
        </>
    )
}
