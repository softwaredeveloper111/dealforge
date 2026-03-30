
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ToastContainer} from 'react-toastify'
import {BrowserRouter} from "react-router-dom"
import AuthContext from "./features/auth/auth.context";

createRoot(document.getElementById('root')).render(
 
  <AuthContext>
  <BrowserRouter>
    <App />
    <ToastContainer/>
  </BrowserRouter>
  </AuthContext>
)
