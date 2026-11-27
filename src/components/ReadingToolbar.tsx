
import { useEffect, useState } from 'react'
import {
  Volume2,
  Pause,
  Play,
  Square,
  ArrowLeft,
  ArrowRight,
  Settings2,
} from 'lucide-react'

import './ReadingToolbar.css'

interface ReadingToolbarProps {
  text: string
  title?: string
}

export default function ReadingToolbar({
  text,
  title = 'My reading space',
}: ReadingToolbarProps) {
  const [fontSize, setFontSize] = useState(20)
  const [lineHeight, setLineHeight] = useState(1.8)
  const [wordSpacing, setWordSpacing] = useState(0)
  const [background, setBackground] = useState('cream')
  const [speed, setSpeed] = useState(0.85)
  const [focusMode, setFocusMode] = useState(false)
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const [status, setStatus] = useState('')

  const sentences =
    text.match(/[^.!?]+[.!?]*/g)?.map(
      (sentence) => sentence.trim()
    ).filter(Boolean) ?? [text]

  const displayedText = focusMode
    ? sentences[sentenceIndex] ?? sentences[0]
    : text

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  function stopAudio() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }

    setPlaying(false)
    setPaused(false)
  }

  function playAudio() {
    if (!('speechSynthesis' in window)) {
      setStatus('Read-aloud is unavailable on this device.')
      return
    }

    stopAudio()
    setStatus('')

    const speech = new SpeechSynthesisUtterance(displayedText)

    speech.lang = 'en-ZA'
    speech.rate = speed

    speech.onstart = () => {
      setPlaying(true)
      setPaused(false)
    }

    speech.onend = () => {
      setPlaying(false)
      setPaused(false)
    }

    speech.onerror = (event) => {
      setPlaying(false)
      setPaused(false)

      if (
        event.error !== 'canceled' &&
        event.error !== 'interrupted'
      ) {
        setStatus('Audio could not play. Please try again.')
      }
    }

    window.speechSynthesis.speak(speech)
  }

  function togglePause() {
    if (!('speechSynthesis' in window)) return

    if (paused) {
      window.speechSynthesis.resume()
      setPaused(false)
    } else {
      window.speechSynthesis.pause()
      setPaused(true)
    }
  }

  function changeSentence(index: number) {
    stopAudio()
    setSentenceIndex(index)
  }

  return (
    <section className="reading-tool">
      <div className="reading-tool-heading">
        <Settings2 size={24} />
        <h2>{title}</h2>
      </div>

      <p className="reading-tool-description">
        Choose the reading settings that work for you.
      </p>

      <details className="reading-settings" open>
        <summary>Personalise my reading space</summary>

        <div className="reading-settings-grid">
          <label>
            Text size
            <select
              value={fontSize}
              onChange={(event) =>
                setFontSize(Number(event.target.value))
              }
            >
              <option value={16}>Normal</option>
              <option value={20}>Large</option>
              <option value={26}>Extra large</option>
            </select>
          </label>

          <label>
            Line spacing
            <select
              value={lineHeight}
              onChange={(event) =>
                setLineHeight(Number(event.target.value))
              }
            >
              <option value={1.5}>Normal</option>
              <option value={1.8}>Relaxed</option>
              <option value={2.3}>Wide</option>
            </select>
          </label>

          <label>
            Word spacing
            <select
              value={wordSpacing}
              onChange={(event) =>
                setWordSpacing(Number(event.target.value))
              }
            >
              <option value={0}>Normal</option>
              <option value={2}>Relaxed</option>
              <option value={4}>Wide</option>
            </select>
          </label>

          <label>
            Reading speed
            <select
              value={speed}
              onChange={(event) => {
                stopAudio()
                setSpeed(Number(event.target.value))
              }}
            >
              <option value={0.65}>Slow</option>
              <option value={0.85}>Relaxed</option>
              <option value={1}>Normal</option>
              <option value={1.15}>Faster</option>
            </select>
          </label>
        </div>

        <fieldset className="reading-colour-settings">
          <legend>Reading background</legend>

          <div className="reading-colour-options">
            {['white', 'cream', 'blue', 'green'].map(
              (colour) => (
                <button
                  key={colour}
                  type="button"
                  aria-pressed={background === colour}
                  className={`reading-colour colour-${colour} ${
                    background === colour ? 'colour-active' : ''
                  }`}
                  onClick={() => setBackground(colour)}
                >
                  {colour}
                </button>
              )
            )}
          </div>
        </fieldset>

        <label className="reading-focus-setting">
          <input
            type="checkbox"
            checked={focusMode}
            onChange={(event) => {
              stopAudio()
              setFocusMode(event.target.checked)
              setSentenceIndex(0)
            }}
          />

          Focus on one sentence at a time
        </label>
      </details>

      <div
        className={`reading-paper colour-${background}`}
        style={{
          fontSize: `${fontSize / 16}rem`,
          lineHeight,
          wordSpacing: `${wordSpacing}px`,
        }}
      >
        <p>{displayedText}</p>

        {focusMode && (
          <div className="reading-sentence-navigation">
            <button
              className="secondary-button"
              disabled={sentenceIndex === 0}
              onClick={() =>
                changeSentence(sentenceIndex - 1)
              }
            >
              <ArrowLeft size={18} />
              Previous
            </button>

            <span>
              {sentenceIndex + 1} of {sentences.length}
            </span>

            <button
              className="secondary-button"
              disabled={
                sentenceIndex === sentences.length - 1
              }
              onClick={() =>
                changeSentence(sentenceIndex + 1)
              }
            >
              Next
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="reading-audio-controls">
        <button
          className="primary-button"
          onClick={playAudio}
        >
          <Volume2 size={20} />
          Read aloud
        </button>

        <button
          className="secondary-button"
          disabled={!playing}
          onClick={togglePause}
        >
          {paused ? <Play size={18} /> : <Pause size={18} />}
          {paused ? 'Resume' : 'Pause'}
        </button>

        <button
          className="secondary-button"
          disabled={!playing}
          onClick={stopAudio}
        >
          <Square size={18} />
          Stop
        </button>
      </div>

      {status && <p role="status">{status}</p>}
    </section>
  )
}
