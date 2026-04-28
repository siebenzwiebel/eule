import { buildRig } from './rig.js';
import { ANIMATIONS, ANIMATION_NAMES } from './animations.js';

const sleep = ms => new Promise(r => setTimeout(r, ms));

export class Eule {
  constructor(target, options = {}) {
    if (!target) throw new Error('Eule: target element required');
    this._opts = { idleOnReady: false, ...options };
    this._rig = buildRig(target, options);
    this._loopAnims = [];
    this._loopName = null;
    this._sceneAnims = [];
    this._sceneToken = 0;
    this._cycleToken = 0;

    // Hide until first animation so the owl doesn't flash at center before landIn
    this._rig.stage.style.opacity = '0';

    this.ready = this._rig.ready.then(() => {
      if (this._opts.idleOnReady) this._startLoop('idle');
    });
  }

  get el() { return this._rig.stage; }

  list() { return [...ANIMATION_NAMES]; }

  setSize(px) { this._rig.setSize(px); }

  setDebug(on) {
    this._rig.stage.dataset.debug = on ? 'true' : 'false';
  }

  async stop() {
    await this.ready;
    this._cycleToken++;
    this._cancelLoop();
    this._cancelScene();
  }

  async play(name, opts = {}) {
    await this.ready;
    const def = ANIMATIONS[name];
    if (!def) throw new Error(`Eule: unknown animation '${name}'`);

    this._rig.stage.style.opacity = ''; // reveal on first play
    this._cancelLoop();
    this._cancelScene();

    const token = ++this._sceneToken;
    const anims = def.build(this._rig, opts) || [];
    this._sceneAnims = anims;

    try {
      await Promise.all(anims.map(a => a.finished.catch(() => {})));
    } finally {
      if (token === this._sceneToken) {
        this._sceneAnims = [];
      }
    }
  }

  /**
   * Run a full flyIn → idle → flyOut cycle.
   *
   * @param {object} opts
   * @param {string[]} opts.idleAnims   Animations to pick from randomly. Default: nod, headTilt, shake.
   * @param {number}   opts.interval    ms between idle animations. Default: 1100.
   * @param {number}   opts.duration    Total idle phase duration in ms. Default: 9500.
   * @param {number}   opts.flyInAngle  Arrival angle in degrees. Default: 135.
   * @param {number}   opts.flyOutAngle Departure angle in degrees. Default: 45.
   * @param {number}   opts.jitter      Random ± ms added to each idle gap. Default: 250.
   */
  async cycle(opts = {}) {
    await this.ready;
    const {
      idleAnims = ['nod', 'headTilt', 'shake'],
      interval  = 1100,
      duration  = 9500,
      flyInAngle  = 135,
      flyOutAngle = 45,
      jitter      = 250,
    } = opts;

    const token = ++this._cycleToken;
    const alive = () => this._cycleToken === token;

    await this.play('landIn', { angle: flyInAngle });
    if (!alive()) return;

    const deadline = Date.now() + duration;
    while (Date.now() < deadline && alive()) {
      const name = idleAnims[Math.floor(Math.random() * idleAnims.length)];
      const t0 = Date.now();
      await this.play(name);
      if (!alive()) return;
      const wobble = jitter ? (Math.random() * 2 - 1) * jitter : 0;
      const gap = interval + wobble - (Date.now() - t0);
      if (gap > 0) await sleep(gap);
    }

    if (!alive()) return;
    await this.play('flyOut', { angle: flyOutAngle });
  }

  _startLoop(name, opts = {}) {
    this._cancelLoop();
    const def = ANIMATIONS[name];
    if (!def) return;
    this._loopName = name;
    this._loopAnims = def.build(this._rig, opts) || [];
  }

  _cancelLoop() {
    for (const a of this._loopAnims) {
      try { a.cancel(); } catch {}
    }
    this._loopAnims = [];
    this._loopName = null;
  }

  _cancelScene() {
    this._sceneToken++;
    for (const a of this._sceneAnims) {
      try { a.cancel(); } catch {}
    }
    this._sceneAnims = [];
  }
}

export { ANIMATION_NAMES };
