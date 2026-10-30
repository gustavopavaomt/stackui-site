# Sheets and alerts

Some things don't deserve a whole screen: sharing, choosing an option, confirming. They slide up in a **sheet** over the current screen. When something must be read right now, an **alert** asks in the middle of the screen.

## Sheets

A sheet is controlled by `isPresented`: set it to `true` to open it and close it in `onDismiss`. The sheet closes on the close button, a tap outside, Esc, the Android back gesture, and when it is dragged down.

@example sheet 460
```tsx
import { Button, List, Row, Section, Sheet } from "stackui-kit";

const [isPresented, setIsPresented] = useState(false);

<Button onClick={() => setIsPresented(true)}>Share</Button>

<Sheet isPresented={isPresented} onDismiss={() => setIsPresented(false)}
  title="Share" description="Drag the handle down to close.">
  <List>
    <Section>
      <Row title="Copy link" onClick={copy} />
      <Row title="Send by email" onClick={email} />
    </Section>
  </List>
</Sheet>
```

## Ready-made sheets

- [ConfirmationSheet](/docs/confirmation-sheet): check before saving, with the progress in the button.
- [OptionsSheet](/docs/options-sheet): choose one option, like a sort order or a filter.
- [ListPicker](/docs/list-picker): choose from a long, searchable list.

## Alerts

@example alert 360
```tsx
import { Alert, Button } from "stackui-kit";

<Button variant="destructive" onClick={() => setOpen(true)}>Delete photo</Button>

<Alert isPresented={open} onDismiss={() => setOpen(false)}
  title="Delete this photo?" message="It will be removed from all your devices."
  actions={[
    { label: "Cancel", role: "cancel" },
    { label: "Delete", role: "destructive", onPress: deletePhoto },
  ]} />
```

> **Tip:** Use an alert only when the person must decide now. For choices, use a sheet; for news, a toast.
