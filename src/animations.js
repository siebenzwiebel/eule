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
        rig.face.animate(
          triple('translateY(0)', 'translateY(-1.5px)', 'translateY(0)'),
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
        { transform: 'translateX(0) scaleX(1)' },
        { transform: `translateX(${sign * 16}px) scaleX(0.94)`, offset: 0.45 },
        { transform: `translateX(${sign * 16}px) scaleX(0.94)`, offset: 0.7 },
        { transform: 'translateX(0) scaleX(1)' },
      ];
      return [rig.face.animate(kf, { duration: 720, easing: POP })];
    },
  },

  headTilt: {
    build(rig, { direction = 'left', degrees = 8 } = {}) {
      const sign = direction === 'right' ? 1 : -1;
      const kf = [
        { transform: 'rotate(0deg)' },
        { transform: `rotate(${sign * degrees}deg)`, offset: 0.4 },
        { transform: `rotate(${sign * degrees}deg)`, offset: 0.7 },
        { transform: 'rotate(0deg)' },
      ];
      return [rig.face.animate(kf, { duration: 700, easing: POP })];
    },
  },

  nod: {
    build(rig) {
      return [
        rig.face.animate([
          { transform: 'translateY(0) rotate(0)' },
          { transform: 'translateY(-3px) rotate(-2deg)', offset: 0.25 },
          { transform: 'translateY(6px) rotate(3deg)',   offset: 0.55 },
          { transform: 'translateY(-2px) rotate(-1deg)', offset: 0.8 },
          { transform: 'translateY(0) rotate(0)' },
        ], { duration: 700, easing: SOFT }),
      ];
    },
  },

  shake: {
    build(rig) {
      return [
        rig.face.animate([
          { transform: 'translateX(0) rotate(0)' },
          { transform: 'translateX(-9px) rotate(-3deg)', offset: 0.2 },
          { transform: 'translateX(9px) rotate(3deg)',   offset: 0.45 },
          { transform: 'translateX(-6px) rotate(-2deg)', offset: 0.7 },
          { transform: 'translateX(0) rotate(0)' },
        ], { duration: 620, easing: SNAP }),
      ];
    },
  },

  lookUp: {
    build(rig) {
      return [
        rig.face.animate([
          { transform: 'translateY(0)' },
          { transform: 'translateY(-7px)', offset: 0.4 },
          { transform: 'translateY(-7px)', offset: 0.7 },
          { transform: 'translateY(0)' },
        ], { duration: 600, easing: POP }),
      ];
    },
  },

  lookDown: {
    build(rig) {
      return [
        rig.face.animate([
          { transform: 'translateY(0)' },
          { transform: 'translateY(8px)', offset: 0.4 },
          { transform: 'translateY(8px)', offset: 0.7 },
          { transform: 'translateY(0)' },
        ], { duration: 600, easing: POP }),
      ];
    },
  },

  preen: {
    build(rig) {
      return [
        rig.face.animate([
          { transform: 'translate(0,0) rotate(0)' },
          { transform: 'translate(28px,16px) rotate(12deg)', offset: 0.35 },
          { transform: 'translate(30px,18px) rotate(14deg)', offset: 0.55 },
          { transform: 'translate(14px,9px) rotate(7deg)',   offset: 0.75 },
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
        rig.face.animate([
          { transform: 'translateY(0) rotate(0)' },
          { transform: 'translateY(-3px) rotate(-2deg)', offset: 0.4 },
          { transform: 'translateY(-3px) rotate(-2deg)', offset: 0.7 },
          { transform: 'translateY(0) rotate(0)' },
        ], { duration: 900, easing: SOFT }),
        rig.beak.animate([
          { transform: 'scale(1, 1) translateY(0)' },
          { transform: 'scale(1.4, 2.6) translateY(8px)', offset: 0.4 },
          { transform: 'scale(1.4, 2.6) translateY(8px)', offset: 0.7 },
          { transform: 'scale(1, 1) translateY(0)' },
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
      return [rig.root.animate(kf, { duration: 380, easing: 'linear' })];
    },
  },

  alert: {
    build(rig) {
      return [
        rig.root.animate([
          { transform: 'scaleY(1) translateY(0)' },
          { transform: 'scaleY(1.04) translateY(-4px)', offset: 0.35 },
          { transform: 'scaleY(1.04) translateY(-4px)', offset: 0.75 },
          { transform: 'scaleY(1) translateY(0)' },
        ], { duration: 520, easing: POP }),
        rig.face.animate([
          { transform: 'translateY(0) scale(1)' },
          { transform: 'translateY(-3px) scale(1.04)', offset: 0.35 },
          { transform: 'translateY(-3px) scale(1.04)', offset: 0.75 },
          { transform: 'translateY(0) scale(1)' },
        ], { duration: 520, easing: POP }),
      ];
    },
  },

  wingFlutter: {
    build(rig) {
      const left = [
        { transform: 'rotate(0)' },
        { transform: 'rotate(-9deg)', offset: 0.25 },
        { transform: 'rotate(5deg)',  offset: 0.5 },
        { transform: 'rotate(-7deg)', offset: 0.75 },
        { transform: 'rotate(0)' },
      ];
      const right = left.map(k => ({
        transform: k.transform.replace(/rotate\((-?\d+(?:\.\d+)?)deg\)/, (_, d) => `rotate(${-parseFloat(d)}deg)`),
      }));
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
          { transform: 'rotate(0)' },
          { transform: `rotate(${sign * 18}deg)`, offset: 0.4 },
          { transform: `rotate(${sign * 18}deg)`, offset: 0.7 },
          { transform: 'rotate(0)' },
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
        rig.root.animate(squash, opts),
      ];
    },
  },

  bow: {
    build(rig) {
      return [
        rig.face.animate([
          { transform: 'translateY(0) rotate(0)' },
          { transform: 'translateY(8px) rotate(5deg)', offset: 0.45 },
          { transform: 'translateY(8px) rotate(5deg)', offset: 0.7 },
          { transform: 'translateY(0) rotate(0)' },
        ], { duration: 700, easing: SOFT }),
        rig.root.animate([
          { transform: 'rotate(0)' },
          { transform: 'rotate(2deg)', offset: 0.45 },
          { transform: 'rotate(2deg)', offset: 0.7 },
          { transform: 'rotate(0)' },
        ], { duration: 700, easing: SOFT }),
      ];
    },
  },

  deepBreath: {
    build(rig) {
      return [
        rig.root.animate([
          { transform: 'scaleY(1) translateY(0)' },
          { transform: 'scaleY(1.06) translateY(-5px)', offset: 0.45 },
          { transform: 'scaleY(1.06) translateY(-5px)', offset: 0.55 },
          { transform: 'scaleY(1) translateY(0)' },
        ], { duration: 1800, easing: 'ease-in-out' }),
        rig.face.animate([
          { transform: 'translateY(0)' },
          { transform: 'translateY(-4px)', offset: 0.45 },
          { transform: 'translateY(-4px)', offset: 0.55 },
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
        transform: k.transform.replace(/rotate\((-?\d+(?:\.\d+)?)deg\)/, (_, d) => `rotate(${-parseFloat(d)}deg)`),
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
        transform: k.transform.replace(/rotate\((-?\d+(?:\.\d+)?)deg\)/, (_, d) => `rotate(${-parseFloat(d)}deg)`),
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
        transform: k.transform.replace(/rotate\((-?\d+(?:\.\d+)?)deg\)/, (_, d) => `rotate(${-parseFloat(d)}deg)`),
      }));
      const flapOpts = { duration: 280, iterations: 4, easing: SOFT };
      return [
        rig.stage.animate([
          { transform: 'translate(0,0) scale(1)',             opacity: 1 },
          { transform: 'translate(20px,-20px) scale(1.02)',   offset: 0.15 },
          { transform: 'translate(140px,-160px) scale(0.85)', offset: 0.6 },
          { transform: 'translate(280px,-300px) scale(0.55)', opacity: 0, offset: 1 },
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
        rig.face.animate(
          triple('translateY(0)', 'translateY(3px)', 'translateY(3px)'),
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
};

export const ANIMATION_NAMES = Object.keys(ANIMATIONS);
