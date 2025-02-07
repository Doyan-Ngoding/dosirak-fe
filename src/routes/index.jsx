import React from 'react'
import { 
    Route, 
    Routes, 
    Navigate 
} from 'react-router-dom'
import LandingPage from '../pages/landing';

function Index() {
    return (
        <Routes>
            <Route path='/' element={<LandingPage />} />
        </Routes>
    )
}

export default Index;