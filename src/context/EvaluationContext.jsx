import {createContext,useContext,useState} from 'react'
const EvaluationContext=createContext(null)
export const useEvaluation=()=>useContext(EvaluationContext)
export function EvaluationProvider({children}){const[answers,setAnswers]=useState({});const[startedAt,setStartedAt]=useState(null);const[result,setResult]=useState(null);const reset=()=>{setAnswers({});setStartedAt(Date.now());setResult(null)};return <EvaluationContext.Provider value={{answers,setAnswers,startedAt,setStartedAt,result,setResult,reset}}>{children}</EvaluationContext.Provider>}
