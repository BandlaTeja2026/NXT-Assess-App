import {Navigate,useNavigate} from 'react-router-dom'
import Header from '../Header'
import {useEvaluation} from '../../context/EvaluationContext'

const SUBMIT_IMAGE='/assets/submit.svg'
const TIME_UP_IMAGE='/assets/time-up.svg'

export default function Results(){
  const navigate=useNavigate()
  const {result,reset}=useEvaluation()
  if(!result)return <Navigate to="/assessment" replace/>
  const retry=()=>{reset();navigate('/assessment')}
  const timedOut=result.timedOut
  return <><Header/><main className="results-page"><section className="results-card"><img className="result-illustration" src={timedOut?TIME_UP_IMAGE:SUBMIT_IMAGE} alt={timedOut?'time up':'submit'}/><h1>{timedOut?'Time is up!':'Assessment submitted'}</h1><p>{timedOut?'Your saved answers have been evaluated.':'Nice work — you completed the assessment.'}</p><div className="result-stats"><div><span>Your score</span><strong>{result.score} / {result.total}</strong></div><div><span>Time taken</span><strong>{Math.floor(result.time/60)}m {result.time%60}s</strong></div></div><button type="button" className="primary" onClick={retry}>Reattempt Assessment</button></section></main></>
}
