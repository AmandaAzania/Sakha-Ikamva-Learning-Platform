
import { useState, useEffect } from 'react'
import {
  Heart,
  Volume2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Fingerprint,
  Zap,
  BookOpen,
  Brain,
  Star,
  Compass,
  MessageCircle,
} from 'lucide-react'

import { confidenceActivities } from '../data/learningContent'
import './Confidence.css'

interface ConfidenceProps {
  onBack: () => void
  onComplete?: (activityId: string) => void
}

const activityIcons = [
  Fingerprint,
  Zap,
  BookOpen,
  Brain,
  Star,
  Compass,
  MessageCircle,
]

const heroTitle = 'Great things begin with knowing yourself.'

const heroDescription =
  'Discover your strengths, explore your interests and build confidence in your own abilities. Your journey is yours to create.'

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

  const ActivityIcon =
    activeIndex === null
      ? Heart
      : activityIcons[activeIndex] ?? Heart

  /* ========================================
     AUDIO AND ACCESSIBILITY
  ======================================== */

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
  }

  function speak(text: string) {
    if (!('speechSynthesis' in window)) {
      setAudioStatus(
        'Read-aloud is unavailable on this device.'
      )
      return
    }

    stopAudio()
    setAudioStatus('')

    const speech = new SpeechSynthesisUtterance(text)

    speech.lang = 'en-ZA'
    speech.rate = 0.85
    speech.pitch = 1
    speech.volume = 1

    speech.onerror = (event) => {
      if (
        event.error !== 'canceled' &&
        event.error !== 'interrupted'
      ) {
        setAudioStatus(
          'Audio could not play. Please try again.'
        )
      }
    }

    window.speechSynthesis.speak(speech)
  }

  function readInstructions() {
    if (!activity) return

    const options =
      activity.options.length > 0
        ? ` Your choices are: ${activity.options.join('. ')}.`
        : ''

    speak(
      `${activity.title}. ${activity.instruction}${options}`
    )
  }

  /* ========================================
     ACTIVITY NAVIGATION
  ======================================== */

  function openActivity(index: number) {
    stopAudio()
    setActiveIndex(index)
    setSelected([])
    setReflection('')
    setShowFeedback(false)
    setAudioStatus('')
    window.scrollTo(0, 0)
  }

  function returnToJourney() {
    stopAudio()
    setActiveIndex(null)
    setReflection('')
    setSelected([])
    setShowFeedback(false)
    setAudioStatus('')
    window.scrollTo(0, 0)
  }

  function returnHome() {
    stopAudio()
    onBack()
  }

  function nextActivity() {
    if (activeIndex === null) return

    if (activeIndex < confidenceActivities.length - 1) {
      openActivity(activeIndex + 1)
    } else {
      returnToJourney()
    }
  }

  /* ========================================
     ACTIVITY INTERACTION
  ======================================== */

  function toggleOption(option: string) {
    if (activity?.type === 'single') {
      setSelected([option])
      return
    }

    setSelected((previous) =>
      previous.includes(option)
        ? previous.filter((item) => item !== option)
        : [...previous, option]
    )
  }

  function completeActivity() {
    if (!activity) return

    if (
      activity.type !== 'reflection' &&
      selected.length === 0
    ) {
      return
    }

    stopAudio()

    if (!completed.includes(activity.id)) {
      setCompleted((previous) => [
        ...previous,
        activity.id,
      ])

      onComplete?.(activity.id)
    }

    setReflection('')
    setShowFeedback(true)
  }

  const progress = Math.round(
    (completed.length / confidenceActivities.length) * 100
  )

  /* ========================================
     PAGE CONTENT
  ======================================== */

  return (
    <div className="confidence-page">

      {audioStatus && (
        <div className="notice" role="status">
          {audioStatus}
        </div>
      )}

      {!activity ? (
        <>

          {/* BACK TO DASHBOARD */}

          <button
            className="back-button"
            onClick={returnHome}
          >
            <ArrowLeft size={20} />
            Back to home
          </button>

          {/* HERO SECTION */}

          <section className="confidence-hero">

            <Heart size={40} aria-hidden="true" />

            <span className="eyebrow">
              DISCOVER MY POTENTIAL
            </span>

            <h1>{heroTitle}</h1>

            <p>{heroDescription}</p>

            <button
              className="primary-button"
              onClick={() =>
                speak(`${heroTitle} ${heroDescription}`)
              }
            >
              <Volume2 size={20} />
              Listen to this
            </button>

          </section>

          {/* LEARNER PROGRESS */}

          <section className="journey-progress">

            <div className="progress-heading">

              <h3>My discovery journey</h3>

              <span>
                {completed.length} of{' '}
                {confidenceActivities.length} completed
              </span>

            </div>

            <div
              className="progress-track"
              role="progressbar"
              aria-label="Activities completed"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              aria-valuetext={`${completed.length} of ${confidenceActivities.length} activities completed`}
            >
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p>
              {progress === 100
                ? 'You have completed your discovery journey!'
                : 'Every small step counts. Learn at your own pace.'}
            </p>

          </section>

          {/* SECTION INTRODUCTION */}

          <section className="welcome">

            <h2>Explore your strengths</h2>

            <p>
              Choose an activity below. You can complete
              them in any order and return whenever you
              are ready.
            </p>

          </section>

          {/* ACTIVITY CARDS */}

          <section
            className="journey-list"
            aria-label="Discovery activities"
          >

            {confidenceActivities.map((item, index) => {
              const Icon = activityIcons[index] ?? Heart

              const isCompleted =
                completed.includes(item.id)

              return (
                <button
                  className="journey-card"
                  key={item.id}
                  onClick={() => openActivity(index)}
                  aria-label={`${item.title}. ${item.description}. ${
                    isCompleted
                      ? 'Completed. Revisit activity.'
                      : 'Start activity.'
                  }`}
                >

                  {/* ACTIVITY ICON AND NUMBER */}

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >

                    <div className="journey-number">
                      {isCompleted ? (
                        <CheckCircle2
                          size={28}
                          aria-hidden="true"
                        />
                      ) : (
                        <Icon
                          size={28}
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    <span
                      style={{
                        fontSize: '0.8em',
                        fontWeight: 700,
                        opacity: 0.8,
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                  </div>

                  {/* ACTIVITY INFORMATION */}

                  <div className="journey-details">

                    <h3>{item.title}</h3>

                    <p>{item.description}</p>

                  </div>

                  {/* CARD ACTION */}

                  <span
                    className="card-link"
                    style={{
                      width: '100%',
                      justifyContent: 'space-between',
                    }}
                  >

                    {isCompleted
                      ? 'Revisit activity'
                      : 'Start activity'}

                    <ArrowRight
                      size={20}
                      aria-hidden="true"
                    />

                  </span>

                </button>
              )
            })}

          </section>

        </>
      ) : (
        <>

          {/* RETURN TO ACTIVITIES */}

          <button
            className="back-button"
            onClick={returnToJourney}
          >
            <ArrowLeft size={20} />
            My discovery journey
          </button>

          {/* ACTIVE LEARNING ACTIVITY */}

          <section className="activity-panel">

            <div
              className="module-icon green"
              style={{
                width: '72px',
                height: '72px',
              }}
            >
              <ActivityIcon
                size={34}
                aria-hidden="true"
              />
            </div>

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
              onClick={readInstructions}
            >
              <Volume2 size={20} />
              Listen to instructions
            </button>

            {!showFeedback && (
              <>

                {/* MULTIPLE CHOICE ACTIVITIES */}

                {activity.type !== 'reflection' && (
                  <>

                    <p
                      style={{
                        marginTop: '26px',
                        color: 'var(--muted)',
                        fontSize: '0.9em',
                      }}
                    >
                      {activity.type === 'single'
                        ? 'Choose one answer.'
                        : 'Choose as many answers as you like.'}
                    </p>

                    <div className="activity-options">

                      {activity.options.map((option) => (
                        <button
                          key={option}
                          className={`activity-option ${
                            selected.includes(option)
                              ? 'option-selected'
                              : ''
                          }`}
                          aria-pressed={
                            selected.includes(option)
                          }
                          onClick={() =>
                            toggleOption(option)
                          }
                        >

                          <span>{option}</span>

                          {selected.includes(option) && (
                            <CheckCircle2
                              size={22}
                              aria-hidden="true"
                            />
                          )}

                        </button>
                      ))}

                    </div>

                    <p
                      role="status"
                      style={{
                        color: 'var(--muted)',
                        fontSize: '0.9em',
                        marginBottom: '20px',
                      }}
                    >
                      {selected.length === 0
                        ? 'No answers selected yet.'
                        : `${selected.length} ${
                            selected.length === 1
                              ? 'answer'
                              : 'answers'
                          } selected.`}
                    </p>

                  </>
                )}

                {/* REFLECTION ACTIVITIES */}

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
                      You can write, think about your answer,
                      draw your ideas on paper or discuss
                      them with your teacher. Writing is
                      optional, and your text is not saved.
                    </p>

                  </div>
                )}

                {/* ACTIVITY ACTIONS */}

                <div className="activity-actions">

                  <button
                    className="primary-button"
                    disabled={
                      activity.type !== 'reflection' &&
                      selected.length === 0
                    }
                    onClick={completeActivity}
                  >
                    Complete activity
                    <ArrowRight size={20} />
                  </button>

                  <button
                    className="back-button"
                    onClick={nextActivity}
                  >
                    Skip for now
                    <ArrowRight size={18} />
                  </button>

                </div>

              </>
            )}

            {/* COMPLETION FEEDBACK */}

            {showFeedback && (
              <div
                className="activity-feedback"
                role="status"
              >

                <Sparkles
                  size={36}
                  aria-hidden="true"
                />

                <h2>Well done!</h2>

                <p>{activity.feedback}</p>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginTop: '20px',
                  }}
                >

                  <button
                    className="secondary-button"
                    onClick={() =>
                      speak(`Well done! ${activity.feedback}`)
                    }
                  >
                    <Volume2 size={20} />
                    Listen
                  </button>

                  <button
                    className="primary-button"
                    onClick={nextActivity}
                  >
                    {activeIndex ===
                    confidenceActivities.length - 1
                      ? 'Return to my journey'
                      : 'Next activity'}

                    <ArrowRight size={20} />

                  </button>

                </div>

              </div>
            )}

          </section>

        </>
      )}

    </div>
  )
}
