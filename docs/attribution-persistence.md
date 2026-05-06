# Attribution persistence snippet

Issue: #71
Kanban: t_0208da0a

## What it does

`public/attribution-persistence.js` is a reusable first-party browser snippet for marketing landing pages and embedded forms. It:

- Captures UTM fields: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`.
- Captures paid click IDs: `gclid`, `gbraid`, `wbraid`, `fbclid`, `li_fat_id`, `msclkid`.
- Captures source metadata: `landing_page_url`, `landing_page_path`, `referrer`, `captured_at`.
- Persists `first_touch` and `latest_touch` separately in first-party `localStorage`.
- Hydrates hidden inputs on all forms on page load, DOM insertion, and submit.
- Supports multi-step forms where later steps are injected after the first page load.

## Install

Add the snippet once per landing page, preferably before the closing body tag:

```html
<script src="/attribution-persistence.js" defer></script>
```

Optional config before loading:

```html
<script>
  window.AttributionPersistenceConfig = {
    storageKey: 'agency_attribution_v1',
    maxAgeDays: 90,
    autoInit: true
  };
</script>
<script src="/attribution-persistence.js" defer></script>
```

## Hidden fields supported

For each attribution field, the snippet hydrates these naming patterns:

- Latest/default: `utm_source`, `gclid`, `landing_page_url`, etc.
- First-touch: `first_utm_source`, `first_touch_utm_source`, `attribution_first_utm_source`, etc.
- Latest-touch: `latest_utm_source`, `latest_touch_utm_source`, `attribution_latest_utm_source`, etc.
- Full JSON payload: `attribution_payload` or `attribution_json`.

Minimum form field set recommended for CRM/n8n:

```html
<input type="hidden" name="first_utm_source">
<input type="hidden" name="first_utm_medium">
<input type="hidden" name="first_utm_campaign">
<input type="hidden" name="first_gclid">
<input type="hidden" name="first_gbraid">
<input type="hidden" name="first_wbraid">
<input type="hidden" name="first_fbclid">
<input type="hidden" name="first_li_fat_id">
<input type="hidden" name="first_msclkid">
<input type="hidden" name="first_landing_page_url">
<input type="hidden" name="first_referrer">
<input type="hidden" name="latest_utm_source">
<input type="hidden" name="latest_utm_medium">
<input type="hidden" name="latest_utm_campaign">
<input type="hidden" name="latest_gclid">
<input type="hidden" name="latest_gbraid">
<input type="hidden" name="latest_wbraid">
<input type="hidden" name="latest_fbclid">
<input type="hidden" name="latest_li_fat_id">
<input type="hidden" name="latest_msclkid">
<input type="hidden" name="latest_landing_page_url">
<input type="hidden" name="latest_referrer">
<input type="hidden" name="attribution_payload">
```

## Manual API

```js
window.AttributionPersistence.capture();
window.AttributionPersistence.hydrateForms();
window.AttributionPersistence.getPayload();
```

Use `hydrateForms(stepContainer)` after a custom multi-step form renders a new step if the site blocks MutationObserver or uses a shadow DOM form provider.

## Verification

Automated test:

```bash
npm run test:attribution
```

Build/lint checks:

```bash
npm run lint
npm run build
```

Browser QA fixture:

```text
/attribution-qa.html?utm_source=google&utm_medium=cpc&utm_campaign=qa&utm_term=qdro&utm_content=test&gclid=GQA&gbraid=GBQA&wbraid=WBQA&fbclid=FBQA&li_fat_id=LIQA&msclkid=MSQA
```

Browser QA should verify:

1. Load a page with synthetic UTMs and click IDs.
2. Confirm hidden form fields are populated with first/latest touch values.
3. Navigate or reload with a different source and confirm first-touch remains stable while latest-touch updates.
4. Insert a later-step form dynamically and confirm hidden fields hydrate before submit.

Observed browser QA proof for this implementation:

- First load hydrated hidden fields with `first_utm_source=google`, `first_gclid=GQA`, `latest_utm_campaign=qa`, `latest_fbclid=FBQA`, and dynamic `latest_msclkid=MSQA`.
- Second load on the same origin with `utm_source=linkedin&utm_campaign=second&li_fat_id=LISECOND&msclkid=MSSECOND` preserved `first_touch.utm_source=google` and `first_touch.gclid=GQA` while updating `latest_touch.utm_source=linkedin` and `latest_touch.msclkid=MSSECOND`.
- The dynamically inserted step form hydrated `latest_msclkid=MSSECOND` before submit.
