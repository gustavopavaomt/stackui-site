# Accessibility

StackUI uses the real thing: buttons are buttons, links are links, a sheet is a modal dialog, a segmented picker is a radio group. Screen readers, keyboards and switch controls work without extra code.

## What you get

- Sheets and alerts trap focus, close with Esc and give focus back to whoever opened them.
- Icon-only buttons take a `label` that screen readers announce.
- Toggles, pickers and steppers announce their state.
- Every animation respects **Reduce motion**.
- Hit targets are at least 44 points, like the platform guidelines ask.

## What you do

- Give every `ToolbarButton`, `Toggle`, `Picker` and `Stepper` a `label`.
- Write an `alt` for images that carry meaning, and `alt=""` for decorative ones.
- Translate the default texts (`closeLabel`, `loadingLabel`…) when your app isn't in English.

> **Note:** Color is never the only signal. A `Badge` always has words, and an error always has a message.
