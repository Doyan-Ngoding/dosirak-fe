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

function Index() {
    return (
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/menu' element={<MenuPage />} />
            <Route path='/order' element={<OrderPage />} />
            <Route path='/contact' element={<ContactPage />} />
        </Routes>
    )
}

export default Index;