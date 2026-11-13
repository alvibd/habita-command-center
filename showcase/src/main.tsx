import { createRoot } from 'react-dom/client'
import { Tree, TreeEvergreen } from '@phosphor-icons/react'
import HabitaPhone from './demos/habita-phone'
import HabitaWeb from './demos/habita-web'
import './page.css'

const SWATCHES = [
  { name: 'Navy', hex: '#090040', use: 'App and page background' },
  { name: 'Purple', hex: '#471396', use: 'Glows, habit cards, missed sessions' },
  { name: 'Violet', hex: '#B13BFF', use: 'Habit cards, glows, avatars' },
  { name: 'Yellow', hex: '#FFCC00', use: 'Today, the main action, trees' },
]

function Page() {
  return (
    <div className="pg">
      <header className="pg-intro">
        <div className="pg-brand">Habita</div>
        <p className="pg-lede">
          A habit tracker for iPhone, Android and the web. Every session you keep plants a tree, and twelve weeks of sessions grow a forest.
        </p>
        <ul className="pg-facts">
          <li>Dark mode only</li>
          <li>Liquid glass over bold habit cards</li>
          <li>Habits run 12 weeks or more</li>
        </ul>
      </header>

      <section className="pg-hero">
        <div className="pg-copy">
          <div className="pg-eyebrow">On the phone</div>
          <h2 className="pg-h">Plant today’s tree</h2>
          <p>
            Tap a habit on Today and its card opens into the habit: the days you picked, the time it’s set for, and its forest, with a plot for every session in its twelve weeks.
          </p>
          <p>Mark today’s session done and a tree grows in today’s plot. The count goes up by one.</p>
        </div>
        <div className="pg-demo pg-demo--phone">
          <HabitaPhone />
        </div>
      </section>

      <section className="pg-wide">
        <div className="pg-copy pg-copy--row">
          <div>
            <div className="pg-eyebrow">On the web</div>
            <h2 className="pg-h">The same forest, wider</h2>
          </div>
          <p>
            The responsive site shows each habit’s forest at full width. A habit with a set time sends its reminder at that time; an Anytime habit never nags.
          </p>
        </div>
        <div className="pg-demo pg-demo--web">
          <HabitaWeb />
        </div>
      </section>

      <section className="pg-system">
        <div className="pg-block">
          <div className="pg-eyebrow">Reading a forest</div>
          <ul className="pg-legend">
            <li>
              <span className="pg-plot">
                <TreeEvergreen weight="fill" size={22} color="#ffcc00" />
              </span>
              <span>A session done</span>
            </li>
            <li>
              <span className="pg-plot">
                <Tree weight="fill" size={22} color="#471396" />
              </span>
              <span>A session missed: the tree withers and stays</span>
            </li>
            <li>
              <span className="pg-plot pg-plot--today">
                <span className="pg-soil pg-soil--today" />
              </span>
              <span>Today, waiting to be planted</span>
            </li>
            <li>
              <span className="pg-plot">
                <span className="pg-soil" />
              </span>
              <span>A session still to come</span>
            </li>
          </ul>
          <p className="pg-note">One column per week and one row per day you chose. A Mon, Wed, Fri and Sat habit over 12 weeks has 48 plots.</p>
        </div>
        <div className="pg-block">
          <div className="pg-eyebrow">Palette</div>
          <ul className="pg-swatches">
            {SWATCHES.map((s) => (
              <li key={s.name}>
                <span className="pg-chip" style={{ background: s.hex }} />
                <span className="pg-swatch__name">{s.name}</span>
                <span className="pg-swatch__hex">{s.hex}</span>
                <span className="pg-swatch__use">{s.use}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<Page />)
