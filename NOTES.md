# NOTES.md

## What I built

`menu-admin` — a React + TypeScript in-memory CRUD app for managing restaurant
menu items. Packaged as an embeddable SDK and dropped into `restaurant-site`,
a separate plain HTML/CSS fictional restaurant site, with three lines of
integration:

```js
const instance = MenuAdmin.createMenuAdmin(
  document.getElementById("external-menu"),
  { theme: "dark" },
);
```

---

## Decisions

### Style isolation

Looked at iframes, CSS Modules, and Shadow DOM.

iframes meant a separate browsing context and clunky resize handling. CSS
Modules still allow host resets to break the SDK. Shadow DOM gives real
bidirectional isolation at the browser level — nothing leaks in or out.

All stylesheets are injected inline into the shadow root. No external requests,
no class collisions.

Three things I had to fix during testing:

- Fonts cross the shadow boundary by default. Moved the Google Fonts `@import`
  inside the shadow root so the SDK loads its own fonts.
- `rem` inherits the host's root font size. Added `font-size: 16px` on `:host`
  so rem values are consistent regardless of the host.
- Inherited CSS properties like `text-align` and `color` bleed through. Added
  explicit resets on `.app`. Tried `all: initial` first but it wiped the CSS
  custom property cascade, so switched to surgical resets instead.

### Core and binding

`core/store.ts` has zero framework imports — plain TypeScript pub/sub with
immutable updates. The React binding is one hook, `useMenuItems.ts`, ten lines
that connect `subscribe` to `useState`. Proved framework-agnostic by running
the ESM build inside a Vue app — Vue host, React inside the shadow root,
neither aware of the other.

### Two build formats

UMD bundles React inside (201kb) for plain HTML hosts with no build tool.
ESM externalizes React (14kb) for bundler environments where the host already
has React. Tested both — UMD in restaurant-site via script tag, ESM by
installing the packed `.tgz` in a fresh Vue project.

### Public API

Handwritten `index.d.ts` rather than auto-generated. Auto-generation exposed
internal files like `EditForm.d.ts` and `store.d.ts`. The handwritten file
exposes only what the host needs — `createMenuAdmin`, `MenuAdminConfig`,
`MenuAdminInstance`.

`theme` is typed as `"light" | "dark"` so TypeScript rejects invalid values
at compile time.

`createMenuAdmin` returns an instance with `unmount()` so the host can clean
up after itself. Calling it triggers React's teardown which unsubscribes the
store listener automatically.

### Price and IDs

Price is a cents integer in the store (1250 = $12.50). The `$` sign only
appears in the display layer. Forms convert at submit.

IDs use `crypto.randomUUID()` — no collision risk, no implementation detail
leaking through the type.

### No restaurantId

Left it out. It would only make sense with a real backend to scope data per
tenant. Adding it to an in-memory SDK would be misleading — it would sit in
the config doing nothing.

---

## What I skipped

Persistence, authentication, and tests — all out of scope for an in-memory
assignment. The store's pub/sub interface is designed so an API swap later
is straightforward.

---

## AI vs my calls

Used Claude throughout — scaffolding, CSS system, build config, debugging the
`@import` whitespace bug, and this file.

Calls I made myself:

- Shadow DOM over iframe after thinking through the tradeoffs
- Removed `restaurantId` — AI suggested keeping it as a display label, that
  felt wrong for something named an ID
- Handwritten declarations after seeing what auto-generation produced
- `mode: "open"` on the shadow root — an admin tool should be inspectable
- Surgical CSS resets after `all: initial` broke the token cascade
