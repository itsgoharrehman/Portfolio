# 🚀 How to Deploy to Cloudflare Pages

Cloudflare Pages provides global edge distribution with fast load times and automatic HTTPS.

---

## Method 1: Git Integration (Recommended — Auto Deploy on `git push`)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: world-class developer portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Dashboard**:
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Compute (Workers & Pages)** → **Pages** → **Create application**.
   - Click **Connect to Git** and select your GitHub repository.

3. **Configure Build Settings**:
   - **Project name**: `gohar-rehman` (or any name you prefer)
   - **Production branch**: `main`
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version** (optional environment variable): `NODE_VERSION` = `20`

4. **Click "Save and Deploy"**:
   - Cloudflare will build and deploy your portfolio to `https://your-project.pages.dev` in ~30 seconds!
   - Every time you push new code to GitHub, Cloudflare automatically builds and deploys the updates.

---

## Method 2: Direct CLI Deployment via Wrangler (No GitHub Required)

If you want to deploy directly from your local terminal:

1. **Build the production bundle**:
   ```bash
   npm run build
   ```

2. **Deploy using Wrangler**:
   ```bash
   npx wrangler pages deploy dist --project-name=gohar-rehman
   ```
   *(On first run, it will open your browser to log in to Cloudflare and deploy automatically).*

---

## 🔒 Custom Domain & DNS Setup (Optional)
1. In Cloudflare Pages, go to **Custom domains** tab.
2. Click **Set up a custom domain** (e.g. `goharrehman.com` or `portfolio.goharrehman.com`).
3. Cloudflare will automatically provision SSL certificates and route edge traffic worldwide!

---

## 🛠️ Files Included for Cloudflare
- `public/_redirects`: Guarantees single-page application (SPA) routing works without 404s on page refresh.
- `public/_headers`: Enforces security headers (HSTS, nosniff, frame protection) and 1-year immutable caching for static assets.
