import { Eule } from './src/eule.js';

const GROUPS = {
  head:   ['blink', 'headTurn', 'headTilt', 'nod', 'shake', 'lookUp', 'lookDown'],
  char:   ['preen', 'yawn', 'shiver', 'alert'],
  action: ['wingFlutter', 'flight', 'landIn', 'flyOut'],
  accent: ['wingStretch', 'hop', 'bow', 'deepBreath', 'trace'],
};

const mount = document.getElementById('owl-mount');
const eule = new Eule(mount, { size: 480 });
window.eule = eule;

await eule.ready;

const sizeInput = document.getElementById('size');
const sizeOut   = document.getElementById('size-out');
sizeInput.addEventListener('input', () => {
  const px = +sizeInput.value;
  eule.setSize(px);
  sizeOut.value = `${px}px`;
});

document.querySelectorAll('[data-bg]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.body.dataset.bg = btn.dataset.bg;
    document.querySelectorAll('[data-bg]').forEach(b => b.classList.toggle('active', b === btn));
  });
});

document.getElementById('debug').addEventListener('change', (e) => {
  eule.setDebug(e.target.checked);
});

const flyAngleInput = document.getElementById('fly-angle');
const flyAngleOut   = document.getElementById('fly-angle-out');
const flyNeedle     = document.getElementById('dial-needle');

const updateAngleUi = () => {
  const angle = +flyAngleInput.value;
  flyAngleOut.value = `${angle}°`;
  // Math angle: 0=east, 90=north. SVG rotate is clockwise from x-axis,
  // and our SVG has y-down, so rotate by -angle to match math convention.
  flyNeedle.setAttribute('transform', `rotate(${-angle})`);
};
flyAngleInput.addEventListener('input', updateAngleUi);
updateAngleUi();

const playAnim = (name) => {
  if (name === 'landIn' || name === 'flyOut') {
    eule.play(name, { angle: +flyAngleInput.value });
  } else {
    eule.play(name);
  }
};

for (const [groupKey, names] of Object.entries(GROUPS)) {
  const host = document.getElementById(`anim-${groupKey}`);
  for (const name of names) {
    const btn = document.createElement('button');
    btn.textContent = name;
    btn.addEventListener('click', () => playAnim(name));
    host.appendChild(btn);
  }
}

document.querySelectorAll('[data-loop]').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.loop;
    if (action === 'stop') eule.stop();
    else if (action === 'idle') eule.idle();
    else if (action === 'sleep') eule.sleep();
  });
});

document.querySelectorAll('[data-chain]').forEach(btn => {
  btn.addEventListener('click', () => {
    const names = btn.dataset.chain.split(',').map(s => s.trim()).filter(Boolean);
    const angle = +flyAngleInput.value;
    const entries = names.map(n =>
      (n === 'landIn' || n === 'flyOut') ? [n, { angle }] : n
    );
    eule.chain(entries);
  });
});
