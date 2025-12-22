# Spec 004: Portfolio Dashboard

## Status
- [x] Initial Design
- [x] Backend Implementation (User Assets Router)
- [x] Frontend Implementation (Asset List, Details)
- [x] Database Migration (Owner ID)

## Overview
The "Portfolio Dashboard" allows investors to track their purchased conservation assets. It provides a consolidated view of "Bio-Wealth" and "Carbon Credits" accrued from their protected Amazonian territories.

## Features Implemented `v1.0`

### 1. Asset Management
- **My Assets View**: Displays a grid/list of all Hexagons owned by the authenticated user.
- **Asset Details**: Shows specific telemetry for a single owned hex (Bio-Score, Carbon Stock, Location).
- **Valuation**: Calculates total portfolio value dynamically based on current market rates.

### 2. Backend Architecture
- **Router**: `backend/routers/portfolio.py` handles secured requests.
- **Security**: Verifies Supabase JWT to ensure users can only see their own assets.
- **Logic**: Aggregates data from `public.hexes` where `owner_id` matches the caller.

### 3. Data Model Enhancements
- **Schema**: Added `owner_id` (UUID) foreign key to `public.hexes` table.
- **Migration**: `003_add_owner_id_to_rpc.sql` updates the RPC functions to optionally filter by owner.
- **Seed Data**: `seed_user_assets.py` assigns random hexes to test users for development.

## UX/UI
- **Sidebar Integration**: dedicated "Portfolio" tab in the main navigation.
- **Stats Overview**: Top-level metrics for "Total Hectares Protected" and "Total Bio-Value".
