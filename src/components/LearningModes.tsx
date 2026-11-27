import {modes} from '../data/assistantContent'
import type {Mode} from '../types/assistant'
export default function LearningModes({mode,onChange}:{mode:Mode;onChange:(mode:Mode)=>void}) {return <section><h3>How would you like to learn?</h3><div className="ai-modes">{modes.map(m=><button key={m.id} aria-pressed={mode===m.id} onClick={()=>onChange(m.id)}>{m.label}</button>)}</div></section>}
