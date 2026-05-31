const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const threatAnalyzer = require('./threatAnalyzer');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// URL Analysis Route
app.post('/api/analyze-url', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      return res.status(400).json({ 
        error: 'Invalid URL format',
        message: 'Please enter a valid URL (e.g., https://example.com)'
      });
    }

    const analysis = await threatAnalyzer.analyzeURL(url);
    res.json(analysis);
  } catch (error) {
    console.error('Error analyzing URL:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Threat Analyzer API is running' });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🔒 Secure Link Threat Analyzer API running on port ${PORT}`);
});