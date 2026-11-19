# Bloom — a little something for you

A complete, static website: a floating gradient envelope, wax heart seal, unfolding flap, blooming SVG bouquet, gentle zoom, personal letter, and slowly falling hearts, flowers, and petals. Includes replay and a motion toggle. Uses HTML, CSS, JavaScript and a local copy of GSAP 3.14.2. No build process, account, API keys, database, or npm dependencies to install.

## Start in VS Code (Windows)

1. Extract the ZIP first. Open the `blooming-letter` folder in VS Code using File → Open Folder. Choose the folder containing index.html.
2. Open Extensions with Ctrl+Shift+X. Install **Live Server** by **Ritwick Dey** (extension ID: ritwickdey.LiveServer).
3. Right-click index.html in VS Code → **Open with Live Server**. Alternatively, click **Go Live** on the bottom status bar.
4. Your browser opens the website, usually at http://127.0.0.1:5500. Click the envelope. Save code changes to refresh your preview.

Optional terminal shortcut, if the `code` command is available:

```powershell
code --install-extension ritwickdey.LiveServer
```

No `npm install` or `npm run dev` is needed. You can also double-click index.html to run it directly, including offline. Live Server is convenient for automatic refresh while editing.

If `code` is not recognized, install the extension through the Extensions panel instead. If port 5500 is busy, stop the other server or change liveServer.settings.port in .vscode/settings.json.

## Files

- index.html — page structure, envelope and SVG container
- style.css — pink palette, layout, paper and envelope styling, falling particles
- script.js — editable message, generated SVG bouquet, animation timeline, replay and motion controls
- favicon.svg — flower tab icon
- vendor/gsap.min.js — bundled GSAP animation library
- vendor/THIRD-PARTY.txt — GSAP attribution and license link
- .vscode/ — recommended extension and editor/server settings

## Change the letter

Edit the LETTER object at the very top of script.js:

```js
const LETTER = {
  greeting: 'Dear you,',
  paragraphs: [
    'Your first paragraph here.',
    'Your second paragraph here.'
  ],
  signature: 'With love, John.'
};
```

Use double quotes for text containing an apostrophe, or escape the apostrophe. Text is inserted safely as plain text. Longer messages expand the scene after opening. For the best composition, use 2–4 short paragraphs.

## Change the look

- Main colors: variables at the start of style.css.
- Main heading and tagline: index.html, inside `.intro`.
- Envelope colors: `.envelope-front`, `.envelope-flap`, `.envelope-back` in style.css.
- Falling decoration amount: change `i<26` in script.js. Fewer particles help slower phones.
- Falling speed: edit `18+Math.random()*22` in script.js (seconds; larger numbers fall slower).
- Flower colors: SVG gradient definitions at the top of the bouquet in index.html.
- Animation timing: GSAP timeline near the end of script.js; timeline numbers are seconds.

## Controls and accessibility

Click or tap the envelope; keyboard users can Tab to it and use Enter or Space. The letter receives focus after opening. Open again resets the scene. Pause motion stops ambient drift and uses an immediate reveal instead of an animated opening. The operating system's reduced-motion preference is respected. Background artwork is hidden from screen readers. No sound autoplays.

If GSAP cannot load, clicking still reveals the flowers and letter immediately. All artwork, fonts (system fonts), and scripts are local; no internet is required after downloading.

## Validation

JavaScript syntax checked with `node --check script.js`; local references and ZIP integrity checked. An automated visual browser test could not run in the build environment because Chromium was blocked by its sandbox. Preview in your browser to verify the appearance on your own screen.

## Sources / third-party code

- GSAP documentation: https://gsap.com/docs/v3/
- Bundled GSAP 3.14.2: https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js
- GSAP licensing: https://gsap.com/standard-license/
- Live Server: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

The SVG flower artwork and project HTML/CSS/JavaScript were created for this project. GSAP is third-party code and is covered by the GSAP standard license linked in the third-party notice.
