# Amazon Sentinel 🛰️🐆

> **"The Wall Street of Biodiversity"**
> A geospatial platform where investors fund the Amazon Rainforest, one Hexagon at a time.

![Status](https://img.shields.io/badge/Status-Prototype-green)
![Stack](https://img.shields.io/badge/Stack-Python%20%7C%20React%20%7C%20Supabase-blue)

## 🌍 The Mission
To incentivize conservation by creating a "Digital Twin" of the Amazon. Users buy 1km² plots ("Hexes"). The price of a Hex is determined by its **Bio-Score** (Biodiversity Richness) + **Carbon Stock**.

## 🚀 Getting Started

### Prerequisites
*   Docker & Docker Compose

### 🐳 Running with Docker (Recommended)
This command will spin up the entire stack (Frontend, Backend, Database):

```bash
cp .env.example .env
docker-compose up --build
```

*   **Frontend:** [http://localhost:3000](http://localhost:3000)
*   **Backend API:** [http://localhost:8000/docs](http://localhost:8000/docs)
*   **Database:** `localhost:5432` (User/Pass: `sentinel`)

### 🛠️ Manual Setup (Legacy)
If you prefer running locally without Docker:
The frontend is a React SPA with a focus on immersive data visualization ("Glass UI").

```bash
cd frontend
npm install
npm run dev
```
*   **Tech:** React, Vite, TailwindCSS (v3), Mapbox GL JS, Zustand.
*   **Note:** Create a `.env.local` file with `VITE_MAPBOX_TOKEN=your_token` to see the map.

### ⚙️ Backend (The Engine)
*(Coming Soon)*
*   **Tech:** Python, FastAPI, GeoPandas, Shapely.

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
