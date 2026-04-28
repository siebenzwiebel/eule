# eule

Layered owl widget with a programmatic animation API. Vanilla JS, no build step.

## Studio

```
python3 -m http.server 8080
# open http://localhost:8080/
```

The studio loads `index.html`, mounts an owl, and exposes every registered
animation as a button. Use the size slider to scale, the background toggles
to verify transparency, and the layer-outline switch to inspect pivots.

## Library

```html
<script type="module">
  import { Eule } from './src/eule.js';
  const eule = new Eule(document.querySelector('#owl'), { size: 480 });
  await eule.ready;
  eule.idle();
  await eule.play('headTurn', { direction: 'left' });
  await eule.play('flight');
  eule.stop();
</script>
```

### API

- `new Eule(target, options)` — `target` is the mount element. Options:
  `size` (number, px height), `assets` (string preset or `{ body, head, ... }`
  url map), `idleOnReady` (bool, default `true`).
- `eule.ready` — Promise that resolves once all layer images have loaded.
- `eule.play(name, opts?)` → `Promise<void>` — runs the named animation. Pauses
  the idle loop, resumes it after.
- `eule.idle()` — start the breathing loop.
- `eule.stop()` — cancel everything (idle and any active scene).
- `eule.chain([...names])` → `Promise<void>` — run a sequence.
- `eule.list()` → `string[]` — all registered animation names.

### Animations

Head: `idle`, `blink`, `headTurn`, `headTilt`, `nod`, `shake`, `lookUp`, `lookDown`.

Charakter: `preen`, `yawn`, `shiver`, `alert`.

Action: `wingFlutter`, `flight`, `landIn`, `flyOut`, `sleep`.

Akzente: `wingStretch`, `hop`, `bow`, `deepBreath`.

## Rig

The owl is a single inline SVG (`assets/owl/eule.svg`) with hand-authored
groups. Animations target groups by id; transform-origins are set in
`src/style.css` so SVG transforms pivot at anatomically sensible points.

| Group              | role                              | pivot (SVG units)   |
| ------------------ | --------------------------------- | ------------------- |
| `eule-root`        | whole owl (idle scale, hop, etc.) | 375, 700            |
| `eule-head`        | brow + face wrapper               | 300, 460            |
| `eule-face`        | eyes + lids + beak (no brow)      | 325, 400            |
| `eule-brow`        | V-shaped ear-tuft brow            | inherited           |
| `eule-wing-left`   | left wing curve                   | 218, 215 (ear tip)  |
| `eule-wing-right`  | right wing curves                 | 388, 215 (ear tip)  |
| `eule-eye-left`    | left eye disk                     | 209, 348            |
| `eule-eye-right`   | right eye disk                    | 440, 345            |
| `eule-lid-left`    | half-disk lid for sleep           | 209, 348            |
| `eule-lid-right`   | half-disk lid for sleep           | 440, 345            |
| `eule-beak`        | smile / beak                      | 345, 460            |

The brow stays attached to the wing-tops at (218, 215) / (388, 215). Wings
rotate around those same anchor points, so wing flutters do not separate
from the brow. Face-targeted animations (turn / tilt / nod / shake / look /
preen / yawn / bow) move only `eule-face`, leaving the brow + wings in
place — that's how the rig avoids the seams a sliced raster owl would show.

To swap in a different drawing, pass `new Eule(target, { svg: 'path/to/yours.svg' })`
with the same group id structure.
