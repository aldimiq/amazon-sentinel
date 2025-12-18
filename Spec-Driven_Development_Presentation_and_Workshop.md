# Spec-Driven Development: Presentation & Workshop Guide

## Part 1: Presentation - "Building the Right Thing, The First Time"

### Slide 1: Introduction - The "Build Trap"
**Concept:** We often rush to code because it feels like progress.
*   **The Problem:** Coding without a clear spec leads to "I thought you meant X, but I built Y."
*   **The Cost:** Refactoring logic is 10x more expensive than rewriting a text document.
*   **The Solution:** Spec-Driven Development (SDD).

### Slide 2: What is Spec-Driven Development?
**Definition:** A methodology where the "behavior" and "contract" of a feature are rigorously defined and approved *before* a single line of implementation code is written.
*   **Core Philosophy:** "The Spec is the Truth."
*   **Shift:** From "Code First" -> "Spec First."
*   **Role of AI:** SDD is the perfect language for communicating with LLM agents (like Gemini). Precise specs yield precise code.

### Slide 3: The "Specify Kit" Methodology
**Overview:** A standardized folder structure and set of templates to manage the SDD lifecycle.
*   **Structure:** Per-feature folders (e.g., `specs/001-setup`, `specs/002-login`).
*   **The Trinity of Artifacts:**
    1.  **`spec.md`**: *The "What" & "Why".* (User Stories, Requirements, Success Criteria).
    2.  **`plan.md`**: *The "How".* (Architecture, Implementation Steps).
    3.  **`tasks.md`**: *The "When".* (Checklists, progress tracking).

### Slide 4: Deep Dive - The `spec.md`
**Anatomy of a Good Spec:**
1.  **User Scenarios (Prioritized):**
    *   *Format:* "As a [role], I can [action], so that [value]."
    *   *Crucial:* Must be independently testable.
    *   *Priority:* P1 (MVP), P2 (Core), P3 (Nice to have).
2.  **Functional Requirements (FRs):**
    *   Atomic, technical constraints (e.g., "FR-001: Password must be 8+ chars").
3.  **Success Criteria (SCs):**
    *   Binary and measurable (e.g., "SC-001: API returns 200 OK in <200ms").

### Slide 5: The Workflow - From Spec to Code
1.  **Draft:** Create the folder `specs/XXX-feature-name`.
2.  **Define:** Fill out `spec.md`. Focus on the *User's* perspective.
3.  **Plan:** Once the spec is "frozen," write `plan.md`. How will we build this?
4.  **Review (NEW):** Run `/speckit.review` to let AI critique your plan against the Constitution.
5.  **Execute:** Break the plan into `tasks.md`. **Crucial Step: Write failing tests FIRST.**
6.  **Verify:** Check the final output against the `Success Criteria` in `spec.md`.

---

## Part 2: Workshop Project - "The Amazon Sentinel" 🛰️🐆

### Project Concept
We will build **"The Amazon Sentinel"**, a geospatial investment platform.
*   **The Problem:** People want to invest in nature but lack transparency.
*   **The Solution:** A "Digital Twin" of the Amazon where users buy 1km² Hexagons. Each Hex tracks Carbon (trees) + Biodiversity (animals).
*   **The Tech:** Python (FastAPI) + React (Mapbox) + Supabase (PostGIS).

---

## Workshop Flow

### Phase 1: The "Geo-Asset" Spec (Group Exercise)
**Goal:** Participants will define the "Hexagon" as a financial asset.

**Scenario for Participants:**
> "You are building the land registry. We need to divide the Amazon into 1km² chunks. Users can 'buy' a chunk."

**Key Discussion Points for `spec.md`:**
1.  **User Stories:**
    *   "As an Investor, I want to view the Amazon grid..."
    *   "As an Investor, I want to buy a Hexagon..."
2.  **Functional Requirements (FRs):**
    *   **FR-001:** Database MUST store polygons using PostGIS `GEOMETRY` type.
    *   **FR-002:** System MUST prevent double-purchase of the same Hex (Unique Constraint).
3.  **Success Criteria (SC):**
    *   **SC-001:** API returns a GeoJSON FeatureCollection of 100+ hexes in < 500ms.

### Phase 2: The "Bio-Pricing" Engine (Pair Exercise)
**Goal:** Implement the logic: `Price = Carbon + Biodiversity`.

**Scenario for Participants:**
> "A Hex with a Jaguar is worth more than a Hex with just trees. We need a pricing engine that reads species data."

**Key Discussion Points for `plan.md`:**
1.  **Architecture:** We need a Python Service `calculate_price(hex_id)`.
2.  **TDD Strategy (Mandatory):**
    *   Write a test: `test_price_increases_with_jaguar()`.
    *   Run test -> FAIL.
    *   Write code -> PASS.

### Phase 3: The "Sentinel" Alert System (Individual Challenge)
**Goal:** Handle the "Risk" component (Deforestation).

**Scenario for Participants:**
> "Satellite data shows a fire in Hex #123. We need to trigger an Alert status."

**Key Discussion Points:**
1.  **State Machine:** Hex Status transitions from `Active` -> `Alert`.
2.  **Success Criteria:** When `NDVI` metric drops < 0.4, the API must return `status: "alert"`.

---

## "Golden Spec" Cheat Sheet
*Use this to guide the participants.*

### Feature: `001-geo-asset-registry`

#### User Stories
*   **US-1 (P1):** Map Visualization. Investors can see the grid.
*   **US-2 (P1):** Purchase Flow. Investors can buy a hex.

#### Functional Requirements
*   **FR-001**: Supabase Table `hexes` with columns: `id` (uuid), `geom` (GEOMETRY), `owner_id` (uuid), `status` (enum).
*   **FR-002**: API Endpoint `GET /hexes` returns standard RFC 7946 GeoJSON.

#### Success Criteria
*   **SC-001**: Frontend renders the hex grid without lag (60fps).
*   **SC-002**: Database successfully rejects duplicate purchase attempts.