const LAYERS = [
  { key: 'body',      cls: 'eule-body',       base: 'body',       parent: 'stage' },
  { key: 'wingLeft',  cls: 'eule-wing-left',  base: 'wing-left',  parent: 'stage' },
  { key: 'wingRight', cls: 'eule-wing-right', base: 'wing-right', parent: 'stage' },
  { key: 'eyeLeft',   cls: 'eule-eye-left',   base: 'eye-left',   parent: 'head'  },
  { key: 'eyeRight',  cls: 'eule-eye-right',  base: 'eye-right',  parent: 'head'  },
  { key: 'lidLeft',   cls: 'eule-lid-left',   base: 'lid-left',   parent: 'head'  },
  { key: 'lidRight',  cls: 'eule-lid-right',  base: 'lid-right',  parent: 'head'  },
  { key: 'beak',      cls: 'eule-beak',       base: 'beak',       parent: 'head'  },
];

const PRESETS = {
  owl:         { ext: 'png' },
  placeholder: { ext: 'svg' },
};

function resolveAssetUrls(assets) {
  if (assets && typeof assets === 'object' && !Array.isArray(assets)) {
    return (def) => {
      const key = def.base.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      return assets[key] || assets[def.base] || `assets/owl/${def.base}.png`;
    };
  }
  const name = assets || 'owl';
  const cfg = PRESETS[name] || { ext: 'png' };
  return (def) => `assets/${name}/${def.base}.${cfg.ext}`;
}

export function buildRig(target, options = {}) {
  const {
    size = 480,
    assets = 'placeholder',
  } = options;

  const url = resolveAssetUrls(assets);

  const stage = document.createElement('div');
  stage.className = 'eule-stage';
  stage.style.setProperty('--eule-size', `${size}px`);

  const head = document.createElement('div');
  head.className = 'eule-head';

  const elements = { stage, head };
  const imgPromises = [];

  for (const def of LAYERS) {
    const img = document.createElement('img');
    img.className = `eule-layer ${def.cls}`;
    img.alt = '';
    img.draggable = false;
    img.src = url(def.asset);
    elements[def.key] = img;

    imgPromises.push(new Promise((resolve) => {
      if (img.complete && img.naturalWidth > 0) return resolve();
      img.addEventListener('load',  () => resolve(), { once: true });
      img.addEventListener('error', () => resolve(), { once: true });
    }));
  }

  for (const def of LAYERS) {
    const parent = def.parent === 'head' ? head : stage;
    parent.appendChild(elements[def.key]);
  }
  stage.appendChild(head);

  while (target.firstChild) target.removeChild(target.firstChild);
  target.appendChild(stage);

  const ready = Promise.all(imgPromises).then(() => undefined);
  return { ...elements, ready, setSize(px) {
    stage.style.setProperty('--eule-size', `${px}px`);
  } };
}
