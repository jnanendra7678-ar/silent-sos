# SilentSOS Backend

Express + TypeScript + MongoDB backend for the SilentSOS internship project.

## Run

```powershell
npm install
npm run typecheck
npm run dev
```

Health check: `GET http://localhost:5000/api/health`

Use `.env.example` to configure MongoDB and JWT settings. Never commit `.env`.
