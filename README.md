# AMS Frontend — Attendance Management System

A React-based frontend for the Multi-Tenant Attendance Management System.

## Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** CSS (Design System)
- **Charts:** Chart.js
- **Maps:** Leaflet + React-Leaflet
- **HTTP Client:** Axios (with interceptors for JWT rotation)

## Quick Start
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Setup environment:**
   - Copy `.env.example` to `.env`
   - Update `VITE_API_URL` to point to your backend (e.g., your Render URL)
   - Add `VITE_GOOGLE_MAPS_API_KEY` (if using Google Maps components)
3. **Run development server:**
   ```bash
   npm run dev
   ```

## Deployment (Vercel)
This project is ready for Vercel. 
- Ensure you set `VITE_API_URL` in your Vercel project environment variables.
- Build command: `npm run build`
- Output directory: `dist`
