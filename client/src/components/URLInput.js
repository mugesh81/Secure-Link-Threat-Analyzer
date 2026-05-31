import React, { useState } from 'react';

const URLInput = ({ onAnalyze, isAnalyzing }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const validateURL = (urlString) => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!validateURL(url)) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    onAnalyze(url);
  };

  const exampleURLs = [
    { url: 'https://www.google.com', label: 'Safe Example', type: 'safe' },
    { url: 'http://paypal-login-verify.com', label: 'Suspicious Example', type: 'suspicious' },
    { url: 'http://192.168.1.1/secure-login', label: 'Malicious Example', type: 'malicious' }
  ];

  return (
    <div className="cyber-card p-8">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="inline-block p-4 bg-cyber-blue/10 rounded-full mb-4">
          <svg className="w-16 h-16 text-cyber-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Analyze URL for Threats</h2>
        <p className="text-gray-400">Paste any link below to check for phishing and malicious content</p>
      </div>

      {/* URL Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url-input" className="block text-sm font-medium text-gray-300 mb-2">
            Enter URL to Analyze
          </label>
          <div className="relative">
            <input
              id="url-input"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              disabled={isAnalyzing}
              className="w-full px-4 py-4 bg-cyber-darker border border-cyber-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyber-blue focus:ring-2 focus:ring-cyber-blue/50 transition-all disabled:opacity-50"
            />
            {url && !isAnalyzing && (
              <button
                type="button"
                onClick={() => setUrl('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-400 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isAnalyzing}
          className="w-full cyber-button bg-gradient-to-r from-cyber-blue to-cyber-purple text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-cyber-blue/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing URL...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Analyze Link
            </span>
          )}
        </button>
      </form>

      {/* Example URLs */}
      <div className="mt-8 pt-6 border-t border-cyber-blue/20">
        <p className="text-sm text-gray-400 mb-3">Try these example URLs:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {exampleURLs.map((example, index) => (
            <button
              key={index}
              onClick={() => setUrl(example.url)}
              disabled={isAnalyzing}
              className={`p-3 rounded-lg border text-left transition-all hover:scale-105 disabled:opacity-50 ${
                example.type === 'safe' ? 'border-cyber-green/30 bg-cyber-green/5 hover:bg-cyber-green/10' :
                example.type === 'suspicious' ? 'border-cyber-yellow/30 bg-cyber-yellow/5 hover:bg-cyber-yellow/10' :
                'border-cyber-red/30 bg-cyber-red/5 hover:bg-cyber-red/10'
              }`}
            >
              <div className="text-xs font-semibold mb-1 text-gray-400">{example.label}</div>
              <div className="text-xs text-gray-300 truncate">{example.url}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Security Features */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: '🔒', label: 'HTTPS Check' },
          { icon: '🎯', label: 'Phishing Detection' },
          { icon: '🌐', label: 'Domain Analysis' },
          { icon: '🚫', label: 'Threat Blocking' }
        ].map((feature, index) => (
          <div key={index} className="text-center p-3 bg-cyber-darker/50 rounded-lg border border-cyber-blue/10">
            <div className="text-2xl mb-1">{feature.icon}</div>
            <div className="text-xs text-gray-400">{feature.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default URLInput;