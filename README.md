# Luke VanEmburgh — Portfolio

Personal engineering portfolio site, built with React + Vite and deployed to GitHub Pages.

## Editing content

All text lives in [`src/data/content.js`](src/data/content.js). Figures are in `public/img/`, and the resume is in `public/`.

## Local development

```bash
npm install
npm run dev
```

## Deploying

Every push to `main` builds the site and publishes it through the GitHub Actions workflow in `.github/workflows/deploy.yml`.
One-time setup: in the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
