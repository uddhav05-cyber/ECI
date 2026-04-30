# ElectIQ — AI-Powered Election Process Assistant

Prototype built with React + Vite + Tailwind. Uses a Firebase Functions proxy to call Gemini (placeholder).

Quick start

1. Install deps

```bash
npm install
cd functions && npm install
```

2. Local dev

```bash
npm run dev
# In a separate terminal, run Firebase emulators if desired
```

3. Deploy to Firebase (Hosting + Functions)

Set your Gemini/Google API key as an environment variable for functions (recommended secure methods):

```bash
# Example using Firebase CLI: replace with secure secret management
firebase functions:config:set gemini.key="YOUR_KEY"
```

Then deploy:

```bash
firebase deploy --only hosting,functions
```

Notes
- This scaffold includes a client-side `ChatWidget` that calls `/functions/gemini-proxy`.
- The Functions proxy currently returns mock responses when no API key is configured. Replace the fetch call with the official `@google/generative-ai` SDK in `functions/index.js` for production.
- Firestore rules in `firestore.rules` are permissive for prototype purposes — lock down before production.
# ECI