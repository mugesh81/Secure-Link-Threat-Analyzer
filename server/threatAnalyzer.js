const URL = require('url-parse');

class ThreatAnalyzer {
  constructor() {
    // Phishing keywords
    this.phishingKeywords = [
      'login', 'verify', 'secure', 'update', 'account', 'bank', 'payment',
      'paypal', 'amazon', 'google', 'microsoft', 'apple', 'facebook',
      'urgent', 'suspended', 'confirm', 'validate', 'security', 'alert',
      'signin', 'password', 'credential', 'billing', 'wallet', 'support'
    ];

    // Suspicious TLDs
    this.suspiciousTLDs = [
      '.xyz', '.top', '.tk', '.ml', '.ga', '.cf', '.gq',
      '.ru', '.cn', '.pw', '.cc', '.info', '.click', '.link'
    ];

    // Known malicious domains (sample blacklist)
    this.blacklistedDomains = [
      'phishing-example.com',
      'fake-paypal.net',
      'amazon-security.xyz',
      'paypal-login-security.xyz'
    ];
  }

  async analyzeURL(urlString) {
    try {
      const analysis = {
        url: urlString,
        riskScore: 0,
        threats: [],
        classification: 'SAFE',
        details: {
          basic: {},
          https: {},
          keywords: {},
          domain: {},
          ipAddress: {},
          urlLength: {},
          specialChars: {},
          blacklist: {},
          reputation: {}
        }
      };

      // Parse URL
      const parsedUrl = new URL(urlString);
      
      // Basic Information
      analysis.details.basic = this.getBasicInfo(parsedUrl);

      // Check 1: HTTPS Verification
      const httpsCheck = this.checkHTTPS(parsedUrl);
      analysis.riskScore += httpsCheck.score;
      analysis.details.https = httpsCheck;
      if (httpsCheck.threat) analysis.threats.push(httpsCheck.threat);

      // Check 2: Phishing Keywords
      const keywordCheck = this.checkPhishingKeywords(urlString);
      analysis.riskScore += keywordCheck.score;
      analysis.details.keywords = keywordCheck;
      if (keywordCheck.threat) analysis.threats.push(keywordCheck.threat);

      // Check 3: Domain Analysis
      const domainCheck = this.analyzeDomain(parsedUrl);
      analysis.riskScore += domainCheck.score;
      analysis.details.domain = domainCheck;
      if (domainCheck.threat) analysis.threats.push(domainCheck.threat);

      // Check 4: IP Address Detection
      const ipCheck = this.checkIPAddress(parsedUrl);
      analysis.riskScore += ipCheck.score;
      analysis.details.ipAddress = ipCheck;
      if (ipCheck.threat) analysis.threats.push(ipCheck.threat);

      // Check 5: URL Length Analysis
      const lengthCheck = this.checkURLLength(urlString);
      analysis.riskScore += lengthCheck.score;
      analysis.details.urlLength = lengthCheck;
      if (lengthCheck.threat) analysis.threats.push(lengthCheck.threat);

      // Check 6: Special Characters
      const specialCharCheck = this.checkSpecialCharacters(urlString);
      analysis.riskScore += specialCharCheck.score;
      analysis.details.specialChars = specialCharCheck;
      if (specialCharCheck.threat) analysis.threats.push(specialCharCheck.threat);

      // Check 7: Blacklist Check
      const blacklistCheck = this.checkBlacklist(parsedUrl);
      analysis.riskScore += blacklistCheck.score;
      analysis.details.blacklist = blacklistCheck;
      if (blacklistCheck.threat) analysis.threats.push(blacklistCheck.threat);

      // Check 8: Domain Reputation
      const reputationCheck = this.checkDomainReputation(parsedUrl);
      analysis.details.reputation = reputationCheck;

      // Classify risk level
      analysis.classification = this.classifyRisk(analysis.riskScore);

      return analysis;
    } catch (error) {
      console.error('Error in URL analysis:', error);
      return {
        url: urlString,
        riskScore: 100,
        threats: ['Invalid URL format or parsing error'],
        classification: 'MALICIOUS',
        details: { error: 'Failed to parse URL' }
      };
    }
  }

  getBasicInfo(parsedUrl) {
    return {
      protocol: parsedUrl.protocol.replace(':', ''),
      hostname: parsedUrl.hostname,
      pathname: parsedUrl.pathname,
      fullUrl: parsedUrl.href
    };
  }

  checkHTTPS(parsedUrl) {
    const isHttps = parsedUrl.protocol === 'https:';
    return {
      secure: isHttps,
      protocol: parsedUrl.protocol.replace(':', '').toUpperCase(),
      score: isHttps ? 0 : 30,
      threat: isHttps ? null : 'Insecure HTTP connection detected',
      status: isHttps ? 'Secure' : 'Not Secure',
      icon: isHttps ? '✅' : '❌'
    };
  }

