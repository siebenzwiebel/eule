const POP  = 'cubic-bezier(.34, 1.56, .64, 1)';
const SNAP = 'cubic-bezier(.4, 0, .2, 1)';
const SOFT = 'cubic-bezier(.5, 0, .5, 1)';

const triple = (a, b, c) => [{ transform: a }, { transform: b }, { transform: c }];

export const ANIMATIONS = {
  idle: {
    loop: true,
    build(rig) {
      return [
        rig.body.animate(
          triple('scaleY(1) translateY(0)',
                 'scaleY(1.022) translateY(-1.5px)',
                 'scaleY(1) translateY(0)'),
          { duration: 2400, iterations: Infinity, easing: 'ease-in-out' }
        ),
        rig.head.animate(
          triple('translateY(0)', 'translateY(-2px)', 'translateY(0)'),
          { duration: 2400, iterations: Infinity, easing: 'ease-in-out' }
        ),
      ];
    },
  },

  blink: {
    build(rig) {
      const kf = [
        { transform: 'scaleY(1)' },
        { transform: 'scaleY(0.06)', offset: 0.5 },
        { transform: 'scaleY(1)' },
      ];
      const opts = { duration: 220, easing: SNAP };
      return [rig.eyeLeft.animate(kf, opts), rig.eyeRight.animate(kf, opts)];
    },
  },

  headTurn: {
    build(rig, { direction = 'left' } = {}) {
      const sign = direction === 'right' ? 1 : -1;
      const kf = [
        { transform: 'rotateY(0deg) translateX(0)' },
        { transform: `rotateY(${sign * 28}deg) translateX(${sign * 6}px)`, offset: 0.45 },
        { transform: `rotateY(${sign * 28}deg) translateX(${sign * 6}px)`, offset: 0.7 },
        { transform: 'rotateY(0deg) translateX(0)' },
      ];
      return [rig.head.animate(kf, { duration: 720, easing: POP })];
    },
  },

  headTilt: {
    build(rig, { direction = 'left', degrees = 12 } = {}) {
      const sign = direction === 'right' ? 1 : -1;
      const kf = [
        { transform: 'rotate(0deg)' },
        { transform: `rotate(${sign * degrees}deg)`, offset: 0.4 },
        { transform: `rotate(${sign * degrees}deg)`, offset: 0.7 },
        { transform: 'rotate(0deg)' },
      ];
      return [rig.head.animate(kf, { duration: 700, easing: POP })];
    },
  },

  nod: {
    build(rig) {
      return [
        rig.head.animate([
          { transform: 'translateY(0) rotate(0)' },
          { transform: 'translateY(-3px) rotate(-3deg)', offset: 0.25 },
          { transform: 'translateY(5px) rotate(4deg)',   offset: 0.55 },
          { transform: 'translateY(-2px) rotate(-2deg)', offset: 0.8 },
          { transform: 'translateY(0) rotate(0)' },
        ], { duration: 700, easing: SOFT }),
      ];
    },
  },

  shake: {
    build(rig) {
      return [
        rig.head.animate([
          { transform: 'rotate(0)' },
          { transform: 'rotate(-9deg)',  offset: 0.2 },
          { transform: 'rotate(8deg)',   offset: 0.45 },
          { transform: 'rotate(-6deg)',  offset: 0.7 },
          { transform: 'rotate(0)' },
        ], { duration: 620, easing: SNAP }),
      ];
    },
  },

  lookUp: {
    build(rig) {
      return [
        rig.head.animate([
          { transform: 'translateY(0) rotate(0)' },
          { transform: 'translateY(-5px) rotate(-2deg)', offset: 0.4 },
          { transform: 'translateY(-5px) rotate(-2deg)', offset: 0.7 },
          { transform: 'translateY(0) rotate(0)' },
        ], { duration: 600, easing: POP }),
      ];
    },
  },

  lookDown: {
    build(rig) {
      return [
        rig.head.animate([
          { transform: 'translateY(0) rotate(0)' },
          { transform: 'translateY(6px) rotate(3deg)', offset: 0.4 },
          { transform: 'translateY(6px) rotate(3deg)', offset: 0.7 },
          { transform: 'translateY(0) rotate(0)' },
        ], { duration: 600, easing: POP }),
      ];
    },
  },

  preen: {
    build(rig) {
      return [
        rig.head.animate([
          { transform: 'translate(0,0) rotate(0)' },
          { transform: 'translate(40px,28px) rotate(38deg)', offset: 0.35 },
          { transform: 'translate(38px,32px) rotate(44deg)', offset: 0.55 },
          { transform: 'translate(20px,18px) rotate(20deg)', offset: 0.75 },
          { transform: 'translate(0,0) rotate(0)' },
        ], { duration: 1200, easing: SOFT }),
        rig.wingRight.animate([
          { transform: 'rotate(0)' },
          { transform: 'rotate(-12deg)', offset: 0.4 },
          { transform: 'rotate(-10deg)', offset: 0.6 },
          { transform: 'rotate(0)' },
        ], { duration: 1200, easing: SOFT }),
      ];
    },
  },

  yawn: {
    build(rig) {
      return [
        rig.head.animate([
          { transform: 'translateY(0) rotate(0)' },
          { transform: 'translateY(-3px) rotate(-4deg)', offset: 0.4 },
          { transform: 'translateY(-3px) rotate(-4deg)', offset: 0.7 },
          { transform: 'translateY(0) rotate(0)' },
        ], { duration: 900, easing: SOFT }),
        rig.beak.animate([
          { transform: 'scaleY(1) translateY(0)' },
          { transform: 'scaleY(2.6) translateY(8px)', offset: 0.4 },
          { transform: 'scaleY(2.6) translateY(8px)', offset: 0.7 },
          { transform: 'scaleY(1) translateY(0)' },
        ], { duration: 900, easing: SOFT }),
      ];
    },
  },

  shiver: {
    build(rig) {
      const kf = [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-3px)', offset: 0.15 },
        { transform: 'translateX(3px)',  offset: 0.3 },
        { transform: 'translateX(-2px)', offset: 0.45 },
        { transform: 'translateX(2px)',  offset: 0.6 },
        { transform: 'translateX(-1px)', offset: 0.8 },
        { transform: 'translateX(0)' },
      ];
      const opts = { duration: 380, easing: 'linear' };
      return [
        rig.body.animate(kf, opts),
        rig.head.animate(kf, opts),
        rig.wingLeft.animate(kf, opts),
        rig.wingRight.animate(kf, opts),
      ];
    },
  },

  alert: {
    build(rig) {
      return [
        rig.body.animate([
          { transform: 'scaleY(1) translateY(0)' },
          { transform: 'scaleY(1.04) translateY(-4px)', offset: 0.35 },
          { transform: 'scaleY(1.04) translateY(-4px)', offset: 0.75 },
          { transform: 'scaleY(1) translateY(0)' },
        ], { duration: 520, easing: POP }),
        rig.head.animate([
          { transform: 'translateY(0) scale(1)' },
          { transform: 'translateY(-4px) scale(1.03)', offset: 0.35 },
          { transform: 'translateY(-4px) scale(1.03)', offset: 0.75 },
          { transform: 'translateY(0) scale(1)' },
        ], { duration: 520, easing: POP }),
      ];
    },
  },

  wingFlutter: {
    build(rig) {
      const left = [
        { transform: 'rotate(0)' },
        { transform: 'rotate(-10deg)', offset: 0.25 },
        { transform: 'rotate(6deg)',   offset: 0.5 },
        { transform: 'rotate(-8deg)',  offset: 0.75 },
        { transform: 'rotate(0)' },
      ];
      const right = left.map(k => ({ transform: k.transform.replace('rotate(', 'rotate(').replace(/rotate\((-?\d+(?:\.\d+)?)deg\)/, (_, d) => `rotate(${-parseFloat(d)}deg)`) }));
      const opts = { duration: 460, easing: SNAP };
      return [
        rig.wingLeft.animate(left, opts),
        rig.wingRight.animate(right, opts),
      ];
    },
  },

  wingStretch: {
    build(rig, { side = 'left' } = {}) {
      const wing = side === 'right' ? rig.wingRight : rig.wingLeft;
      const sign = side === 'right' ? 1 : -1;
      return [
        wing.animate([
          { transform: 'rotate(0) scale(1)' },
          { transform: `rotate(${sign * 28}deg) scale(1.06)`, offset: 0.4 },
          { transform: `rotate(${sign * 28}deg) scale(1.06)`, offset: 0.7 },
          { transform: 'rotate(0) scale(1)' },
        ], { duration: 760, easing: POP }),
      ];
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
        rig.body.animate(squash, opts),
      ];
    },
  },

  bow: {
    build(rig) {
      return [
        rig.head.animate([
          { transform: 'translateY(0) rotate(0)' },
          { transform: 'translateY(10px) rotate(8deg)', offset: 0.45 },
          { transform: 'translateY(10px) rotate(8deg)', offset: 0.7 },
          { transform: 'translateY(0) rotate(0)' },
        ], { duration: 700, easing: SOFT }),
        rig.body.animate([
          { transform: 'rotate(0)' },
          { transform: 'rotate(3deg)', offset: 0.45 },
          { transform: 'rotate(3deg)', offset: 0.7 },
          { transform: 'rotate(0)' },
        ], { duration: 700, easing: SOFT }),
      ];
    },
  },

  deepBreath: {
    build(rig) {
      return [
        rig.body.animate([
          { transform: 'scaleY(1) translateY(0)' },
          { transform: 'scaleY(1.06) translateY(-5px)', offset: 0.45 },
          { transform: 'scaleY(1.06) translateY(-5px)', offset: 0.55 },
          { transform: 'scaleY(1) translateY(0)' },
        ], { duration: 1800, easing: 'ease-in-out' }),
        rig.head.animate([
          { transform: 'translateY(0)' },
          { transform: 'translateY(-6px)', offset: 0.45 },
          { transform: 'translateY(-6px)', offset: 0.55 },
          { transform: 'translateY(0)' },
        ], { duration: 1800, easing: 'ease-in-out' }),
      ];
    },
  },

  flight: {
    build(rig) {
      const flap = [
        { transform: 'rotate(0)' },
        { transform: 'rotate(-22deg)' },
        { transform: 'rotate(8deg)' },
        { transform: 'rotate(-22deg)' },
        { transform: 'rotate(0)' },
      ];
      const flapRight = flap.map(k => ({
        transform: k.transform.replace(/rotate\((-?\d+(?:\.\d+)?)deg\)/,
          (_, d) => `rotate(${-parseFloat(d)}deg)`)
      }));
      const flapOpts = { duration: 380, iterations: 5, easing: SOFT };
      const path = [
        { transform: 'translate(0,0)' },
        { transform: 'translate(-90px,-110px)', offset: 0.25 },
        { transform: 'translate(40px,-160px)',  offset: 0.55 },
        { transform: 'translate(110px,-90px)',  offset: 0.8 },
        { transform: 'translate(0,0)',          offset: 1 },
      ];
      return [
        rig.stage.animate(path, { duration: 1900, easing: SOFT }),
        rig.wingLeft.animate(flap, flapOpts),
        rig.wingRight.animate(flapRight, flapOpts),
      ];
    },
  },

  landIn: {
    build(rig) {
      const flap = [
        { transform: 'rotate(0)' },
        { transform: 'rotate(-22deg)' },
        { transform: 'rotate(6deg)' },
        { transform: 'rotate(-22deg)' },
        { transform: 'rotate(0)' },
      ];
      const flapRight = flap.map(k => ({
        transform: k.transform.replace(/rotate\((-?\d+(?:\.\d+)?)deg\)/,
          (_, d) => `rotate(${-parseFloat(d)}deg)`)
      }));
      const flapOpts = { duration: 280, iterations: 4, easing: SOFT };
      return [
        rig.stage.animate([
          { transform: 'translate(-220px,-260px) scale(0.6)', opacity: 0 },
          { transform: 'translate(-160px,-180px) scale(0.7)', opacity: 1, offset: 0.25 },
          { transform: 'translate(-40px,-30px) scale(0.95)',  offset: 0.7 },
          { transform: 'translate(0,12px) scale(1.04)',       offset: 0.88 },
          { transform: 'translate(0,0) scale(1)',             offset: 1 },
        ], { duration: 1100, easing: SOFT, fill: 'forwards' }),
        rig.wingLeft.animate(flap, flapOpts),
        rig.wingRight.animate(flapRight, flapOpts),
      ];
    },
  },

  flyOut: {
    build(rig) {
      const flap = [
        { transform: 'rotate(0)' },
        { transform: 'rotate(-22deg)' },
        { transform: 'rotate(6deg)' },
        { transform: 'rotate(-22deg)' },
        { transform: 'rotate(0)' },
      ];
      const flapRight = flap.map(k => ({
        transform: k.transform.replace(/rotate\((-?\d+(?:\.\d+)?)deg\)/,
          (_, d) => `rotate(${-parseFloat(d)}deg)`)
      }));
      const flapOpts = { duration: 280, iterations: 4, easing: SOFT };
      return [
        rig.stage.animate([
          { transform: 'translate(0,0) scale(1)',            opacity: 1 },
          { transform: 'translate(20px,-20px) scale(1.02)',  offset: 0.15 },
          { transform: 'translate(140px,-160px) scale(0.85)',offset: 0.6 },
          { transform: 'translate(280px,-300px) scale(0.55)',opacity: 0, offset: 1 },
        ], { duration: 1100, easing: SOFT, fill: 'forwards' }),
        rig.wingLeft.animate(flap, flapOpts),
        rig.wingRight.animate(flapRight, flapOpts),
      ];
    },
  },

  sleep: {
    loop: true,
    build(rig) {
      return [
        rig.lidLeft.animate(
          [{ opacity: 0 }, { opacity: 1 }],
          { duration: 600, fill: 'forwards', easing: SOFT }
        ),
        rig.lidRight.animate(
          [{ opacity: 0 }, { opacity: 1 }],
          { duration: 600, fill: 'forwards', easing: SOFT }
        ),
        rig.head.animate(
          triple('translateY(0)', 'translateY(4px)', 'translateY(4px)'),
          { duration: 600, fill: 'forwards', easing: SOFT }
        ),
        rig.body.animate(
          triple('scaleY(1) translateY(0)',
                 'scaleY(1.012) translateY(-1px)',
                 'scaleY(1) translateY(0)'),
          { duration: 4200, iterations: Infinity, easing: 'ease-in-out' }
        ),
      ];
    },
  },
};

export const ANIMATION_NAMES = Object.keys(ANIMATIONS);
