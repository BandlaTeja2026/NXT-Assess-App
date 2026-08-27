import {useNavigate} from 'react-router-dom'

const NOT_FOUND_IMAGE='./assets/not-found.svg'

export default function NotFound(){const navigate=useNavigate();return <main className="not-found"><img className="not-found-icon" src={NOT_FOUND_IMAGE} alt="not found"/><h1>Page not found</h1><p>The page you are looking for does not exist.</p><button type="button" className="primary" onClick={()=>navigate('/')}>Go to Home</button></main>}
