import Confidence from './pages/Confidence'
import Communication from './pages/Communication'
import Reading from './pages/Reading'
import Writing from './pages/Writing'
import { useState } from 'react'
import {
  Sprout,
  House,
  BookOpen,
  MessagesSquare,
  PencilLine,
  Calculator,
  Lightbulb,
  ChartNoAxesColumn,
  Sparkles,
  Volume2,
  Menu,
  X,
  ArrowRight,
  Settings,
  Heart,
} from 'lucide-react'

const modules = [
  {
    id: 'confidence',
    title: 'My Strengths',
    description: 'Discover your strengths and build your confidence.',
    icon: Heart,
    color: 'green',
  },
  {
    id: 'communication',
    title: 'Find My Voice',
    description: 'Express yourself and communicate with confidence.',
    icon: MessagesSquare,
    color: 'blue',
  },
  {
    id: 'reading',
    title: 'Reading',
    description: 'Explore words, stories and new ideas.',
    icon: BookOpen,
    color: 'gold',
  },
  {
    id: 'writing',
    title: 'Writing',
    description: 'Learn to organise and express your thoughts.',
    icon: PencilLine,
    color: 'purple',
  },
  {
    id: 'mathematics',
    title: 'Mathematics',
    description: 'Build number skills for everyday life.',
    icon: Calculator,
    color: 'teal',
  },
  {
    id: 'creative',
    title: 'Create & Explore',
    description: 'Discover coding, creativity and problem-solving.',
    icon: Lightbulb,
    color: 'orange',
  },
]

