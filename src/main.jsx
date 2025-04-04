import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './global.css'
import Routes from './routes'
import { GoogleOAuthProvider } from "@react-oauth/google"

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='316514256622-6da3qc3df3bn37kooas1keh7oj0nv5sb.apps.googleusercontent.com'>
    <React.StrictMode>
      <BrowserRouter basename='/'>
        <Routes />
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
