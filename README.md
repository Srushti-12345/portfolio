# Srushti Sanjay Tingane Portfolio

Premium personal portfolio website for Srushti Sanjay Tingane, built with React, Vite, Express, MongoDB, and a Gemini-powered portfolio assistant with local fallback responses.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Copy [.env.example](.env.example) to `.env` and fill in any services you want to enable
3. Run the app:
   `npm run dev`

## Vercel Frontend Environment

If the frontend is deployed separately on Vercel, add this environment variable in Vercel:

```text
VITE_API_BASE_URL=https://portfolio-a538.onrender.com
```

Then redeploy the Vercel project so contact form and chatbot requests go to the Render backend.
