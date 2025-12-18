# Workshop Project: "The Amazon Sentinel" 🛰️🐆
**Theme:** Biodiversity Finance & Geospatial Verification

## 1. Project Overview
"The Amazon Sentinel" is a **Geospatial Investment Platform**. It transforms the abstract concept of "buying carbon credits" into a tangible, map-based experience.
*   **Core Mechanic:** The world is divided into **Hexagons (1km²)**.
*   **The User:** An investor (Corporate or Individual) who wants to fund conservation.
*   **The Value:** Instead of a paper certificate, they get a "Digital Twin" of a specific plot of land, updated with real-time satellite/bio data.

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

### A. Frontend (The Dashboard)
*   **Tech:** React (Vite) + **Mapbox GL JS** (or Deck.gl for performance).
*   **Features:**
    *   **3D Globe View:** Users can spin the earth and zoom into the Amazon.
    *   **Hex Layer:** A dynamic overlay showing thousands of hexagonal plots.
    *   **Sidebar:** "Hex Details" (Bio-Score, Carbon Stock, Price, "Buy Now" button).
    *   **User Portfolio:** List of "My Hexes" and total impact (CO2 sequestered, Species protected).

### B. Backend (The Intelligence)
*   **Tech:** Python (**FastAPI**) + **GeoPandas** + **Shapely**.
*   **Role:** The "Geo-Engine".
    *   **Endpoint:** `GET /hexes?bbox=[...]` -> Returns GeoJSON of hexes in the view.
    *   **Logic:**
        *   `calculate_bio_score(hex_id)`: Queries database for species counts within that hex.
        *   `detect_deforestation(hex_id)`: (Mock) Checks recent satellite indices (NDVI) to flag alerts.

### C. Database & Auth (The State)
*   **Tech:** **Supabase** (PostgreSQL + PostGIS Extension).
*   **Schema:**
    *   `hexes`: (`id`, `geom` (Polygon), `owner_id`, `status` [available, owned, alert], `bio_score`).
    *   `species_sightings`: (`id`, `species_name`, `location` (Point), `timestamp`).
    *   `transactions`: (`id`, `user_id`, `hex_id`, `amount`, `currency`).

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

---

## 4. Why this is a "Cool" Workshop
1.  **Visual Feedback:** Participants write Python code, and the Map changes color.
2.  **Gamification:** It feels like a strategy game (Civilization/Catan), but for saving the planet.
3.  **Full Stack:** They touch everything: DB (PostGIS), Backend (Python/Geo), Frontend (React/Mapbox).