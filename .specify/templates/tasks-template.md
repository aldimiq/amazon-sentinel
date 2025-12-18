# Tasks: [FEATURE NAME]

**Prerequisites**: plan.md, spec.md

## Phase 1: Setup & Migrations
- [ ] T001 Create feature branch
- [ ] T002 Database migration (SQL) for new schemas

## Phase 2: Foundational (Blocking)
- [ ] T003 Backend: Pydantic models in `backend/app/schemas/`
- [ ] T004 Frontend: Types/Interfaces in `frontend/src/types/`

## Phase 3: User Story 1 - [Title] (P1)
**Goal**: [MVP Goal]

### Tests (TDD Mandatory)
- [ ] T005 [US1] Backend: Write FAILING unit test for Service logic in `backend/tests/test_services.py`
- [ ] T006 [US1] Backend: Write FAILING integration test for API Route in `backend/tests/test_routes.py`

### Implementation
- [ ] T007 [P] [US1] Backend: Implement Service logic to pass unit test
- [ ] T008 [P] [US1] Backend: Implement API Route to pass integration test
- [ ] T009 [US1] Frontend: Component implementation in `frontend/src/components/`
- [ ] T010 [US1] Frontend: Integration with API

## Phase 4: User Story 2 - [Title] (P2)
...

## Phase N: Polish
- [ ] T099 Documentation updates
- [ ] T100 Final lint/type check