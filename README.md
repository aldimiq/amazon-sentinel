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

## 🚀 Getting Started

### Prerequisites
*   Docker & Docker Compose (or OrbStack on Mac)

### 🐳 Running with Docker
The system is split into two groups: **Auth** (Supabase) and **Apps** (Frontend/Backend).

**Option A: Quick Start (Recommended)**
Use the helper script to handle dependencies automatically:
```bash
./dev.sh
```

**Option B: Manual Start**
1.  **Start Supabase (Auth/DB)**
    *   *Run once and leave running.*
    ```bash
    cp supabase/docker/.env.example .env
    docker-compose -f docker-compose.auth.yml up -d
    ```

2.  **Start Apps (Frontend/Backend)**
    *   *Run this for daily development.*
    ```bash
    docker-compose up
    ```

#### Access Points
| Service | Docker Desktop | OrbStack (Mac) |
| :--- | :--- | :--- |
| **Frontend** | [localhost:3000](http://localhost:3000) | `sentinel-frontend.sentinel-apps.orb.local` |
| **Backend** | [localhost:8001](http://localhost:8001) | `sentinel-backend.sentinel-apps.orb.local` |
| **Supabase** | [localhost:8000](http://localhost:8000) | `kong.sentinel-auth.orb.local` |
| **Studio** | [localhost:3000](http://localhost:3000/project/default) | `studio.sentinel-auth.orb.local` |

*Note: The Backend API runs on port `8001` to avoid conflict with Supabase (port 8000).*

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
