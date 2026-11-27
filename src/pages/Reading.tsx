
import { useEffect, useState } from 'react'

import {
  BookOpen,
  Puzzle,
  Blocks,
  Headphones,
  Brain,
  Search,
  Newspaper,
  Sparkles,
  Volume2,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react'

import { readingActivities } from '../data/readingContent'
import ReadingToolbar from '../components/ReadingToolbar'

import './Confidence.css'
import './Reading.css'

interface ReadingProps {
  onBack: () => void
  onComplete?: (activityId: string) => void
}

const activityIcons = [
  BookOpen,
  Puzzle,
  Blocks,
  Headphones,
  Brain,
  Search,
  Newspaper,
  Sparkles,
]

const heroTitle = 'Every word opens a new world.'

const heroDescription =
  'Explore stories, discover new words and develop your reading skills at your own pace.'

export default function Reading({
  onBack,
  onComplete,
}: ReadingProps) {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(null)

  const [completed, setCompleted] = useState<string[]>([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [checked, setChecked] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [sequence, setSequence] = useState<string[]>([])
  const [sequenceChecked, setSequenceChecked] = useState(false)
  const [reflection, setReflection] = useState('')
  const [audioStatus, setAudioStatus] = useState('')

  const activity =
    activeIndex === null
      ? null
      : readingActivities[activeIndex]

  const question = activity?.questions?.[questionIndex]

  const progress = Math.round(
    (completed.length / readingActivities.length) * 100
  )

  const sequenceCorrect =
    sequence.length === activity?.correctSequence?.length &&
    sequence.every(
      (word, index) =>
        word === activity?.correctSequence?.[index]
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
        setAudioStatus(
          'Audio could not play. Please try again.'
        )
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
    setSequence([])
    setSequenceChecked(false)
    setReflection('')
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
      activeIndex < readingActivities.length - 1
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

  function toggleWord(word: string) {
    if (sequenceChecked) return

    setSequence((previous) =>
      previous.includes(word)
        ? previous.filter((item) => item !== word)
        : [...previous, word]
    )
  }

  function resetSequence() {
    setSequence([])
    setSequenceChecked(false)
  }

  return (
    <div className="confidence-page reading-page">
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

          <section className="confidence-hero reading-hero">
            <BookOpen size={40} />

            <span className="eyebrow">
              MY READING JOURNEY
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
              <h3>My reading progress</h3>

              <span>
                {completed.length} of{' '}
                {readingActivities.length} completed
              </span>
            </div>

            <div
              className="progress-track"
              role="progressbar"
              aria-label="Reading activities completed"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p>
              One word, one sentence, one step at a time.
            </p>
          </section>

          <section className="welcome">
            <h2>Explore your reading journey</h2>

            <p>
              Choose an activity and discover what works
              for you. There is no need to rush.
            </p>
          </section>

          <section className="journey-list">
            {readingActivities.map((item, index) => {
              const Icon = activityIcons[index] ?? BookOpen
              const isCompleted = completed.includes(item.id)

              return (
                <button
                  className="journey-card"
                  key={item.id}
                  onClick={() => openActivity(index)}
                >
                  <div className="reading-card-top">
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

                  <div className="reading-card-action">
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
            My reading journey
          </button>

          <section className="activity-panel">
            <span className="activity-label">
              ACTIVITY {(activeIndex ?? 0) + 1} OF{' '}
              {readingActivities.length}
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
                {/* READING PASSAGES */}

                {activity.passage && (
                  <ReadingToolbar
                    key={activity.id}
                    text={activity.passage}
                    title="My reading space"
                  />
                )}

                {/* SUPPORTED READING */}

                {activity.type === 'reading' && (
                  <div className="reading-section">
                    <p>
                      Take as much time as you need.
                      You can read the passage again
                      or try different reading settings.
                    </p>

                    <button
                      className="primary-button"
                      onClick={completeActivity}
                    >
                      Complete activity
                      <ArrowRight size={20} />
                    </button>
                  </div>
                )}

                {/* QUESTIONS */}

                {question && (
                  <div className="reading-section">
                    <span className="reading-question-counter">
                      Question {questionIndex + 1} of{' '}
                      {activity.questions?.length}
                    </span>

                    <h2>{question.question}</h2>

                    <button
                      className="secondary-button"
                      onClick={() =>
                        speak(
                          `${question.question}. Your choices are: ${question.options.join('. ')}`
                        )
                      }
                    >
                      <Volume2 size={18} />
                      Read question and answers
                    </button>

                    <div className="activity-options">
                      {question.options.map((option) => (
                        <button
                          key={option}
                          disabled={checked}
                          aria-pressed={
                            selectedAnswer === option
                          }
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
                        className="reading-feedback"
                        role="status"
                      >
                        <h3>
                          {selectedAnswer === question.answer
                            ? 'Well done!'
                            : 'Let us explore the answer.'}
                        </h3>

                        {selectedAnswer !== question.answer && (
                          <p>
                            The answer is:{' '}
                            <strong>{question.answer}</strong>
                          </p>
                        )}

                        <p>{question.explanation}</p>

                        <div className="activity-actions">
                          <button
                            className="secondary-button"
                            onClick={() =>
                              speak(
                                `${question.answer}. ${question.explanation}`
                              )
                            }
                          >
                            <Volume2 size={18} />
                            Listen
                          </button>

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
                      </div>
                    )}
                  </div>
                )}

                {/* SENTENCE BUILDING */}

                {activity.type === 'sequence' && (
                  <div className="reading-section">
                    <h2>Choose your words</h2>

                    <div className="reading-word-bank">
                      {activity.words?.map((word) => (
                        <button
                          key={word}
                          disabled={sequenceChecked}
                          aria-pressed={sequence.includes(word)}
                          className={`reading-word ${
                            sequence.includes(word)
                              ? 'reading-word-selected'
                              : ''
                          }`}
                          onClick={() => toggleWord(word)}
                        >
                          {word}
                        </button>
                      ))}
                    </div>

                    <div className="reading-sentence-builder">
                      <h3>My sentence</h3>

                      <p aria-live="polite">
                        {sequence.length
                          ? sequence.join(' ')
                          : 'Your sentence will appear here.'}
                      </p>
                    </div>

                    {sequence.length > 0 && (
                      <button
                        className="secondary-button"
                        onClick={() =>
                          speak(sequence.join(' '))
                        }
                      >
                        <Volume2 size={18} />
                        Listen to my sentence
                      </button>
                    )}

                    {sequenceChecked && (
                      <div
                        className="reading-feedback"
                        role="status"
                      >
                        <h3>
                          {sequenceCorrect
                            ? 'Great sentence!'
                            : 'Try another order.'}
                        </h3>

                        <p>
                          {sequenceCorrect
                            ? 'Your words form a meaningful sentence.'
                            : 'Think about who is doing the action and what they are doing.'}
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
                              activity.words?.length
                          }
                          onClick={() =>
                            setSequenceChecked(true)
                          }
                        >
                          Check my sentence
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

                {/* READING REFLECTION */}

                {activity.type === 'reflection' && (
                  <div className="reading-section">
                    <h2>Discover what helps you learn</h2>

                    <div className="reading-prompts">
                      {activity.prompts?.map((prompt) => (
                        <div
                          className="reading-prompt"
                          key={prompt}
                        >
                          <p>{prompt}</p>

                          <button
                            className="secondary-button"
                            aria-label={`Read ${prompt}`}
                            onClick={() => speak(prompt)}
                          >
                            <Volume2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="reflection-area">
                      <label htmlFor="reading-reflection">
                        My reflection (optional)
                      </label>

                      <textarea
                        id="reading-reflection"
                        value={reflection}
                        onChange={(event) =>
                          setReflection(event.target.value)
                        }
                        placeholder="What helps you enjoy reading?"
                        rows={6}
                        maxLength={1500}
                      />

                      <p>
                        You can write, think quietly or discuss
                        your ideas with your teacher.
                        Your reflection is not saved.
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
                  className="back-button reading-skip"
                  onClick={nextActivity}
                >
                  Skip for now
                  <ArrowRight size={18} />
                </button>
              </>
            )}

            {/* ACTIVITY COMPLETION */}

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
                    {activeIndex === readingActivities.length - 1
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
