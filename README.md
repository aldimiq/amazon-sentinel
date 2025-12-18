# Amazon Sentinel 🛰️🐆

> **"The Wall Street of Biodiversity"**
> A geospatial platform where investors fund the Amazon Rainforest, one Hexagon at a time.

![Status](https://img.shields.io/badge/Status-Next.js_Transition-orange)
![Stack](https://img.shields.io/badge/Stack-Next.js_14%20%7C%20Supabase%20%7C%20PostGIS-blue)

## 🌍 The Mission
To incentivize conservation by creating a "Digital Twin" of the Amazon. Users buy 1km² plots ("Hexes"). The price of a Hex is determined by its **Bio-Score** (Biodiversity Richness) + **Carbon Stock**.

## 🚀 The Stack (Spec-Kit v2)
*   **Frontend:** Next.js 14 (App Router) + **OpenStreetMap** (Leaflet/MapLibre).
*   **Backend:** Python (FastAPI) for heavy geo-computation.
*   **Auth/DB:** **Self-Hosted Supabase** (Docker).
*   **Design:** **Sentinel Light** — A modern, minimalist light theme focus.

## ⚙️ Core Architecture
The system uses a Hybrid Architecture:
*   **Next.js:** Handles UI, Auth (Supabase), and basic data fetching.
*   **Python (FastAPI):** Handles complex biodiversity scoring and carbon calculations.
*   **Map:** Uses free, open-source tiles (OSM/Carto) to ensure accessibility without API keys.
*   **Security:** Mandatory Row Level Security (RLS) on all PostGIS tables.

## 📂 Project Structure
```
amazon-sentinel/
├── frontend/       # React Application (Glassmorphism UI)
├── backend/        # Python API (Pricing Engine)
├── specs/          # SDD Artifacts (Specs, Plans, Tasks)
├── .specify/       # Specify Kit (AI Tools)
└── WORKSHOP_*.md   # Workshop Materials
```

## 📜 Documentation
*   [Spec-Driven Development Workshop](./Spec-Driven_Development_Presentation_and_Workshop.md)
*   [AI Journal](./AI_JOURNAL.md)
*   [System Architecture](./Amazon_Sentinel_System_Documentation.md)
