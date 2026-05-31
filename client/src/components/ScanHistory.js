import React from 'react';

const ScanHistory = ({ history }) => {
  const getRiskColor = (classification) => {
    switch (classification) {
      case 'SAFE': return 'text-cyber-green';
      case 'SUSPICIOUS': return 'text-cyber-yellow';
      case 'MALICIOUS': return 'text-cyber-red';
      default: return 'text-gray-500';
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

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="cyber-card p-6 sticky top-24">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <svg className="w-6 h-6 mr-2 text-cyber-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Recent Scans
      </h3>

      {history.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-gray-400 text-sm">No scans yet</p>
          <p className="text-gray-500 text-xs mt-1">Your scan history will appear here</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
          {history.map((item, index) => (
            <div 
              key={index}
              className="bg-cyber-darker/50 p-3 rounded-lg border border-cyber-blue/10 hover:border-cyber-blue/30 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getRiskIcon(item.classification)}</span>
                  {item.source === 'qr' && (
                    <span className="text-xs bg-cyber-purple/20 text-cyber-purple px-2 py-0.5 rounded-full border border-cyber-purple/30">
                      QR
                    </span>
                  )}
                </div>
                <span className={`text-xs font-semibold ${getRiskColor(item.classification)}`}>
                  {item.classification}
                </span>
              </div>
              <div className="text-xs text-gray-300 truncate mb-1 group-hover:text-white transition-colors">
                {item.url}
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">{formatTime(item.timestamp)}</span>
                <span className={`font-semibold ${getRiskColor(item.classification)}`}>
                  {item.riskScore}/100
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {history.length > 0 && (
        <div className="mt-4 pt-4 border-t border-cyber-blue/20">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-cyber-green/10 p-2 rounded-lg border border-cyber-green/20">
              <div className="text-cyber-green font-bold">
                {history.filter(h => h.classification === 'SAFE').length}
              </div>
              <div className="text-gray-400">Safe</div>
            </div>
            <div className="bg-cyber-yellow/10 p-2 rounded-lg border border-cyber-yellow/20">
              <div className="text-cyber-yellow font-bold">
                {history.filter(h => h.classification === 'SUSPICIOUS').length}
              </div>
              <div className="text-gray-400">Suspicious</div>
            </div>
            <div className="bg-cyber-red/10 p-2 rounded-lg border border-cyber-red/20">
              <div className="text-cyber-red font-bold">
                {history.filter(h => h.classification === 'MALICIOUS').length}
              </div>
              <div className="text-gray-400">Malicious</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanHistory;