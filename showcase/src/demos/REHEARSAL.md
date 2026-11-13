# Rehearsal: Habita demos

Two Stageshow scenes. Both are dark only and use the kit in `../kit`.

## habita-phone (animated, iPhone)

- **Gold copied:** `phone-touch`, the card that opens into its screen.
- **Changed:** a dark app with liquid-glass surfaces (the week strip, the forest panel and the close button) and pastel habit cards. The opened card shows the habit's schedule (M W F S), a 12-week forest (one column per week, one row per scheduled day) and a "Plant today's tree" button. The payoff is a tree growing in today's plot, the count rolling 19 to 20, and the button changing to "Planted" in place. The reset happens behind the closed card's clip.
- **Loop:** about 10 s. The poster is the opened card after planting.
- **Checked:** `film --gate` passes on the full loop at the design width and at 390 (the compact layout), and on the reduced-motion poster. Also checked: the payoff close-up at 4x, typecheck, and class clashes.
- **Not checked:** touch on a real device, playback in Safari, and the return from offscreen in a real page.

## habita-web (still, browser and iPhone)

- **Gold copied:** `device-pair`.
- **Changed:** a dark browser window with a top nav instead of a sidebar, so the forest grid stays clear of the phone. The phone is a lock screen at 6:30 with the reminder for a habit that has a set time. Under the forest are the pastel habit tiles. In compact, the phone is dropped and the window is cropped close to the forest, because a phone small enough to fit would render the notification under 10px.
- **Checked:** `film --still --gate` passes at 760 and at 390.
- **Not checked:** the page in light mode (the product is dark only by design).
