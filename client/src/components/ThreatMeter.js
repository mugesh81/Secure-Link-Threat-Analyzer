import React from 'react';

const ThreatMeter = ({ score, classification }) => {
  const getGradient = () => {
    if (score <= 30) return 'from-cyber-green to-emerald-400';
    if (score <= 60) return 'from-cyber-yellow to-amber-400';
    return 'from-cyber-red to-rose-600';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>Threat Level</span>
        <span className="font-semibold">{classification}</span>
      </div>
      
      {/* Threat Meter Bar */}
      <div className="relative h-8 bg-cyber-darker rounded-full overflow-hidden border border-cyber-blue/20">
        <div 
          className={`h-full bg-gradient-to-r ${getGradient()} transition-all duration-1000 ease-out flex items-center justify-end pr-3`}
          style={{ width: `${score}%` }}
        >
          <span className="text-white text-xs font-bold drop-shadow-lg">{score}%</span>
        </div>
      </div>

      {/* Risk Categories */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className={`p-2 rounded-lg text-center ${score <= 30 ? 'bg-cyber-green/20 border-2 border-cyber-green' : 'bg-cyber-darker/50 border border-cyber-green/20'}`}>
          <div className="font-semibold text-cyber-green">SAFE</div>
          <div className="text-gray-400">0-30</div>
        </div>
        <div className={`p-2 rounded-lg text-center ${score > 30 && score <= 60 ? 'bg-cyber-yellow/20 border-2 border-cyber-yellow' : 'bg-cyber-darker/50 border border-cyber-yellow/20'}`}>
          <div className="font-semibold text-cyber-yellow">SUSPICIOUS</div>
          <div className="text-gray-400">31-60</div>
        </div>
        <div className={`p-2 rounded-lg text-center ${score > 60 ? 'bg-cyber-red/20 border-2 border-cyber-red' : 'bg-cyber-darker/50 border border-cyber-red/20'}`}>
          <div className="font-semibold text-cyber-red">MALICIOUS</div>
          <div className="text-gray-400">61-100</div>
        </div>
      </div>
    </div>
  );
};

export default ThreatMeter;