# AgriScan Backend (Kisan Rakshak API)

Node.js + Express backend service powering Gemini AI crop pathology diagnosis and soil telemetry.

## Quickstart

1. Ensure `.env` is configured:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start server:
   ```bash
   npm start
   # or with live reloading:
   npm run dev
   ```

The server runs on **http://localhost:5000**.
Health check: `http://localhost:5000/api/health`

