import React from 'react'
import { 
    Route, 
    Routes, 
    Navigate 
} from 'react-router-dom'
import LandingPage from '../pages/landing';
import MenuPage from '../pages/menu';
import OrderPage from '../pages/order';
import ContactPage from '../pages/contact';
import OrderSummaryPage from '../pages/orderSummary';
import PaymentMethodPage from '../pages/paymentMethod';
import CompletePage from '../pages/complete';
import CmsPage from '../pages/cms';

function Index() {
    return (
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/menu' element={<MenuPage />} />
            <Route path='/order' element={<OrderPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/order-summary' element={<OrderSummaryPage />} />
            <Route path='/payment-method' element={<PaymentMethodPage />} />
            <Route path='/complete' element={<CompletePage />} />
            <Route path='/cms' element={<CmsPage />} />
        </Routes>
    )
}

export default Index;