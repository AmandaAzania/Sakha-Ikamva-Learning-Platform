
import { useEffect, useState } from 'react'
import {
  MessagesSquare,
  Megaphone,
  Heart,
  Headphones,
  BookOpen,
  Mic,
  HandHelping,
  Volume2,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  RotateCcw,
} from 'lucide-react'

import { communicationActivities } from '../data/communicationContent'

import './Confidence.css'
import './Communication.css'

interface CommunicationProps {
  onBack: () => void
  onComplete?: (activityId: string) => void
}

const activityIcons = [
  Megaphone,
  Heart,
  Headphones,
  MessagesSquare,
  BookOpen,
  Mic,
  HandHelping,
]

const heroTitle = 'Your voice deserves to be heard.'

const heroDescription =
  'Discover different ways to express yourself, share your ideas and connect with the people around you.'

export default function Communication({
  onBack,
  onComplete,
}: CommunicationProps) {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(null)

  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [checked, setChecked] = useState(false)
  const [completed, setCompleted] = useState<string[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [reflection, setReflection] = useState('')
  const [sequence, setSequence] = useState<string[]>([])
  const [sequenceChecked, setSequenceChecked] = useState(false)
  const [audioStatus, setAudioStatus] = useState('')

  const activity =
    activeIndex === null
      ? null
      : communicationActivities[activeIndex]

  const question = activity?.questions?.[questionIndex]

  const progress = Math.round(
    (completed.length / communicationActivities.length) * 100
  )

  const sequenceCorrect =
    sequence.length === activity?.correctSequence?.length &&
    sequence.every(
      (step, index) =>
        step === activity?.correctSequence?.[index]
    )

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

    speech.onerror = (event) => {
      if (
        event.error !== 'canceled' &&
        event.error !== 'interrupted'
      ) {
        setAudioStatus('Audio could not play. Please try again.')
      }
    }

    window.speechSynthesis.speak(speech)
  }

  function resetActivity() {
    stopAudio()
    setQuestionIndex(0)
    setSelectedAnswer('')
    setChecked(false)
    setShowFeedback(false)
    setReflection('')
    setSequence([])
    setSequenceChecked(false)
    setAudioStatus('')
  }

  function openActivity(index: number) {
    resetActivity()
    setActiveIndex(index)
    window.scrollTo(0, 0)
  }

  function returnToJourney() {
    resetActivity()
    setActiveIndex(null)
    window.scrollTo(0, 0)
  }

  function completeActivity() {
    if (!activity) return

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

  function nextActivity() {
    if (
      activeIndex !== null &&
      activeIndex < communicationActivities.length - 1
    ) {
      openActivity(activeIndex + 1)
    } else {
      returnToJourney()
    }
  }

  function nextQuestion() {
    if (!activity?.questions) return

    stopAudio()

    if (questionIndex < activity.questions.length - 1) {
      setQuestionIndex((previous) => previous + 1)
      setSelectedAnswer('')
      setChecked(false)
    } else {
      completeActivity()
    }
  }

  function readQuestion() {
    if (!question) return

    speak(
      `${question.question}. Your choices are: ${
        question.options.join('. ')
      }`
    )
  }

  function addSequenceStep(step: string) {
    if (sequenceChecked) return

    setSequence((previous) =>
      previous.includes(step)
        ? previous.filter((item) => item !== step)
        : [...previous, step]
    )
  }

  function resetSequence() {
    setSequence([])
    setSequenceChecked(false)
  }

  return (
    <div className="confidence-page communication-page">
      {audioStatus && (
        <p role="status">{audioStatus}</p>
      )}

      {!activity ? (
        <>
          <button
            className="back-button"
            onClick={() => {
              stopAudio()
              onBack()
            }}
          >
            <ArrowLeft size={20} />
            Back to home
          </button>

          <section className="confidence-hero communication-hero">
            <MessagesSquare size={40} />

            <span className="eyebrow">
              FIND MY VOICE
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

          <section className="journey-progress">
            <div className="progress-heading">
              <h3>My communication journey</h3>

              <span>
                {completed.length} of{' '}
                {communicationActivities.length} completed
              </span>
            </div>

            <div
              className="progress-track"
              role="progressbar"
              aria-label="Communication activities completed"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p>Every voice is valuable.</p>
          </section>

          <section className="welcome">
            <h2>Discover your voice</h2>

            <p>
              Choose an activity and explore different
              ways to communicate.
            </p>
          </section>

          <section className="journey-list">
            {communicationActivities.map((item, index) => {
              const Icon = activityIcons[index] ?? MessagesSquare
              const isCompleted = completed.includes(item.id)

              return (
                <button
                  className="journey-card"
                  key={item.id}
                  onClick={() => openActivity(index)}
                >
                  <div className="communication-card-top">
                    <div className="journey-number">
                      {isCompleted ? (
                        <CheckCircle2 size={28} />
                      ) : (
                        <Icon size={28} />
                      )}
                    </div>

                    <span>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="journey-details">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  <div className="communication-card-action">
                    <span>
                      {isCompleted
                        ? 'Revisit activity'
                        : 'Start activity'}
                    </span>

                    <ArrowRight size={20} />
                  </div>
                </button>
              )
            })}
          </section>
        </>
      ) : (
        <>
          <button
            className="back-button"
            onClick={returnToJourney}
          >
            <ArrowLeft size={20} />
            My communication journey
          </button>

          <section className="activity-panel">
            <span className="activity-label">
              ACTIVITY {(activeIndex ?? 0) + 1} OF{' '}
              {communicationActivities.length}
            </span>

            <h1>{activity.title}</h1>

            <p className="activity-instruction">
              {activity.instruction}
            </p>

            <button
              className="secondary-button"
              onClick={() =>
                speak(
                  `${activity.title}. ${activity.instruction}`
                )
              }
            >
              <Volume2 size={20} />
              Listen to instructions
            </button>

            {!showFeedback && (
              <>
                {/* LISTENING EXERCISE */}

                {activity.type === 'listening' &&
                  activity.passage && (
                    <div className="listening-panel">
                      <Headphones size={32} />

                      <h2>Listen to the story</h2>

                      <button
                        className="primary-button"
                        onClick={() =>
                          speak(activity.passage ?? '')
                        }
                      >
                        <Volume2 size={20} />
                        Play story
                      </button>

                      <details className="story-transcript">
                        <summary>Read the story instead</summary>

                        <p>{activity.passage}</p>
                      </details>
                    </div>
                  )}

                {/* SCENARIOS AND QUESTIONS */}

                {question && (
                  <div className="communication-question">
                    <span className="question-counter">
                      Question {questionIndex + 1} of{' '}
                      {activity.questions?.length}
                    </span>

                    <h2>{question.question}</h2>

                    <button
                      className="secondary-button"
                      onClick={readQuestion}
                    >
                      <Volume2 size={18} />
                      Read question and answers
                    </button>

                    <div className="activity-options">
                      {question.options.map((option) => (
                        <button
                          key={option}
                          disabled={checked}
                          aria-pressed={selectedAnswer === option}
                          className={`activity-option ${
                            selectedAnswer === option
                              ? 'option-selected'
                              : ''
                          }`}
                          onClick={() =>
                            setSelectedAnswer(option)
                          }
                        >
                          <span>{option}</span>

                          {selectedAnswer === option && (
                            <CheckCircle2 size={22} />
                          )}
                        </button>
                      ))}
                    </div>

                    {!checked ? (
                      <button
                        className="primary-button"
                        disabled={!selectedAnswer}
                        onClick={() => setChecked(true)}
                      >
                        Check my answer
                        <ArrowRight size={20} />
                      </button>
                    ) : (
                      <div
                        className="communication-feedback"
                        role="status"
                      >
                        <h3>
                          {selectedAnswer === question.correctAnswer
                            ? 'Well done!'
                            : 'Here is another way to think about it.'}
                        </h3>

                        {selectedAnswer !== question.correctAnswer && (
                          <p>
                            A helpful response is:{' '}
                            <strong>
                              {question.correctAnswer}
                            </strong>
                          </p>
                        )}

                        <p>{question.explanation}</p>

                        <button
                          className="primary-button"
                          onClick={nextQuestion}
                        >
                          {questionIndex ===
                          (activity.questions?.length ?? 0) - 1
                            ? 'Complete activity'
                            : 'Next question'}

                          <ArrowRight size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* STORY SEQUENCING */}

                {activity.type === 'sequence' && (
                  <div className="sequence-panel">
                    <h2>Choose the sentences in order</h2>

                    <div className="activity-options">
                      {activity.steps?.map((step) => (
                        <button
                          key={step}
                          disabled={sequenceChecked}
                          aria-pressed={sequence.includes(step)}
                          className={`activity-option ${
                            sequence.includes(step)
                              ? 'option-selected'
                              : ''
                          }`}
                          onClick={() => addSequenceStep(step)}
                        >
                          <span>{step}</span>

                          {sequence.includes(step) && (
                            <span className="sequence-number">
                              {sequence.indexOf(step) + 1}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="sequence-preview">
                      <h3>My story sequence</h3>

                      {sequence.length === 0 ? (
                        <p>
                          Your sentences will appear here.
                        </p>
                      ) : (
                        <ol>
                          {sequence.map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ol>
                      )}
                    </div>

                    {sequenceChecked && (
                      <div
                        className="communication-feedback"
                        role="status"
                      >
                        <h3>
                          {sequenceCorrect
                            ? 'Great storytelling!'
                            : 'Try another order.'}
                        </h3>

                        <p>
                          {sequenceCorrect
                            ? 'Your story has a clear beginning, middle and ending.'
                            : 'Look for words such as first, next and finally.'}
                        </p>
                      </div>
                    )}

                    <div className="activity-actions">
                      {sequenceChecked && sequenceCorrect ? (
                        <button
                          className="primary-button"
                          onClick={completeActivity}
                        >
                          Complete activity
                          <ArrowRight size={20} />
                        </button>
                      ) : (
                        <button
                          className="primary-button"
                          disabled={
                            sequenceChecked ||
                            sequence.length !==
                              activity.steps?.length
                          }
                          onClick={() =>
                            setSequenceChecked(true)
                          }
                        >
                          Check my story
                        </button>
                      )}

                      <button
                        className="secondary-button"
                        onClick={resetSequence}
                      >
                        <RotateCcw size={18} />
                        Start again
                      </button>
                    </div>
                  </div>
                )}

                {/* GUIDED SPEAKING PRACTICE */}

                {activity.type === 'reflection' && (
                  <div className="speaking-panel">
                    <h2>Build your message</h2>

                    <div className="speaking-prompts">
                      {activity.prompts?.map((prompt) => (
                        <div
                          className="speaking-prompt"
                          key={prompt}
                        >
                          <p>{prompt}</p>

                          <button
                            className="prompt-audio"
                            aria-label={`Read ${prompt}`}
                            onClick={() => speak(prompt)}
                          >
                            <Volume2 size={20} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="reflection-area">
                      <label htmlFor="communication-reflection">
                        My ideas (optional)
                      </label>

                      <textarea
                        id="communication-reflection"
                        value={reflection}
                        onChange={(event) =>
                          setReflection(event.target.value)
                        }
                        placeholder="Prepare your ideas here..."
                        rows={6}
                        maxLength={1500}
                      />

                      <p>
                        You can write, practise aloud,
                        use another communication method
                        or discuss your ideas with your teacher.
                        Your text is not saved and no audio
                        is recorded.
                      </p>
                    </div>

                    <button
                      className="primary-button"
                      onClick={completeActivity}
                    >
                      Complete activity
                      <ArrowRight size={20} />
                    </button>
                  </div>
                )}

                <button
                  className="back-button communication-skip"
                  onClick={nextActivity}
                >
                  Skip for now
                  <ArrowRight size={18} />
                </button>
              </>
            )}

            {/* COMPLETION */}

            {showFeedback && (
              <div
                className="activity-feedback"
                role="status"
              >
                <Sparkles size={36} />

                <h2>Well done!</h2>

                <p>{activity.feedback}</p>

                <div className="activity-actions">
                  <button
                    className="secondary-button"
                    onClick={() =>
                      speak(activity.feedback)
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
                    communicationActivities.length - 1
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
