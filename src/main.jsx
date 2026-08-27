import React from 'react'
import {createRoot} from 'react-dom/client'
import {HashRouter} from 'react-router-dom'
import App from './App'
import './App.css'
import './overrides.css'
createRoot(document.getElementById('root')).render(<React.StrictMode><HashRouter><App/></HashRouter></React.StrictMode>)
