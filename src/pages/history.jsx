import React from 'react'
import AuthProvider from '../context/AuthContext'
import HistoryProvider from '../context/HistoryContext'
import HistoryComp from '../components/module/history'

export default function HistoryPage() {
    return (
        <>
            <AuthProvider>
                <HistoryProvider>
                    <HistoryComp />
                </HistoryProvider>
            </AuthProvider>
        </>
    )
}
