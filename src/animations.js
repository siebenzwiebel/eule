const POP  = 'cubic-bezier(.34, 1.56, .64, 1)';
const SNAP = 'cubic-bezier(.4, 0, .2, 1)';
const SOFT = 'cubic-bezier(.5, 0, .5, 1)';

const triple = (a, b, c) => [{ transform: a }, { transform: b }, { transform: c }];

export const ANIMATIONS = {
  idle: {
    loop: true,
    build(rig) {
      return [
        rig.root.animate(
          triple('scaleY(1) translateY(0)',
                 'scaleY(1.018) translateY(-1.5px)',
                 'scaleY(1) translateY(0)'),
          { duration: 2400, iterations: Infinity, easing: 'ease-in-out' }
        ),
      ];
    },
  },

  blink: {
    build(rig) {
      const kf = [
        { transform: 'scaleY(0)', opacity: 0 },
        { transform: 'scaleY(0.5)', opacity: 1, offset: 0.15 },
        { transform: 'scaleY(1)', opacity: 1, offset: 0.45 },
        { transform: 'scaleY(0.5)', opacity: 1, offset: 0.75 },
        { transform: 'scaleY(0)', opacity: 0 },
      ];
      const opts = { duration: 220, easing: SNAP };
      return [rig.lidLeft.animate(kf, opts), rig.lidRight.animate(kf, opts)];
    },
  },

  headTurn: {
    build(rig, { direction = 'left' } = {}) {
      const sign = direction === 'right' ? 1 : -1;
      return [rig.root.animate([
        { transform: 'translateX(0) scaleX(1)' },
        { transform: `translateX(${sign * 14}px) scaleX(0.95)`, offset: 0.45 },
        { transform: `translateX(${sign * 14}px) scaleX(0.95)`, offset: 0.7 },
        { transform: 'translateX(0) scaleX(1)' },
      ], { duration: 720, easing: POP })];
    },
  },

  headTilt: {
    build(rig, { direction = 'left', degrees = 8 } = {}) {
      const sign = direction === 'right' ? 1 : -1;
      return [rig.root.animate([
        { transform: 'rotate(0deg)' },
        { transform: `rotate(${sign * degrees}deg)`, offset: 0.4 },
        { transform: `rotate(${sign * degrees}deg)`, offset: 0.7 },
        { transform: 'rotate(0deg)' },
      ], { duration: 700, easing: POP })];
    },
  },

  nod: {
    build(rig) {
      return [rig.root.animate([
        { transform: 'translateY(0) rotate(0)' },
        { transform: 'translateY(-4px) rotate(-3deg)', offset: 0.25 },
        { transform: 'translateY(7px) rotate(4deg)',   offset: 0.55 },
        { transform: 'translateY(-2px) rotate(-1deg)', offset: 0.8 },
        { transform: 'translateY(0) rotate(0)' },
      ], { duration: 700, easing: SOFT })];
    },
  },

  shake: {
    build(rig) {
      return [rig.root.animate([
        { transform: 'translateX(0) rotate(0)' },
        { transform: 'translateX(-9px) rotate(-3deg)', offset: 0.2 },
        { transform: 'translateX(9px) rotate(3deg)',   offset: 0.45 },
        { transform: 'translateX(-6px) rotate(-2deg)', offset: 0.7 },
        { transform: 'translateX(0) rotate(0)' },
      ], { duration: 620, easing: SNAP })];
    },
  },

  lookUp: {
    build(rig) {
      return [rig.root.animate([
        { transform: 'translateY(0)' },
        { transform: 'translateY(-9px)', offset: 0.4 },
        { transform: 'translateY(-9px)', offset: 0.7 },
        { transform: 'translateY(0)' },
      ], { duration: 600, easing: POP })];
    },
  },

  lookDown: {
    build(rig) {
      return [rig.root.animate([
        { transform: 'translateY(0)' },
        { transform: 'translateY(10px)', offset: 0.4 },
        { transform: 'translateY(10px)', offset: 0.7 },
        { transform: 'translateY(0)' },
      ], { duration: 600, easing: POP })];
    },
  },

  preen: {
    build(rig) {
      return [rig.root.animate([
        { transform: 'translate(0,0) rotate(0)' },
        { transform: 'translate(20px,8px) rotate(10deg)', offset: 0.35 },
        { transform: 'translate(22px,10px) rotate(12deg)', offset: 0.55 },
        { transform: 'translate(10px,4px) rotate(6deg)',  offset: 0.75 },
        { transform: 'translate(0,0) rotate(0)' },
      ], { duration: 1100, easing: SOFT })];
    },
  },

  yawn: {
    build(rig) {
      return [rig.root.animate([
        { transform: 'scale(1, 1) rotate(0)' },
        { transform: 'scale(1.04, 1.06) rotate(-2deg)', offset: 0.4 },
        { transform: 'scale(1.04, 1.06) rotate(-2deg)', offset: 0.7 },
        { transform: 'scale(1, 1) rotate(0)' },
      ], { duration: 1000, easing: SOFT })];
    },
  },

  shiver: {
    build(rig) {
      return [rig.root.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-3px)', offset: 0.15 },
        { transform: 'translateX(3px)',  offset: 0.3 },
        { transform: 'translateX(-2px)', offset: 0.45 },
        { transform: 'translateX(2px)',  offset: 0.6 },
        { transform: 'translateX(-1px)', offset: 0.8 },
        { transform: 'translateX(0)' },
      ], { duration: 380, easing: 'linear' })];
    },
  },

  alert: {
    build(rig) {
      return [rig.root.animate([
        { transform: 'scaleY(1) translateY(0)' },
        { transform: 'scaleY(1.06) translateY(-5px)', offset: 0.35 },
        { transform: 'scaleY(1.06) translateY(-5px)', offset: 0.75 },
        { transform: 'scaleY(1) translateY(0)' },
      ], { duration: 520, easing: POP })];
    },
  },

  wingFlutter: {
    build(rig) {
      return [rig.root.animate([
        { transform: 'scaleX(1)' },
        { transform: 'scaleX(1.05)', offset: 0.18 },
        { transform: 'scaleX(0.97)', offset: 0.36 },
        { transform: 'scaleX(1.05)', offset: 0.54 },
        { transform: 'scaleX(0.97)', offset: 0.72 },
        { transform: 'scaleX(1)' },
      ], { duration: 460, easing: SNAP })];
    },
  },

  wingStretch: {
    build(rig, { side = 'left' } = {}) {
      const sign = side === 'right' ? 1 : -1;
      return [rig.root.animate([
        { transform: 'skewX(0) translateX(0)' },
        { transform: `skewX(${sign * 6}deg) translateX(${sign * 6}px)`, offset: 0.4 },
        { transform: `skewX(${sign * 6}deg) translateX(${sign * 6}px)`, offset: 0.7 },
        { transform: 'skewX(0) translateX(0)' },
      ], { duration: 760, easing: POP })];
    },
  },

  hop: {
    build(rig) {
      const lift = [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-26px)', offset: 0.45 },
        { transform: 'translateY(0)',     offset: 0.9 },
        { transform: 'translateY(-12px)', offset: 0.95 },
        { transform: 'translateY(0)',     offset: 1 },
      ];
      const squash = [
        { transform: 'scale(1, 1)' },
        { transform: 'scale(1.06, 0.92)', offset: 0.08 },
        { transform: 'scale(0.95, 1.08)', offset: 0.4 },
        { transform: 'scale(0.95, 1.08)', offset: 0.55 },
        { transform: 'scale(1.06, 0.92)', offset: 0.88 },
        { transform: 'scale(1, 1)',       offset: 1 },
      ];
      const opts = { duration: 700, easing: SOFT };
      return [
        rig.stage.animate(lift, opts),
        rig.root.animate(squash, opts),
      ];
    },
  },

  bow: {
    build(rig) {
      return [rig.root.animate([
        { transform: 'translateY(0) rotate(0)' },
        { transform: 'translateY(10px) rotate(8deg)', offset: 0.45 },
        { transform: 'translateY(10px) rotate(8deg)', offset: 0.7 },
        { transform: 'translateY(0) rotate(0)' },
      ], { duration: 700, easing: SOFT })];
    },
  },

  deepBreath: {
    build(rig) {
      return [rig.root.animate([
        { transform: 'scaleY(1) translateY(0)' },
        { transform: 'scaleY(1.06) translateY(-5px)', offset: 0.45 },
        { transform: 'scaleY(1.06) translateY(-5px)', offset: 0.55 },
        { transform: 'scaleY(1) translateY(0)' },
      ], { duration: 1800, easing: 'ease-in-out' })];
    },
  },

  flight: {
    build(rig) {
      const path = [
        { transform: 'translate(0,0)' },
        { transform: 'translate(-90px,-110px)', offset: 0.25 },
        { transform: 'translate(40px,-160px)',  offset: 0.55 },
        { transform: 'translate(110px,-90px)',  offset: 0.8 },
        { transform: 'translate(0,0)',          offset: 1 },
      ];
      const wobble = [
        { transform: 'scaleX(1)' },
        { transform: 'scaleX(1.05)' },
        { transform: 'scaleX(0.97)' },
        { transform: 'scaleX(1.05)' },
        { transform: 'scaleX(1)' },
      ];
      return [
        rig.stage.animate(path, { duration: 1900, easing: SOFT }),
        rig.root.animate(wobble,
          { duration: 380, iterations: 5, easing: SOFT }),
      ];
    },
  },

  landIn: {
    build(rig) {
      return [
        rig.stage.animate([
          { transform: 'translate(-220px,-260px) scale(0.6)', opacity: 0 },
          { transform: 'translate(-160px,-180px) scale(0.7)', opacity: 1, offset: 0.25 },
          { transform: 'translate(-40px,-30px) scale(0.95)',  offset: 0.7 },
          { transform: 'translate(0,12px) scale(1.04)',       offset: 0.88 },
          { transform: 'translate(0,0) scale(1)',             offset: 1 },
        ], { duration: 1100, easing: SOFT, fill: 'forwards' }),
      ];
    },
  },

  flyOut: {
    build(rig) {
      return [
        rig.stage.animate([
          { transform: 'translate(0,0) scale(1)',             opacity: 1 },
          { transform: 'translate(20px,-20px) scale(1.02)',   offset: 0.15 },
          { transform: 'translate(140px,-160px) scale(0.85)', offset: 0.6 },
          { transform: 'translate(280px,-300px) scale(0.55)', opacity: 0, offset: 1 },
        ], { duration: 1100, easing: SOFT, fill: 'forwards' }),
      ];
    },
  },

  sleep: {
    loop: true,
    build(rig) {
      return [
        rig.lidLeft.animate(
          [{ transform: 'scaleY(0)', opacity: 0 },
           { transform: 'scaleY(1)', opacity: 1 }],
          { duration: 600, fill: 'forwards', easing: SOFT }
        ),
        rig.lidRight.animate(
          [{ transform: 'scaleY(0)', opacity: 0 },
           { transform: 'scaleY(1)', opacity: 1 }],
          { duration: 600, fill: 'forwards', easing: SOFT }
        ),
        rig.root.animate(
          triple('scaleY(1) translateY(0)',
                 'scaleY(1.012) translateY(-1px)',
                 'scaleY(1) translateY(0)'),
          { duration: 4200, iterations: Infinity, easing: 'ease-in-out' }
        ),
      ];
    },
  },

  trace: {
    loop: true,
    build(rig) {
      return [
        rig.trace.animate([
          { strokeDasharray: '14 86', strokeDashoffset: 0,    opacity: 0.85 },
          { strokeDasharray: '14 86', strokeDashoffset: -100, opacity: 0.85 },
        ], { duration: 2200, iterations: Infinity, easing: 'linear', fill: 'both' }),
      ];
    },
  },
};

export const ANIMATION_NAMES = Object.keys(ANIMATIONS);
