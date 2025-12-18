# Spec 003: Explorer & Advanced Filtering

## Status
- [x] Initial Design
- [x] Backend Implementation (Price, RPC)
- [x] Frontend Implementation (Filters, Map)
- [ ] Search & Discovery (Next Step)

## Overview
The "Explorer" is the primary interface for investors to find assets. It features a real-time hexagonal map overlay of the Amazon Basin.

## Features Implemented `v1.0`
### 1. Advanced Map Filters
- **Bio-Score**: Users can filter by biodiversity density (0-100).
- **Carbon Stock**: Filter by metric tons of CO2 (0-300t).
- **Price**: Filter by maximum acquisition cost.
- **Logic**: Filters are cumulative (AND logic).

### 2. Pricing Engine
- **Formula**: `Price = Base($5000) + (BioScore * $100) + (Carbon * $50) + Variance`.
- **Database**: Added `price` field to `public.hexes`.
- **RPC**: Updated `get_hexes_with_geojson` to expose all metrics efficiently.

### 3. UX Enhancements
- **Isolation**: Filters only apply on the Explorer page. Overview page remains a holistic view.
- **Sidebar**: Future features (Portfolio, Alerts) are visible but disabled to guide user focus.
- **Visuals**: Glassmorphism UI with real-time feedback.
