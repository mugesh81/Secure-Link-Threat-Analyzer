# 🔒 Secure QR Code Scanner with Phishing Detection

<div align="center">

![Security](https://img.shields.io/badge/Security-Cybersecurity-red?style=for-the-badge&logo=shield)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A full-stack cybersecurity web application that analyzes URLs and QR codes for phishing, malware, and malicious threats — before you open them.**

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Security Analysis Engine](#-security-analysis-engine)
- [Risk Scoring System](#-risk-scoring-system)
- [Installation & Setup](#-installation--setup)
- [API Reference](#-api-reference)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌐 Overview

The **Secure QR Code Scanner with Phishing Detection** is a modern cybersecurity tool that protects users from malicious links embedded in QR codes and URLs. It acts as a **security checkpoint** — analyze first, open later.

With the rise of **Quishing (QR Code Phishing)** attacks, users are increasingly tricked into visiting fraudulent websites through QR codes placed on posters, menus, emails, and payment terminals. This application provides a simple, visual, and effective defense.

---

## ❗ Problem Statement

- QR codes hide their destination URL — users scan without knowing where they're going
- Traditional QR scanners open links immediately with zero security checks
- Phishing attacks via QR codes increased by **587% in 2023** (Abnormal Security)
- Attackers place fake QR codes over legitimate ones at ATMs, restaurants, and public spaces
- Most security tools require technical knowledge — this tool is built for everyone

---

## ✨ Features

### 🔗 Three Input Methods
| Method | Description |
|--------|-------------|
| **Paste URL** | Type or paste any link for instant analysis |
| **Upload QR Image** | Upload PNG/JPG/WEBP containing a QR code |
| **Live Camera Scan** | Use device camera to scan QR codes in real time |

### 🛡️ 8-Layer Security Analysis
- HTTPS verification
- Phishing keyword detection (26+ keywords)
- Domain structure analysis
- IP address URL detection
- URL length analysis
- Special character detection
- Blacklist database check
- Domain reputation check

### 📊 Risk Scoring & Classification
- Calculates a **0–100 risk score**
- Three tiers: ✅ SAFE · ⚠️ SUSPICIOUS · 🚫 MALICIOUS
- Animated visual threat meter

### 📋 Detailed Security Report
- Color-coded result header (green / yellow / red)
- Individual cards for each of the 8 security checks
- Detected threats list with explanations
- Final recommendation
- Source badge showing if URL came from a QR code

### 🕐 Scan History
- Tracks last 10 scans in the sidebar
- Shows URL, classification, risk score, and timestamp
- Purple **QR** badge for QR-sourced scans
- Live stats: Safe / Suspicious / Malicious counts

### 🎨 Modern Cybersecurity UI
- Dark dashboard theme
- Custom cyber color palette
- Smooth animations and transitions
- Fully responsive — mobile, tablet, desktop

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI framework, component architecture |
| Tailwind CSS 3 | Utility-first styling, dark cyber theme |
| jsQR | QR code decoding from images and camera frames |
| Canvas API | Pixel extraction from images/video for jsQR |
| MediaDevices API | Camera access for live QR scanning |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | HTTP server and API routing |
| Helmet.js | Secure HTTP response headers |
| CORS | Cross-origin request handling |
| url-parse | URL parsing into components |

---

## 📁 Project Structure

```
Secure-Link-Threat-Analyzer/
│
├── server/
│   ├── index.js              # Express server, API endpoints, middleware
│   └── threatAnalyzer.js     # All 8 security checks + risk scoring engine
│
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js            # Root component, state management, tab switching
│   │   ├── index.css         # Tailwind CSS directives
│   │   └── components/
│   │       ├── Header.js         # Top navigation with logo and status badge
│   │       ├── URLInput.js       # URL paste form with validation
│   │       ├── QRUpload.js       # QR image upload + live camera scanner
│   │       ├── ResultCard.js     # Full security report display
│   │       ├── ThreatMeter.js    # Animated risk score bar
│   │       └── ScanHistory.js    # Recent scans sidebar
│   ├── tailwind.config.js    # Custom cyber color palette + animations
│   └── package.json
│
├── package.json              # Root scripts
└── README.md
```

---

## ⚙️ How It Works

### Path A — Paste URL
```
User pastes URL
    → Client validates format
    → POST /api/analyze-url
    → threatAnalyzer runs 8 checks
    → Returns JSON with score + details
    → ResultCard renders the report
    → ScanHistory logs the entry
```

### Path B — Upload QR Image
```
User uploads image
    → Validate file type & size
    → FileReader loads image into memory
    → Canvas extracts pixel data
    → jsQR decodes QR pattern
    → Extracted URL → same pipeline as Path A
```

### Path C — Live Camera Scan
```
User clicks "Use Camera"
    → Browser requests camera permission
    → MediaDevices.getUserMedia() opens stream
    → Video element shows live feed
    → requestAnimationFrame loop runs:
        → Canvas captures each frame
        → jsQR tries to decode QR
        → QR found → camera stops automatically
        → URL → same pipeline as Path A
```

---

## 🔍 Security Analysis Engine

### All 8 Checks Explained

| # | Check | Risk Points | Trigger |
|---|-------|-------------|---------|
| 1 | **HTTPS Verification** | +30 | URL uses HTTP instead of HTTPS |
| 2 | **Phishing Keywords** | +20 each | login, verify, secure, account, bank, payment, paypal, amazon, etc. |
| 3 | **Domain Structure** | +20 / +25 | >3 subdomains / suspicious TLD (.xyz .top .tk .ru) |
| 4 | **IP Address Detection** | +40 | Hostname is a raw IP (e.g. 192.168.1.1) |
| 5 | **URL Length** | +15 / +25 | URL over 100 / 150 characters |
| 6 | **Special Characters** | +15 | More than 3 of: @ % - _ |
| 7 | **Blacklist Check** | +100 | Domain found in threat database |
| 8 | **Domain Reputation** | Info only | Checks against known trusted domains |

---

## 📊 Risk Scoring System

```
Total Score = Sum of all triggered check points

┌─────────────┬────────────────┬────────┬──────────────────────────┐
│ Score Range │ Classification │ Color  │ Action                   │
├─────────────┼────────────────┼────────┼──────────────────────────┤
│   0 – 30    │ ✅ SAFE        │ Green  │ User can open the link   │
│  31 – 60    │ ⚠️ SUSPICIOUS  │ Yellow │ Warning shown, caution   │
│  61 – 100+  │ 🚫 MALICIOUS   │ Red    │ Link blocked             │
└─────────────┴────────────────┴────────┴──────────────────────────┘
```

### Example Calculation
```
URL: http://paypal-login-verify-account.xyz

No HTTPS          → +30
"paypal" keyword  → +20
"login" keyword   → +20
"verify" keyword  → +20
"account" keyword → +20
Suspicious TLD    → +25
─────────────────────────
Total: 135 → 🚫 MALICIOUS
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v14 or higher
- npm v6 or higher
- Git

### Clone the Repository
```bash
git clone https://github.com/mugesh81/Secure-Link-Threat-Analyzer.git
cd Secure-Link-Threat-Analyzer
```

### Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Run the Application
```bash
# Start both frontend and backend together
npm run dev
```

Or run them separately:

```bash
# Terminal 1 — Backend (port 5000)
node server/index.js

# Terminal 2 — Frontend (port 3000)
cd client
npm start
```

### Open in Browser
```
Frontend → http://localhost:3000
Backend  → http://localhost:5000
```

---

## 📡 API Reference

### `POST /api/analyze-url`

Analyzes a URL for security threats.

**Request Body:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "url": "https://example.com",
  "riskScore": 25,
  "classification": "SAFE",
  "threats": [],
  "details": {
    "basic":        { "protocol": "https", "hostname": "example.com" },
    "https":        { "secure": true, "score": 0, "status": "Secure", "icon": "✅" },
    "keywords":     { "keywords": [], "count": 0, "score": 0, "status": "Clean" },
    "domain":       { "subdomainCount": 0, "tld": ".com", "score": 0 },
    "ipAddress":    { "isIPAddress": false, "score": 0 },
    "urlLength":    { "length": 19, "score": 0, "status": "Normal" },
    "specialChars": { "characters": [], "count": 0, "score": 0 },
    "blacklist":    { "isBlacklisted": false, "score": 0 },
    "reputation":   { "isWellKnown": false, "status": "Unknown" }
  }
}
```

### `GET /api/health`
```json
{ "status": "OK", "message": "Threat Analyzer API is running" }
```

---

## 🧪 Test URLs

Try these URLs to see the analyzer in action:

| URL | Expected Result |
|-----|----------------|
| `https://www.google.com` | ✅ SAFE |
| `https://github.com` | ✅ SAFE |
| `http://paypal-login-verify.com` | 🚫 MALICIOUS |
| `http://secure-account-update.xyz` | 🚫 MALICIOUS |
| `http://192.168.1.1/secure-login` | 🚫 MALICIOUS |
| `https://login.verify.secure.bank.xyz` | 🚫 MALICIOUS |

---

## 🔐 Security Practices

- `helmet()` sets 11 secure HTTP headers on every response
- URL validated server-side before any processing
- File uploads restricted to image MIME types, max 5MB
- Camera stream fully stopped after QR detection
- External links opened with `noopener,noreferrer`
- CORS configured to control API access

---

## 🗺️ Roadmap

- [ ] Google Safe Browsing API integration
- [ ] VirusTotal API for multi-engine scanning
- [ ] Machine learning URL classifier
- [ ] User accounts with persistent scan history
- [ ] Browser extension
- [ ] Mobile app (React Native)
- [ ] Batch URL scanning
- [ ] PDF report export
- [ ] Email alert system

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Mugesh**
- GitHub: [@mugesh81](https://github.com/mugesh81)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## ⭐ Show Your Support

If this project helped you, please consider giving it a **⭐ star** on GitHub!

---

<div align="center">

**Built with ❤️ for cybersecurity awareness and user protection**

🔒 *Analyze first. Open later. Stay safe.*

</div>
