# Amazon Sentinel 🛰️🐆

**Amazon Sentinel** is a geospatial biodiversity finance platform. It creates a "Digital Twin" of the Amazon, dividing it into 1km² Hexagons where investors can fund conservation based on "Bio-Scores" (Biodiversity Metrics).

![Amazon Sentinel Banner](https://img.shields.io/badge/Status-Active_Prototype-emerald)

## 🚀 Key Features

*   **Digital Twin Interface:** Interactive 3D/2D map using Mapbox GL JS / Leaflet.
*   **Portfolio Dashboard:** specific View and manage owned conservation assets with real-time valuation.
*   **Bio-Premium Pricing:** Dynamic asset valuation based on biodiversity data.
*   **Satellite Verification:** Automated deforestation monitoring (Future: Sentinel-2 Integration).
*   **Redis Caching:** High-performance geo-caching layer for instant map loads.
*   **Dynamic UI System:** Context-aware interface that adapts to Satellite (Dark/White) or Map (Light/Slate) modes.

## 🛠️ Tech Stack

*   **Frontend:** Next.js 14, Tailwind CSS, Leaflet, Zustand.
*   **Backend:** Python 3.11, FastAPI, GeoPandas, H3.
*   **Database:** Supabase (PostgreSQL + PostGIS).
*   **Cache:** Redis (Async).
*   **Infrastructure:** Docker Compose.

## 📦 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/amazon-sentinel.git
    cd amazon-sentinel
    ```

2.  **Start the stack:**
    ```bash
    ./dev.sh
    # OR
    docker-compose up --build
    ```

3.  **Seed the Database:**
    ```bash
    # (In a separate terminal)
    docker exec backend python seed_hexes.py
    ```

4.  **Access the App:**
    *   Frontend: `http://localhost:3000`
    *   Backend API: `http://localhost:8001`
    *   Supabase Studio: `http://localhost:3000` (if running locally)

## 🗺️ UI Modes

*   **Satellite Mode:** Activates a high-contrast "White Glass" theme designed for legibility against dark jungle imagery.
*   **Map Mode:** Activates a clean "Light Glass" theme for standard vector maps.

## 🤝 Contributing

This project is part of a Spec-Driven Development workshop. Please refer to `specs/` for architectural decisions.