Tenuuki Spin
------------
A Svelte-based 3D spinner for product views.

Originally inspired by https://github.com/lwojcik/tridi.

How to Implement Tenuuki Spin Viewer
------------------------------------

Quick start (bundler/app)
-------------------------
1. Install the package.
2. Import the viewer entry once so the custom element is registered.
3. Add the custom element to your markup.
4. Configure frames using data attributes.
5. Optionally call methods like goTo or spinTo from JavaScript.

Install:

```bash
npm install @tenuuki/tenuuki-spin
```

Register the element:

```ts
import '@tenuuki/tenuuki-spin'
```

Add markup:

```html
<tenuuki-spin-viewer
	id="productViewer"
	data-image-base-url="/images/product/frame-{frame}.webp"
	data-image-count="60"
	data-image-number-padding="4"
	data-replacement-token="frame"
	data-axis="x"
	data-direction="-1"
	data-draggable="true"
	data-initial-spin="true"
	data-initial-frame="1"
	data-spin-offset="180"
	data-speed-multiplier="1.5"
	data-easing="standard"
></tenuuki-spin-viewer>
```

Control the viewer:

```html
<script>
	const viewer = document.getElementById('productViewer')

	// Jump directly to a frame.
	viewer?.goTo(24)

	// Spin to a frame. By default shortestPath is true.
	viewer?.spinTo(40, 2, true)

	// Start/stop/replay.
	viewer?.play()
	viewer?.stop()
	viewer?.replay(1)
</script>
```

Direct dist usage (no bundler)
------------------------------
Use this mode when serving files directly from your own server.

```html
<link rel="stylesheet" href="./dist/tenuuki-spin-viewer.css" />
<script type="module" src="./dist/tenuuki-spin-viewer.js"></script>
```

Then add the same tenuuki-spin-viewer markup and JavaScript API calls shown above.

Image sequence requirements
---------------------------
1. Provide a stable ordered sequence of frame images.
2. Use a placeholder token in data-image-base-url, for example {frame}.
3. Set data-image-count and data-image-number-padding to match your files.

Example filename mapping:
- Pattern: /images/product/frame-{frame}.webp
- Padding: 4
- Generated frames: frame-0001.webp ... frame-0060.webp

Implementation checklist
------------------------
- Include the script that registers tenuuki-spin-viewer.
- Ensure frame URLs resolve in the browser network panel.
- Set explicit width/height for the host element in CSS.
- Verify drag direction and axis match your frame set.
- Test goTo, spinTo, play, stop, and replay from UI controls.

Developer Docs
--------------

Local setup
-----------
1. Install dependencies.
2. Start the dev server.

Commands:
- npm install
- npm run dev

Useful scripts
--------------
- npm run dev: Run Vite in development mode.
- npm run build: Build the demo/site output.
- npm run preview: Preview a production build locally.
- npm run check: Run Svelte + TypeScript checks.
- npm run build:lib: Build distributable library files in dist.
- npm run serve:docs: Serve docs content through serve-docs.js.

Build modes
-----------
- Demo/site build: npm run build
- Library build: npm run build:lib

The library build is controlled by BUILD_LIB=true in Vite config and emits:
- dist/tenuuki-spin-viewer.js
- dist/tenuuki-spin-viewer.cjs
- dist/tenuuki-spin-viewer.umd.js
- dist/tenuuki-spin-viewer.css

Project layout
--------------
- src/lib/components/TenuukiSpinViewer.svelte: Main custom element implementation.
- src/lib/tenuuki-spin-viewer.ts: Library entry that registers the component.
- src/lib/types/TenuukiSpinViewerOptions.ts: Public options interface.
- public/: Local sample frame assets.
- docs/: Documentation site assets.
- scripts/: Frame/object generation helpers.

Component API notes
-------------------
The custom element exposes imperative methods on the element instance.

- goTo(i): Stops active spin/momentum and jumps to frame i.
- spinTo(i, rotations = 1, shortestPath = true): Stops active spin/momentum and animates to frame i.
- play(times = 0): Starts auto-spin.
- stop(): Stops active auto-spin.
- replay(rotations = 1, i = null): Replays a fixed number of rotations.

Spin behavior details
---------------------
- All frame indexing is normalized with modulo arithmetic.
- goTo and spinTo cancel any active interval before starting new motion.
- spinTo shortestPath mode picks the shorter route to the target frame.
- spinTo linear mode follows configured spin direction and applies full extra rotations.
- data-speed-multiplier scales frame timing for interval-based spins (for example 2 = faster, 0.5 = slower).
- data-easing controls animation easing for finite spins. Supported: linear, standard, easeInOutQuad.

Data attributes used by host markup
-----------------------------------
- data-image-base-url
- data-image-count
- data-image-number-padding
- data-replacement-token
- data-axis
- data-direction
- data-draggable
- data-initial-spin
- data-initial-frame
- data-spin-offset
- data-speed-multiplier
- data-easing

Release workflow
----------------
1. Run checks.
2. Build library artifacts.
3. Validate dist output and example usage.
4. Publish package.

Commands:
- npm run check
- npm run build:lib
- npm publish

Notes:
- prepublishOnly already runs npm run build:lib.
- The package main/module/unpkg/jsdelivr fields point to files in dist.
