import React, { useState, useRef, useEffect } from 'react';

const BACKEND_URL = '';

type Mode = 'idle' | 'select' | 'live' | 'upload';

const DemoMode: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<Mode>('select');
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [aiImage, setAiImage] = useState<string | null>(null);
  const [counts, setCounts] = useState({ fertile: 0, infertile: 0 });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));

  useEffect(() => {
    if (mode === 'live' && !isScanning) {
      const getDevices = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          const devices = await navigator.mediaDevices.enumerateDevices();
          const vds = devices.filter((d) => d.kind === 'videoinput');
          setVideoDevices(vds);
          if (vds.length > 0) setSelectedDeviceId(vds[0].deviceId);
          stream.getTracks().forEach((t) => t.stop());
        } catch (e) {
          alert('Camera access denied.');
          setMode('select');
        }
      };
      getDevices();
    }
  }, [mode, isScanning]);

  const startLiveAI = async () => {
    setIsScanning(true);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: { exact: selectedDeviceId }, width: 640, height: 640 },
    });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => processLoop(stream);
    }
  };

  const processLoop = async (stream: MediaStream) => {
    if (!stream.active) return;

    const video = videoRef.current;
    if (video && video.videoWidth > 0) {
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);

      canvas.toBlob(
        async (blob) => {
          if (!blob || !stream.active) return;
          const fd = new FormData();
          fd.append('file', blob);
          try {
            const res = await fetch(`${BACKEND_URL}/api/predict?conf=0.1`, { method: 'POST', body: fd });
            const data = await res.json();
            if (data.image) {
              setAiImage(data.image);
              const fertile = data.predictions.filter((p: any) => p.class === 0).length;
              const infertile = data.predictions.filter((p: any) => p.class === 1).length;
              setCounts({ fertile, infertile });
            }
          } catch (e) {
            console.error('AI Link lost');
          }
          if (stream.active) setTimeout(() => processLoop(stream), 50);
        },
        'image/jpeg',
        0.6
      );
    } else {
      requestAnimationFrame(() => processLoop(stream));
    }
  };

  const stopLiveAI = () => {
    setIsScanning(false);
    setAiImage(null);
    setCounts({ fertile: 0, infertile: 0 });
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach((t) => t.stop());
    }
    setMode('select');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setAiImage(null);
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch(`${BACKEND_URL}/api/predict?conf=0.1`, { method: 'POST', body: fd });
      const data = await res.json();
      setIsAnalyzing(false);
      if (data.image) {
        setAiImage(data.image);
        const fertile = data.predictions.filter((p: any) => p.class === 0).length;
        const infertile = data.predictions.filter((p: any) => p.class === 1).length;
        setCounts({ fertile, infertile });
      }
    } catch (e) {
      alert('Backend error.');
      setIsAnalyzing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-navy-950/90 backdrop-blur-md">
      <div className="relative w-full max-w-2xl aspect-square glass-card rounded-[3rem] overflow-hidden border-primary/20 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 -z-10"></div>
        
        <button onClick={onClose} className="absolute top-6 right-6 z-50 glass-card p-3 rounded-full hover:bg-white/10 transition-colors border-white/10 group">
          <iconify-icon icon="lucide:x" class="text-white text-xl block group-hover:scale-110 transition-transform"></iconify-icon>
        </button>

        {mode === 'select' && (
          <div className="p-12 flex flex-col items-center justify-center h-full gap-10 text-center">
            <div className="space-y-4">
              <h3 className="text-4xl font-heading font-bold text-white">Experience <span className="text-primary">OvoScan AI</span></h3>
              <p className="text-slate-400 max-w-md mx-auto">Select your preferred detection environment to begin the diagnostic preview.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg">
              <button
                onClick={() => setMode('live')}
                className="glass-card border-primary/20 hover:bg-primary/10 p-8 rounded-[2rem] flex flex-col items-center gap-6 transition-all hover:-translate-y-2 group shadow-lg"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <iconify-icon icon="lucide:video" class="text-primary text-3xl"></iconify-icon>
                </div>
                <div className="font-heading font-bold text-white text-lg tracking-tight">Live AI Scan</div>
              </button>
              <button
                onClick={() => setMode('upload')}
                className="glass-card border-secondary/20 hover:bg-secondary/10 p-8 rounded-[2rem] flex flex-col items-center gap-6 transition-all hover:-translate-y-2 group shadow-lg"
              >
                <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <iconify-icon icon="lucide:upload-cloud" class="text-secondary text-3xl"></iconify-icon>
                </div>
                <div className="font-heading font-bold text-white text-lg tracking-tight">Image Test</div>
              </button>
            </div>
          </div>
        )}

        {mode === 'live' && !isScanning && (
          <div className="p-12 flex flex-col items-center justify-center h-full gap-8 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <iconify-icon icon="lucide:camera" class="text-primary text-4xl"></iconify-icon>
            </div>
            <h3 className="text-3xl font-heading font-bold text-white">Select Capture Device</h3>
            <select
              value={selectedDeviceId}
              onChange={(e) => setSelectedDeviceId(e.target.value)}
              className="w-full max-w-xs bg-navy-950 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary shadow-xl appearance-none cursor-pointer"
            >
              {videoDevices.map((d, i) => (
                <option key={d.deviceId} value={d.deviceId}>
                  {d.label || `Camera ${i + 1}`}
                </option>
              ))}
            </select>
            <div className="flex gap-4">
              <button onClick={() => setMode('select')} className="glass-card px-8 py-4 rounded-2xl font-bold hover:bg-white/5 transition-colors">
                Back
              </button>
              <button
                onClick={startLiveAI}
                className="bg-primary text-navy-950 px-10 py-4 rounded-2xl font-bold shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-105 transition-all"
              >
                Start Diagnostic
              </button>
            </div>
          </div>
        )}

        {mode === 'live' && isScanning && (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/40 backdrop-blur-sm">
            <video ref={videoRef} className="hidden" autoPlay playsInline></video>
            {aiImage && <img src={aiImage} className="max-w-full max-h-full object-contain" alt="AI View" />}
            
            {/* Scanning Line */}
            <div className="absolute inset-x-0 h-1 bg-primary/50 shadow-[0_0_20px_#06b6d4] z-10 animate-scan"></div>

            <div className="absolute top-8 left-8 glass-card rounded-2xl px-5 py-2.5 flex items-center gap-3 border-primary/30 shadow-2xl">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-[0.2em]">Diagnostic Live</span>
            </div>

            <div className="absolute bottom-8 right-8 flex flex-col gap-4">
              <div className="glass-card rounded-[1.5rem] p-4 flex items-center gap-4 border-primary/20 w-48 shadow-2xl">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <iconify-icon icon="lucide:check" class="text-emerald-500 text-xl"></iconify-icon>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fertile</div>
                  <div className="text-xl font-heading font-bold text-white">{counts.fertile}</div>
                </div>
              </div>
              <div className="glass-card rounded-[1.5rem] p-4 flex items-center gap-4 border-secondary/20 w-48 shadow-2xl">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <iconify-icon icon="lucide:x" class="text-red-500 text-xl"></iconify-icon>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Infertile</div>
                  <div className="text-xl font-heading font-bold text-white">{counts.infertile}</div>
                </div>
              </div>
            </div>

            <button
              onClick={stopLiveAI}
              className="absolute bottom-8 left-8 glass-card px-6 py-3 rounded-2xl text-xs font-bold text-white hover:bg-white/10 transition-colors border-white/10 shadow-2xl"
            >
              Terminate Scan
            </button>
          </div>
        )}

        {mode === 'upload' && !aiImage && !isAnalyzing && (
          <div className="p-12 flex flex-col items-center justify-center h-full gap-8 text-center">
            <label className="w-full h-72 border-2 border-dashed border-white/10 rounded-[3rem] flex flex-col items-center justify-center gap-6 hover:border-secondary/50 bg-white/5 cursor-pointer group transition-all hover:bg-secondary/5 shadow-inner">
              <div className="w-20 h-20 rounded-3xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <iconify-icon icon="lucide:image-plus" class="text-secondary text-4xl"></iconify-icon>
              </div>
              <div className="space-y-2">
                <div className="font-heading font-bold text-xl text-white">Upload Specimen Image</div>
                <p className="text-slate-500 text-sm">PNG, JPG or WEBP up to 10MB</p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </label>
            <button onClick={() => setMode('select')} className="glass-card px-8 py-4 rounded-2xl font-bold hover:bg-white/5 transition-colors">
              Back
            </button>
          </div>
        )}

        {mode === 'upload' && (isAnalyzing || aiImage) && (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-navy-950/40 backdrop-blur-sm">
            {aiImage && <img src={aiImage} className="max-w-full max-h-full object-contain" alt="Static AI View" />}
            
            {/* Scanning Line */}
            <div className="absolute inset-x-0 h-1 bg-secondary/50 shadow-[0_0_20px_#a855f7] z-10 animate-scan"></div>

            {isAnalyzing && (
              <div className="absolute inset-0 bg-navy-950/80 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin"></div>
                <div className="text-secondary font-heading font-bold tracking-[0.3em] uppercase animate-pulse">
                  Neural Analysis...
                </div>
              </div>
            )}

            {aiImage && (
              <div className="absolute bottom-8 right-8 flex flex-col gap-4">
                <div className="glass-card rounded-[1.5rem] p-4 flex items-center gap-4 border-primary/20 w-48 shadow-2xl">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <iconify-icon icon="lucide:check" class="text-emerald-500 text-xl"></iconify-icon>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fertile</div>
                    <div className="text-xl font-heading font-bold text-white">{counts.fertile}</div>
                  </div>
                </div>
                <div className="glass-card rounded-[1.5rem] p-4 flex items-center gap-4 border-secondary/20 w-48 shadow-2xl">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <iconify-icon icon="lucide:x" class="text-red-500 text-xl"></iconify-icon>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Infertile</div>
                    <div className="text-xl font-heading font-bold text-white">{counts.infertile}</div>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setAiImage(null);
                setIsAnalyzing(false);
              }}
              className="absolute bottom-8 left-8 glass-card px-8 py-3 rounded-2xl text-xs font-bold text-white hover:bg-white/10 transition-colors border-white/10 shadow-2xl"
            >
              New Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoMode;
