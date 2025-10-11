# AI Fitness Planner

This is a Vite + React app that generates personalized workout and diet plans.

Local preview

```bash
npm ci
npm run build
npm run preview
```

Deploy to GitHub Pages (CI)

1. Commit and push this repo to GitHub on the `main` branch.
2. The workflow in `.github/workflows/deploy.yml` builds and publishes the `dist/` directory to GitHub Pages on every push to `main`.
3. After the first successful run, go to GitHub → Settings → Pages, verify that the site is published and the source is "GitHub Actions".

Notes about API keys

- The app currently asks the user for a Gemini API key client-side and stores it in localStorage. For production, move requests to a serverless function and store the key as a secret on the deployment provider.

Want me to set up Vercel/Netlify instead? Tell me which provider and I'll add instructions and a small serverless proxy example.