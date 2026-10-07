# Charlie Pineau — Creative Portfolio

A static, no-build portfolio for video editing, motion design and web design. The visual direction is cinematic and editorial, with a horizontal desktop project sequence, touch-friendly project archive, accessible dialogs, optional user-enabled interface sound, a local demo assistant with an original 2D CSS robot, and a persistent English/French language switch integrated with navigation.

## Project files

- `index.html` — landing page, showreel placeholder, featured work, services, about and contact.
- `projets.html` — filterable archive of six editable concept projects.
- `services.html` — video editing, motion design and web design.
- `a-propos.html` — creative profile and principles.
- `style.css` — shared visual system and responsive layout.
- `translations.js` — shared French copy, language persistence and accessible FR/EN switch.
- `script.js` — project data, navigation, interactions and frontend-only assistant.

Open `index.html` directly in a browser; no build step or package install is needed.

## Replace the placeholders

At the top of `script.js`, edit the `projects` array. Each project has a title, category, description, year, image path, video path, tools, role, art direction, featured flag and optional link. Add local media paths, for example:

```js
image: "assets/project-01-poster.jpg",
video: "assets/project-01-preview.mp4",
```

Project video is only requested when its preview is hovered or its presentation is opened. Keep `video` empty until a real clip is ready. Set the `showreelMedia` poster and video paths in the same file to replace the showreel placeholder.

The hero atmosphere uses a subtle procedural cloud texture at `assets/hero-atmosphere.svg`. The portrait and CSS-generated project art are intentional visual placeholders. Replace them with Charlie's portrait, showreel stills and actual project assets when available. The concept projects are not claims of client work or professional experience.

The shared design tokens live in `:root` in `style.css`. The interface uses Manrope for primary/UI typography and Cormorant Garamond for selected editorial accents; the language control sits in the shared main navigation.

The language switch stores the visitor's preference locally and is part of the main navigation. Edit the French phrase dictionary and project translations in `translations.js` when portfolio copy changes. The assistant remains a frontend demo; its reply logic is isolated in `answerFor()` in `script.js`. The Ask Charlie launcher and panel identity share the same lightweight 2D CSS robot: a white rounded-square face, blinking expressive eyes, a mouth that animates while replies appear, small responsive hand gestures, a subtle halo, and gentle motion. Robot expressions respond to idle, listening, typing, thinking, and reply states.

Replace `ADD-YOUR-EMAIL@example.com` in `index.html` with a real email address. The social links are omitted until real profile URLs are available. The assistant uses static demo responses only; its response logic is isolated in `answerFor()` so it can later be swapped for a backend service. Never place API keys in browser code.

## Publish

This is a static site and can be hosted on GitHub Pages or any static hosting provider. Publish the HTML, CSS, JavaScript and any added local media assets together.
