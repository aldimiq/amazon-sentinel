# Spec 002: Hexagon Asset Selection & Details

## 1. Background
The core value of Amazon Sentinel is the ability to visualize and invest in specific 1km² plots of the rainforest. This feature implements the interactive hexagonal grid and the detailed "Asset View" for individual plots.

## 2. User Stories
*   **US-1: Grid Visualization**
    *   **As a:** User/Investor.
    *   **I want to:** See a hexagonal grid overlaying the Amazon rainforest.
    *   **So that:** I can identify specific areas available for investment.

*   **US-2: Plot Selection**
    *   **As a:** User.
    *   **I want to:** Click on a hexagon.
    *   **So that:** I can see its specific Biodiversity Score, Carbon Stock, and Price.

*   **US-3: Dynamic Pricing**
    *   **As a:** User.
    *   **I want to:** See a price that reflects the "Bio-Premium".

## 3. Functional Requirements

### FR-001: Hexagonal Grid (H3)
*   The system must use **Uber's H3 index** (Resolution 7 or 8) to define the 1km² plots.
*   The Backend must provide a GeoJSON endpoint for a given bounding box (BBOX).

### FR-002: Asset Details Panel
*   When a hex is selected, a "Glass-SciFi" panel must appear on the right side.
*   **Data fields:**
    *   H3 Index ID.
    *   Carbon Stock (Tonnes).
    *   Biodiversity Score (0-100).
    *   Current Price ($).
    *   Owner (or 'Available').

### FR-003: Selection State
*   The selected hex must be highlighted with an emerald glow.
*   The URL should update with the selected H3 index for link sharing.

## 4. Success Criteria
*   **SC-001:** Clicking a hexagon highlights it and opens the details panel.
*   **SC-002:** Details are fetched from the Python Backend (BFF).
*   **SC-003:** Grid renders smoothly as the user pans/zooms.