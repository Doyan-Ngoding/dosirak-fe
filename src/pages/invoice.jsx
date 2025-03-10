import React from 'react'
import AuthProvider from '../context/AuthContext'
import InvoiceComp from '../components/module/order/invoice/index'

export default function InvoicePage() {
    return (
        <>
            <AuthProvider>
                <InvoiceComp />
            </AuthProvider>
        </>
    )
}

