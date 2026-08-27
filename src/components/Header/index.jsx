import {useNavigate} from 'react-router-dom'
const LOGO='./assets/nxt-assess-logo.svg'
export default function Header(){const navigate=useNavigate();const logout=()=>{localStorage.removeItem('jwt_token');navigate('/login',{replace:true})};return <header className="header"><button className="logo" onClick={()=>navigate('/')} aria-label="Go to home"><img src={LOGO} alt="website logo"/></button><button className="logout" onClick={logout}>Logout</button></header>}
