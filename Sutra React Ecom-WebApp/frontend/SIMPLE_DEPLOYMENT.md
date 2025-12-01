# Simple Deployment Guide

> **For small projects** - No complicated setup, just the essentials!

---

## 🚀 Quick Deploy (20 minutes)

### Step 1: Prepare Environment Variables

**Backend** - Create `backend/.env`:
```env
MONGO_URI=your_mongodb_connection_string
ADMIN_KEY=your_secure_random_key
FRONTEND_URL=http://localhost:5173
```

**Frontend** - Create `.env`:
```env
VITE_API_URL=http://localhost:5000
VITE_ADMIN_KEY=same_as_backend_admin_key
```

💡 **Generate secure key**: 
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

---

### Step 2: Deploy Backend to Render

1. Go to [render.com](https://render.com) and sign up
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo
4. Fill in:
   - **Root Directory**: `Sutra React Ecom-WebApp/backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables:
   - `MONGO_URI` = your MongoDB connection string
   - `ADMIN_KEY` = your secure key
   - `FRONTEND_URL` = `http://localhost:5173` (update later)
6. Click **"Create Web Service"**
7. Wait 5-10 minutes
8. **Copy your backend URL**: `https://your-app.onrender.com`

---

### Step 3: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repo
4. Fill in:
   - **Root Directory**: `Sutra React Ecom-WebApp`
   - **Framework**: Vite
5. Add environment variables:
   - `VITE_API_URL` = your Render backend URL
   - `VITE_ADMIN_KEY` = same as backend
6. Click **"Deploy"**
7. Wait 2-5 minutes
8. **Copy your frontend URL**: `https://your-app.vercel.app`

---

### Step 4: Update CORS

1. Go back to Render dashboard
2. Click your service → **"Environment"**
3. Update `FRONTEND_URL` to: `https://your-app.vercel.app`
4. Save (Render will auto-redeploy)

---

### Step 5: Test

1. Visit your Vercel URL
2. Check if products load
3. Test admin login
4. Try adding/editing a product

**Done!** 🎉

---

## 🔧 If Something Breaks

### Products Not Loading

1. Check Render logs (Dashboard → Your Service → Logs)
2. Verify `MONGO_URI` is correct
3. Check MongoDB Atlas allows all IPs (0.0.0.0/0)

### CORS Error

1. Make sure `FRONTEND_URL` in Render matches your Vercel URL exactly
2. No trailing slash: ✅ `https://app.vercel.app` ❌ `https://app.vercel.app/`
3. Wait 1-2 minutes for Render to redeploy

### Admin Not Working

1. Verify `VITE_ADMIN_KEY` in Vercel = `ADMIN_KEY` in Render
2. Check for typos or extra spaces
3. Redeploy both if needed

---

## 📱 Local Development

```bash
# Terminal 1 - Backend
cd "Sutra React Ecom-WebApp/backend"
npm start

# Terminal 2 - Frontend  
cd "Sutra React Ecom-WebApp"
npm run dev
```

Visit `http://localhost:5173`

---

## 🔄 Making Updates

**Code changes**:
1. Make changes locally
2. Test locally
3. Push to GitHub
4. Render & Vercel auto-deploy!

**Environment variables**:
1. Update in Render/Vercel dashboard
2. Services will auto-redeploy

---

## 💡 Tips

- **Free tier limits**: Render spins down after 15 min of inactivity (first request will be slow)
- **Custom domain**: Add in Vercel settings (optional)
- **Logs**: Check Render/Vercel dashboards if issues occur
- **Rollback**: Both platforms let you revert to previous deployments

---

That's it! No complicated setup needed. 🚀

For more details, see [BEST_PRACTICES.md](./BEST_PRACTICES.md)
