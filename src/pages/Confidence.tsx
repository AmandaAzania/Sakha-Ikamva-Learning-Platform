
import { useState } from 'react'
import {
  Heart,
  Volume2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from 'lucide-react'

import { confidenceActivities } from '../data/learningContent'

interface ConfidenceProps {
  onBack: () => void
  onComplete?: (activityId: string) => void
}

export default function Confidence({
  onBack,
  onComplete,
}: ConfidenceProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [selected, setSelected] = useState<string[]>([])
  const [reflection, setReflection] = useState('')
  const [completed, setCompleted] = useState<string[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [audioStatus, setAudioStatus] = useState('')

  const activity =
    activeIndex === null
      ? null
      : confidenceActivities[activeIndex]

  function speak(text: string) {
    if (!('speechSynthesis' in window)) {
      setAudioStatus('Read-aloud is unavailable on this device.')
      return
    }

    setAudioStatus('')
    window.speechSynthesis.cancel()

    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = 'en-ZA'
    speech.rate = 0.85

    speech.onerror = () => {
      setAudioStatus('Audio could not play. Please try again.')
    }

    window.speechSynthesis.speak(speech)
  }

  function openActivity(index: number) {
    setActiveIndex(index)
    setSelected([])
    setReflection('')
    setShowFeedback(false)
    setAudioStatus('')
    window.scrollTo(0, 0)
  }

  function toggleOption(option: string) {
    setSelected((previous) =>
      previous.includes(option)
        ? previous.filter((item) => item !== option)
        : [...previous, option]
    )
  }

  function completeActivity() {
    if (!activity) return

    if (!completed.includes(activity.id)) {
      setCompleted((previous) => [...previous, activity.id])
      onComplete?.(activity.id)
    }

    setShowFeedback(true)
  }

  function nextActivity() {
    if (activeIndex === null) return

    if (activeIndex < confidenceActivities.length - 1) {
      openActivity(activeIndex + 1)
    } else {
      setActiveIndex(null)
    }
  }

  function returnToJourney() {
    setActiveIndex(null)
    setReflection('')
    setSelected([])
    setShowFeedback(false)

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }

  const progress = Math.round(
    (completed.length / confidenceActivities.length) * 100
  )

  return (
    <div className="confidence-page">
      {audioStatus && <p role="status">{audioStatus}</p>}

      {!activity ? (
        <>
          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={20} /> Back to home
          </button>

          <section className="confidence-hero">
            <Heart size={40} />

            <span className="eyebrow">
              DISCOVER MY POTENTIAL
            </span>

            <h1>Every person has strengths.</h1>

            <p>
              You do not have to be good at everything.
              Explore your interests, recognise your strengths
              and discover new possibilities.
            </p>

            <button
              className="primary-button"
              onClick={() =>
                speak(
                  'Every person has strengths. Explore your interests, recognise your strengths and discover new possibilities.'
                )
              }
            >
              <Volume2 size={20} /> Listen to this
            </button>
          </section>

          <section className="journey-progress">
            <div className="progress-heading">
              <h3>My discovery journey</h3>
              <span>
                {completed.length} of {confidenceActivities.length}
              </span>
            </div>

            <div
              className="progress-track"
              role="progressbar"
              aria-label="Activities completed"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p>Learn at your own pace.</p>
          </section>

          <section className="journey-list">
            {confidenceActivities.map((item, index) => (
              <button
                className="journey-card"
                key={item.id}
                onClick={() => openActivity(index)}
              >
                <div className="journey-number">
                  {completed.includes(item.id) ? (
                    <CheckCircle2 size={26} />
                  ) : (
                    index + 1
                  )}
                </div>

                <div className="journey-details">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <ChevronRight size={22} />
              </button>
            ))}
          </section>
        </>
      ) : (
        <>
          <button
            className="back-button"
            onClick={returnToJourney}
          >
            <ArrowLeft size={20} /> My discovery journey
          </button>

          <section className="activity-panel">
            <span className="activity-label">
              ACTIVITY {(activeIndex ?? 0) + 1} OF{' '}
              {confidenceActivities.length}
            </span>

            <h1>{activity.title}</h1>

            <p className="activity-instruction">
              {activity.instruction}
            </p>

            <button
              className="secondary-button"
              onClick={() =>
                speak(`${activity.title}. ${activity.instruction}`)
              }
            >
              <Volume2 size={20} /> Listen to instructions
            </button>

            {!showFeedback && (
              <>
                {activity.type !== 'reflection' && (
                  <div className="activity-options">
                    {activity.options.map((option) => (
                      <button
                        key={option}
                        className={`activity-option ${
                          selected.includes(option)
                            ? 'option-selected'
                            : ''
                        }`}
                        aria-pressed={selected.includes(option)}
                        onClick={() => toggleOption(option)}
                      >
                        <span>{option}</span>

                        {selected.includes(option) && (
                          <CheckCircle2 size={22} />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {activity.type === 'reflection' && (
                  <div className="reflection-area">
                    <label htmlFor="reflection">
                      My ideas (optional)
                    </label>

                    <textarea
                      id="reflection"
                      value={reflection}
                      onChange={(event) =>
                        setReflection(event.target.value)
                      }
                      placeholder="Write a few words or sentences..."
                      rows={6}
                      maxLength={1500}
                    />

                    <p>
                      You can also think about your answer or
                      discuss it with your teacher. Writing is
                      optional, and your text is not saved.
                    </p>
                  </div>
                )}

                <div className="activity-actions">
                  <button
                    className="primary-button"
                    disabled={
                      activity.type !== 'reflection' &&
                      selected.length === 0
                    }
                    onClick={completeActivity}
                  >
                    Complete activity <ArrowRight size={20} />
                  </button>

                  <button
                    className="back-button"
                    onClick={nextActivity}
                  >
                    Skip for now
                  </button>
                </div>
              </>
            )}

            {showFeedback && (
              <div className="activity-feedback" role="status">
                <Sparkles size={36} />

                <h2>Well done!</h2>
                <p>{activity.feedback}</p>

                <button
                  className="secondary-button"
                  onClick={() => speak(activity.feedback)}
                >
                  <Volume2 size={20} /> Listen
                </button>

                <button
                  className="primary-button"
                  onClick={nextActivity}
                >
                  {activeIndex === confidenceActivities.length - 1
                    ? 'Return to my journey'
                    : 'Next activity'}

                  <ArrowRight size={20} />
                </button>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  )
}
