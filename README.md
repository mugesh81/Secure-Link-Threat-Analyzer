# 🔒 Secure Link Threat Analyzer

A professional cybersecurity web application that analyzes URLs for phishing and malicious threats. Supports both manual URL input and QR code image upload. Built with React, Tailwind CSS, Node.js, and Express.

![Version](https://img.shields.io/badge/version-2.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Project Overview

The Secure Link Threat Analyzer is a modern URL security scanner that protects users from phishing attacks and malicious websites. Users can either paste URLs directly or upload QR code images for comprehensive security analysis.

### Key Features

- **Dual Input Methods**: 
  - ✅ Paste URL manually
  - ✅ Upload QR code image (PNG, JPG, JPEG, WEBP)
- **QR Code Decoding**: Automatic QR code detection using jsQR
- **Multi-Layer Threat Detection**: 8 comprehensive security checks
- **Risk Scoring Engine**: 0-100 risk score with 3-tier classification
- **Real-Time Analysis**: Results in 1-2 seconds
- **Scan History**: Track recent URL analyses with source indicator
- **Modern Cybersecurity UI**: Dark theme with Tailwind CSS
- **Responsive Design**: Works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd CYSPROJECT

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Running the Application

```bash
# Start both servers (from root directory)
npm run dev

# Or start individually:
npm run server    # Backend only (port 5000)
npm run client    # Frontend only (port 3000)
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📱 How to Use

### Method 1: Paste URL

1. Click "Paste URL" tab
2. Enter or paste a URL in the input field
3. Click "Analyze Link"
4. View comprehensive security report

### Method 2: Upload QR Code

1. Click "Upload QR Code" tab
2. Drag & drop or click to upload QR code image
3. System automatically decodes QR code
4. If URL detected, analysis starts automatically
5. View the same comprehensive security report

## 🏗️ Project Structure

```
CYSPROJECT/
├── client/                      # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js       # App header
│   │   │   ├── URLInput.js     # URL input interface
│   │   │   ├── QRUpload.js     # QR code upload (NEW)
│   │   │   ├── ResultCard.js   # Analysis results display
│   │   │   ├── ThreatMeter.js  # Visual risk meter
│   │   │   └── ScanHistory.js  # Recent scans sidebar
│   │   ├── App.js              # Main component
│   │   └── index.css           # Tailwind styles
│   ├── tailwind.config.js      # Tailwind configuration
│   └── package.json
│
├── server/                      # Node.js Backend
│   ├── index.js                # Express server
│   └── threatAnalyzer.js       # Security analysis engine
│
├── package.json                # Root dependencies
└── README.md
```

## 🔒 Security Analysis Features

### 1. HTTPS Verification
- Checks if the URL uses secure HTTPS protocol
- **Risk**: +30 points if HTTP

### 2. Phishing Keyword Detection
- Scans for suspicious terms: login, verify, secure, account, bank, payment, etc.
- **Risk**: +20 points per keyword

### 3. Domain Structure Analysis
- Analyzes subdomain count and domain extensions
- Flags suspicious TLDs (.xyz, .top, .tk, .ru, etc.)
- **Risk**: +20 points for excessive subdomains, +25 for suspicious TLD

### 4. IP Address Detection
- Identifies URLs using IP addresses instead of domain names
- **Risk**: +40 points if IP-based

### 5. URL Length Analysis
- Flags unusually long URLs
- **Risk**: +15-25 points based on length

### 6. Special Character Detection
- Checks for suspicious characters (@, %, -, _)
- **Risk**: +15 points if excessive

### 7. Blacklist Check
- Compares against known malicious domains
- **Risk**: +100 points if blacklisted

### 8. Domain Reputation
- Identifies well-known trusted domains
- Provides domain age and reputation status

## 📊 Risk Classification

| Risk Score | Classification | Color | Action |
|------------|---------------|-------|--------|
| 0-30 | ✅ SAFE | Green | Proceed normally |
| 31-60 | ⚠️ SUSPICIOUS | Yellow | Proceed with caution |
| 61-100 | 🚫 MALICIOUS | Red | Access blocked |

## 🎨 UI Features

### Modern Cybersecurity Dashboard
- Dark theme with gradient backgrounds
- Animated components and transitions
- Color-coded security indicators
- Interactive threat meter
- Real-time scan history
- Source indicator (Manual URL vs QR Code)

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface
- Adaptive layouts

## 🧪 Testing

### Example URLs to Test

1. **Safe URL**
   ```
   https://www.google.com
   ```
   Expected: SAFE classification, low risk score

2. **Suspicious URL**
   ```
   http://paypal-login-verify.com
   ```
   Expected: SUSPICIOUS classification, medium risk score

3. **Malicious URL**
   ```
   http://192.168.1.1/secure-login-verify-account
   ```
   Expected: MALICIOUS classification, high risk score

### Testing QR Code Upload

1. Create a QR code containing a URL using any QR generator
2. Save as PNG, JPG, or WEBP
3. Upload to the application
4. Verify automatic decoding and analysis

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks
- **Tailwind CSS 3**: Utility-first CSS framework
- **jsQR**: QR code decoding library
- **Axios**: HTTP client for API calls

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **Helmet**: Security headers
- **CORS**: Cross-origin support
- **url-parse**: URL parsing utility

## 📝 API Documentation

### POST /api/analyze-url

Analyzes a URL for security threats (works for both manual input and QR decoded URLs).

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
    "basic": { ... },
    "https": { ... },
    "keywords": { ... },
    "domain": { ... },
    "ipAddress": { ... },
    "urlLength": { ... },
    "specialChars": { ... },
    "blacklist": { ... },
    "reputation": { ... }
  }
}
```

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Threat Analyzer API is running"
}
```

## 🔧 Configuration

### Tailwind Configuration

Customize colors and themes in `client/tailwind.config.js`:

```javascript
colors: {
  cyber: {
    dark: '#0a0e27',
    darker: '#060918',
    blue: '#00d4ff',
    purple: '#8b5cf6',
    green: '#10b981',
    yellow: '#fbbf24',
    red: '#ef4444',
  }
}
```

### Backend Configuration

Modify security checks in `server/threatAnalyzer.js`:

- Add/remove phishing keywords
- Update suspicious TLDs
- Customize risk scoring
- Add blacklisted domains

## 📈 Future Enhancements

- [ ] Integration with Google Safe Browsing API
- [ ] Machine learning-based URL analysis
- [ ] Batch QR code processing
- [ ] Export security reports as PDF
- [ ] Browser extension version
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Dark/Light mode toggle
- [ ] Advanced analytics dashboard
- [ ] API rate limiting
- [ ] Real-time camera QR scanning (optional)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with React and Tailwind CSS
- QR code decoding powered by jsQR
- Inspired by modern cybersecurity tools
- Designed for user safety and security awareness

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact the development team

---

**Built with ❤️ for cybersecurity and user protection**

🔒 Stay safe online!