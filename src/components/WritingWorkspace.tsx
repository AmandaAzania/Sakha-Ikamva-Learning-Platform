import { useEffect, useState } from 'react'
import { Volume2, Square } from 'lucide-react'
import './WritingWorkspace.css'
interface Props { prompts: string[]; starters: string[] }
export default function WritingWorkspace({ prompts, starters }: Props) {
  const [notes, setNotes] = useState<string[]>([])
  const [draft, setDraft] = useState('')
  const [size, setSize] = useState('20')
  const [paper, setPaper] = useState('cream')
  const [spell, setSpell] = useState(false)
  const [focus, setFocus] = useState(false)
  const [status, setStatus] = useState('')
  function stop() { if ('speechSynthesis' in window) window.speechSynthesis.cancel() }
  useEffect(() => () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel() }, [])
  function listen() {
    if (!('speechSynthesis' in window)) { setStatus('Read-aloud is unavailable on this device.'); return }
    stop(); setStatus('')
    const speech = new SpeechSynthesisUtterance(draft)
    speech.lang = 'en-ZA'; speech.rate = 0.85
    speech.onerror = e => { if (e.error !== 'canceled' && e.error !== 'interrupted') setStatus('Audio could not play.') }
    window.speechSynthesis.speak(speech)
  }
  return <section className="writing-workspace">
    <h2>My writing space</h2>
    <p>Use fictional examples. Your draft and notes are temporary and are not saved by this app.</p>
    <label className="writing-check"><input type="checkbox" checked={focus} onChange={e => setFocus(e.target.checked)} /> Focus on my draft</label>
    {!focus && <><h3>Plan your ideas (optional)</h3><div className="writing-plans">{prompts.map((p,i) => <label key={p}>{p}<textarea rows={2} maxLength={500} spellCheck={false} value={notes[i] ?? ''} onChange={e => setNotes(old => { const next = [...old]; next[i] = e.target.value; return next })} /></label>)}</div></>}
    <div className="writing-settings">
      <label>Text size<select value={size} onChange={e => setSize(e.target.value)}><option value="16">Normal</option><option value="20">Large</option><option value="26">Extra large</option></select></label>
      <label>Background<select value={paper} onChange={e => setPaper(e.target.value)}>{['white','cream','lavender','blue'].map(c => <option key={c}>{c}</option>)}</select></label>
    </div>
    <label className="writing-check"><input type="checkbox" checked={spell} onChange={e => setSpell(e.target.checked)} /> Enable browser spelling suggestions (may use browser services)</label>
    {!focus && <div className="writing-starters">{starters.map(s => <button key={s} className="secondary-button" onClick={() => setDraft(old => (old + (old ? ' ' : '') + s + ' ').slice(0,3000))}>{s}</button>)}</div>}
    <label className="writing-draft-label">My draft<textarea className={`writing-paper paper-${paper}`} style={{fontSize: `${Number(size)/16}rem`}} rows={8} maxLength={3000} spellCheck={spell} value={draft} onChange={e => setDraft(e.target.value)} placeholder="Start writing here..." /></label>
    <p>{draft.trim() ? draft.trim().split(/\s+/).length : 0} words — no minimum required.</p>
    <div className="activity-actions"><button className="secondary-button" disabled={!draft.trim()} onClick={listen}><Volume2 size={18}/> Listen to my writing</button><button className="secondary-button" onClick={stop}><Square size={18}/> Stop audio</button></div>
    {status && <p role="status">{status}</p>}
  </section>
}
