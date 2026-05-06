/*
 * Attribution Persistence
 * Reusable first-party browser snippet for marketing forms.
 *
 * Usage:
 *   <script src="/attribution-persistence.js" defer></script>
 *
 * Optional config before loading:
 *   window.AttributionPersistenceConfig = {
 *     storageKey: 'agency_attribution_v1',
 *     maxAgeDays: 90,
 *     autoInit: true
 *   };
 */
(function attributionPersistenceFactory(window) {
  'use strict';

  if (!window || !window.document) return;

  var document = window.document;
  var config = window.AttributionPersistenceConfig || {};
  var STORAGE_KEY = config.storageKey || 'agency_attribution_v1';
  var MAX_AGE_DAYS = Number(config.maxAgeDays || 90);
  var MAX_AGE_MS = MAX_AGE_DAYS * 24 * 60 * 60 * 1000;

  var ATTRIBUTION_FIELDS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'gclid',
    'gbraid',
    'wbraid',
    'fbclid',
    'li_fat_id',
    'msclkid',
    'landing_page_url',
    'landing_page_path',
    'referrer',
    'captured_at'
  ];

  function nowIso() {
    return new Date().toISOString();
  }

  function safeStorage() {
    try {
      var storage = window.localStorage;
      var probeKey = STORAGE_KEY + '_probe';
      storage.setItem(probeKey, '1');
      storage.removeItem(probeKey);
      return storage;
    } catch (error) {
      return null;
    }
  }

  function readStore() {
    var storage = safeStorage();
    if (!storage) return {};
    try {
      var raw = storage.getItem(STORAGE_KEY);
      if (!raw) return {};
      var parsed = JSON.parse(raw);
      if (parsed && parsed.updated_at) {
        var age = Date.now() - Date.parse(parsed.updated_at);
        if (Number.isFinite(age) && age > MAX_AGE_MS) return {};
      }
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (error) {
      return {};
    }
  }

  function writeStore(store) {
    var storage = safeStorage();
    if (!storage) return store;
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (error) {
      // Storage can fail in private mode or when quota is full. Hydration still works
      // from the in-memory object returned to the caller.
    }
    return store;
  }

  function paramsFromLocation() {
    var params = new URLSearchParams(window.location.search || '');
    var touch = {};
    for (var i = 0; i < ATTRIBUTION_FIELDS.length; i += 1) {
      var field = ATTRIBUTION_FIELDS[i];
      if (params.has(field)) touch[field] = params.get(field) || '';
    }

    touch.landing_page_url = String(window.location.href || '');
    touch.landing_page_path = String(window.location.pathname || '');
    touch.referrer = document.referrer || '';
    touch.captured_at = nowIso();
    return touch;
  }

  function hasAttributionSignal(touch) {
    var signalFields = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'gclid',
      'gbraid',
      'wbraid',
      'fbclid',
      'li_fat_id',
      'msclkid'
    ];
    for (var i = 0; i < signalFields.length; i += 1) {
      if (touch[signalFields[i]]) return true;
    }
    return Boolean(touch.referrer || touch.landing_page_url);
  }

  function compactTouch(touch) {
    var out = {};
    for (var i = 0; i < ATTRIBUTION_FIELDS.length; i += 1) {
      var field = ATTRIBUTION_FIELDS[i];
      if (touch[field] !== undefined && touch[field] !== null && touch[field] !== '') out[field] = touch[field];
    }
    return out;
  }

  function capture() {
    var currentTouch = compactTouch(paramsFromLocation());
    var existing = readStore();
    var priorFirst = existing.first_touch && typeof existing.first_touch === 'object'
      ? existing.first_touch
      : null;
    var shouldUpdateLatest = hasAttributionSignal(currentTouch);
    var latest = shouldUpdateLatest ? currentTouch : (existing.latest_touch || currentTouch);
    var store = {
      version: 1,
      first_touch: priorFirst || currentTouch,
      latest_touch: latest,
      updated_at: nowIso()
    };
    return writeStore(store);
  }

  function getPayload() {
    var store = readStore();
    if (!store.first_touch || !store.latest_touch) store = capture();
    return store;
  }

  function candidatesForField(name) {
    return [
      name,
      'first_' + name,
      'first_touch_' + name,
      'attribution_first_' + name,
      'latest_' + name,
      'latest_touch_' + name,
      'attribution_latest_' + name
    ];
  }

  function valueForInputName(inputName, payload) {
    var name = String(inputName || '').trim();
    if (!name) return null;

    if (name === 'attribution_payload' || name === 'attribution_json') {
      return JSON.stringify(payload);
    }

    for (var i = 0; i < ATTRIBUTION_FIELDS.length; i += 1) {
      var field = ATTRIBUTION_FIELDS[i];
      var candidates = candidatesForField(field);
      if (candidates.indexOf(name) === -1) continue;

      if (name.indexOf('first_') === 0 || name.indexOf('first_touch_') === 0 || name.indexOf('attribution_first_') === 0) {
        return payload.first_touch && payload.first_touch[field] ? payload.first_touch[field] : '';
      }

      if (name.indexOf('latest_') === 0 || name.indexOf('latest_touch_') === 0 || name.indexOf('attribution_latest_') === 0) {
        return payload.latest_touch && payload.latest_touch[field] ? payload.latest_touch[field] : '';
      }

      return payload.latest_touch && payload.latest_touch[field]
        ? payload.latest_touch[field]
        : (payload.first_touch && payload.first_touch[field] ? payload.first_touch[field] : '');
    }

    return null;
  }

  function hydrateForm(form, payload) {
    if (!form || !form.querySelectorAll) return;
    var data = payload || getPayload();
    var inputs = form.querySelectorAll('input[type="hidden"][name]');
    for (var i = 0; i < inputs.length; i += 1) {
      var input = inputs[i];
      var value = valueForInputName(input.name, data);
      if (value !== null && value !== undefined) input.value = String(value);
    }
  }

  function hydrateForms(root) {
    var payload = getPayload();
    var scope = root && root.querySelectorAll ? root : document;
    if (scope.matches && scope.matches('form')) hydrateForm(scope, payload);
    var forms = scope.querySelectorAll ? scope.querySelectorAll('form') : [];
    for (var i = 0; i < forms.length; i += 1) hydrateForm(forms[i], payload);
    return payload;
  }

  function attachSubmitHydration(root) {
    var scope = root && root.querySelectorAll ? root : document;
    var forms = [];
    if (scope.matches && scope.matches('form')) forms.push(scope);
    if (scope.querySelectorAll) {
      var found = scope.querySelectorAll('form');
      for (var i = 0; i < found.length; i += 1) forms.push(found[i]);
    }
    for (var j = 0; j < forms.length; j += 1) {
      if (forms[j].__attributionPersistenceSubmitBound) continue;
      forms[j].__attributionPersistenceSubmitBound = true;
      forms[j].addEventListener('submit', function onSubmit() {
        hydrateForm(this);
      });
    }
  }

  function observeDynamicForms() {
    if (!window.MutationObserver || !document.documentElement) return null;
    var observer = new window.MutationObserver(function onMutations(mutations) {
      for (var i = 0; i < mutations.length; i += 1) {
        var added = mutations[i].addedNodes || [];
        for (var j = 0; j < added.length; j += 1) {
          var node = added[j];
          if (node && node.querySelectorAll) {
            hydrateForms(node);
            attachSubmitHydration(node);
          }
        }
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    return observer;
  }

  function init() {
    capture();
    hydrateForms();
    attachSubmitHydration();
    var observer = observeDynamicForms();
    return { payload: getPayload(), observer: observer };
  }

  window.AttributionPersistence = {
    capture: capture,
    getPayload: getPayload,
    hydrateForm: hydrateForm,
    hydrateForms: hydrateForms,
    init: init,
    fields: ATTRIBUTION_FIELDS.slice()
  };

  if (config.autoInit !== false) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
      init();
    }
  }
})(window);
