# 🚀 Quick Reference Card

## 🌐 Access URLs

```
Frontend:  http://localhost:3000
Backend:   http://localhost:5000
```

## 🧪 Test URLs

### Safe (Score: 0-30)
```
https://www.google.com
https://github.com
https://www.amazon.com
```

### Suspicious (Score: 31-60)
```
http://paypal-login-verify.com
http://secure-account-update.xyz
https://login.verify.secure.banking.top
```

### Malicious (Score: 61-100)
```
http://192.168.1.1/secure-login
http://paypal-login-security.xyz
http://192.168.1.45/verify-account-update-secure
```

## 🎯 How to Use

1. **Open** http://localhost:3000
2. **Paste** a URL in the input field
3. **Click** "Analyze Link" button
4. **View** comprehensive security report
5. **Check** scan history in sidebar

## 🔒 Security Checks

| Check | Icon | What It Does |
|-------|------|--------------|
| HTTPS | 🔒 | Verifies secure protocol |
| Keywords | 🎯 | Detects phishing terms |
| Domain | 🌐 | Analyzes structure |
| IP Address | 📍 | Identifies IP URLs |
| Length | 📏 | Checks URL length |
| Characters | 🔣 | Finds suspicious chars |
| Blacklist | 🛡️ | Matches known threats |
| Reputation | ⭐ | Checks domain trust |

## 📊 Risk Levels

```
✅ SAFE        (0-30)   → Green
⚠️ SUSPICIOUS  (31-60)  → Yellow
🚫 MALICIOUS   (61-100) → Red
```

## 🛠️ Commands

### Start Application
```bash
npm run dev
```

### Start Backend Only
```bash
npm run server
```

### Start Frontend Only
```bash
cd client && npm start
```

### Stop Servers
```bash
Ctrl + C (in terminal)
```

### Restart Servers
```bash
# Stop both servers
# Then run:
npm run dev
```

## 📁 Key Files

### Frontend
```
client/src/components/URLInput.js    - URL input
client/src/components/ResultCard.js  - Results
client/src/components/ThreatMeter.js - Risk meter
client/src/components/ScanHistory.js - History
```

### Backend
```
server/index.js          - API server
server/threatAnalyzer.js - Security engine
```

### Config
```
client/tailwind.config.js - Tailwind theme
client/postcss.config.js  - PostCSS config
```

## 🎨 Color Codes

```css
cyber-dark:   #0a0e27  /* Background */
cyber-blue:   #00d4ff  /* Primary */
cyber-purple: #8b5cf6  /* Secondary */
cyber-green:  #10b981  /* Safe */
cyber-yellow: #fbbf24  /* Warning */
cyber-red:    #ef4444  /* Danger */
```

## 🔧 Customization

### Add Phishing Keywords
Edit: `server/threatAnalyzer.js`
```javascript
this.phishingKeywords = [
  'login', 'verify', 'secure',
  // Add more here
];
```

### Add Suspicious TLDs
```javascript
this.suspiciousTLDs = [
  '.xyz', '.top', '.tk',
  // Add more here
];
```

### Add Blacklisted Domains
```javascript
this.blacklistedDomains = [
  'phishing-example.com',
  // Add more here
];
```

### Adjust Risk Scores
```javascript
score: isHttps ? 0 : 30,  // Change values
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
npx kill-port 3000
npx kill-port 5000
npm run dev
```

### Styles Not Loading
```bash
cd client
npm install -D tailwindcss@3.4.1
npm start
```

### API Not Responding
1. Check backend running on port 5000
2. Verify CORS settings
3. Check browser console

### Module Not Found
```bash
npm install
cd client && npm install
cd .. && npm run dev
```

## 📱 Mobile Testing

1. Find your IP:
   ```bash
   ipconfig  # Windows
   ```

2. Access from phone:
   ```
   http://YOUR_IP:3000
   ```

## ✅ Success Checklist

- [ ] Backend running (port 5000)
- [ ] Frontend running (port 3000)
- [ ] Can access http://localhost:3000
- [ ] URL input works
- [ ] Analysis completes
- [ ] Results display correctly
- [ ] Threat meter animates
- [ ] History updates
- [ ] No console errors

## 📚 Documentation

- **README.md** - Full documentation
- **SETUP_GUIDE.md** - Setup instructions
- **PROJECT_COMPLETE.md** - Transformation details
- **QUICK_REFERENCE.md** - This file

## 🎯 Features

✅ URL security analysis
✅ 8 comprehensive checks
✅ Risk scoring (0-100)
✅ 3-tier classification
✅ Scan history
✅ Modern UI
✅ Responsive design
✅ Real-time analysis

## 🚀 Status

**FULLY OPERATIONAL** ✅

Both servers running without errors!

---

**Quick Start:** Open http://localhost:3000 and paste a URL!

🔒 **Stay safe online!**