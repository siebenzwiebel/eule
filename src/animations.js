const POP      = 'cubic-bezier(.34, 1.56, .64, 1)';
const SNAP     = 'cubic-bezier(.4, 0, .2, 1)';
const SOFT     = 'cubic-bezier(.5, 0, .5, 1)';
const EASE_OUT = 'cubic-bezier(.2, .7, .3, 1)';
const EASE_IN  = 'cubic-bezier(.7, .2, 1, .7)';

export const ANIMATIONS = {
  // Close fast, open ~1.5x slower (asymmetric timing reads as natural blink).
  blink: {
    build(rig) {
      const kf = [
        { transform: 'scaleY(1)', easing: EASE_IN },
        { transform: 'scaleY(0)', offset: 0.4, easing: EASE_OUT },
        { transform: 'scaleY(1)' },
      ];
      const opts = { duration: 280 };
      return [rig.lidLeft.animate(kf, opts), rig.lidRight.animate(kf, opts)];
    },
  },

  nod: {
    build(rig) {
      return [rig.root.animate([
        { transform: 'translateY(0) rotate(0)' },
        // Tiny anticipatory lift before the wind-up.
        { transform: 'translateY(-3px) rotate(-2deg)', offset: 0.15 },
        { transform: 'translateY(-6px) rotate(-4deg)', offset: 0.3 },
        { transform: 'translateY(9px) rotate(5deg)',   offset: 0.6 },
        { transform: 'translateY(-2px) rotate(-1deg)', offset: 0.85 },
        { transform: 'translateY(0) rotate(0)' },
      ], { duration: 850, easing: SOFT })];
    },
  },

  // POP only on the lean-in; SNAP on the return so it doesn't overshoot zero.
  headTilt: {
    build(rig, { direction = 'left', degrees = 14 } = {}) {
      const sign = direction === 'right' ? 1 : -1;
      return [rig.root.animate([
        { transform: 'rotate(0deg)', easing: POP },
        { transform: `rotate(${sign * degrees}deg)`, offset: 0.4, easing: 'linear' },
        { transform: `rotate(${sign * degrees}deg)`, offset: 0.7, easing: SNAP },
        { transform: 'rotate(0deg)' },
      ], { duration: 800 })];
    },
  },

  shake: {
    build(rig) {
      return [rig.root.animate([
        { transform: 'translateX(0) rotate(0)' },
        { transform: 'translateX(-11px) rotate(-4deg)', offset: 0.2 },
        { transform: 'translateX(11px) rotate(4deg)',   offset: 0.45 },
        { transform: 'translateX(-7px) rotate(-2deg)',  offset: 0.7 },
        // Tiny overshoot before zero so the head doesn't stop dead.
        { transform: 'translateX(2px) rotate(1deg)',    offset: 0.88 },
        { transform: 'translateX(0) rotate(0)' },
      ], { duration: 720, easing: SNAP })];
    },
  },

  // Stretch on the way up, neutral at apex (gravity pause), squash on landing.
  // Asymmetric easing on the lift: ease-out going up, ease-in coming down.
  hop: {
    build(rig) {
      const lift = [
        { transform: 'translateY(0)',     easing: EASE_OUT },
        { transform: 'translateY(-28px)', offset: 0.5, easing: EASE_IN },
        { transform: 'translateY(0)' },
      ];
      const squash = [
        { transform: 'scale(1, 1)' },
        { transform: 'scale(0.95, 1.08)', offset: 0.25 },
        { transform: 'scale(1, 1)',       offset: 0.5  },
        { transform: 'scale(1.06, 0.92)', offset: 0.85 },
        { transform: 'scale(1, 1)' },
      ];
      return [
        rig.stage.animate(lift,  { duration: 650 }),
        rig.root.animate(squash, { duration: 650, easing: SOFT }),
      ];
    },
  },

  landIn: {
    build(rig, { angle = 135, distance } = {}) {
      const stageSize = Math.max(rig.stage.offsetWidth, rig.stage.offsetHeight);
      const d = distance ?? (Math.hypot(window.innerWidth, window.innerHeight) / 2 + stageSize);
      const rad = angle * Math.PI / 180;
      const dx = Math.cos(rad) * d;
      const dy = -Math.sin(rad) * d;
      const mx = dx * 0.35;
      const my = dy * 0.35;
      return [
        rig.stage.animate([
          { transform: `translate(${dx}px,${dy}px) scale(0.5)`,    easing: SOFT },
          { transform: `translate(${mx}px,${my}px) scale(0.82)`,   offset: 0.35, easing: SOFT },
          // POP on the bounce-settle gives the elastic landing without an end-snap.
          { transform: 'translate(0,10px) scale(1.04)',            offset: 0.7,  easing: POP },
          { transform: 'translate(0,0) scale(1)',                  offset: 1 },
        ], { duration: 1100, fill: 'forwards' }),
      ];
    },
  },

  flyOut: {
    build(rig, { angle = 45, distance } = {}) {
      const stageSize = Math.max(rig.stage.offsetWidth, rig.stage.offsetHeight);
      const d = distance ?? (Math.hypot(window.innerWidth, window.innerHeight) / 2 + stageSize);
      const rad = angle * Math.PI / 180;
      const dx = Math.cos(rad) * d;
      const dy = -Math.sin(rad) * d;
      return [
        rig.stage.animate([
          { transform: 'translate(0,0) scale(1)' },
          { transform: `translate(${dx * 0.08}px,${dy * 0.08}px) scale(1.04)`, offset: 0.15 },
          // Half-out moment pulled earlier so the final third is pure exit acceleration.
          { transform: `translate(${dx * 0.5}px,${dy * 0.5}px) scale(0.82)`,   offset: 0.5 },
          { transform: `translate(${dx}px,${dy}px) scale(0.5)`,                offset: 1 },
        ], { duration: 1100, easing: SOFT, fill: 'forwards' }),
      ];
    },
  },
};

export const ANIMATION_NAMES = Object.keys(ANIMATIONS);
