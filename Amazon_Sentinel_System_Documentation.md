# Workshop Project: "The Amazon Sentinel" 🛰️🐆
**Theme:** Biodiversity Finance & Geospatial Verification

## 1. Project Overview
"The Amazon Sentinel" is a **Geospatial Investment Platform**. It transforms the abstract concept of "buying carbon credits" into a tangible, map-based experience.
*   **Core Mechanic:** The world is divided into **Hexagons (1km²)**.
*   **The User:** An investor (Corporate or Individual) who wants to fund conservation.
*   **The Value:** Instead of a paper certificate, they get a "Digital Twin" of a specific plot of land, updated with real-time satellite/bio data.
*   **Portfolio Dashboard:** A dedicated interface for users to manage their "Bio-Wealth," view owned assets, and track valuation changes over time.

### How it fits "Biodiversity Finance" & "Carbon Credits"
1.  **The "Bio-Premium" Pricing Model:**
    *   A "Standard" Carbon Hex (Just trees) = **$10**.
    *   A "Premium" Bio Hex (Trees + Jaguar Sighting) = **$50**.
    *   *The System Logic:* The Python backend ingests biodiversity data (GBIF) and increases the price of the asset dynamically. This represents the **market value of nature**.
2.  **Fractionalized Carbon Credits:**
    *   Each Hex emits `X` tonnes of CO2 credit per year.
    *   Ownership of the Hex grants the user the right to retire those credits.
3.  **MRV (Measurement, Reporting, Verification):**
    *   The system uses **Satellite Data** (Sentinel-2/Landsat) to verify the trees are still standing.
    *   If a "Green Hex" turns "Red" (Deforestation detected), the credit stream stops. This is **performance-based finance**.

---

## 2. System Architecture

### A. Infrastructure (The Foundation)
*   **Containerization:** Fully Dockerized using `docker-compose`.
    *   **Frontend:** Next.js 14 container.
    *   **Backend:** Python 3.11 (FastAPI) container.
    *   **Database:** **Self-Hosted Supabase** (Official Docker Image).
*   **Orchestration:** Multi-container setup.

### A. Frontend (The "Sentinel Light" Interface)
*   **Tech:** Next.js 14 (App Router) + **OpenStreetMap**.
*   **State Management:** **Zustand** (System Store) for global UI state and Sidebar management.
*   **Role:** Pure UI Presentation.
*   **Networking:**
    *   **Strict Constraint:** Talks **ONLY** to the Python Backend (`NEXT_PUBLIC_API_URL`).
    *   **No Direct DB/Auth:** Does *not* have access to Supabase keys.

### B. Backend (The Intelligence & Proxy)
*   **Tech:** Python 3.11 (**FastAPI**).
*   **Role:** The Gateway & Logic Engine.
    *   **Data Proxy:** Fetches Hexes/Sightings from Supabase.
    *   **Auth Proxy:** Handles Login/Signup requests and forwards them to Supabase GoTrue.
    *   **Security:** Holds the `SERVICE_ROLE_KEY` to manage data access.

### C. Database (The State)
*   **Tech:** **Supabase** (PostgreSQL + PostGIS).
*   **Schema Structure:**
    *   **`auth` Schema:** Managed by Supabase GoTrue; contains the `users` table for authentication.
    *   **`public` Schema:** Where the "Amazon Sentinel" data lives.
        *   `hexes`: (`id`, `geom`, `owner_id` [FK -> auth.users.id], `price`, `bio_score`, `carbon_stock`).
        *   `species_sightings`: (`id`, `species_name`, `location`, `timestamp`).
*   **Security:** RLS policies in the `public` schema use `auth.uid()` to restrict access based on the user's session.

---

## 3. Workshop Modules (The "Spec-Driven" Flow)

### Phase 1: The "Geo-Asset" Spec
**Goal:** Define the "Hex" as a financial asset.
*   **Spec Challenge:**
    *   How do we prevent two people buying the same Hex? (Database Constraints).
    *   How do we ensure the Hex is exactly 1km²? (H3 Index or Grid Logic).
*   **Deliverable:** A `spec.md` defining the `Hex` entity and the "Purchase" transaction.

### Phase 2: The "Bio-Pricing" Engine
**Goal:** Implement the logic that makes biodiversity profitable.
*   **Spec Challenge:**
    *   Define the formula: `Price = Base_Carbon_Price + (Unique_Species_Count * $5)`.
    *   Handle "Stale Data": If no species seen in 5 years, does the price drop?
*   **Deliverable:** A Python function `calculate_price()` and its corresponding unit tests.

### Phase 3: The "Sentinel" Alert System
**Goal:** The "Risk" component.
*   **Spec Challenge:**
    *   If `NDVI` drops below 0.4, trigger `Alert`.
    *   What happens to the investor's money? (Insurance? Freeze?).
*   **Deliverable:** A "Deforestation Alert" feature that turns the map hex Red.

### Phase 4: The "Portfolio" Dashboard
**Goal:** The "Ownership" component.
*   **Spec Challenge:**
    *   How to securely fetch *only* the user's assets? (Row Level Security vs App Logic).
    *   How to aggregate total value dynamically?
*   **Deliverable:** A "My Assets" view filtering by `owner_id` and calculating total Bio-Wealth.