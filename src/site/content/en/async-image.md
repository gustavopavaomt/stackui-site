# AsyncImage

An image that loads without leaving a blank: a shimmer while it comes, a fade when it arrives, a fallback when it fails.

@example async-image 280
```tsx
import { AsyncImage } from "@stackui/react";

<AsyncImage src={photo} alt="A landscape" aspectRatio="16 / 9" width="100%"
  radius={16} fit="cover" showProgress fallback={<PhotoIcon />} />
```

## Reference

@props AsyncImage
