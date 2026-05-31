import React, { useState, useRef, useEffect, useCallback } from 'react';
import jsQR from 'jsqr';

const QRUpload = ({ onQRDecoded, isProcessing }) => {
  // Mode: 'select' | 'upload' | 'camera'
  const [mode, setMode] = useState('select');
  const [dragOver, setDragOver] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState('');
  const [cameraError, setCameraError] = useState('');
  const [scanning, setScanning] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);
  const detectedRef = useRef(false); // prevent double-fire

  // ─── Cleanup camera on unmount or mode change ───────────────────────────────
  const stopCamera = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setScanning(false);
    detectedRef.current = false;
  }, []);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  // ─── Start camera ────────────────────────────────────────────────────────────
  const startCamera = async () => {
    setError('');
    setCameraError('');
    detectedRef.current = false;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera not supported in this browser. Please use Chrome or Firefox.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });

      streamRef.current = stream;
      setScanning(true);
      setMode('camera');

      // Attach stream to video element after state update
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      }, 100);
    } catch (err) {
      console.error('Camera error:', err);
      if (err.name === 'NotAllowedError') {
        setCameraError('Camera permission denied. Please allow camera access in your browser settings.');
      } else if (err.name === 'NotFoundError') {
        setCameraError('No camera found on this device.');
      } else {
        setCameraError('Failed to access camera: ' + err.message);
      }
    }
  };

  // ─── Scan loop using requestAnimationFrame ───────────────────────────────────
  const scanFrame = useCallback(() => {
    if (detectedRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      animFrameRef.current = requestAnimationFrame(scanFrame);
      return;
    }

    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    });

    if (code && code.data) {
      detectedRef.current = true;
      stopCamera();

      const isUrl = /^https?:\/\//i.test(code.data);
      if (isUrl) {
        onQRDecoded(code.data);
      } else {
        setError(`QR code detected but contains text, not a URL: "${code.data}"`);
        setMode('select');
      }
      return;
    }

    animFrameRef.current = requestAnimationFrame(scanFrame);
  }, [onQRDecoded, stopCamera]);

  // Start scan loop once video is playing
  const handleVideoPlay = () => {
    animFrameRef.current = requestAnimationFrame(scanFrame);
  };

  // ─── File upload decode ───────────────────────────────────────────────────────
  const decodeQRFromFile = (imageFile) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'attemptBoth',
          });
          if (code) resolve(code.data);
          else reject(new Error('No QR code found in the image'));
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(imageFile);
    });

  const handleFileSelect = async (file) => {
    if (!file) return;

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (PNG, JPG, JPEG, WEBP)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setError('');
    setMode('upload');

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => setPreviewImage(e.target.result);
    reader.readAsDataURL(file);

    try {
      const decodedData = await decodeQRFromFile(file);
      const isUrl = /^https?:\/\//i.test(decodedData);
      if (isUrl) {
        onQRDecoded(decodedData);
      } else {
        setError(`QR code contains text, not a URL: "${decodedData}"`);
        setPreviewImage(null);
        setMode('select');
      }
    } catch (err) {
      setError(err.message || 'Failed to decode QR code.');
      setPreviewImage(null);
      setMode('select');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleReset = () => {
    stopCamera();
    setPreviewImage(null);
    setError('');
    setCameraError('');
    setMode('select');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ─── Render helpers ───────────────────────────────────────────────────────────
  const ScanCorners = () => (
    <div className="absolute inset-0 pointer-events-none">
      {/* Corner brackets */}
      <div className="absolute top-8 left-8 w-10 h-10 border-t-4 border-l-4 border-cyber-blue rounded-tl-lg" />
      <div className="absolute top-8 right-8 w-10 h-10 border-t-4 border-r-4 border-cyber-blue rounded-tr-lg" />
      <div className="absolute bottom-8 left-8 w-10 h-10 border-b-4 border-l-4 border-cyber-blue rounded-bl-lg" />
      <div className="absolute bottom-8 right-8 w-10 h-10 border-b-4 border-r-4 border-cyber-blue rounded-br-lg" />
      {/* Scanning line */}
      <div className="absolute left-8 right-8 h-0.5 bg-cyber-blue/80 shadow-lg animate-scan-line" style={{ top: '50%' }} />
    </div>
  );

  // ─── UI ───────────────────────────────────────────────────────────────────────
  return (
    <div className="cyber-card p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-block p-4 bg-cyber-purple/10 rounded-full mb-4">
          <svg className="w-14 h-14 text-cyber-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">QR Code Scanner</h2>
        <p className="text-gray-400">Upload an image or use your camera to scan a QR code</p>
      </div>

      {/* ── Mode: SELECT ─────────────────────────────────────────────────────── */}
      {mode === 'select' && (
        <>
          {/* Two big action buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Upload button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="group flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed border-cyber-purple/40 bg-cyber-purple/5 hover:border-cyber-purple hover:bg-cyber-purple/10 transition-all disabled:opacity-50"
            >
              <svg className="w-12 h-12 text-cyber-purple group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div>
                <p className="text-white font-semibold text-lg">Upload Image</p>
                <p className="text-gray-400 text-sm mt-1">PNG, JPG, WEBP · Max 5MB</p>
              </div>
            </button>

            {/* Camera button */}
            <button
              onClick={startCamera}
              disabled={isProcessing}
              className="group flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed border-cyber-blue/40 bg-cyber-blue/5 hover:border-cyber-blue hover:bg-cyber-blue/10 transition-all disabled:opacity-50"
            >
              <svg className="w-12 h-12 text-cyber-blue group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-white font-semibold text-lg">Use Camera</p>
                <p className="text-gray-400 text-sm mt-1">Live QR code scanning</p>
              </div>
            </button>
          </div>

          {/* Drag & drop zone */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
              dragOver
                ? 'border-cyber-purple bg-cyber-purple/10 scale-[1.02]'
                : 'border-gray-700 hover:border-cyber-purple/50 hover:bg-cyber-purple/5'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
            onClick={() => fileInputRef.current?.click()}
          >
            <p className="text-gray-400 text-sm">
              {dragOver ? '📂 Drop your QR image here' : '📂 Or drag & drop a QR image anywhere here'}
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            onChange={(e) => handleFileSelect(e.target.files[0])}
            disabled={isProcessing}
            className="hidden"
          />

          {/* Camera error */}
          {cameraError && (
            <div className="mt-4 bg-cyber-red/10 border border-cyber-red/30 rounded-lg p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-cyber-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-cyber-red font-semibold text-sm">Camera Error</p>
                <p className="text-gray-300 text-sm mt-1">{cameraError}</p>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Mode: CAMERA ─────────────────────────────────────────────────────── */}
      {mode === 'camera' && (
        <div className="space-y-4">
          {/* Camera viewport */}
          <div className="relative rounded-xl overflow-hidden bg-black border-2 border-cyber-blue/40" style={{ minHeight: 320 }}>
            <video
              ref={videoRef}
              onPlay={handleVideoPlay}
              muted
              playsInline
              className="w-full rounded-xl"
              style={{ display: 'block' }}
            />
            {/* Hidden canvas for frame capture */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Overlay corners + scan line */}
            {scanning && <ScanCorners />}

            {/* Status badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-cyber-blue animate-pulse" />
              <span className="text-cyber-blue text-xs font-semibold">
                {scanning ? 'Scanning for QR code...' : 'Starting camera...'}
              </span>
            </div>
          </div>

          {/* Stop button */}
          <button
            onClick={handleReset}
            className="w-full py-3 rounded-lg border-2 border-cyber-red/50 text-cyber-red font-semibold hover:bg-cyber-red/10 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
            </svg>
            Stop Camera
          </button>

          <p className="text-center text-gray-500 text-xs">
            Point your camera at a QR code — it will be detected automatically
          </p>
        </div>
      )}

      {/* ── Mode: UPLOAD (preview) ────────────────────────────────────────────── */}
      {mode === 'upload' && previewImage && (
        <div className="space-y-4">
          <div className="bg-cyber-darker/50 rounded-xl p-6 border border-cyber-purple/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">QR Code Preview</h3>
              <button onClick={handleReset} disabled={isProcessing} className="text-gray-400 hover:text-white transition-colors disabled:opacity-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex justify-center">
              <img src={previewImage} alt="QR Code" className="max-w-full max-h-64 rounded-lg border-2 border-cyber-purple/30" />
            </div>
          </div>

          {isProcessing && (
            <div className="bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-4 flex items-center gap-3">
              <svg className="animate-spin h-5 w-5 text-cyber-blue" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="text-cyber-blue font-semibold">Analyzing URL security...</span>
            </div>
          )}
        </div>
      )}

      {/* ── Error ─────────────────────────────────────────────────────────────── */}
      {error && (
        <div className="mt-4 bg-cyber-red/10 border border-cyber-red/30 rounded-lg p-4 flex items-start gap-3">
          <svg className="w-5 h-5 text-cyber-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <p className="text-cyber-red font-semibold">Error</p>
            <p className="text-gray-300 text-sm mt-1">{error}</p>
            <button onClick={handleReset} className="mt-2 text-xs text-cyber-blue hover:underline">Try again</button>
          </div>
        </div>
      )}

      {/* ── How it works (only on select screen) ─────────────────────────────── */}
      {mode === 'select' && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '📁', title: 'Upload Image', desc: 'Select a QR code image from your device' },
            { icon: '📷', title: 'Use Camera', desc: 'Point camera at QR code for live scanning' },
            { icon: '🔒', title: 'Auto Analyze', desc: 'URL is extracted and security-checked instantly' },
          ].map((step, i) => (
            <div key={i} className="text-center p-4 bg-cyber-darker/50 rounded-lg border border-cyber-purple/10">
              <div className="text-3xl mb-2">{step.icon}</div>
              <div className="text-sm font-semibold text-cyber-purple mb-1">{step.title}</div>
              <div className="text-xs text-gray-400">{step.desc}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QRUpload;
