import { BookOpen, Check, PersonSimpleRun, Tree, TreeEvergreen, X } from '@phosphor-icons/react'
import { Avatar, Bar, Count, Expand, Phone, Stage, States, type Act } from '../../kit'
import './habita.css'

// Habita, the habit tracker, on iPhone. Dark only, glass over violet glows,
// bold habit cards in navy, purple, violet and yellow. Story in three beats, after phone-touch:
// the Today list (context), a tap on "Morning run" opens its card into the
// habit's 12-week forest (action), "Plant today's tree" grows a tree in
// today's plot and the count rolls (result). It loops by being put back:
// close, and the card folds into its place in the list; the planted tree and
// the count reset while the body is hidden behind the card's clip.
//
// The forest has a column per week and a row per scheduled weekday (the
// habit runs Mon, Wed, Fri and Sat for 12 weeks): a tree for each session
// done, a withered one for a session missed, bare soil for what's ahead.
//
// Real strings: Today, Morning run, 6:30 AM, Read 20 pages, Anytime,
// Week 6 of 12, the tree count, Plant today's tree / Planted. The weekday
// strip and the forest's row letters are the calendar itself.

type S = { open: boolean; planted: boolean }

const START: S = { open: false, planted: false }

const CARD = { x: 20, h: 132, r: 28 }
const TOPS = [226, 372, 518, 664]
const PICK = 0
const REST = { x: 330, y: 300 }
const HEADER = 260

// Mon 9 to Sun 15 November; today is Wednesday the 11th
const WEEK = [
  ['M', 9],
  ['T', 10],
  ['W', 11],
  ['T', 12],
  ['F', 13],
  ['S', 14],
  ['S', 15],
] as const
const TODAY = 2

// The habit's schedule: four of seven days, twelve weeks
const DAYS = ['M', 'W', 'F', 'S']
const WEEKS = 12
const NOW = { week: 5, day: 1 } // week 6 (0-based 5), Wednesday (row 1)
const MISSED = new Set(['1-2', '3-3'])

type Plot = 'tree' | 'missed' | 'today' | 'soil'
const plotOf = (w: number, d: number): Plot => {
  if (w < NOW.week || (w === NOW.week && d < NOW.day)) return MISSED.has(`${w}-${d}`) ? 'missed' : 'tree'
  if (w === NOW.week && d === NOW.day) return 'today'
  return 'soil'
}
const DONE = Array.from({ length: WEEKS * DAYS.length }, (_, i) => plotOf(Math.floor(i / DAYS.length), i % DAYS.length)).filter((p) => p === 'tree').length

// Three greens and two shapes, chosen per plot so the forest reads planted, not tiled
const SHADES = ['hb-tree--a', 'hb-tree--b', 'hb-tree--c']
const treeAt = (w: number, d: number) => {
  const h = (w * 7 + d * 3) % 5
  return { evergreen: h % 2 === 0, shade: SHADES[(w + d * 2) % 3] }
}

const ART = ['hb-art--yellow', 'hb-art--violet', 'hb-art--purple', 'hb-art--yellow']

const script = async (a: Act<S>) => {
  await a.wait(900)
  a.mark('tap')
  await a.click({ at: 'card', x: 0.55, y: 0.35 })
  a.put({ open: true })
  await a.wait(1700)
  a.mark('plant')
  await a.click({ at: 'plant', x: 0.86, y: 0.6 })
  a.put({ planted: true })
  await a.wait(2600)
  a.mark('close')
  await a.click('close')
  a.put({ open: false })
  await a.wait(700)
  // Behind the card's clip now: today's plot goes back to soil unseen
  await a.snap({ planted: false })
  await a.move(REST)
  await a.wait(300)
}

