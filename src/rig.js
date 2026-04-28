const HOOKS = [
  ['root',        'eule-root'],
  ['silhouette',  'eule-silhouette'],
  ['pupilLeft',   'eule-pupil-left'],
  ['pupilRight',  'eule-pupil-right'],
  ['lidLeft',     'eule-lid-left'],
  ['lidRight',    'eule-lid-right'],
];

const DEFAULT_SVG_URL = 'assets/owl/eule.svg';

async function fetchSvg(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Eule: cannot load ${url} (${res.status})`);
  return res.text();
}

export function buildRig(target, options = {}) {
  const {
    size = 480,
    svg: svgUrl = DEFAULT_SVG_URL,
  } = options;

  const stage = document.createElement('div');
  stage.className = 'eule-stage';
  stage.style.setProperty('--eule-size', `${size}px`);

  while (target.firstChild) target.removeChild(target.firstChild);
  target.appendChild(stage);

  const ready = fetchSvg(svgUrl).then((markup) => {
    stage.innerHTML = markup;
    const svgEl = stage.querySelector('svg');
    if (!svgEl) throw new Error('Eule: fetched markup contained no <svg>');
    svgEl.classList.add('eule-svg');
    svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svgEl.removeAttribute('width');
    svgEl.removeAttribute('height');
    return svgEl;
  });

  const rig = {
    stage,
    setSize(px) { stage.style.setProperty('--eule-size', `${px}px`); },
  };

  rig.ready = ready.then((svgEl) => {
    rig.svg = svgEl;
    for (const [key, id] of HOOKS) {
      rig[key] = svgEl.getElementById(id);
    }
    rig.body = rig.silhouette;
    return rig;
  });

  return rig;
}
