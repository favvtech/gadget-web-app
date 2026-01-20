# GitHub Pages Deployment Guide

This project is configured to deploy to GitHub Pages using the `/docs` folder.

## Quick Setup

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Commit the docs folder:**
   ```bash
   git add docs
   git commit -m "Build for GitHub Pages"
   git push
   ```

3. **Configure GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **Deploy from a branch**
   - Select branch: `main` (or `master`)
   - Select folder: `/docs`
   - Click **Save**

4. **Your site will be live at:**
   - `https://[your-username].github.io/[repository-name]/`

## Automatic Deployment (Recommended)

The project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys your site on every push to the main branch.

### Setup GitHub Secrets:

1. Go to your repository → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add each of these secrets:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID`
   - `VITE_UNSPLASH_ACCESS_KEY`

Once secrets are configured, every push to `main` will automatically deploy your site!

## Manual Deployment

If you prefer manual deployment:

```bash
# Build the project
npm run build

# The build output will be in the docs/ folder
# Commit and push
git add docs
git commit -m "Deploy to GitHub Pages"
git push
```

## Troubleshooting

### Routes not working?
- Make sure `docs/404.html` exists (it's included in the repo)
- GitHub Pages uses 404.html to handle client-side routing

### Assets not loading?
- Check that `vite.config.js` has `base: '/'` configured
- Verify the build output in `docs/assets/` folder

### Environment variables not working?
- Make sure all `VITE_*` variables are set as GitHub Secrets
- Check the Actions tab for build errors
