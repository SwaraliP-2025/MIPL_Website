# 🚀 MIPL Website + Chatbot Deployment Guide

## Overview
Your website has 2 parts:
1. **Frontend (React)** → Deploy to Netlify
2. **Backend (Chatbot API)** → Deploy to Render.com (FREE)

---

## 📦 Part 1: Deploy Backend (Chatbot API) to Render.com

### Step 1: Prepare Backend for Deployment

Your backend is already in the `server/` folder. It's ready to deploy!

### Step 2: Create Render.com Account

1. Go to https://render.com
2. Sign up with GitHub (free)
3. Click "New +" → "Web Service"

### Step 3: Deploy Backend

1. **Connect Repository:**
   - Select your GitHub repository
   - Or upload the `server/` folder

2. **Configure Service:**
   ```
   Name: mipl-chatbot-api
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

3. **Set Environment Variables:**
   ```
   PORT=3001
   NODE_ENV=production
   ```

4. Click "Create Web Service"

5. **Copy Your Backend URL:**
   - Example: `https://mipl-chatbot-api.onrender.com`
   - Save this URL!

---

## 🌐 Part 2: Update Frontend to Use Deployed Backend

### Update Chatbot Component

Open `src/components/Chatbot.jsx` and change line ~60:

**FROM:**
```javascript
const response = await fetch('http://localhost:3001/api/chat', {
```

**TO:**
```javascript
const response = await fetch('https://YOUR-BACKEND-URL.onrender.com/api/chat', {
```

Replace `YOUR-BACKEND-URL` with your actual Render.com URL.

---

## 🎯 Part 3: Deploy Frontend to Netlify

### Option A: Netlify CLI (Recommended)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build your project
npm run build

# Deploy
netlify deploy --prod
```

### Option B: Netlify Dashboard

1. Go to https://app.netlify.com
2. Drag & drop your `dist` folder
3. Done!

### Option C: GitHub Integration

1. Push code to GitHub
2. Connect repository to Netlify
3. Build settings:
   ```
   Build command: npm run build
   Publish directory: dist
   ```

---

## ✅ Verification

### Test Backend:
```bash
curl https://YOUR-BACKEND-URL.onrender.com/api/health
```

Should return: `{"status":"ok","message":"MIPL Chatbot API is running"}`

### Test Frontend:
1. Visit your Netlify URL
2. Click chatbot button (uncomment in App.jsx first)
3. Ask a question
4. Should get response!

---

## 🔧 Alternative Backend Hosting Options

### Railway.app (FREE)
1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub"
3. Select `server/` folder
4. Auto-deploys!

### Fly.io (FREE)
```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Deploy
cd server
fly launch
fly deploy
```

### Heroku (PAID but reliable)
```bash
# Install Heroku CLI
npm install -g heroku

# Deploy
cd server
heroku create mipl-chatbot-api
git push heroku main
```

---

## 💰 Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| Netlify (Frontend) | FREE | Unlimited bandwidth |
| Render.com (Backend) | FREE | 750 hours/month |
| **Total** | **$0/month** | 🎉 |

**Note:** Render.com free tier sleeps after 15 min of inactivity. First request takes ~30 seconds to wake up.

---

## 🔄 Update Workflow

### Update Frontend:
```bash
npm run build
netlify deploy --prod
```

### Update Backend:
1. Push changes to GitHub
2. Render auto-deploys
3. Or manually trigger deploy in Render dashboard

### Update Chatbot Knowledge:
1. Edit `server/websiteKnowledge.js`
2. Push to GitHub
3. Render auto-deploys

---

## 🐛 Troubleshooting

### Chatbot not responding?
- Check backend URL in `Chatbot.jsx`
- Verify backend is running: visit `YOUR-BACKEND-URL/api/health`
- Check browser console for errors

### CORS errors?
Backend already has CORS enabled in `server/index.js`:
```javascript
app.use(cors());
```

### Backend sleeping (Render free tier)?
- First request takes 30 seconds
- Consider upgrading to paid tier ($7/month) for instant responses
- Or use Railway.app (doesn't sleep)

---

## 📝 Quick Checklist

- [ ] Backend deployed to Render.com
- [ ] Backend URL copied
- [ ] Frontend updated with backend URL
- [ ] Frontend built (`npm run build`)
- [ ] Frontend deployed to Netlify
- [ ] Chatbot uncommented in `App.jsx`
- [ ] Tested chatbot on live site

---

## 🎉 You're Done!

Your website with AI chatbot is now live!

**Frontend:** https://your-site.netlify.app
**Backend:** https://your-backend.onrender.com

---

## 📞 Need Help?

If you face any issues:
1. Check browser console for errors
2. Check Render.com logs for backend errors
3. Verify all URLs are correct
4. Test backend health endpoint

Happy deploying! 🚀
