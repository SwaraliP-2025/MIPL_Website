# 🚀 Quick Backend Deployment

## Easiest Method: Render.com (FREE)

### 1. Create Account
- Go to https://render.com
- Sign up (free)

### 2. Create New Web Service
- Click "New +" → "Web Service"
- Choose "Build and deploy from a Git repository"

### 3. Connect Your Code

**Option A: From GitHub**
- Connect your GitHub account
- Select your repository
- Root Directory: `server`

**Option B: Manual Upload**
- Zip the `server` folder
- Upload to Render

### 4. Configure

```
Name: mipl-chatbot-api
Environment: Node
Region: Choose closest to you
Branch: main (or master)

Build Command: npm install
Start Command: npm start

Instance Type: Free
```

### 5. Environment Variables (Optional)
```
PORT=3001
NODE_ENV=production
```

### 6. Deploy!
- Click "Create Web Service"
- Wait 2-3 minutes
- Copy your URL: `https://mipl-chatbot-api.onrender.com`

---

## Update Frontend

Edit `src/components/Chatbot.jsx` line ~60:

```javascript
// Change from:
const response = await fetch('http://localhost:3001/api/chat', {

// To:
const response = await fetch('https://mipl-chatbot-api.onrender.com/api/chat', {
```

Then rebuild and redeploy to Netlify!

---

## Test Backend

Visit: `https://your-backend-url.onrender.com/api/health`

Should see: `{"status":"ok","message":"MIPL Chatbot API is running"}`

---

## ⚠️ Important Notes

1. **Free tier sleeps after 15 min** - First request takes ~30 seconds
2. **750 hours/month free** - More than enough for most sites
3. **Auto-deploys** - Push to GitHub = auto deploy
4. **HTTPS included** - Secure by default

---

## Alternative: Railway.app (Also FREE, doesn't sleep)

1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub"
3. Select `server` folder
4. Done! Get your URL
5. Update frontend with new URL

Railway doesn't sleep, so responses are instant!

---

That's it! Your chatbot backend is now live! 🎉
