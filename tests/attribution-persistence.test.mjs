import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

class FakeElement {
  constructor(tagName, attrs = {}) {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.parentNode = null;
    this.attributes = { ...attrs };
    this.name = attrs.name || '';
    this.type = attrs.type || '';
    this.value = attrs.value || '';
    this.listeners = {};
  }

  appendChild(child) {
    child.parentNode = this;
    this.children.push(child);
    return child;
  }

  addEventListener(type, handler) {
    this.listeners[type] ||= [];
    this.listeners[type].push(handler);
  }

  dispatchEvent(event) {
    for (const handler of this.listeners[event.type] || []) handler.call(this, event);
  }

  matches(selector) {
    if (selector === 'form') return this.tagName === 'FORM';
    if (selector === 'input[type="hidden"][name]') {
      return this.tagName === 'INPUT' && this.type === 'hidden' && Boolean(this.name);
    }
    return false;
  }

  querySelectorAll(selector) {
    const out = [];
    const walk = (node) => {
      for (const child of node.children) {
        if (child.matches(selector)) out.push(child);
        walk(child);
      }
    };
    walk(this);
    return out;
  }
}

class FakeDocument extends FakeElement {
  constructor() {
    super('#document');
    this.documentElement = new FakeElement('html');
    this.body = new FakeElement('body');
    this.appendChild(this.documentElement);
    this.documentElement.appendChild(this.body);
    this.referrer = 'https://referrer.example/source';
    this.listeners = {};
  }

  createElement(tagName) {
    return new FakeElement(tagName);
  }
}

function createStorage() {
  const data = new Map();
  return {
    getItem(key) { return data.has(key) ? data.get(key) : null; },
    setItem(key, value) { data.set(key, String(value)); },
    removeItem(key) { data.delete(key); },
  };
}

function loadAttribution(windowOverrides = {}) {
  const code = fs.readFileSync(new URL('../public/attribution-persistence.js', import.meta.url), 'utf8');
  const document = windowOverrides.document || new FakeDocument();
  const window = {
    document,
    location: new URL(windowOverrides.url || 'https://example.com/landing?utm_source=google&utm_medium=cpc&utm_campaign=diagnostic&utm_term=qdro&utm_content=ad-a&gclid=G-123&gbraid=GB-123&wbraid=WB-123&fbclid=FB-123&li_fat_id=LI-123&msclkid=MS-123'),
    localStorage: windowOverrides.localStorage || createStorage(),
    MutationObserver: class {
      constructor(callback) { this.callback = callback; window.__observer = this; }
      observe() {}
      trigger() { this.callback([{ addedNodes: [document.body] }]); }
    },
    addEventListener(type, handler) { document.addEventListener(type, handler); },
    removeEventListener() {},
    console,
    Date,
    JSON,
    URLSearchParams,
    setTimeout,
    clearTimeout,
    ...windowOverrides,
  };
  window.window = window;
  const context = vm.createContext(window);
  vm.runInContext(code, context);
  return { window, document };
}

function addForm(document, names) {
  const form = new FakeElement('form');
  for (const name of names) form.appendChild(new FakeElement('input', { type: 'hidden', name }));
  document.body.appendChild(form);
  return form;
}

{
  const { window, document } = loadAttribution();
  const form = addForm(document, [
    'first_utm_source',
    'first_gclid',
    'first_landing_page_url',
    'latest_utm_campaign',
    'latest_fbclid',
    'utm_source',
    'gclid',
    'referrer',
    'attribution_payload',
  ]);

  window.AttributionPersistence.capture();
  window.AttributionPersistence.hydrateForms();

  const byName = Object.fromEntries(form.querySelectorAll('input[type="hidden"][name]').map((input) => [input.name, input.value]));
  assert.equal(byName.first_utm_source, 'google');
  assert.equal(byName.first_gclid, 'G-123');
  assert.equal(byName.first_landing_page_url, 'https://example.com/landing?utm_source=google&utm_medium=cpc&utm_campaign=diagnostic&utm_term=qdro&utm_content=ad-a&gclid=G-123&gbraid=GB-123&wbraid=WB-123&fbclid=FB-123&li_fat_id=LI-123&msclkid=MS-123');
  assert.equal(byName.latest_utm_campaign, 'diagnostic');
  assert.equal(byName.latest_fbclid, 'FB-123');
  assert.equal(byName.utm_source, 'google');
  assert.equal(byName.gclid, 'G-123');
  assert.equal(byName.referrer, 'https://referrer.example/source');
  const payload = JSON.parse(byName.attribution_payload);
  assert.equal(payload.first_touch.utm_source, 'google');
  assert.equal(payload.latest_touch.gbraid, 'GB-123');
}

{
  const localStorage = createStorage();
  loadAttribution({ localStorage, url: 'https://example.com/first?utm_source=google&gclid=FIRST' }).window.AttributionPersistence.capture();
  const { window, document } = loadAttribution({ localStorage, url: 'https://example.com/second?utm_source=linkedin&li_fat_id=LATEST' });
  window.AttributionPersistence.capture();
  const form = addForm(document, ['first_utm_source', 'first_gclid', 'latest_utm_source', 'latest_li_fat_id', 'landing_page_url']);
  window.AttributionPersistence.hydrateForms();
  const byName = Object.fromEntries(form.querySelectorAll('input[type="hidden"][name]').map((input) => [input.name, input.value]));
  assert.equal(byName.first_utm_source, 'google');
  assert.equal(byName.first_gclid, 'FIRST');
  assert.equal(byName.latest_utm_source, 'linkedin');
  assert.equal(byName.latest_li_fat_id, 'LATEST');
  assert.equal(byName.landing_page_url, 'https://example.com/second?utm_source=linkedin&li_fat_id=LATEST');
}

{
  const { window, document } = loadAttribution();
  window.AttributionPersistence.init();
  const form = addForm(document, ['latest_msclkid', 'attribution_payload']);
  window.__observer.trigger();
  form.dispatchEvent({ type: 'submit' });
  const byName = Object.fromEntries(form.querySelectorAll('input[type="hidden"][name]').map((input) => [input.name, input.value]));
  assert.equal(byName.latest_msclkid, 'MS-123');
  assert.equal(JSON.parse(byName.attribution_payload).latest_touch.msclkid, 'MS-123');
}

console.log('attribution-persistence tests passed');
