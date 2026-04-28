import { buildRig } from './rig.js';
import { ANIMATIONS, ANIMATION_NAMES } from './animations.js';

export class Eule {
  constructor(target, options = {}) {
    if (!target) throw new Error('Eule: target element required');
    this._opts = { idleOnReady: true, ...options };
    this._rig = buildRig(target, options);
    this._loopAnims = [];
    this._loopName = null;
    this._sceneAnims = [];
    this._sceneToken = 0;

    this.ready = this._rig.ready.then(() => {
      if (this._opts.idleOnReady) this.idle();
    });
  }

  get el() { return this._rig.stage; }

  list() { return [...ANIMATION_NAMES]; }

  setSize(px) { this._rig.setSize(px); }

  setDebug(on) {
    this._rig.stage.dataset.debug = on ? 'true' : 'false';
  }

  idle() {
    if (this._loopName === 'idle') return;
    this._startLoop('idle');
  }

  sleep() {
    if (this._loopName === 'sleep') return;
    this._startLoop('sleep');
  }

  stop() {
    this._cancelLoop();
    this._cancelScene();
  }

  async play(name, opts = {}) {
    const def = ANIMATIONS[name];
    if (!def) throw new Error(`Eule: unknown animation '${name}'`);
    if (def.loop) {
      this._cancelScene();
      this._startLoop(name, opts);
      return;
    }

    const previousLoop = this._loopName;
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
        if (previousLoop && previousLoop !== 'sleep' && !this._loopName) {
          this._startLoop(previousLoop);
        } else if (!previousLoop && this._opts.idleOnReady && !this._loopName) {
          // no auto-resume if user never started idle
        }
      }
    }
  }

  async chain(names, sharedOpts = {}) {
    for (const entry of names) {
      const [name, opts] = Array.isArray(entry) ? entry : [entry, sharedOpts];
      await this.play(name, opts);
    }
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
