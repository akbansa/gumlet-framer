# Gumlet Video Widget (React)

A lightweight React component and Framer plugin demo to embed Gumlet-hosted videos with responsive layout, optional dynamic watermark, and user-level analytics.

## Features

- Responsive iframe via CSS `aspect-ratio`
- Player controls, autoplay/muted, loop
- Optional dynamic watermark text (configured in your Gumlet player)
- Optional user-level analytics via `gm_user_*` query params
- Safe defaults with configurable iframe permissions

## Quickstart (Development)

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite. This project includes a simple UI to try different watermark and analytics options.

## Usage

Import and render the component in your React app:

```tsx
import GumletVideo from "./components/GumletVideo"

export default function Example() {
  return (
    <GumletVideo
      videoId="<YOUR_GUMLET_VIDEO_ID>"
      options={{
        controls: true,
        muted: true,
        autoplay: false,
        // Optional: dynamic watermark (requires setup in Gumlet dashboard)
        watermarkText: "User: [Name]",
        // Optional: user-level analytics
        gmUserId: "123",
        gmUserName: "Jane Doe",
      }}
      // Optional overrides
      aspectRatio="16 / 9"
      allowFullscreen
      title="Gumlet Video"
    />
  )
}
```

## Props

`GumletVideoProps`

- `videoId: string` – Required Gumlet video ID.
- `options?: GumletPlayerOptions` – Player and tracking options.
- `className?: string` – Optional container class.
- `style?: React.CSSProperties` – Optional container style.
- `aspectRatio?: string` – CSS aspect-ratio value. Default: `"16 / 9"`.
- `allowFullscreen?: boolean` – Enables fullscreen. Default: `true`.
- `title?: string` – Iframe title for accessibility. Default: `"Gumlet Video"`.
- `embedUrlOverride?: string` – Provide a full embed URL to bypass internal URL construction.

`GumletPlayerOptions`

- `controls?: boolean`
- `autoplay?: boolean`
- `muted?: boolean`
- `loop?: boolean`
- `preload?: boolean` – Emits a boolean query param.
- `watermarkText?: string` – Dynamic watermark text (see below).
- `gmUserId?: string` – User-level analytics: `gm_user_id` query param.
- `gmUserName?: string` – User-level analytics: `gm_user_name` query param.

## Dynamic Watermark

1) Enable and configure dynamic watermark in your Gumlet player settings: https://dash.gumlet.com/video/player

2) Provide `options.watermarkText` to send the value via query string (as `watermark_text`). You can inject your own user tokens (e.g. ID/email) or static text.

Example:

```tsx
<GumletVideo
  videoId="..."
  options={{
    watermarkText: "User: [email protected]",
  }}
/> 
```

## User-level Analytics

Per Gumlet docs: https://docs.gumlet.com/docs/user-level-analytics

Send one or both of the following query params to attribute views at user level:

- `gm_user_id`
- `gm_user_name`

Example:

```tsx
<GumletVideo
  videoId="..."
  options={{
    gmUserId: "123",
    gmUserName: "Jane Doe",
  }}
/> 
```

You can then break down reports in Insights by User ID or Name.

## Security and Permissions

- The `allow` attribute includes permissions required for normal playback (e.g., `autoplay`, `encrypted-media`, `picture-in-picture`, `fullscreen`). Adjust to match your needs.

## Framer plugin

This repo also includes a minimal Framer plugin UI (see `src/App.tsx`) to toggle watermark and analytics options during local development.

### Run inside Framer

1. Install deps and start dev server:

```bash
npm install
npm run dev
```

2. In Framer, open the Plugins panel and add a Local Plugin.
3. Point it to your dev server URL (HTTPS) from Vite. The `vite-plugin-framer` and `vite-plugin-mkcert` in `vite.config.ts` enable a Framer-compatible dev experience.
4. Open the plugin. Use the "Video ID or Embed URL" field to paste your Gumlet video (either the ID or `https://play.gumlet.io/embed/<id>`). The preview updates live.
5. Click "Insert Video" to add a frame on the canvas and attach the embed URL to the node's attributes. The plugin also attempts to zoom into the new node.

### Pack for distribution

To build a `.framerplugin` bundle you can import into Framer or share:

```bash
npm run build
npm run pack
```

- `npm run build` builds the UI.
- `npm run pack` uses `framer-plugin-tools` to create the plugin package.

### Use the Code Component (recommended)

There are two ways to render the player on canvas:

- Recommended: insert a Code Component instance so the iframe renders in the canvas.
- Fallback: insert a Frame with a link to the embed URL.

Steps for the recommended approach:

1. Publish your `GumletVideo` Code Component as a module (or host privately):
   - Build: `npm run build`
   - Publish with your method of choice (Framer Modules or self-host) to get a module URL like `https://framer.dev/m/<id>.js`.
2. In the plugin UI, paste that Module URL into the "Component Module URL" field.
3. Paste your video ID or full Gumlet embed URL.
4. Click "Insert Video". The plugin will add a component instance and set its controls (`videoId`, `autoplay`, `controls`, `watermarkText`, etc.).

If you leave the Module URL empty, the plugin falls back to inserting a normal frame with a link to `https://play.gumlet.io/embed/<id>`.

### Build the code component as a single-file ESM

```bash
npm run build:module
```

- Output: `dist/gumlet-video.es.js` (+ sourcemap)
- Host this file (HTTPS), or upload it as a Framer Module to receive a `https://framer.dev/m/<id>.js` URL.

