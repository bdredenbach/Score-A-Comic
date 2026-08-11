<div align="center">

<img src="banner.png" alt="Score-A-Comic" width="100%">

<br>

**Read a comic. Get a soundtrack written for it.**

Score-A-Comic looks at the pages of an issue, works out where the scenes turn,
and writes a music cue for each one — then generates the audio and plays it back.

<br>

### [**▶ Open the app**](https://bdredenbach.github.io/Score-A-Comic/)

<sub>Also linked under **About** in the sidebar →</sub>

<br>

![Runs in the browser](https://img.shields.io/badge/runs-in_your_browser-c31f39?style=flat-square)
![Installable](https://img.shields.io/badge/installable-PWA-c9a227?style=flat-square)
![Works offline](https://img.shields.io/badge/works-offline-3e5c76?style=flat-square)
![Bring your own keys](https://img.shields.io/badge/keys-your_own-555?style=flat-square)



---

## What it does

Soundtracks are usually one long ambient track that ignores the story. Score-A-Comic scores scene by scene instead.

You add the pages of an issue with an image picker, and Claude reads them using your Anthropic API key. It takes in the art, dialogue and pacing and returns a cue sheet: two to four movements, each covering a page range, with its own mood, intensity rating and a music prompt written for it.

You then generate the cues you want, one at a time. Each prompt goes to Stable Audio using your Stability AI key and comes back as a track you can play while you read.

Every cue also carries an avoid list — no triumphant brass, no choir, no orchestral swell — because music models drift toward cinematic by default, and a hushed argument in a cave shouldn't sound like a battle.

The built-in player loops the current cue by default, since a 95-second track never matches how long you actually spend on three pages. Switch to Advance and it queues the next cue automatically as each one ends.

---

## What you'll need

This app has no backend and no account. It talks directly to Anthropic and
Stability AI using **your** API keys, which are stored on your device.

| Key | What it does | Where to get it |
|---|---|---|
| **Anthropic** | Reads the pages, writes the cue sheet | [console.anthropic.com](https://console.anthropic.com) |
| **Stability AI** | Turns each cue into audio | [platform.stability.ai](https://platform.stability.ai) |

Paste each one into the key panel at the top of the app. They're saved to your
device and persist between visits.

> **Cost is small but not zero.** A cue sheet runs a few cents; each generated
> track is priced per generation by Stability. Set a spend limit on both keys —
> both consoles support it. Check each provider's current pricing before you start.

There is a manual option —
You can skip the Stability key entirely and use **Copy prompt** to paste cues
into [stableaudio.com](https://stableaudio.com) by hand.

You can save each track and play in your own playlist.

---

## How to use it

1. **Add pages** — up to 16 images from one issue, in reading order (screenshots work)
2. Set the **first page number** so the cue sheet's page ranges line up with the book
3. **Score pages** — Claude returns the cue sheet in a few seconds
4. **Generate music** on each cue you want
5. Hit play, and tap `›` to advance cues as you reach those pages

The player crossfades between cues and loops the current one by default, since a
95-second track never matches how long you actually spend on three pages. Switch
to **ADVANCE** if you'd rather it move on by itself.

---

## Install it as an app

It's a PWA, so it installs to your home screen and runs without a browser bar.

**Android** — open the link in Chrome, menu → **Install app**
**Desktop** — Chrome or Edge, the install icon appears in the address bar
**iOS** — Safari, Share → **Add to Home Screen**

Once installed it works offline. Scored issues and their audio are stored on-device,
so a scored issue stays scored between sessions — no regenerating, no re-spending.

---

## Your keys stay on your device

Nothing in this repository contains an API key, which is why the project can be public.

Your Anthropic and Stability AI keys are stored in your browser's local storage on your own device. API requests are sent directly from your browser to the respective service — this app does not have a backend or server that receives your keys.

If you fork this project, the same applies: whoever runs the app provides their own API keys.

---

<details>
<summary><b>Troubleshooting</b></summary>

<br>

**"Add pages" does nothing** — some in-app browsers block file pickers. Open it in
Chrome, Edge, or Safari directly.

**Music won't generate** — check the Stability key and that the account has credit.
The app reports the specific error rather than failing silently.

**An update didn't appear** — the app caches itself to work offline. Use **Reset app
data** at the bottom of the installed app, or the readiness panel in a browser tab.

**Install option missing** — open the app in a browser tab and expand **Install
readiness**. It checks every requirement and names the one that's failing.

</details>

<details>
<summary><b>What's inside</b></summary>

<br>

| File | Purpose |
|---|---|
| `index.html` | The whole app — UI, scoring, generation, playback |
| `manifest.json` | Makes it installable |
| `sw.js` | Offline caching |
| `scorer-icon-*.png` | App icons |

No build step, no dependencies, no framework. Drop the folder on any static host
with HTTPS and it runs.

</details>

---

## License

Released under the MIT License — © 2026 bdredenbach.

You are free to use, modify, distribute, and build upon this software,
subject to the terms of the MIT License. See `LICENSE.txt` for the full license.

This license applies to the software in this repository only. It does not grant
rights to comic artwork or to third-party services used by the application.

<sub>The app processes comics you already own. It doesn't include, host, or
distribute any comic content.</sub>

---

<div align="center">
<sub>· Built with Claude.ai · Built with Stability.ai ·</sub>
</div>
</div>
