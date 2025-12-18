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

### Slide 5: The Workflow
1.  **Draft:** Create the folder `specs/XXX-feature-name`.
2.  **Define:** Fill out `spec.md`. Focus on the *User's* perspective.
3.  **Plan:** Once the spec is "frozen," write `plan.md`. How will we build this?
4.  **Execute:** Break the plan into `tasks.md` and start coding.
5.  **Verify:** Check the final output against the `Success Criteria` in `spec.md`.

---

## Part 2: Workshop Project - "BioLink Validator" 🔗🌿

### Project Concept
We will build **"BioLink Validator"**, a "Co-Benefit" verification platform.
*   **The Problem:** Standard Carbon Credits are becoming a commodity. High-quality projects that *also* restore biodiversity (e.g., save Jaguars) struggle to prove their extra value.
*   **The Solution:** A system that allows Carbon Projects to "upsell" their credits by verifying biodiversity claims, creating a "Premium Nature-Positive Credit."

### Technical Stack (Constraints)
*   **Frontend:** React (Vite) + Tailwind CSS.
*   **Backend/Auth:** Supabase (Auth + Database + Storage).
*   **Map/Geo:** Leaflet or Mapbox (for polygon visualization).

---

## Workshop Flow

### Phase 1: The "Dual-Asset" Spec (Group Exercise)
**Goal:** Participants will define the data model for a Project that tracks both Carbon and Biodiversity.

**Scenario for Participants:**
> "You are building the registry for BioLink. A developer wants to register their 'Amazon Reforestation' project. They already have a Verra/Gold Standard Carbon ID. Now they want to apply for a 'Bio-Badge'."

**Key Discussion Points for `spec.md`:**
1.  **User Stories:**
    *   "As a Project Developer, I want to register my project by linking my existing Carbon ID..."
    *   "As an Investor, I want to see the 'Biodiversity Score' of a carbon project..."
2.  **Functional Requirements (FRs):**
    *   **FR-001:** `Project` entity must include a valid `carbon_standard_id` (string) and `polygon_geometry` (GeoJSON).
    *   **FR-002:** The system must prevent duplicate registrations of the same Carbon ID (Unique Constraint).
    *   **FR-003:** A Project starts with a `BioScore` of 0 until evidence is uploaded.
3.  **Success Criteria (SC):**
    *   **SC-001:** Submitting a registration form creates a new row in Supabase with the correct GeoJSON data.
    *   **SC-002:** Attempting to register the same Carbon ID twice results in a user-friendly error message.

### Phase 2: The "Evidence Locker" Spec (Pair Exercise)
**Goal:** Define how proof (Images/Audio) is handled.

**Scenario for Participants:**
> "To earn a 'Jaguar Badge', the developer must upload proof. We need a secure way to store this evidence and link it to the project."

**Key Discussion Points for `spec.md`:**
1.  **Data Modeling (The Plan):**
    *   Table: `evidence` (`id`, `project_id`, `file_url`, `gps_lat`, `gps_long`, `timestamp`, `status`).
    *   Enum: `status` [`pending`, `ai_processing`, `verified`, `rejected`].
2.  **User Stories:**
    *   "As a Developer, I want to upload a batch of camera trap photos..."
    *   *Edge Case:* What if the photo's GPS coordinates are *outside* the project's polygon? (Auto-reject or flag).
3.  **Success Criteria:**
    *   **SC-001:** Uploaded files appear in Supabase Storage buckets.
    *   **SC-002:** The database record contains the correct public URL of the image.

### Phase 3: The "Premium Marketplace" Spec (Individual Challenge)
**Goal:** Specify the Search & Discovery interface.

**Scenario for Participants:**
> "Buyers want to filter projects. They are looking for 'High Carbon Density' + 'Endangered Species'."

**Key Discussion Points for `spec.md`:**
1.  **Logic-Heavy Specs:**
    *   Define the "Search Query": `SELECT * FROM projects WHERE co2_tonnes > 1000 AND bio_score > 50`.
2.  **User Stories:**
    *   "As a Buyer, I can filter projects by 'Species Protected'..."
3.  **Success Criteria:**
    *   **SC-001:** The filter UI updates the results list in < 200ms.
    *   **SC-002:** Projects with `BioScore = 0` are excluded from "Premium" searches.

---

## "Golden Spec" Cheat Sheet
*Use this to guide the participants.*

### Feature: `001-project-registry`

#### User Stories
*   **US-1 (P1):** Project Registration. Carbon developers can onboard their existing projects.
*   **US-2 (P2):** Geo-Fencing. The system validates that the project is in a valid location.

#### Functional Requirements
*   **FR-001**: Supabase Table `projects` with columns: `id` (uuid), `name` (text), `carbon_id` (text, unique), `bio_score` (int, default 0), `geom` (geometry/point/polygon).
*   **FR-002**: Validation Logic: Ensure `carbon_id` format matches standard regex (e.g., `^VCS-\d+$`).

#### Success Criteria
*   **SC-001**: A valid registration redirects the user to their new "Project Dashboard".
*   **SC-002**: The "Project Dashboard" displays a map centered on the provided coordinates.
