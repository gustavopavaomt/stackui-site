# StackUI · landing page

The website of [StackUI](https://github.com/gustavopavaomt/stackui): **build dynamic and elegant PWA applications
for iOS and Android with React.**

Created by [Gustavo Pavão](https://github.com/gustavopavaomt).

## How it is made

- **The page has its own layout and CSS** (`src/landing`). It does not use the library for itself.
- **The library runs inside the phones.** Each phone is an iframe of `demo.html` (`src/demo`): Wallet, a small
  finance app built with `@stackui/react` (balance, 20,000 transactions, create, edit and delete), plus one scenario
  per phone (`?d=app`, `navigation`, `sheets`, `controls`, `toasts`, `pickers`, `lists`). All data is invented. The iframe keeps sheets, the tab bar and toasts inside their phone. It is laid out at a real phone width
  (390 px) and scaled down to the frame.
- The color picker under the “Make it yours” phone sends `{ type: "stackui-theme", tint, theme }` to it
  (`postMessage`, same origin only).

## The docs

`#/docs/<page>` is the documentation, in the spirit of reactnative.dev: guides (The Basics) and one page per
component, each with a live example next to its code and the props reference.

- Pages are Markdown in `src/site/content/en/` and `src/site/content/pt/` (Brazilian Portuguese), in the sidebar order of `src/site/docs.ts`. The flags switch the language; the first visit follows the browser.
- `@example <name> <height>` before a code fence shows the live example `demo.html?c=<name>`
  (`src/demo/previews.tsx`) next to that code. Keep both in sync.
- `@props <Component>` renders the reference from `src/site/props.ts`.

## Develop

The demos use the library source from its repository, cloned next to this one:

```
Documents/
  stackui/        ← github.com/gustavopavaomt/stackui
  stackui-site/   ← this repository
```

```sh
npm install
npm run dev        # http://localhost:5310
npm run build      # dist/, with index.html and demo.html
```

Point to another copy of the library with `STACKUI_SRC=/path/to/stackui/packages/react/src/`. Once
`@stackui/react` is on npm, the demos will install it like any app.

## Deploy

Every push to `main` builds and publishes to GitHub Pages (`.github/workflows/pages.yml`), under
`/stackui-site/`.

## License

[MIT](LICENSE) © Gustavo Pavão
