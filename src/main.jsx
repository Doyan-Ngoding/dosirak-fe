import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './global.css'
import Routes from './routes'
import { GoogleOAuthProvider } from "@react-oauth/google"

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
    <React.StrictMode>
      <BrowserRouter basename='/'>
        <Routes />
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