function Forest({ planted }: { planted: boolean }) {
  return (
    <div className="hb-forest">
      {DAYS.map((day, d) => (
        <div key={d} className="hb-forest__row">
          <span className="hb-forest__day">{day}</span>
          <span className="hb-forest__plots">
          {Array.from({ length: WEEKS }, (_, w) => {
            const plot = plotOf(w, d)
            const { evergreen, shade } = treeAt(w, d)
            const Glyph = evergreen ? TreeEvergreen : Tree
            return (
              <span key={w} className="hb-plot" data-plot={plot} data-planted={(plot === 'today' && planted) || undefined}>
                {plot === 'tree' && <Glyph weight="fill" size={22} className={`hb-tree ${shade}`} />}
                {plot === 'missed' && <Tree weight="fill" size={22} className="hb-tree hb-tree--missed" />}
                {plot === 'soil' && <span className="hb-soil" />}
                {plot === 'today' && (
                  <>
                    <span className="hb-soil hb-soil--today" />
                    <span className="hb-sprout">
                      <TreeEvergreen weight="fill" size={22} className="hb-tree hb-tree--a" />
                    </span>
                  </>
                )}
              </span>
            )
          })}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function HabitaPhone() {
  return (
    <Stage<S>
      width={400}
      height={540}
      compact={{ below: 400, width: 358, height: 540 }}
      theme="dark"
      initial={START}
      poster={{ open: true, planted: true }}
      script={script}
      cursor={{ at: REST, style: 'touch' }}
      className="hb"
    >
      {(s, rect, layout) => {
        const top = TOPS[PICK]
        return (
          <>
            <div className="hb-glow" />
            <Phone width={layout === 'compact' ? 326 : 304} dark className="hb-phone" data-open={s.open || undefined}>
              <div className="hb-list" data-back={s.open || undefined}>
                <header className="hb-head">
                  <Bar w={104} h={8} r={4} tone={3} />
                  <div className="hb-head__row">
                    <span className="hb-title">Today</span>
                    <Avatar name="Alvi" size={36} style={{ background: '#b13bff', color: '#fff' }} />
                  </div>
                </header>
                <div className="hb-week">
                  {WEEK.map(([letter, date], i) => (
                    <span key={i} className="hb-day" data-today={i === TODAY || undefined}>
                      <span className="hb-day__letter">{letter}</span>
                      <span className="hb-day__date">{date}</span>
                    </span>
                  ))}
                </div>
                {TOPS.map((y, i) =>
                  i === PICK ? (
                    <span key={i} className="hb-slot" data-target="card" style={{ top: y }} />
                  ) : (
                    <div key={i} className={`hb-card ${ART[i]}`} style={{ top: y }}>
                      <span className="hb-card__text">
                        {i === 1 ? (
                          <>
                            <span className="hb-card__title">Read 20 pages</span>
                            <span className="hb-card__sub">Anytime</span>
                          </>
                        ) : (
                          <>
                            <span className="hb-line" style={{ width: i === 2 ? 118 : 96, height: 12 }} />
                            <span className="hb-line hb-line--faint" style={{ width: i === 2 ? 58 : 72, height: 8 }} />
                          </>
                        )}
                      </span>
                      <span className="hb-badge">{i === 1 ? <BookOpen weight="fill" size={22} /> : <span className="hb-badge__blank" />}</span>
                    </div>
                  ),
                )}
              </div>

              {/* The picked card and its detail are one element */}
              <div className="hb-press" style={{ transformOrigin: `50% ${top + CARD.h / 2}px` }}>
                <Expand className="hb-detail" open={s.open} from={rect('card')} radius={CARD.r} duration={620}>
                  <div className="hb-detail__inner" style={{ transform: `translateY(${s.open ? 0 : CARD.h - HEADER}px)` }}>
                    <div
                      className={`hb-hero ${ART[PICK]}`}
                      style={{
                        clipPath: s.open
                          ? 'inset(0px 0px 0px 0px round 0px 0px 0px 0px)'
                          : `inset(0px ${CARD.x}px 0px ${CARD.x}px round 0px 0px ${CARD.r}px ${CARD.r}px)`,
                      }}
                    >
                      <span className="hb-sched">
                        {WEEK.map(([letter], i) => (
                          <span key={i} className="hb-sched__day" data-on={[0, 2, 4, 5].includes(i) || undefined}>
                            {letter}
                          </span>
                        ))}
                      </span>
                      <span className="hb-close" data-target="close">
                        <X weight="bold" size={16} />
                      </span>
                      <span className="hb-hero__text">
                        <span className="hb-hero__title">Morning run</span>
                        <span className="hb-hero__sub">6:30 AM</span>
                      </span>
                      <span className="hb-badge hb-hero__badge">
                        <PersonSimpleRun weight="fill" size={22} />
                      </span>
                    </div>
                    <div className="hb-body">
                      <div className="hb-panel">
                        <div className="hb-panel__head">
                          <span className="hb-panel__label">Week 6 of 12</span>
                          <span className="hb-total">
                            <Tree weight="fill" size={16} />
                            <span className="hb-total__n">
                              <Count value={DONE + (s.planted ? 1 : 0)} />
                            </span>
                            <span className="hb-total__unit">trees</span>
                          </span>
                        </div>
                        <Forest planted={s.planted} />
                      </div>
                      <span className="hb-plant" data-target="plant" data-done={s.planted || undefined}>
                        <States
                          value={s.planted ? 'done' : 'idle'}
                          states={{
                            idle: (
                              <span className="hb-plant__label" style={{ width: 172 }}>
                                <TreeEvergreen weight="fill" size={18} /> Plant today's tree
                              </span>
                            ),
                            done: (
                              <span className="hb-plant__label" style={{ width: 84 }}>
                                <Check weight="bold" size={18} /> Planted
                              </span>
                            ),
                          }}
                        />
                      </span>
                      <div className="hb-rows">
                        {[
                          [96, 44],
                          [128, 36],
                        ].map(([a, b], i) => (
                          <span key={i} className="hb-row">
                            <span className="hb-row__icon" />
                            <Bar w={a} h={8} r={4} tone={3} />
                            <Bar w={b} h={8} r={4} tone={2} style={{ marginLeft: 'auto' }} />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Expand>
              </div>
            </Phone>
          </>
        )
      }}
    </Stage>
  )
}
