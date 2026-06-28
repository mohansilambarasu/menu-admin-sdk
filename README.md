# menu-admin SDK

An embeddable menu management SDK for restaurant websites. Drop it into any
site with three lines of code.

## Quick Start

### UMD (plain HTML, no build tool)

```html
<script src="https://unpkg.com/@mohansilambu/menu-admin/dist/menu-admin.umd.js"></script>

<div id="menu-admin"></div>

<script>
  const instance = MenuAdmin.createMenuAdmin(
    document.getElementById("menu-admin"),
    { theme: "light" },
  );
</script>
```

### ESM (React/Vue/any bundler)

```bash
npm install @mohansilambu/menu-admin
```

```js
import { createMenuAdmin } from "@mohansilambu/menu-admin";

const instance = createMenuAdmin(document.getElementById("menu-admin"), {
  theme: "light",
});

// cleanup
instance.unmount();
```

## API

### `createMenuAdmin(container, config?)`

Mounts the SDK into the given container.

| Parameter | Type            | Required | Description               |
| --------- | --------------- | -------- | ------------------------- |
| container | HTMLElement     | yes      | DOM element to mount into |
| config    | MenuAdminConfig | no       | Configuration options     |

Returns a `MenuAdminInstance`.

### `MenuAdminConfig`

| Option | Type                | Default   | Description |
| ------ | ------------------- | --------- | ----------- |
| theme  | `"light" \| "dark"` | `"light"` | Color theme |

### `MenuAdminInstance`

| Method      | Description                      |
| ----------- | -------------------------------- |
| `unmount()` | Tears down the SDK and cleans up |

## TypeScript

Types are included. No `@types` package needed.

```ts
import { createMenuAdmin } from "@mohansilambu/menu-admin";
import type {
  MenuAdminConfig,
  MenuAdminInstance,
} from "@mohansilambu/menu-admin";

const config: MenuAdminConfig = { theme: "dark" };
const instance: MenuAdminInstance = createMenuAdmin(el, config);
```

## How it works

- **Style isolation** — runs inside a Shadow DOM. Host styles cannot reach in,
  SDK styles cannot leak out.
- **Framework agnostic** — core store is plain TypeScript. React is the current
  UI binding. ESM build externalizes React so the host supplies it.
- **Two builds** — UMD for script tag usage, ESM for bundler environments.
- **Lifecycle** — `createMenuAdmin` returns an instance with `unmount()` for
  clean teardown.

## Development

```bash
# install
npm install

# dev server
npm run dev

# build both formats + type declarations
npm run build

# preview what ships
npm pack --dry-run
```

## Build outputs

```
dist/
  menu-admin.umd.js   201kb  UMD, React bundled inside
  menu-admin.es.js     14kb  ESM, React externalized
  index.d.ts          238b   TypeScript declarations
```
