# Feedback

People need to know what is happening: that something was saved, that it is still loading, that there is nothing here yet.

## Toasts

A toast is a short message that rises from the bottom and leaves on its own. Call `show` from any screen inside the `ToastProvider`:

@example toast 320
```tsx
import { Button, useToast } from "stackui";

const { show } = useToast();

<Button onClick={() => show("Saved")}>Show toast</Button>

// Follow a task: the toast changes in place.
const toast = show("Uploading…", "progress");
await upload();
toast.update("Uploaded", "success");
```

Toasts wait in line: a new one waits for the current one to leave, so they never pile up.

## Loading

Show the shape of the content while it loads. `Redacted` shows the placeholder only if the wait takes long enough to notice, and fades the content in when it arrives:

@example redacted 360
```tsx
import { Redacted, Section, SkeletonList } from "stackui";

<Section header="Contacts">
  <Redacted isLoading={!contacts} placeholder={<SkeletonList rows={3} leading="circle" />}>
    {contacts?.map((c) => <Row key={c.id} leading={<Avatar name={c.name} />} title={c.name} />)}
  </Redacted>
</Section>
```

## Empty states

@example content-unavailable-view 380
```tsx
import { Button, ContentUnavailableView } from "stackui";

<ContentUnavailableView title="No messages"
  description="Messages you receive show up here."
  icon={<InboxIcon />} actions={<Button>Compose</Button>} />
```

> **Tip:** Give every empty list its own sentence. "No messages" says more than "No results".
