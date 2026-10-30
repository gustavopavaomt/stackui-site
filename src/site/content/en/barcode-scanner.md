# BarcodeScanner

Reads product barcodes with the camera, offline. It is a separate entry: apps that never scan never download it.

@example barcode-scanner 560
```tsx
import { BarcodeScanner } from "@stackui/react/barcode";

<Sheet isPresented={open} onDismiss={() => setOpen(false)} title="Scan">
  {open && <BarcodeScanner onScan={(code) => { setCode(code); setOpen(false); }} />}
</Sheet>
```

It uses the device's own barcode reader where there is one (Chrome on Android). For Safari, also install the reader it falls back to:

```sh
npm install @zxing/browser @zxing/library
```

> **Note:** The browser asks for the camera the first time. Pages must be served over HTTPS.

## Reference

@props BarcodeScanner
