import { BookOpen, Drop, PersonSimpleRun, Tree, TreeEvergreen } from '@phosphor-icons/react'
import { Bar, LockScreen, Notification, Phone, Stage, Window } from '../../kit'
import './web.css'

// Habita on the web and on the phone: a device pair. The dashboard shows the
// Morning run habit's 12-week forest; the phone beside it, locked at 6:30 on
// the same Wednesday, shows the reminder for the session the forest is
// waiting on (the habit is time bound, so it reminds at its time). Today's
// plot is lit and bare in the forest: one tree to plant.
//
// The window is pinned top-left and runs off the bottom; the phone straddles
// its right edge over the page's empty margin and the habit tiles, so the
// forest and its count stay clear. Narrow, the window runs off the right and
// the phone stands a gutter in from it, whole across, its banner whole.
//
// Real strings: Habita, Morning run, its schedule, Week 6 of 12, the count,
// two other habits' names and the notification. Everything else is bars.

const DAYS = ['M', 'W', 'F', 'S']
const WEEKS = 12
const NOW = { week: 5, day: 1 }
const MISSED = new Set(['1-2', '3-3'])

type Plot = 'tree' | 'missed' | 'today' | 'soil'
const plotOf = (w: number, d: number): Plot => {
  if (w < NOW.week || (w === NOW.week && d < NOW.day)) return MISSED.has(`${w}-${d}`) ? 'missed' : 'tree'
  if (w === NOW.week && d === NOW.day) return 'today'
  return 'soil'
}
const DONE = Array.from({ length: WEEKS * DAYS.length }, (_, i) => plotOf(Math.floor(i / DAYS.length), i % DAYS.length)).filter((p) => p === 'tree').length

const SHADES = ['hw-tree--a', 'hw-tree--b', 'hw-tree--c']
const treeAt = (w: number, d: number) => ({ evergreen: ((w * 7 + d * 3) % 5) % 2 === 0, shade: SHADES[(w + d * 2) % 3] })

const WALL =
  'radial-gradient(120% 60% at 20% 0%, rgba(177, 59, 255, 0.55), transparent 65%), radial-gradient(90% 60% at 100% 100%, rgba(71, 19, 150, 0.9), transparent 70%), linear-gradient(175deg, #1a0a66 0%, #0c0350 60%, #090040 100%)'

export default function HabitaWeb() {
  return (
    <Stage width={760} height={500} compact={{ below: 640, width: 358, height: 358 }} theme="dark" className="hw">
      {(_, __, layout) => (
        <>
          <div className="hw-glow" />
          <Window url="habita.app/habits/morning-run" className="hw-window">
            <div className="hw-page">
              <nav className="hw-nav">
                <span className="hw-logo">Habita</span>
                <span className="hw-nav__item" data-active>
                  <Bar w={40} h={6} tone={4} />
                </span>
                <span className="hw-nav__item">
                  <Bar w={52} h={6} tone={2} />
                </span>
                <span className="hw-nav__item">
                  <Bar w={34} h={6} tone={2} />
                </span>
              </nav>

              <main className="hw-main">
              <header className="hw-head">
                <span className="hw-head__icon">
                  <PersonSimpleRun weight="fill" size={20} />
                </span>
                <span className="hw-head__text">
                  <span className="hw-title">Morning run</span>
                  <span className="hw-sub">6:30 AM · Mon, Wed, Fri, Sat</span>
                </span>
              </header>

              <section className="hw-forest">
                <div className="hw-forest__head">
                  <span className="hw-forest__label">Week 6 of 12</span>
                  <span className="hw-count">
                    <Tree weight="fill" size={16} />
                    <span className="hw-count__n">{DONE}</span>
                    <span className="hw-count__unit">trees</span>
                  </span>
                </div>
                <div className="hw-grid">
                  {DAYS.map((day, d) => (
                    <div key={d} className="hw-grid__row">
                      <span className="hw-grid__day">{day}</span>
                      <span className="hw-grid__plots">
                        {Array.from({ length: WEEKS }, (_, w) => {
                          const plot = plotOf(w, d)
                          const { evergreen, shade } = treeAt(w, d)
                          const Glyph = evergreen ? TreeEvergreen : Tree
                          const size = layout === 'compact' ? 18 : 22
                          return (
                            <span key={w} className="hw-plot" data-plot={plot}>
                              {plot === 'tree' && <Glyph weight="fill" size={size} className={`hw-tree ${shade}`} />}
                              {plot === 'missed' && <Tree weight="fill" size={size} className="hw-tree hw-tree--missed" />}
                              {(plot === 'soil' || plot === 'today') && <span className="hw-soil" />}
                            </span>
                          )
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <div className="hw-habits">
                <div className="hw-habit hw-art--violet">
                  <span className="hw-habit__icon">
                    <BookOpen weight="fill" size={16} />
                  </span>
                  <span className="hw-habit__name">Read 20 pages</span>
                  <span className="hw-habit__sub">Anytime</span>
                </div>
                <div className="hw-habit hw-art--purple">
                  <span className="hw-habit__icon">
                    <Drop weight="fill" size={16} />
                  </span>
                  <span className="hw-habit__name">Drink water</span>
                  <span className="hw-habit__sub">Anytime</span>
                </div>
                <div className="hw-habit hw-art--yellow">
                  <span className="hw-habit__icon">
                    <span className="hw-habit__blank" />
                  </span>
                  <span className="hw-line" style={{ width: 72 }} />
                  <span className="hw-line hw-line--faint" style={{ width: 44 }} />
                </div>
              </div>
              </main>
            </div>
          </Window>

          {layout === 'wide' && (
          <Phone width={240} frame="pro" dark time="6:30" wallpaper={WALL} className="hw-phone">
            <LockScreen size="satellite" stack="top" date="Wednesday, November 11" time="6:30">
              <Notification
                icon={
                  <span className="hw-app">
                    <TreeEvergreen weight="fill" size={20} />
                  </span>
                }
                title="Morning run"
                body="It's 6:30. Today's tree is waiting."
              />
            </LockScreen>
          </Phone>
          )}
        </>
      )}
    </Stage>
  )
}
