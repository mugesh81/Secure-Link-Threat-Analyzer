import React, { useState } from 'react';
import Header from './components/Header';
import URLInput from './components/URLInput';
import QRUpload from './components/QRUpload';
import ResultCard from './components/ResultCard';
import ScanHistory from './components/ScanHistory';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanHistory, setScanHistory] = useState([]);
  const [inputMethod, setInputMethod] = useState('url'); // 'url' or 'qr'

  const handleAnalyze = async (url, source = 'manual') => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/analyze-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Analysis failed');
      }

      const result = await response.json();
      setAnalysisResult({ ...result, source });

      // Add to history
      const historyItem = {
        url: result.url,
        classification: result.classification,
        riskScore: result.riskScore,
        timestamp: new Date().toISOString(),
        source
      };
      setScanHistory(prev => [historyItem, ...prev].slice(0, 10));

    } catch (error) {
      console.error('Error analyzing URL:', error);
      setAnalysisResult({
        url: url,
        classification: 'ERROR',
        riskScore: 0,
        threats: [error.message],
        details: {},
        source
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleQRDecoded = (url) => {
    handleAnalyze(url, 'qr');
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyber-darker via-cyber-dark to-cyber-darker">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Analysis Section */}
          <div className="lg:col-span-2 space-y-6">
            {!analysisResult ? (
              <>
                {/* Input Method Selector */}
                <div className="flex justify-center space-x-4 mb-6">
                  <button
                    onClick={() => setInputMethod('url')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      inputMethod === 'url'
                        ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-white shadow-lg'
                        : 'bg-cyber-darker border border-cyber-blue/30 text-gray-400 hover:text-white hover:border-cyber-blue/50'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <span>Paste URL</span>
                    </span>
                  </button>
                  <button
                    onClick={() => setInputMethod('qr')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      inputMethod === 'qr'
                        ? 'bg-gradient-to-r from-cyber-purple to-cyber-blue text-white shadow-lg'
                        : 'bg-cyber-darker border border-cyber-purple/30 text-gray-400 hover:text-white hover:border-cyber-purple/50'
                    }`}
                  >
                    <span className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                      <span>Upload QR Code</span>
                    </span>
                  </button>
                </div>

                {/* Input Components */}
                {inputMethod === 'url' ? (
                  <URLInput onAnalyze={(url) => handleAnalyze(url, 'manual')} isAnalyzing={isAnalyzing} />
                ) : (
                  <QRUpload onQRDecoded={handleQRDecoded} isProcessing={isAnalyzing} />
                )}
              </>
            ) : (
              <ResultCard result={analysisResult} onReset={handleReset} />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ScanHistory history={scanHistory} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-6 border-t border-cyber-blue/20">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>🔒 Secure Link Threat Analyzer</p>
          <p className="mt-2">Protecting you from malicious URLs and phishing attacks</p>
        </div>
      </footer>
    </div>
  );
}

export default App;