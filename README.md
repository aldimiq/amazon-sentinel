# The Amazon Sentinel: Spec-Driven Development Workshop

This repository contains all the necessary materials for the "Amazon Sentinel" Spec-Driven Development (SDD) workshop. It's structured as a "Specify Kit" project, designed for AI-assisted development.

## Project Overview

**"The Amazon Sentinel"** is a geospatial investment platform designed to allow investors (both corporate and individual) to fund nature conservation directly by "claiming" virtual hexagons (1km²) of the Amazon rainforest. The platform leverages cutting-edge technology to verify both carbon sequestration and biodiversity uplift within these plots, creating a transparent and impactful way to engage in biodiversity finance.

**Key Features:**

*   **Interactive Map:** A 3D globe visualization of the Amazon, divided into 1km² hexagons.
*   **Bio-Premium Pricing:** Hexagon prices dynamically adjust based on verified biodiversity (e.g., presence of endangered species).
*   **Fractionalized Carbon Credits:** Each owned hexagon contributes to a verifiable carbon credit stream.
*   **MRV (Measurement, Reporting, Verification):** Utilizes satellite data for real-time deforestation alerts and biodiversity monitoring.
*   **User Portfolios:** Investors can view their owned hexagons and track their environmental impact.

## Workshop Materials

*   **`Spec-Driven_Development_Presentation_and_Workshop.md`**: Contains the full presentation outline on SDD and the general workshop flow.
*   **`Amazon_Sentinel_System_Documentation.md`**: Detailed system architecture, data models, and specific workshop modules for the "Amazon Sentinel" project.
*   **`WORKSHOP_MASTER_PROMPT.md`**: **This is the critical document for AI assistance.** It contains detailed instructions and the project's technical blueprint. Copy its content into your AI assistant at the start of the workshop to prime it as your SDD coach.
*   **`.specify/`**: This directory contains the full "Specify Kit" tooling:
    *   `constitution.md`: The project's core principles and rules.
    *   `templates/`: Standardized templates for `spec.md`, `plan.md`, `tasks.md`, and AI agent files.
    *   `scripts/bash/`: Automation scripts for managing features (e.g., creating new feature branches).
*   **`.gemini/commands/`**: Configuration files for the AI commands (`/speckit.specify`, `/speckit.plan`, etc.), instructing the AI on how to execute SDD workflows.
*   **`.github/agents/`**: Agent prompts used by certain AI platforms to guide their behavior in SDD.

## Technical Stack

*   **Frontend:** React (Vite), Mapbox GL JS (or Deck.gl)
*   **Backend:** Python (FastAPI), GeoPandas, Shapely
*   **Database & Auth:** Supabase (PostgreSQL with PostGIS Extension)

## Getting Started (for workshop participants)

1.  **Clone this repository.**
2.  **Prime your AI:** Copy the entire content of `WORKSHOP_MASTER_PROMPT.md` and paste it into your AI assistant.
3.  **Start a new feature:** Once the AI is primed, you can use the `/speckit.specify` command (or follow the AI's guidance to define your first feature).

## Contributing

This project is intended as a workshop exercise. Contributions are welcome to refine the workshop materials or the starter codebase.

## License

[MIT License or appropriate license]