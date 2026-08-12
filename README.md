<div align="center">

<img src="banner.png" alt="Score-A-Comic" width="100%">

<br>

**Read a Comic. Get a Soundtrack Written for It.**

Score-A-Comic looks at the pages of an issue, works out where the scenes turn,
and writes a music cue for each one — then generates the audio and plays it back.

**Version 2.0 is a major playback and library upgrade over 1.0.** In addition to scoring an issue, 2.0 keeps multiple scored issues in a local on-device library, saves generated cues with each issue, lets you rename saved scores, and plays the cues as a continuous adaptive soundtrack with a master player and crossfades. It also adds installable PWA/background playback support, 95-second music generation for a 90-second playback window, Media Session controls, hidden per-cue audio controls, and a safe app-cache recovery tool for stale installed builds.

<br>

### [**▶ Open the App**](https://bdredenbach.github.io/Score-A-Comic/)

<sub>Also linked under **About** in the sidebar →</sub>

<br>

![Runs in the browser](https://img.shields.io/badge/runs-in_your_browser-c31f39?style=flat-square)
![Installable](https://img.shields.io/badge/installable-PWA-c9a227?style=flat-square)
![Works offline](https://img.shields.io/badge/works-offline-3e5c76?style=flat-square)
![Bring your own keys](https://img.shields.io/badge/keys-your_own-3e5c76?style=flat-square)



---

## What It Does

Soundtracks are usually one long ambient track that ignores the story. Score-A-Comic
scores scene by scene instead.

Claude analyzes the pages of an issue and turns the story, artwork, dialogue, and
pacing into a cue sheet of scene-specific music prompts. Stability AI then turns
those prompts into playable tracks.

Each cue includes its own mood, intensity, and avoid list, helping the music follow
the story instead of defaulting to the same cinematic sound.

The built-in player loops each cue by default and can automatically advance through
the score as you read.

---

## What You'll Need

This app has no backend and no account. It talks directly to Anthropic and Stability AI
using **your** API keys, which are stored in your browser's local storage on your device.

| Key | What It Does | Where to Get It |
|---|---|---|
| **Anthropic** | Reads the pages and writes the cue sheet | [console.anthropic.com](https://console.anthropic.com) |
| **Stability AI** | Turns each cue into audio | [platform.stability.ai](https://platform.stability.ai) |

Paste each key into the key panel at the top of the app. They're saved in your
browser's local storage and persist between visits.

> **Cost is small but not zero.** A cue sheet runs a few cents; each generated
> track is priced per generation by Stability AI. Set a spend limit on both keys —
> both consoles support it. Check each provider's current pricing before you start.

You can skip the Stability AI key and use **Copy Prompt** to paste individual cues
into [Stable Audio](https://stableaudio.com) by hand.

---

## How to Use It

1. **Add Pages** — Add up to 16 images from one issue, in reading order. Screenshots work, too.
2. **Name the Issue** — Give the score a useful name such as `Avengers #1`.
3. **Set the First Page Number** — This keeps the cue sheet's page ranges aligned with the book.
4. **Score the Pages** — Claude analyzes the issue and creates the cue sheet.
5. **Generate Music** — Generate the cues you want using Stability AI.
6. **Read and Listen** — Hit play and tap `›` to advance, or use **ADVANCE** to move automatically through the cues.

> **Recommended for the best playthrough:** Generate **all cues in the score before starting automatic playback**. The player crossfades between cues and can prepare the next generated file in advance. If a cue is still being generated when playback reaches it, the transition cannot be as seamless.

The player uses native browser audio and a single master playback bar. Individual cue audio
controls are hidden to keep the interface focused. In **ADVANCE** mode, 2.0 prepares the next
cue and crossfades into it; generated cues are treated as 95-second musical sources while the
reader-facing playback window is 90 seconds. For the smoothest experience, generate every
cue first and then start playback.

---

## What 2.0 Adds Over 1.0

Compared with the original 1.0 workflow, 2.0 adds:

- **Local issue library** — keep multiple scored issues on one device.
- **Rename saved scores** — give a score a useful name after it has been created.
- **Saved generated audio** — generated cues stay with their issue for later listening.
- **Continuous playback** — a single master player can move through the cue sequence automatically.
- **Crossfades** — the next cue is prepared ahead of time and overlapped into the current cue.
- **Long-form cue generation** — music is generated as a 95-second continuation while the reader-facing cue window is 90 seconds.
- **Android Media Session/background playback** — playback controls can remain available while reading or multitasking.
- **Installable PWA** — install Score-A-Comic to the home screen and use it like an app.
- **Cleaner cue cards** — individual native audio players are hidden; the master player handles listening.
- **Safe cache recovery** — refresh the app-shell cache without deleting saved scores, generated audio, or API keys.

For the best automatic playthrough, **generate all cues before pressing play** so the crossfade system has every next track available to prepare.

---

## Install It as an App

It's a PWA, so it installs to your home screen and runs without a browser bar.

**Android** — Open the link in Chrome, then choose **Menu → Install app**.

**Desktop** — In Chrome or Edge, the install icon appears in the address bar.

**iOS** — In Safari, choose **Share → Add to Home Screen**.

Once installed, the app can work offline. Scored issues and their generated audio are stored
on-device, and 2.0 keeps multiple issues in a local library. Your API keys remain local to the browser/device.

Use **New score** to start another issue. Tap any saved issue in the library to reopen it; deleting an issue also removes its saved audio.

### Android background playback

If you want your score to keep playing while you read in another app, Android may
restrict Chrome's background activity.

On Android/Pixel:

**Settings → Apps → Chrome → App battery usage → Unrestricted**

This allows Chrome to continue running the PWA's audio while you multitask.

**Score-A-Comic cannot change Chrome's Android battery setting automatically.**
This is an operating-system setting and must be changed by the user.

---

## Privacy & API Keys

Nothing in this repository contains an API key.

Your Anthropic and Stability AI keys are stored in your browser's local storage.
API requests are sent directly from your browser to the respective service. This
app has no backend or server that receives your keys.

If you fork this project, the same applies: whoever runs the app provides their own
API keys.

---

<details>
<summary><b>Troubleshooting</b></summary>

<br>

**"Add Pages" does nothing** — Some in-app browsers block file pickers. Open the app
directly in Chrome, Edge, or Safari.

**Music won't generate** — Check the Stability AI key and make sure the account has
credit. The app reports the specific error rather than failing silently.

**Claude replied, but the app says the cue sheet is missing** — First tap **Refresh app cache** on the main scoring panel.
The app also refreshes its app-shell cache automatically when you start a new score and when you tap **Score pages**, so a stale installed copy is less likely to interfere.

**Refresh app cache** removes the PWA/service-worker cache and reloads the current app. It does **not** delete your saved scores, generated audio, or API keys. If the error persists after a cache refresh, try scoring again; Claude's response can occasionally need another attempt.

**An update didn't appear** — The app caches itself to work offline. Tap **Refresh app cache** beneath **Score pages**. This clears only the PWA app-shell/service-worker cache and reloads the current app; it does not delete saved scores, generated audio, or API keys.

**My saved issue disappeared** — Do not use the browser's Clear site data command if you want to keep the local issue library and generated audio. The library is stored in IndexedDB on this device. **Refresh app cache is safe:** it does not remove that library.

**Install option missing** — Open the app in a browser tab and use the **Install app** section at the bottom of the page. The **App setup & install** diagnostics below it checks the PWA requirements and identifies the one that's failing.

</details>

<details>
<summary><b>What's Inside</b></summary>

<br>

| File | Purpose |
|---|---|
| `index.html` | The whole app — UI, scoring, generation, playback |
| `manifest.json` | Makes it installable |
| `sw.js` | Offline caching and app-shell updates |
| `scorer-icon-*.png` | App icons |

No build step, no dependencies, no framework. Drop the folder on any static host
with HTTPS, and it runs.

</details>

---

## License

Released under the MIT License — © 2026 bdredenbach.

You are free to use, modify, distribute, and build upon this software,
subject to the terms of the MIT License. See `LICENSE.txt` or MIT License tab for the full license.

This license applies to the software in this repository only. It does not grant
rights to comic artwork or to third-party services used by the application.

<sub>The app processes comics you already own. It doesn't include, host, or
distribute any comic content.</sub>

---

<div align="center">
<sub>· Built with Claude AI · Built with Stability AI · 2.0 test build</sub>
</div>
</div>

