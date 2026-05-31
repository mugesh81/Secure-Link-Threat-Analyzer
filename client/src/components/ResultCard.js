import React from 'react';
import ThreatMeter from './ThreatMeter';

const ResultCard = ({ result, onReset }) => {
  if (!result) return null;

  const getRiskColor = (classification) => {
    switch (classification) {
      case 'SAFE': return 'cyber-green';
      case 'SUSPICIOUS': return 'cyber-yellow';
      case 'MALICIOUS': return 'cyber-red';
      default: return 'gray-500';
    }
  };

  const getRiskIcon = (classification) => {
    switch (classification) {
      case 'SAFE': return '✅';
      case 'SUSPICIOUS': return '⚠️';
      case 'MALICIOUS': return '🚫';
      default: return '❓';
    }
  };

  const getRiskMessage = (classification) => {
    switch (classification) {
      case 'SAFE':
        return 'This link appears to be safe. However, always exercise caution when clicking links.';
      case 'SUSPICIOUS':
        return 'This link shows suspicious characteristics. Proceed with extreme caution.';
      case 'MALICIOUS':
        return 'DANGER: This link is highly suspicious and likely malicious. Do not open this website.';
      default:
        return 'Unable to determine the safety of this link.';
    }
  };

  const color = getRiskColor(result.classification);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Risk Summary Card */}
      <div className={`cyber-card p-8 border-2 border-${color}/50`}>
        <div className="text-center mb-6">
          <div className="text-6xl mb-4 animate-bounce">{getRiskIcon(result.classification)}</div>
          <h2 className={`text-3xl font-bold text-${color} mb-2`}>
            {result.classification} LINK
          </h2>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className={`px-6 py-3 bg-${color}/20 border border-${color}/50 rounded-lg`}>
              <div className="text-sm text-gray-400">Risk Score</div>
              <div className={`text-3xl font-bold text-${color}`}>{result.riskScore}/100</div>
            </div>
          </div>
        </div>

        <ThreatMeter score={result.riskScore} classification={result.classification} />

        <div className={`mt-6 p-4 bg-${color}/10 border border-${color}/30 rounded-lg`}>
          <p className="text-gray-300 text-center">{getRiskMessage(result.classification)}</p>
        </div>
      </div>

      {/* URL Information */}
      {result.details.basic && (
        <div className="cyber-card p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2 text-cyber-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            URL Information
          </h3>
          <div className="space-y-3">
            <div className="bg-cyber-darker/50 p-4 rounded-lg border border-cyber-blue/20">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-400">Analyzed URL</div>
                {result.source === 'qr' && (
                  <span className="text-xs bg-cyber-purple/20 text-cyber-purple px-3 py-1 rounded-full border border-cyber-purple/30 flex items-center space-x-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <span>From QR Code</span>
                  </span>
                )}
              </div>
              <div className="text-white font-mono text-sm break-all">{result.url}</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-cyber-darker/50 p-3 rounded-lg border border-cyber-blue/10">
                <div className="text-xs text-gray-400">Protocol</div>
                <div className="text-white font-semibold">{result.details.basic.protocol}</div>
              </div>
              <div className="bg-cyber-darker/50 p-3 rounded-lg border border-cyber-blue/10">
                <div className="text-xs text-gray-400">Domain</div>
                <div className="text-white font-semibold truncate">{result.details.basic.hostname}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Checks */}
      <div className="cyber-card p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2 text-cyber-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Security Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* HTTPS Status */}
          {result.details.https && (
            <div className="bg-cyber-darker/50 p-4 rounded-lg border border-cyber-blue/10 hover:border-cyber-blue/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm font-semibold">🔒 HTTPS Security</span>
                <span className="text-2xl">{result.details.https.icon}</span>
              </div>
              <div className="text-white font-semibold">{result.details.https.status}</div>
              <div className="text-xs text-gray-500 mt-1">Protocol: {result.details.https.protocol}</div>
            </div>
          )}

          {/* Phishing Keywords */}
          {result.details.keywords && (
            <div className="bg-cyber-darker/50 p-4 rounded-lg border border-cyber-blue/10 hover:border-cyber-blue/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm font-semibold">🎯 Phishing Keywords</span>
                <span className="text-2xl">{result.details.keywords.icon}</span>
              </div>
              <div className="text-white font-semibold">{result.details.keywords.status}</div>
              <div className="text-xs text-gray-500 mt-1">
                {result.details.keywords.count > 0 ? 
                  `Found: ${result.details.keywords.keywords.join(', ')}` : 
                  'No suspicious keywords detected'}
              </div>
            </div>
          )}

          {/* Domain Analysis */}
          {result.details.domain && (
            <div className="bg-cyber-darker/50 p-4 rounded-lg border border-cyber-blue/10 hover:border-cyber-blue/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm font-semibold">🌐 Domain Structure</span>
                <span className="text-2xl">{result.details.domain.icon}</span>
              </div>
              <div className="text-white font-semibold">{result.details.domain.status}</div>
              <div className="text-xs text-gray-500 mt-1">
                Subdomains: {result.details.domain.subdomainCount} | TLD: {result.details.domain.tld}
              </div>
            </div>
          )}

          {/* IP Address Check */}
          {result.details.ipAddress && (
            <div className="bg-cyber-darker/50 p-4 rounded-lg border border-cyber-blue/10 hover:border-cyber-blue/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm font-semibold">📍 IP Address</span>
                <span className="text-2xl">{result.details.ipAddress.icon}</span>
              </div>
              <div className="text-white font-semibold">{result.details.ipAddress.status}</div>
              <div className="text-xs text-gray-500 mt-1">
                {result.details.ipAddress.isIPAddress ? 'Uses IP instead of domain' : 'Proper domain name'}
              </div>
            </div>
          )}

          {/* URL Length */}
          {result.details.urlLength && (
            <div className="bg-cyber-darker/50 p-4 rounded-lg border border-cyber-blue/10 hover:border-cyber-blue/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm font-semibold">📏 URL Length</span>
                <span className="text-2xl">{result.details.urlLength.icon}</span>
              </div>
              <div className="text-white font-semibold">{result.details.urlLength.status}</div>
              <div className="text-xs text-gray-500 mt-1">{result.details.urlLength.length} characters</div>
            </div>
          )}

          {/* Special Characters */}
          {result.details.specialChars && (
            <div className="bg-cyber-darker/50 p-4 rounded-lg border border-cyber-blue/10 hover:border-cyber-blue/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm font-semibold">🔣 Special Characters</span>
                <span className="text-2xl">{result.details.specialChars.icon}</span>
              </div>
              <div className="text-white font-semibold">{result.details.specialChars.status}</div>
              <div className="text-xs text-gray-500 mt-1">
                {result.details.specialChars.count > 0 ? 
                  `Found: ${result.details.specialChars.characters.join(', ')}` : 
                  'No suspicious characters'}
              </div>
            </div>
          )}

          {/* Blacklist Status */}
          {result.details.blacklist && (
            <div className="bg-cyber-darker/50 p-4 rounded-lg border border-cyber-blue/10 hover:border-cyber-blue/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm font-semibold">🛡️ Blacklist Check</span>
                <span className="text-2xl">{result.details.blacklist.icon}</span>
              </div>
              <div className="text-white font-semibold">{result.details.blacklist.status}</div>
              <div className="text-xs text-gray-500 mt-1">
                {result.details.blacklist.isBlacklisted ? 'Found in threat database' : 'Not in blacklist'}
              </div>
            </div>
          )}

          {/* Domain Reputation */}
          {result.details.reputation && (
            <div className="bg-cyber-darker/50 p-4 rounded-lg border border-cyber-blue/10 hover:border-cyber-blue/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm font-semibold">⭐ Domain Reputation</span>
                <span className="text-2xl">{result.details.reputation.icon}</span>
              </div>
              <div className="text-white font-semibold">{result.details.reputation.status}</div>
              <div className="text-xs text-gray-500 mt-1">Age: {result.details.reputation.age}</div>
            </div>
          )}
        </div>
      </div>

      {/* Threats Detected */}
      {result.threats && result.threats.length > 0 && (
        <div className="cyber-card p-6 border-2 border-cyber-red/50">
          <h3 className="text-xl font-bold text-cyber-red mb-4 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Threats Detected ({result.threats.length})
          </h3>
          <div className="space-y-2">
            {result.threats.map((threat, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-cyber-red/10 border border-cyber-red/30 rounded-lg">
                <span className="text-cyber-red text-xl flex-shrink-0">⚠</span>
                <span className="text-gray-300 text-sm">{threat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onReset}
          className="flex-1 cyber-button bg-gradient-to-r from-cyber-blue to-cyber-purple text-white font-bold py-4 rounded-lg"
        >
          <span className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Analyze Another URL
          </span>
        </button>
        {result.classification !== 'MALICIOUS' && (
          <button
            onClick={() => window.open(result.url, '_blank', 'noopener,noreferrer')}
            className="flex-1 cyber-button bg-cyber-darker border-2 border-cyber-blue/50 text-white font-bold py-4 rounded-lg hover:bg-cyber-blue/10"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              {result.classification === 'SUSPICIOUS' ? 'Proceed with Caution' : 'Open Link'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ResultCard;