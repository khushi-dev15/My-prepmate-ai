# Prepmate-AI

Local development/run instructions for Prepmate-AI (backend + frontend).

Prerequisites
- Node.js (16+ recommended)
- MongoDB running locally or accessible via network

Backend
1. Open a terminal and go to the backend folder:

```powershell
cd backend
```

2. Install dependencies:

```powershell
npm install
```

3. Copy the example env and edit values:

```powershell
copy .env.example .env
# Open .env and set MONGODB_URI and JWT_SECRET
```

Notes:
- `GEMINI_API_KEY` is optional. If it is not provided or invalid, the server will use the built-in local fallback for generating questions and evaluating answers so the flow remains functional.

4. Start the backend:

```powershell
npm run start
# or for development with auto-reload
npm run dev
```

Frontend
1. Open a separate terminal and go to the frontend folder:

```powershell
cd frontend
npm install
npm run dev
```

How to test the flow
1. Register a user (use the frontend UI). The frontend stores auth token in localStorage and includes it in requests.
2. Upload a resume from the home page including a `jobTitle`.
3. Use the Next/Start Interview flow to fetch questions, answer them (text-only), evaluate, and submit.

Troubleshooting
- If the backend logs errors on AI calls and you don't have a valid `GEMINI_API_KEY`, that's expected — the app will fall back to local heuristics and still work.
- If you get CORS or network errors, ensure backend is running on the port set in `.env` and frontend `API` baseURL points at the correct address.

If you run into runtime errors, paste the server console logs here and I will help debug and patch quickly.
