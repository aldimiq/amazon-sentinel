# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Spec**: [link to spec.md]

## Summary
[Brief summary of technical approach]

## Technical Context
**Framework**: Next.js 14 (App Router)
**Auth/DB**: Supabase (Auth, Postgres, PostGIS)
**State**: Zustand / URL Params
**Styles**: Tailwind CSS (Sentinel Light)

## Constitution Check
*GATE: Does this plan adhere to the "Amazon Sentinel" constitution?*
- [ ] Theme is Modern Light (Sentinel Light)?
- [ ] No Client Components used where Server Components suffice?
- [ ] Every mutation uses a Server Action with Zod validation?
- [ ] RLS policies are defined for all new/modified tables?

## Supabase & Database
### Schema Changes
```sql
-- Describe migrations here
```
### RLS Policies
- **Table [Name]**:
    - Select: [Who can see?]
    - Insert/Update: [Who can modify?]

## Project Structure

### Documentation
```text
specs/[###-feature]/
├── plan.md
├── schema.sql
└── tasks.md
```

### Code Changes
```text
app/
├── (auth)/
├── api/
└── [feature-route]/

components/
├── ui/
└── [feature-components]/

lib/
├── supabase/
└── actions/
```

## Complexity Tracking
| Decision | Rationale | Alternatives |
|----------|-----------|--------------|
| [e.g., Use Deck.gl] | [Performance for 10k+ items] | [Mapbox native layers] |
