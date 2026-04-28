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

## Layer Rig

Seven layers, all absolutely positioned in a square stage. Pivots:

| Layer       | transform-origin |
| ----------- | ---------------- |
| body        | 50% 100%         |
| head        | 50% 90%          |
| wing-left   | 95% 15%          |
| wing-right  | 5% 15%           |
| lid-left    | 50% 0%           |
| lid-right   | 50% 0%           |
| beak-jaw    | 50% 0%           |

Replace `assets/placeholder/*.svg` with your cut-out PNGs (same filenames),
or pass an explicit url map to the `Eule` constructor.
