const POP  = 'cubic-bezier(.34, 1.56, .64, 1)';
const SNAP = 'cubic-bezier(.4, 0, .2, 1)';
const SOFT = 'cubic-bezier(.5, 0, .5, 1)';

export const ANIMATIONS = {
  blink: {
    build(rig) {
      const kf = [
        { transform: 'scaleY(0)', opacity: 1 },
        { transform: 'scaleY(1)', opacity: 1, offset: 0.45 },
        { transform: 'scaleY(1)', opacity: 1, offset: 0.55 },
        { transform: 'scaleY(0)', opacity: 1 },
      ];
      const opts = { duration: 220, easing: SNAP };
      return [rig.lidLeft.animate(kf, opts), rig.lidRight.animate(kf, opts)];
    },
  },

  nod: {
    build(rig) {
      return [rig.root.animate([
        { transform: 'translateY(0) rotate(0)' },
        { transform: 'translateY(-6px) rotate(-4deg)', offset: 0.25 },
        { transform: 'translateY(9px) rotate(5deg)',   offset: 0.55 },
        { transform: 'translateY(-2px) rotate(-1deg)', offset: 0.8 },
        { transform: 'translateY(0) rotate(0)' },
      ], { duration: 750, easing: SOFT })];
    },
  },

  headTilt: {
    build(rig, { direction = 'left', degrees = 14 } = {}) {
      const sign = direction === 'right' ? 1 : -1;
      return [rig.root.animate([
        { transform: 'rotate(0deg)' },
        { transform: `rotate(${sign * degrees}deg)`, offset: 0.4 },
        { transform: `rotate(${sign * degrees}deg)`, offset: 0.7 },
        { transform: 'rotate(0deg)' },
      ], { duration: 800, easing: POP })];
    },
  },

  shake: {
    build(rig) {
      return [rig.root.animate([
        { transform: 'translateX(0) rotate(0)' },
        { transform: 'translateX(-11px) rotate(-4deg)', offset: 0.2 },
        { transform: 'translateX(11px) rotate(4deg)',   offset: 0.45 },
        { transform: 'translateX(-7px) rotate(-2deg)',  offset: 0.7 },
        { transform: 'translateX(0) rotate(0)' },
      ], { duration: 650, easing: SNAP })];
    },
  },

  hop: {
    build(rig) {
      const lift = [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-28px)', offset: 0.45 },
        { transform: 'translateY(0)',     offset: 1 },
      ];
      const squash = [
        { transform: 'scale(1, 1)' },
        { transform: 'scale(1.06, 0.92)', offset: 0.08 },
        { transform: 'scale(0.95, 1.08)', offset: 0.45 },
        { transform: 'scale(1.06, 0.92)', offset: 0.92 },
        { transform: 'scale(1, 1)',       offset: 1 },
      ];
      const opts = { duration: 650, easing: SOFT };
      return [
        rig.stage.animate(lift, opts),
        rig.root.animate(squash, opts),
      ];
    },
  },

  landIn: {
    build(rig, { angle = 135, distance } = {}) {
      // Default: enough to clear any viewport size
      const d = distance ?? Math.max(window.innerWidth, window.innerHeight) * 1.5;
      const rad = angle * Math.PI / 180;
      const dx = Math.cos(rad) * d;
      const dy = -Math.sin(rad) * d;
      const mx = dx * 0.35;
      const my = dy * 0.35;
      return [
        rig.stage.animate([
          { transform: `translate(${dx}px,${dy}px) scale(0.5)` },
          { transform: `translate(${mx}px,${my}px) scale(0.82)`, offset: 0.35 },
          { transform: 'translate(0,10px) scale(1.04)',           offset: 0.88 },
          { transform: 'translate(0,0) scale(1)',                 offset: 1 },
        ], { duration: 1100, easing: SOFT, fill: 'forwards' }),
      ];
    },
  },

  flyOut: {
    build(rig, { angle = 45, distance } = {}) {
      const d = distance ?? Math.max(window.innerWidth, window.innerHeight) * 1.5;
      const rad = angle * Math.PI / 180;
      const dx = Math.cos(rad) * d;
      const dy = -Math.sin(rad) * d;
      return [
        rig.stage.animate([
          { transform: 'translate(0,0) scale(1)' },
          { transform: `translate(${dx * 0.08}px,${dy * 0.08}px) scale(1.04)`, offset: 0.15 },
          { transform: `translate(${dx * 0.5}px,${dy * 0.5}px) scale(0.82)`,  offset: 0.6 },
          { transform: `translate(${dx}px,${dy}px) scale(0.5)`,               offset: 1 },
        ], { duration: 1100, easing: SOFT, fill: 'forwards' }),
      ];
    },
  },
};

export const ANIMATION_NAMES = Object.keys(ANIMATIONS);
