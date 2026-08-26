import {Navigate,Route,Routes} from 'react-router-dom'
import {EvaluationProvider} from './context/EvaluationContext'
import Login from './components/Login'
import Home from './components/Home'
import Assessment from './components/Assessment'
import Results from './components/Results'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
const protectedPage=page=><ProtectedRoute>{page}</ProtectedRoute>
export default function App(){return <EvaluationProvider><Routes><Route path="/login" element={<Login/>}/><Route path="/" element={protectedPage(<Home/>)}/><Route path="/assessment" element={protectedPage(<Assessment/>)}/><Route path="/results" element={protectedPage(<Results/>)}/><Route path="*" element={<NotFound/>}/></Routes></EvaluationProvider>}
