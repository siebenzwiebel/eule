const LAYERS = [
  { key: 'body',      cls: 'eule-body',      asset: 'body.svg',       parent: 'stage' },
  { key: 'wingLeft',  cls: 'eule-wing-left', asset: 'wing-left.svg',  parent: 'stage' },
  { key: 'wingRight', cls: 'eule-wing-right',asset: 'wing-right.svg', parent: 'stage' },
  { key: 'eyeLeft',   cls: 'eule-eye-left',  asset: 'eye-left.svg',   parent: 'head'  },
  { key: 'eyeRight',  cls: 'eule-eye-right', asset: 'eye-right.svg',  parent: 'head'  },
  { key: 'lidLeft',   cls: 'eule-lid-left',  asset: 'lid-left.svg',   parent: 'head'  },
  { key: 'lidRight',  cls: 'eule-lid-right', asset: 'lid-right.svg',  parent: 'head'  },
  { key: 'beak',      cls: 'eule-beak',      asset: 'beak.svg',       parent: 'head'  },
];

function resolveAssetUrls(assets) {
  if (assets && typeof assets === 'object' && !Array.isArray(assets)) {
    return (filename) => {
      const key = filename.replace(/\.svg$/, '').replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      return assets[key] || assets[filename] || `assets/placeholder/${filename}`;
    };
  }
  const preset = assets || 'placeholder';
  return (filename) => `assets/${preset}/${filename}`;
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
