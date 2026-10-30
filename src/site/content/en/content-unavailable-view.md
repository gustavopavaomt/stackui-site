# ContentUnavailableView

The empty state: nothing here yet, no results, no connection.

@example content-unavailable-view 380
```tsx
import { Button, ContentUnavailableView } from "stackui-kit";

<ContentUnavailableView title="No messages"
  description="Messages you receive show up here."
  icon={<InboxIcon />} actions={<Button>Compose</Button>} />
```

## Reference

@props ContentUnavailableView
