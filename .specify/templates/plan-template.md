# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Spec**: [link to spec.md]

## Summary
[Brief summary of technical approach]

## Technical Context
**Language/Version**: [Python 3.11 / Node 20]
**Dependencies**: [e.g., FastAPI, Mapbox GL JS, GeoPandas]
**Storage**: [Supabase / PostGIS]
**Testing**: [pytest / vitest]

## Constitution Check
*GATE: Does this plan adhere to the "Amazon Sentinel" constitution?*
- [ ] Geospatial data uses PostGIS types?
- [ ] API follows GeoJSON standards?
- [ ] Python code uses Pydantic?

## Project Structure

### Documentation
```text
specs/[###-feature]/
├── plan.md
├── research.md
├── data-model.md
├── contracts/
└── tasks.md
```

### Code Changes
<!-- Define where code will live. -->
```text
backend/app/
├── routers/
└── services/

frontend/src/
├── components/
└── hooks/
```

## Complexity Tracking
| Decision | Rationale | Alternatives |
|----------|-----------|--------------|
| [e.g., Use Deck.gl] | [Performance for 10k+ items] | [Mapbox native layers] |
