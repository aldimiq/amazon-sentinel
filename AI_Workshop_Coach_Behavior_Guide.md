# 🧠 AI Workshop Coach: Behavior Guide

**Filename:** `AI_Workshop_Coach_Behavior_Guide.md`
**Last Updated:** December 18, 2025

---

## 1. What is the "Workshop Coach"?
The "Workshop Coach" is a persona injected into an LLM (Gemini, ChatGPT, Claude) via the `WORKSHOP_MASTER_PROMPT.md` file. It acts as a **Senior Software Architect** that enforces a strict **Spec-Driven Development (SDD)** workflow.

It does **not** simply write code on command. It forces the user to *think* before acting.

## 2. The Interaction Lifecycle

### Phase 0: The Handshake & Environment Check
*   **Trigger:** User pastes the `WORKSHOP_MASTER_PROMPT.md` content into the AI chat.
*   **AI Response:** "Amazon Sentinel AI Coach Ready. 🛰️🐆..."
*   **AI Action:**
    *   It will **NOT** clone the repo for the user (the user must do this).
    *   It **WILL** ask: *"Is Docker running? Have you set up your `.env` keys?"*
    *   It verifies the "Supabase + PostGIS" stack is active before proceeding.

### Phase 1: The Specification Loop (`/speckit.specify`)
*   **Trigger:** User says *"I want to build the map."*
*   **AI Action:**
    *   **Stops the user.** "Hold on. We need a Spec first."
    *   **Drafts `spec.md`:** Asks clarifying questions (e.g., "What happens if I click a Hex?").
    *   **Output:** A Markdown file in `specs/XXX-feature/spec.md`.

### Phase 2: The Architectural Plan (`/speckit.plan`)
*   **Trigger:** User approves the Spec.
*   **AI Action:**
    *   Maps the Spec to the **Technical Blueprint** (Constitution).
    *   **Security Check:** "Does this endpoint need Supabase Auth?" "Where is the RLS policy?"
    *   **Output:** `specs/XXX-feature/plan.md`.

### Phase 3: The Task Checklist (`/speckit.tasks`)
*   **Trigger:** User approves the Plan.
*   **AI Action:**
    *   Breaks the Plan into atomic, copy-pasteable tasks.
    *   **Output:** `specs/XXX-feature/tasks.md`.

### Phase 4: Implementation (`/speckit.implement`)
*   **Trigger:** User says *"Let's build Task 1."*
*   **AI Action:**
    *   Writes the actual code (Python/React/SQL).
    *   **Constraint:** strictly follows the "Sentinel Glass" design system and "Security Doctrine".

## 3. Key Behaviors to Expect

### 🛡️ The "Security Gatekeeper"
If you ask the AI to "just open the API to everyone," it will **refuse** based on the Constitution:
> *"I cannot do that. The Security Doctrine requires strict CORS and Supabase JWT verification. I will add an Auth Middleware instead."*

### 🗺️ The "MapLibre" Enforcer
If you try to import `mapbox-gl`, the AI will **correct you**:
> *"We have switched to MapLibre GL JS to keep this open-source. I will use `maplibre-gl` instead."*

### 🧱 The "Docker" Standard
The AI assumes **Docker Compose** is the source of truth. It will write `Dockerfile` and `docker-compose.yml` entries rather than asking you to `pip install` locally.

---

## 4. How to Start (User Instructions)
1.  **Clone the Repo:** `git clone https://github.com/aldimiq/amazon-sentinel.git`
2.  **Start Infrastructure:** `docker-compose up -d`
3.  **Activate Coach:** Copy `WORKSHOP_MASTER_PROMPT.md` -> Paste into AI Chat.
