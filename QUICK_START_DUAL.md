# 🚀 Quick Start - Dual Input Threat Analyzer

## ✅ Your App is Ready!

**Frontend**: http://localhost:3000  
**Backend**: http://localhost:5000

---

## 🎯 Two Ways to Analyze URLs

### Method 1: Paste URL 📝

```
1. Open http://localhost:3000
2. Click "Paste URL" tab
3. Enter URL
4. Click "Analyze Link"
5. View results
```

### Method 2: Upload QR Code 📱

```
1. Open http://localhost:3000
2. Click "Upload QR Code" tab
3. Drag & drop or click to upload
4. Auto-decode happens
5. View results
```

---

## 🧪 Quick Test

### Test URL Input

Paste this:
```
http://paypal-login-verify.com
```
Expected: ⚠️ SUSPICIOUS

### Test QR Upload

1. Open `test-qr-codes.html`
2. Right-click any QR code
3. Save as PNG
4. Upload to app
5. See analysis

---

## 📊 What You'll See

### Input Screen
- Two tabs: URL / QR
- Blue theme for URL
- Purple theme for QR
- Example URLs
- Upload zone

### Results Screen
- Risk score (0-100)
- Classification (SAFE/SUSPICIOUS/MALICIOUS)
- 8 security checks
- Threat list
- Source badge (if QR)

### Scan History
- Recent scans
- QR badge indicator
- Risk scores
- Timestamps

---

## 🔒 Security Checks

| Check | Icon | Points |
|-------|------|--------|
| HTTPS | 🔒 | +30 if missing |
| Keywords | 🎯 | +20 each |
| Domain | 🌐 | +20-25 |
| IP Address | 📍 | +40 |
| URL Length | 📏 | +15-25 |
| Characters | 🔣 | +15 |
| Blacklist | 🛡️ | +100 |
| Reputation | ⭐ | Info only |

---

## 📱 Supported QR Formats

- ✅ PNG
- ✅ JPG / JPEG
- ✅ WEBP
- Max size: 5MB

---

## 🎨 Color Guide

**Risk Levels:**
- 🟢 Green = SAFE (0-30)
- 🟡 Yellow = SUSPICIOUS (31-60)
- 🔴 Red = MALICIOUS (61-100)

**Input Themes:**
- 🔵 Blue = URL Input
- 🟣 Purple = QR Upload

---

## ⚡ Quick Commands

### Start App
```bash
npm run dev
```

### Stop Servers
```
Ctrl + C
```

### Restart
```bash
npm run dev
```

---

## 🐛 Troubleshooting

**QR not decoding?**
- Use clear, high-quality image
- Ensure QR contains URL
- Try different image

**Port in use?**
```bash
npx kill-port 3000
npx kill-port 5000
npm run dev
```

**Styles not loading?**
```bash
cd client
npm install
npm start
```

---

## ✅ Success Checklist

- [ ] Can access http://localhost:3000
- [ ] Can switch between tabs
- [ ] URL input works
- [ ] QR upload works
- [ ] QR decodes correctly
- [ ] Analysis completes
- [ ] Results display
- [ ] History updates
- [ ] Source badges show

---

## 📚 Documentation

- **README.md** - Full guide
- **QR_FEATURE_GUIDE.md** - QR details
- **FINAL_SUMMARY.md** - Completion summary
- **QUICK_START_DUAL.md** - This file

---

## 🎉 You're All Set!

**Two input methods, one powerful analyzer!**

🔒 **Start analyzing URLs now!** 🚀