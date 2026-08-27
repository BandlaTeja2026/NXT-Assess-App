import {useState} from 'react'
import {Navigate,useLocation,useNavigate} from 'react-router-dom'

const LOGO='./assets/nxt-assess-logo.svg'
const DEMO_USERNAME='rahul'
const DEMO_PASSWORD='rahul@2021'

export default function Login(){
  const[user,setUser]=useState('')
  const[password,setPassword]=useState('')
  const[show,setShow]=useState(false)
  const[error,setError]=useState('')
  const[loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const location=useLocation()

  if(localStorage.getItem('jwt_token'))return <Navigate to="/" replace/>

  const submit=async event=>{
    event.preventDefault()
    setError('')
    setLoading(true)
    try{
      if(user!==DEMO_USERNAME||password!==DEMO_PASSWORD)throw new Error('Invalid username or password')
      localStorage.setItem('jwt_token','local-assessment-session')
      navigate(location.state?.from?.pathname||'/',{replace:true})
    }catch(err){
      setError(err.message||'Unable to sign in. Please try again.')
    }finally{
      setLoading(false)
    }
  }

  return <main className="login-page"><section className="login-panel"><div className="orb orb-one"/><div className="orb orb-two"/><div className="login-copy"><div className="illustration-icon">✦</div><h1>Feel prepared.<br/>Do your best.</h1><p>A simple, calm place to put your learning into practice.</p><div className="copy-note">10 questions · 10 minutes · instant result</div></div></section><section className="login-form-wrap"><form className="login-form" onSubmit={submit}><img className="login-logo" src={LOGO} alt="login website logo"/><h2>Welcome back</h2><p>Sign in to begin your assessment.</p><label htmlFor="username">USERNAME</label><input id="username" value={user} onChange={event=>setUser(event.target.value)} placeholder="Enter your username" required/><label htmlFor="password">PASSWORD</label><input id="password" value={password} type={show?'text':'password'} onChange={event=>setPassword(event.target.value)} placeholder="Enter your password" required/><label className="show-password"><input type="checkbox" checked={show} onChange={event=>setShow(event.target.checked)}/> Show password</label>{error&&<p className="form-error">{error}</p>}<button className="primary" disabled={loading}>{loading?'Signing in...':'Login'}</button></form></section></main>
}