  checkPhishingKeywords(url) {
    const urlLower = url.toLowerCase();
    const foundKeywords = this.phishingKeywords.filter(keyword => 
      urlLower.includes(keyword)
    );
    
    const score = foundKeywords.length * 20;
    return {
      keywords: foundKeywords,
      count: foundKeywords.length,
      score: score,
      threat: foundKeywords.length > 0 ? 
        `Phishing keywords detected: ${foundKeywords.join(', ')}` : null,
      status: foundKeywords.length === 0 ? 'Clean' : 
              foundKeywords.length <= 2 ? 'Suspicious' : 'High Risk',
      icon: foundKeywords.length === 0 ? '✅' : 
            foundKeywords.length <= 2 ? '⚠️' : '❌'
    };
  }

  analyzeDomain(parsedUrl) {
    const hostname = parsedUrl.hostname;
    const parts = hostname.split('.');
    const subdomainCount = Math.max(0, parts.length - 2);
    
    // Check for suspicious TLD
    const hasSuspiciousTLD = this.suspiciousTLDs.some(tld => 
      hostname.endsWith(tld)
    );
    
    let score = 0;
    const threats = [];
    
    if (subdomainCount > 3) {
      score += 20;
      threats.push('Excessive subdomains detected');
    }
    
    if (hasSuspiciousTLD) {
      score += 25;
      threats.push('Suspicious domain extension');
    }

    const tld = '.' + parts[parts.length - 1];
    
    return {
      hostname: hostname,
      subdomainCount: subdomainCount,
      tld: tld,
      hasSuspiciousTLD: hasSuspiciousTLD,
      score: score,
      threat: threats.length > 0 ? threats.join(', ') : null,
      status: score === 0 ? 'Normal' : score < 30 ? 'Suspicious' : 'High Risk',
      icon: score === 0 ? '✅' : score < 30 ? '⚠️' : '❌'
    };
  }

  checkIPAddress(parsedUrl) {
    const hostname = parsedUrl.hostname;
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const isIPAddress = ipRegex.test(hostname);
    
    return {
      isIPAddress: isIPAddress,
      hostname: hostname,
      score: isIPAddress ? 40 : 0,
      threat: isIPAddress ? 'URL uses IP address instead of domain name' : null,
      status: isIPAddress ? 'Detected' : 'Not Detected',
      icon: isIPAddress ? '❌' : '✅'
    };
  }

  checkURLLength(url) {
    const length = url.length;
    let score = 0;
    let status = 'Normal';
    
    if (length > 150) {
      score = 25;
      status = 'Very Long';
    } else if (length > 100) {
      score = 15;
      status = 'Long';
    }
    
    return {
      length: length,
      score: score,
      threat: score > 0 ? 'Unusually long URL detected' : null,
      status: status,
      icon: score === 0 ? '✅' : score < 20 ? '⚠️' : '❌'
    };
  }

  checkSpecialCharacters(url) {
    const suspiciousChars = ['@', '%20', '%', '-', '_'];
    const foundChars = suspiciousChars.filter(char => url.includes(char));
    
    const score = foundChars.length > 3 ? 15 : 0;
    
    return {
      characters: foundChars,
      count: foundChars.length,
      score: score,
      threat: score > 0 ? 'Multiple suspicious characters detected' : null,
      status: foundChars.length === 0 ? 'Clean' : 
              foundChars.length <= 3 ? 'Normal' : 'Suspicious',
      icon: foundChars.length <= 3 ? '✅' : '⚠️'
    };
  }

  checkBlacklist(parsedUrl) {
    const hostname = parsedUrl.hostname;
    const isBlacklisted = this.blacklistedDomains.some(domain => 
      hostname.includes(domain)
    );
    
    return {
      isBlacklisted: isBlacklisted,
      hostname: hostname,
      score: isBlacklisted ? 100 : 0,
      threat: isBlacklisted ? 'Domain found in phishing blacklist' : null,
      status: isBlacklisted ? 'Blacklisted' : 'Clean',
      icon: isBlacklisted ? '❌' : '✅'
    };
  }

  checkDomainReputation(parsedUrl) {
    // Simulated domain reputation check
    const hostname = parsedUrl.hostname;
    const wellKnownDomains = [
      'google.com', 'facebook.com', 'amazon.com', 'microsoft.com',
      'apple.com', 'github.com', 'stackoverflow.com', 'wikipedia.org'
    ];
    
    const isWellKnown = wellKnownDomains.some(domain => 
      hostname.includes(domain)
    );
    
    return {
      isWellKnown: isWellKnown,
      status: isWellKnown ? 'Trusted' : 'Unknown',
      age: isWellKnown ? 'Established' : 'Unknown',
      icon: isWellKnown ? '✅' : '⚠️'
    };
  }

  classifyRisk(score) {
    if (score >= 61) return 'MALICIOUS';
    if (score >= 31) return 'SUSPICIOUS';
    return 'SAFE';
  }
}

module.exports = new ThreatAnalyzer();