function App() {
  const [activePage, setActivePage] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [audioMessage, setAudioMessage] = useState('')

  const selectedModule = modules.find(
    (module) => module.id === activePage
  )

  function navigate(page: string) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setAudioMessage('')
    setActivePage(page)
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }

  function speak(text: string) {
    if (!('speechSynthesis' in window)) {
      setAudioMessage('Read-aloud is unavailable in this browser.')
      return
    }

    setAudioMessage('')
    window.speechSynthesis.cancel()

    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = 'en-ZA'
    speech.rate = 0.85

    window.speechSynthesis.speak(speech)
  }

  return (
    <div
      className={`app ${largeText ? 'large-text' : ''} ${
        highContrast ? 'high-contrast' : ''
      }`}
    >
      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-icon">
            <Sprout size={30} />
          </div>

          <div>
            <h2>Sakha Ikamva</h2>
            <p>Building our future</p>
          </div>
        </div>

        <p className="nav-label">MY LEARNING SPACE</p>

        <nav>
          <button
            className={activePage === 'home' ? 'nav-active' : ''}
            onClick={() => navigate('home')}
          >
            <House size={21} /> Home
          </button>

          {modules.map((module) => (
            <button
              key={module.id}
              className={activePage === module.id ? 'nav-active' : ''}
              onClick={() => navigate(module.id)}
            >
              <module.icon size={21} />
              {module.title}
            </button>
          ))}

          <p className="nav-label">MY SUPPORT</p>

          <button
            className={activePage === 'assistant' ? 'nav-active' : ''}
            onClick={() => navigate('assistant')}
          >
            <Sparkles size={21} /> Learning Assistant
          </button>

          <button
            className={activePage === 'progress' ? 'nav-active' : ''}
            onClick={() => navigate('progress')}
          >
            <ChartNoAxesColumn size={21} /> My Progress
          </button>

          <button
            className={activePage === 'settings' ? 'nav-active' : ''}
            onClick={() => navigate('settings')}
          >
            <Settings size={21} /> Accessibility
          </button>
        </nav>

        <div className="sidebar-footer">
          <Sprout size={20} />
          <p>Every learner has potential.</p>
          <small>A Sokhana initiative</small>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button
            className="icon-button mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <div>
            <h3>My Learning Space</h3>
            <p>Sakha Ikamva Pilot Programme</p>
          </div>

          <div className="header-actions">
            <button
              className="icon-button"
              aria-label="Read welcome message aloud"
              onClick={() =>
                speak('Welcome to Sakha Ikamva. Learn at your own pace.')
              }
            >
              <Volume2 size={22} />
            </button>

            <button
              className="icon-button"
              aria-label="Toggle larger text"
              aria-pressed={largeText}
              onClick={() => setLargeText(!largeText)}
            >
              A+
            </button>

            <div className="avatar" aria-label="Demo learner">L</div>
          </div>
        </header>

        {audioMessage && <p role="status">{audioMessage}</p>}

        {activePage === 'home' && (
          <>
            <section className="hero">
              <div className="hero-content">
                <span className="eyebrow">YOUR LEARNING JOURNEY</span>

                <h1>Your future starts with you.</h1>

                <p>
                  Discover your strengths, find your voice and learn
                  at your own pace.
                </p>

                <button
                  className="primary-button"
                  onClick={() => navigate('confidence')}
                >
                  Start learning <ArrowRight size={20} />
                </button>
              </div>

              <Sprout className="hero-decoration" />
            </section>

            <section className="welcome">
              <h2>Welcome to your learning space</h2>
              <p>
                Choose something you would like to explore today.
                There is no need to rush.
              </p>
            </section>

            <section className="learning-grid">
              {modules.map((module) => (
                <button
                  className={`learning-card ${module.color}`}
                  key={module.id}
                  onClick={() => navigate(module.id)}
                >
                  <div className="module-icon">
                    <module.icon size={30} />
                  </div>

                  <h3>{module.title}</h3>
                  <p>{module.description}</p>

                  <span className="card-link">
                    Explore <ArrowRight size={18} />
                  </span>
                </button>
              ))}
            </section>

            <section className="support-card">
              <div className="module-icon">
                <Sparkles size={30} />
              </div>

              <div>
                <h3>Need help with your learning?</h3>
                <p>
                  Explore the learning assistant demonstration.
                </p>
              </div>

              <button
                className="secondary-button"
                onClick={() => navigate('assistant')}
              >
                Get help <ArrowRight size={18} />
              </button>
            </section>
          </>
        )}

        {activePage === 'confidence' && (
          <Confidence onBack={() => navigate('home')} />
        )}

        {activePage === 'communication' && (
          <Communication onBack={() => navigate('home')} />
        )}

        {activePage === 'reading' && (
          <Reading onBack={() => navigate('home')} />
        )}

        {activePage === 'writing' && (
          <Writing onBack={() => navigate('home')} />
        )}

        {selectedModule &&
          activePage !== 'confidence' &&
          activePage !== 'communication' &&
          activePage !== 'reading' &&
          activePage !== 'writing' && (
          <section className="content-panel">
            <div className={`module-icon ${selectedModule.color}`}>
              <selectedModule.icon size={32} />
            </div>

            <h1>{selectedModule.title}</h1>
            <p>{selectedModule.description}</p>

            <button
              className="secondary-button"
              onClick={() =>
                speak(`${selectedModule.title}. ${selectedModule.description}`)
              }
            >
              <Volume2 size={20} /> Listen
            </button>

            <div className="notice">
              Learning activities are being developed for this module.
            </div>

            <button
              className="primary-button"
              onClick={() => navigate('home')}
            >
              Back to home
            </button>
          </section>
        )}

        {activePage === 'assistant' && (
          <section className="content-panel">
            <Sparkles size={36} />
            <h1>My Learning Assistant</h1>
            <p>Learning support, one step at a time.</p>

            <div className="notice">
              This is a demonstration. Live AI integration is not
              enabled yet.
            </div>
          </section>
        )}

        {activePage === 'progress' && (
          <section className="content-panel">
            <ChartNoAxesColumn size={36} />
            <h1>My Progress</h1>
            <p>Every small step matters.</p>

            <div className="notice">
              Your completed learning activities will appear here
              when progress tracking is implemented.
            </div>
          </section>
        )}

        {activePage === 'settings' && (
          <section className="content-panel">
            <h1>Make learning comfortable</h1>
            <p>Choose the settings that work best for you.</p>

            <label className="setting-row">
              Larger text
              <input
                type="checkbox"
                checked={largeText}
                onChange={(event) => setLargeText(event.target.checked)}
              />
            </label>

            <label className="setting-row">
              High contrast
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(event) => setHighContrast(event.target.checked)}
              />
            </label>

            <button
              className="secondary-button"
              onClick={() =>
                speak('You can change your learning settings at any time.')
              }
            >
              <Volume2 size={20} /> Test read-aloud
            </button>
          </section>
        )}

        <footer className="main-footer">
          <p>Sakha Ikamva Pilot Programme</p>
          <small>Sokhana International Industries (Pty) Ltd</small>
        </footer>
      </main>
    </div>
  )
}

export default App
