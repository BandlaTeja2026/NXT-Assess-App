import {useCallback,useEffect,useRef,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from '../Header'
import {useEvaluation} from '../../context/EvaluationContext'
import localQuestions from '../../data/questions'

const FAILURE_IMAGE='./assets/failure.svg'
const ASSESSMENT_SECONDS=600
const secondsText=value=>`${String(Math.floor(value/60)).padStart(2,'0')}:${String(value%60).padStart(2,'0')}`

function Question({question,value,onChange}){
  const options=question.options||[]
  if(question.options_type==='SINGLE_SELECT')return <select className="question-select" value={value??0} onChange={event=>onChange(Number(event.target.value))}>{options.map((option,index)=><option key={option.id} value={index}>{option.text}</option>)}</select>
  if(question.options_type==='IMAGE')return <div className="image-options">{options.map((option,index)=><button type="button" key={option.id} className={`image-option ${value===index?'selected':''}`} onClick={()=>onChange(index)}><img src={option.image_url} alt={option.text}/><span>{option.text}</span></button>)}</div>
  return <div className="text-options">{options.map((option,index)=><button type="button" key={option.id} className={`text-option ${value===index?'selected':''}`} onClick={()=>onChange(index)}><b>{String.fromCharCode(65+index)}</b>{option.text}</button>)}</div>
}

export default function Assessment(){
  const navigate=useNavigate()
  const {answers,setAnswers,setStartedAt,setResult}=useEvaluation()
  const [status,setStatus]=useState('loading')
  const [questions,setQuestions]=useState([])
  const [current,setCurrent]=useState(0)
  const [time,setTime]=useState(ASSESSMENT_SECONDS)
  const submitted=useRef(false)

  const getQuestions=useCallback(async()=>{
    setStatus('loading');setCurrent(0);setTime(ASSESSMENT_SECONDS);submitted.current=false
    try{
      setQuestions(localQuestions)
      setStatus('success')
    }catch{setStatus('failure')}
  },[])

  useEffect(()=>{setStartedAt(Date.now());getQuestions()},[getQuestions,setStartedAt])
  const submit=useCallback((timedOut=false)=>{
    if(submitted.current)return
    submitted.current=true
    const score=questions.reduce((total,question,index)=>total+Number(question.options?.[answers[index]]?.is_correct==='true'),0)
    setResult({score,total:questions.length,time:ASSESSMENT_SECONDS-time,timedOut})
    navigate('/results',{replace:true})
  },[answers,navigate,questions,setResult,time])

  useEffect(()=>{
    if(status!=='success'||questions.length===0)return undefined
    const timerId=setInterval(()=>setTime(previous=>previous>0?previous-1:0),1000)
    return()=>clearInterval(timerId)
  },[questions.length,status])
  useEffect(()=>{if(status==='success'&&questions.length>0&&time===0)submit(true)},[questions.length,status,submit,time])
  useEffect(()=>{
    const question=questions[current]
    if(question?.options_type==='SINGLE_SELECT'&&answers[current]===undefined)setAnswers(previous=>({...previous,[current]:0}))
  },[answers,current,questions,setAnswers])

  if(status==='loading')return <><Header/><div className="loader-container" data-testid="loader"><div className="loader"/></div></>
  if(status==='failure')return <><Header/><main className="failure"><img src={FAILURE_IMAGE} alt="failure view"/><h1>Oops! Something went wrong</h1><p>We couldn't load the assessment questions. Please try again.</p><button type="button" className="primary" onClick={getQuestions}>Retry</button></main></>
  if(questions.length===0)return <><Header/><main className="failure"><h1>No questions available</h1><button type="button" className="primary" onClick={getQuestions}>Retry</button></main></>

  const answered=Object.keys(answers).length
  const question=questions[current]
  return <><Header/><main className="assessment"><section className="question-card"><p className="question-label">QUESTION {current+1} OF {questions.length}</p><h1>{question.question_text}</h1><Question question={question} value={answers[current]} onChange={choice=>setAnswers(previous=>({...previous,[current]:choice}))}/><div className="actions"><button type="button" className="submit" onClick={()=>submit(false)}>Submit Assessment</button>{current<questions.length-1&&<button type="button" className="next" onClick={()=>setCurrent(current+1)}>Next Question →</button>}</div></section><aside className="palette-card"><div className="timer">⏱ {secondsText(time)}</div><div className="counters"><div>Answered<strong>{answered}</strong></div><div>Unanswered<strong>{questions.length-answered}</strong></div></div><p>Question palette</p><div className="palette">{questions.map((_,index)=><button type="button" key={index} aria-label={`Question ${index+1}`} className={`${index===current?'active':''} ${answers[index]!==undefined?'answered':''}`} onClick={()=>setCurrent(index)}>{index+1}</button>)}</div></aside></main></>
}
