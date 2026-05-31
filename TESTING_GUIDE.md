# 🧪 Testing Guide - Secure QR Scanner

## Quick Start

Your application is now running at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Test QR Codes**: Open `test-qr-codes.html` in your browser

## 📷 Camera Access Issue

If you're getting "Failed to access camera" error, this is normal and can happen for several reasons:

### Why Camera Might Not Work:
1. **Browser Permissions**: You need to explicitly allow camera access
2. **Camera in Use**: Another application might be using your camera
3. **Browser Compatibility**: Some browsers have stricter camera policies
4. **Windows Settings**: Camera might be disabled in Windows privacy settings

### How to Fix Camera Access:

#### Option 1: Allow Browser Permissions
1. Look for a camera icon in your browser's address bar
2. Click it and select "Allow"
3. Refresh the page and try again

#### Option 2: Check Windows Camera Settings
1. Open Windows Settings → Privacy → Camera
2. Make sure "Allow apps to access your camera" is ON
3. Make sure your browser is allowed to use the camera

#### Option 3: Use File Upload Instead! 🎯
**This is the easiest way to test the application:**
1. Open `test-qr-codes.html` in your browser
2. Right-click any QR code and save it as an image
3. Go to http://localhost:3000
4. Click "Upload Image" or drag & drop the saved QR code
5. See the security analysis!

## 🧪 Testing Scenarios

### Test 1: Safe URL
**QR Code**: https://www.google.com
**Expected Result**: 
- ✅ Classification: SAFE
- Green indicator
- HTTPS verified
- No threats detected
- User can open the link

### Test 2: Suspicious URL
**QR Code**: http://paypal-login-verify-account.com
**Expected Result**:
- ⚠️ Classification: SUSPICIOUS
- Yellow indicator
- No HTTPS (insecure)
- Suspicious keywords detected: "paypal", "login", "verify", "account"
- Warning message shown

### Test 3: Malicious URL
**QR Code**: http://192.168.1.100/login-verify-secure-account-update
**Expected Result**:
- 🚫 Classification: MALICIOUS
- Red indicator
- Multiple threats:
  - IP address instead of domain
  - No HTTPS
  - Multiple suspicious keywords
  - Long URL
- Link is BLOCKED

### Test 4: Plain Text
**QR Code**: "Hello from Secure QR Scanner!"
**Expected Result**:
- 📄 Text content displayed
- No URL analysis
- Simple text display

## 🎯 Step-by-Step Testing

### Method 1: File Upload (Recommended)

1. **Open test QR codes page**:
   - Double-click `test-qr-codes.html` to open it in your browser
   - You'll see 6 different QR codes with different security levels

2. **Save a QR code**:
   - Right-click on any QR code image
   - Select "Save image as..."
   - Save it to your desktop or downloads folder

3. **Upload to scanner**:
   - Go to http://localhost:3000
   - Click "Upload Image" button OR drag & drop the image
   - Wait for analysis (takes 1-2 seconds)

4. **Review results**:
   - Check the risk classification (SAFE/SUSPICIOUS/MALICIOUS)
   - Read the security threats detected
   - View detailed analysis
   - Try opening safe links or see blocked malicious ones

5. **Test another**:
   - Click "Scan Another QR Code"
   - Try a different QR code with different security level

### Method 2: Camera Scanning (If Permissions Work)

1. **Enable camera**:
   - Go to http://localhost:3000
   - Click "Scan with Camera"
   - Allow camera permissions when prompted

2. **Scan QR code**:
   - Display a QR code on your phone or another screen
   - Point your camera at it
   - Wait for automatic detection

3. **View results**:
   - Camera stops automatically after scan
   - Security analysis appears
   - Review and test

## 🔍 What to Look For

### Safe Links (Score 0-30)
- ✅ Green background
- "SAFE LINK" heading
- HTTPS verified
- No suspicious keywords
- Can open the link

### Suspicious Links (Score 31-60)
- ⚠️ Yellow background
- "WARNING" message
- Missing HTTPS or suspicious keywords
- Caution advised
- Can still open with warning

### Malicious Links (Score 61+)
- 🚫 Red background
- "DANGER" message
- Multiple security threats
- Link is BLOCKED
- Cannot open for safety

## 📊 Security Checks Performed

| Check | Points | What It Detects |
|-------|--------|-----------------|
| No HTTPS | +30 | Insecure connection |
| Suspicious Keywords | +10 each | Phishing terms like "login", "verify", "secure" |
| Excessive Subdomains | +20 | Complex domain structure |
| Long URL | +15 | Unusually long URLs |
| IP Address | +40 | Direct IP instead of domain name |
| Blacklist Match | +100 | Known malicious domain |

## 🐛 Troubleshooting

### Issue: "No QR code found in uploaded image"
**Solution**: 
- Make sure the image is clear and not blurry
- Try a different QR code
- Use the test QR codes from `test-qr-codes.html`

### Issue: Camera not working
**Solution**: 
- Use the file upload method instead
- Check browser permissions
- Try a different browser (Chrome works best)

### Issue: Server not responding
**Solution**:
- Make sure both servers are running
- Check terminal for errors
- Restart with `npm run dev`

### Issue: Page won't load
**Solution**:
- Wait 10-20 seconds for React to compile
- Check if port 3000 is available
- Try refreshing the browser

## 🎉 Success Indicators

You'll know it's working when:
1. ✅ You can upload QR code images
2. ✅ Analysis results appear within 1-2 seconds
3. ✅ Different URLs get different risk classifications
4. ✅ Malicious links are blocked
5. ✅ Safe links can be opened
6. ✅ Detailed security analysis is shown

## 📝 Testing Checklist

- [ ] Upload a safe QR code (Google, GitHub)
- [ ] Upload a suspicious QR code (HTTP with keywords)
- [ ] Upload a malicious QR code (IP address with keywords)
- [ ] Upload a text QR code (non-URL content)
- [ ] Try to open a safe link
- [ ] Verify malicious link is blocked
- [ ] Check detailed security analysis
- [ ] Test drag & drop upload
- [ ] Try camera scanning (if permissions work)
- [ ] Test "Scan Another QR Code" button

## 🚀 Next Steps

Once testing is complete, you can:
1. Customize the phishing detection rules in `server/phishingDetector.js`
2. Add more blacklisted domains
3. Adjust risk scoring thresholds
4. Enhance the UI styling
5. Add more security checks
6. Deploy to a production server

Happy Testing! 🛡️