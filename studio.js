import { Eule } from './src/eule.js';

const GROUPS = {
  head:   ['blink', 'headTurn', 'headTilt', 'nod', 'shake', 'lookUp', 'lookDown'],
  char:   ['preen', 'yawn', 'shiver', 'alert'],
  action: ['wingFlutter', 'flight', 'landIn', 'flyOut'],
  accent: ['wingStretch', 'hop', 'bow', 'deepBreath'],
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

for (const [groupKey, names] of Object.entries(GROUPS)) {
  const host = document.getElementById(`anim-${groupKey}`);
  for (const name of names) {
    const btn = document.createElement('button');
    btn.textContent = name;
    btn.addEventListener('click', () => eule.play(name));
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
    eule.chain(names);
  });
});
