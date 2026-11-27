import {useState,useEffect} from 'react'
import AssistantWelcome from '../components/AssistantWelcome'
import LearningModes from '../components/LearningModes'
import ChatMessage from '../components/ChatMessage'
import ChatInput from '../components/ChatInput'
import {welcome} from '../data/assistantContent'
import {getDemoResponse} from '../services/aiService'
import type {Mode,Subject,Message} from '../types/assistant'
import './AIAssistant.css'
const initial:Message={id:0,role:'assistant',text:welcome}
const samples=['What is a fraction?','What is a variable?','What is a paragraph?','What is inference?']
export default function AIAssistant({onBack}:{onBack:()=>void}){
 const [mode,setMode]=useState<Mode>('simple');const [subject,setSubject]=useState<Subject>('General');const [messages,setMessages]=useState<Message[]>([initial]);const [status,setStatus]=useState('')
 function stop(){if('speechSynthesis' in window)window.speechSynthesis.cancel()}
 useEffect(()=>()=>{if('speechSynthesis' in window)window.speechSynthesis.cancel()},[])
 function read(text:string){stop();if(!('speechSynthesis' in window)){setStatus('Read-aloud is unavailable in this browser.');return}const u=new SpeechSynthesisUtterance(text);u.lang='en-ZA';u.rate=.85;window.speechSynthesis.speak(u)}
 function send(text:string){stop();setMessages(old=>[...old,{id:old.length,role:'learner',text},{id:old.length+1,role:'assistant',text:getDemoResponse(text,mode,subject)}])}
 return <div className="ai-page"><button className="secondary-button" onClick={()=>{stop();onBack()}}>Back to home</button><AssistantWelcome/><section className="ai-panel"><label htmlFor="ai-subject">Learning subject</label><select id="ai-subject" value={subject} onChange={e=>setSubject(e.target.value as Subject)}>{['General','Reading','Writing','Mathematics','Coding'].map(s=><option key={s}>{s}</option>)}</select><LearningModes mode={mode} onChange={setMode}/><h3>Try a sample question</h3><div className="ai-modes">{samples.map(s=><button key={s} onClick={()=>send(s)}>{s}</button>)}</div><div className="ai-chat" role="log" aria-label="Learning conversation" aria-live="polite">{messages.map(m=><ChatMessage key={m.id} message={m} onRead={read}/>)}</div><ChatInput onSend={send}/><div className="ai-actions"><button className="secondary-button" onClick={()=>{stop();setMessages([initial]);setStatus('Conversation cleared.')}}>Clear conversation</button><button className="secondary-button" onClick={stop}>Stop audio</button></div><p role="status">{status}</p><small>Prepared examples only. Ask your educator to check important information. Messages disappear when you leave this page. Browser speech services may process text; use sample questions only.</small></section></div>
}
