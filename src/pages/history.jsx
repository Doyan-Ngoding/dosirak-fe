import React from 'react'
import AuthProvider from '../context/AuthContext'
import HistoryProvider from '../context/HistoryContext'
import HistoryComp from '../components/module/history'
import OrderProvider from '../context/OrderContext'

export default function HistoryPage() {
    return (
        <>
            <AuthProvider>
                <OrderProvider>
                    <HistoryProvider>
                        <HistoryComp />
                    </HistoryProvider>
                </OrderProvider>
            </AuthProvider>
        </>
    )
}
