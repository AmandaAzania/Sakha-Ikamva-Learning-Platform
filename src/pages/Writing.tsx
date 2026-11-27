import { useEffect, useState } from 'react'
import { PencilLine, Lightbulb, Blocks, SpellCheck, Link, AlignLeft, Sparkles, Mail, BookOpen, Volume2, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { writingActivities } from '../data/writingContent'
import WritingWorkspace from '../components/WritingWorkspace'
import './Confidence.css'
import './Writing.css'
interface Props { onBack: () => void; onComplete?: (id: string) => void }
const icons = [Lightbulb, Blocks, SpellCheck, Link, AlignLeft, Sparkles, Mail, BookOpen]
export default function Writing({onBack,onComplete}: Props) {
  const [index,setIndex] = useState<number|null>(null)
  const [completed,setCompleted] = useState<string[]>([])
  const [answer,setAnswer] = useState('')
  const [checked,setChecked] = useState(false)
  const [finished,setFinished] = useState(false)
  const [status,setStatus] = useState('')
  const activity = index === null ? null : writingActivities[index]
  const progress = Math.round(completed.length / writingActivities.length * 100)
  function stop() { if ('speechSynthesis' in window) window.speechSynthesis.cancel() }
  useEffect(() => () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel() }, [])
  function speak(text:string) { if (!('speechSynthesis' in window)) { setStatus('Read-aloud is unavailable.'); return }; stop(); setStatus(''); const speech = new SpeechSynthesisUtterance(text); speech.lang='en-ZA'; speech.rate=.85; speech.onerror=e=>{if(e.error!=='canceled'&&e.error!=='interrupted')setStatus('Audio could not play.')}; window.speechSynthesis.speak(speech) }
  function open(i:number|null) { stop(); setIndex(i); setAnswer(''); setChecked(false); setFinished(false); setStatus(''); window.scrollTo(0,0) }
  function next() { open(index !== null && index < writingActivities.length-1 ? index+1 : null) }
  function complete() { if (!activity) return; stop(); if (!completed.includes(activity.id)) { setCompleted(old=>[...old,activity.id]); onComplete?.(activity.id) }; setFinished(true) }
  return <div className="confidence-page writing-page">
    {status && <p role="status">{status}</p>}
    {!activity ? <>
      <button className="back-button" onClick={()=>{stop();onBack()}}><ArrowLeft size={20}/> Back to home</button>
      <section className="confidence-hero writing-hero"><PencilLine size={40}/><span className="eyebrow">MY WRITING JOURNEY</span><h1>Your ideas deserve to be shared.</h1><p>Turn your thoughts into words, explore your creativity and discover your own way of expressing yourself.</p><button className="primary-button" onClick={()=>speak('Your ideas deserve to be shared. Turn your thoughts into words and explore your creativity.')}><Volume2 size={20}/> Listen to this</button></section>
      <section className="journey-progress"><div className="progress-heading"><h3>My writing progress</h3><span>{completed.length} of {writingActivities.length} completed</span></div><div className="progress-track" role="progressbar" aria-label="Writing progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><div className="progress-fill" style={{width:`${progress}%`}}/></div><p>Every idea is a starting point.</p></section>
      <section className="welcome"><h2>Explore your writing journey</h2><p>Choose an activity. There is no need to rush.</p></section>
      <section className="journey-list">{writingActivities.map((item,i)=>{const Icon=icons[i]??PencilLine;return <button key={item.id} className="journey-card" onClick={()=>open(i)}><div className="writing-card-top"><div className="journey-number">{completed.includes(item.id)?<CheckCircle2 size={28}/>:<Icon size={28}/>}</div><span>{String(i+1).padStart(2,'0')}</span></div><div className="journey-details"><h3>{item.title}</h3><p>{item.description}</p></div><div className="writing-card-action">{completed.includes(item.id)?'Revisit activity':'Start activity'}<ArrowRight size={20}/></div></button>})}</section>
    </> : <><button className="back-button" onClick={()=>open(null)}><ArrowLeft size={20}/> My writing journey</button><section className="activity-panel"><span className="activity-label">ACTIVITY {(index??0)+1} OF {writingActivities.length}</span><h1>{activity.title}</h1><p>{activity.instruction}</p><button className="secondary-button" onClick={()=>speak(activity.instruction)}><Volume2 size={18}/> Listen to instructions</button>
      {!finished ? <>{activity.question && <div className="writing-question"><div className="activity-options">{activity.question.options.map(option=><button key={option} disabled={checked} aria-pressed={answer===option} className={`activity-option ${answer===option?'option-selected':''}`} onClick={()=>setAnswer(option)}>{option}</button>)}</div>{!checked?<button className="primary-button" disabled={!answer} onClick={()=>setChecked(true)}>Check my answer</button>:<div className="writing-feedback" role="status"><h3>{answer===activity.question.answer?'Well done!':'Let us explore the answer.'}</h3><p>{activity.question.answer}</p><p>{activity.question.explanation}</p></div>}</div>}
      <WritingWorkspace key={activity.id} prompts={activity.prompts??[]} starters={activity.starters??[]}/><div className="activity-actions"><button className="primary-button" disabled={!!activity.question&&!checked} onClick={complete}>Complete activity <ArrowRight size={20}/></button><button className="secondary-button" onClick={next}>Skip for now</button></div></>:<div className="activity-feedback" role="status"><Sparkles size={36}/><h2>Well done!</h2><p>Every opportunity to express an idea is a chance to practise. Your draft has been cleared.</p><button className="primary-button" onClick={next}>{index===writingActivities.length-1?'Return to my journey':'Next activity'}<ArrowRight size={20}/></button></div>}
    </section></>}
  </div>
}
