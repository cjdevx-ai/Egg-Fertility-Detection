// Particle System for OvoScan AI
const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
const ctx = canvas?.getContext('2d');

if (canvas && ctx) {
    let particles: Particle[] = [];
    const particleCount = 65;

    class Particle {
        x: number = 0; y: number = 0; size: number = 0;
        speedX: number = 0; speedY: number = 0; opacity: number = 0;
        type: number = 0; pulse: number = 0; pulseSpeed: number = 0;

        constructor() { this.init(); }
        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 20 + 5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.2 + 0.1;
            this.type = Math.floor(Math.random() * 3);
            this.pulse = Math.random() * Math.PI;
            this.pulseSpeed = Math.random() * 0.02 + 0.005;
        }
        update() {
            this.x += this.speedX; this.y += this.speedY; this.pulse += this.pulseSpeed;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            if (!ctx) return;
            const currentOpacity = this.opacity * (Math.sin(this.pulse) * 0.5 + 0.5);
            ctx.save(); ctx.translate(this.x, this.y);
            if (this.type === 0) {
                const g = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
                g.addColorStop(0, `rgba(6, 182, 212, ${currentOpacity})`);
                g.addColorStop(1, `rgba(168, 85, 247, 0)`);
                ctx.fillStyle = g; ctx.scale(1, 1.3); ctx.beginPath(); ctx.arc(0, 0, this.size, 0, Math.PI * 2); ctx.fill();
            } else if (this.type === 1) {
                ctx.strokeStyle = `rgba(168, 85, 247, ${currentOpacity})`;
                ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(0, 0, this.size, 0, Math.PI * 2); ctx.stroke();
                ctx.fillStyle = `rgba(6, 182, 212, ${currentOpacity * 0.5})`;
                ctx.beginPath(); ctx.arc(0, 0, this.size * 0.2, 0, Math.PI * 2); ctx.fill();
            } else {
                const g = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 0.5);
                g.addColorStop(0, `rgba(6, 182, 212, ${currentOpacity})`);
                g.addColorStop(1, 'transparent');
                ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, this.size * 0.5, 0, Math.PI * 2); ctx.fill();
            }
            ctx.restore();
        }
    }

    const resize = () => {
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        particles = Array.from({length: particleCount}, () => new Particle());
    };
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    };
    window.addEventListener('resize', resize); resize(); animate();
}

// Backend Configuration
const BACKEND_URL = 'http://localhost:8888';

const setupDemo = () => {
    const demoButton = Array.from(document.querySelectorAll('button')).find(b => 
        b.textContent?.trim().includes('Experience the Demo')
    );
    const productContainer = document.querySelector('.animate-float > div') as HTMLElement;
    if (demoButton && productContainer) {
        demoButton.addEventListener('click', () => showModeSelection(productContainer));
    }
};

const showModeSelection = (container: HTMLElement) => {
    container.innerHTML = `
        <div class="p-8 flex flex-col items-center justify-center h-full gap-8 text-center">
            <div class="space-y-2">
                <h3 class="text-3xl font-display font-bold">Try OvoScan AI</h3>
                <p class="text-slate-400 text-sm">Select detection environment</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
                <button id="mode-live" class="glass border-cyan-500/20 hover:bg-cyan-500/10 p-6 rounded-3xl flex flex-col items-center gap-4 transition-all hover:scale-105 group">
                    <div class="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/30"><iconify-icon icon="lucide:video" class="text-cyan-500 text-3xl"></iconify-icon></div>
                    <div class="font-bold text-white">Live AI Scan</div>
                </button>
                <button id="mode-upload" class="glass border-purple-500/20 hover:bg-purple-500/10 p-6 rounded-3xl flex flex-col items-center gap-4 transition-all hover:scale-105 group">
                    <div class="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30"><iconify-icon icon="lucide:upload-cloud" class="text-purple-500 text-3xl"></iconify-icon></div>
                    <div class="font-bold text-white">Image Test</div>
                </button>
            </div>
            <button onclick="location.reload()" class="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest">Back</button>
        </div>
    `;
    document.getElementById('mode-live')?.addEventListener('click', () => showCameraSelection(container));
    document.getElementById('mode-upload')?.addEventListener('click', () => showImageUpload(container));
};

const showCameraSelection = async (container: HTMLElement) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(d => d.kind === 'videoinput');
        stream.getTracks().forEach(t => t.stop()); // Stop preview stream

        container.innerHTML = `
            <div class="p-8 flex flex-col items-center justify-center h-full gap-6 text-center">
                <iconify-icon icon="lucide:camera" class="text-6xl text-cyan-500 mb-2"></iconify-icon>
                <h3 class="text-2xl font-bold">Select Camera</h3>
                <select id="camera-select" class="w-full max-w-xs bg-navy-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500">
                    ${videoDevices.map(d => `<option value="${d.deviceId}">${d.label || `Camera ${videoDevices.indexOf(d) + 1}`}</option>`).join('')}
                </select>
                <div class="flex gap-4">
                    <button id="back-to-mode" class="glass px-6 py-3 rounded-xl font-bold">Back</button>
                    <button id="start-scan" class="bg-cyan-500 text-navy-950 px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all">Start Scan</button>
                </div>
            </div>
        `;
        document.getElementById('back-to-mode')?.addEventListener('click', () => showModeSelection(container));
        document.getElementById('start-scan')?.addEventListener('click', () => {
            const id = (document.getElementById('camera-select') as HTMLSelectElement).value;
            startLiveAI(id, container);
        });
    } catch (e) { alert('Camera access denied.'); showModeSelection(container); }
};

const startLiveAI = async (deviceId: string, container: HTMLElement) => {
    container.innerHTML = `
        <div class="relative w-full h-full flex items-center justify-center overflow-hidden rounded-[3rem] bg-black">
            <video id="hidden-video" class="hidden" autoplay playsinline></video>
            <img id="ai-view" class="max-w-full max-h-full object-contain" />
            <div class="scan-line"></div>
            
            <!-- Live Status -->
            <div class="absolute top-6 left-6 glass rounded-2xl px-4 py-2 flex items-center gap-2 border-cyan-500/30">
                <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span class="text-xs font-bold text-white uppercase tracking-widest">AI Live</span>
            </div>

            <!-- Stats Panel -->
            <div class="absolute bottom-6 right-6 flex flex-col gap-3">
                <div id="stats-fertile" class="glass glass-cyan rounded-2xl p-3 flex items-center gap-3 border-cyan-500/20 w-40">
                    <div class="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <iconify-icon icon="lucide:check" class="text-cyan-500"></iconify-icon>
                    </div>
                    <div>
                        <div class="text-[10px] text-slate-400 font-bold uppercase">Fertile</div>
                        <div id="count-fertile" class="text-lg font-bold text-white">0</div>
                    </div>
                </div>
                <div id="stats-infertile" class="glass rounded-2xl p-3 flex items-center gap-3 border-purple-500/20 w-40">
                    <div class="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <iconify-icon icon="lucide:x" class="text-purple-500"></iconify-icon>
                    </div>
                    <div>
                        <div class="text-[10px] text-slate-400 font-bold uppercase">Infertile</div>
                        <div id="count-infertile" class="text-lg font-bold text-white">0</div>
                    </div>
                </div>
            </div>

            <button id="stop-scan" class="absolute bottom-6 left-6 glass px-4 py-2 rounded-xl text-xs font-bold text-white hover:bg-white/10 transition-colors">Exit Scan</button>
        </div>
    `;

    const video = document.getElementById('hidden-video') as HTMLVideoElement;
    const aiImg = document.getElementById('ai-view') as HTMLImageElement;
    const fertileEl = document.getElementById('count-fertile');
    const infertileEl = document.getElementById('count-infertile');
    
    const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { deviceId: { exact: deviceId }, width: 640, height: 640 } 
    });
    video.srcObject = stream;

    const captureCanvas = document.createElement('canvas');
    const captureCtx = captureCanvas.getContext('2d');
    let isRunning = true;

    document.getElementById('stop-scan')?.addEventListener('click', () => {
        isRunning = false;
        stream.getTracks().forEach(t => t.stop());
        showModeSelection(container);
    });

    const processLoop = async () => {
        if (!isRunning || !stream.active) return;
        
        if (video.videoWidth > 0) {
            captureCanvas.width = video.videoWidth;
            captureCanvas.height = video.videoHeight;
            captureCtx?.drawImage(video, 0, 0);
            
            captureCanvas.toBlob(async (blob) => {
                if (!blob || !isRunning) return;
                const fd = new FormData(); fd.append('file', blob);
                try {
                    const res = await fetch(`${BACKEND_URL}/predict?conf=0.1`, { method: 'POST', body: fd });
                    const data = await res.json();
                    if (data.image && isRunning) {
                        aiImg.src = data.image;
                        
                        // Update counters
                        const fertileCount = data.predictions.filter((p: any) => p.class === 0).length;
                        const infertileCount = data.predictions.filter((p: any) => p.class === 1).length;
                        if (fertileEl) fertileEl.textContent = fertileCount.toString();
                        if (infertileEl) infertileEl.textContent = infertileCount.toString();
                    }
                } catch (e) { console.error('AI Link lost'); }
                
                if (isRunning) setTimeout(processLoop, 50); // ~20 FPS target
            }, 'image/jpeg', 0.6);
        } else {
            requestAnimationFrame(processLoop);
        }
    };
    video.onloadedmetadata = () => processLoop();
};

const showImageUpload = (container: HTMLElement) => {
    container.innerHTML = `
        <div class="p-8 flex flex-col items-center justify-center h-full gap-6 text-center">
            <div id="drop-zone" class="w-full h-64 border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:border-purple-500/50 bg-white/5 cursor-pointer group transition-all">
                <iconify-icon icon="lucide:image-plus" class="text-5xl text-purple-500 group-hover:scale-110 transition-transform"></iconify-icon>
                <div class="font-bold text-lg text-white">Upload Image</div>
                <input type="file" id="file-input" class="hidden" accept="image/*">
            </div>
            <button id="back-to-mode-2" class="glass px-6 py-3 rounded-xl font-bold">Back</button>
        </div>
    `;
    const dz = document.getElementById('drop-zone');
    const fi = document.getElementById('file-input') as HTMLInputElement;
    dz?.addEventListener('click', () => fi.click());
    fi.addEventListener('change', (e: any) => { if(e.target.files[0]) runStaticAI(e.target.files[0], container); });
    document.getElementById('back-to-mode-2')?.addEventListener('click', () => showModeSelection(container));
};

const runStaticAI = async (file: File, container: HTMLElement) => {
    container.innerHTML = `
        <div class="relative w-full h-full flex items-center justify-center overflow-hidden rounded-[3rem] bg-navy-950/20">
            <img id="static-ai-view" class="max-w-full max-h-full object-contain" />
            <div class="scan-line"></div>
            <div id="load" class="absolute inset-0 bg-navy-950/80 flex items-center justify-center text-purple-400 font-bold tracking-widest animate-pulse">ANALYZING...</div>
            
            <!-- Stats Panel -->
            <div id="results-panel" class="absolute bottom-6 right-6 hidden flex flex-col gap-3">
                <div class="glass glass-cyan rounded-2xl p-3 flex items-center gap-3 border-cyan-500/20 w-40">
                    <div class="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <iconify-icon icon="lucide:check" class="text-cyan-500"></iconify-icon>
                    </div>
                    <div>
                        <div class="text-[10px] text-slate-400 font-bold uppercase">Fertile</div>
                        <div id="static-count-fertile" class="text-lg font-bold text-white">0</div>
                    </div>
                </div>
                <div class="glass rounded-2xl p-3 flex items-center gap-3 border-purple-500/20 w-40">
                    <div class="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <iconify-icon icon="lucide:x" class="text-purple-500"></iconify-icon>
                    </div>
                    <div>
                        <div class="text-[10px] text-slate-400 font-bold uppercase">Infertile</div>
                        <div id="static-count-infertile" class="text-lg font-bold text-white">0</div>
                    </div>
                </div>
            </div>

            <button id="retry" class="absolute bottom-6 left-6 glass px-4 py-2 rounded-xl text-xs font-bold text-white">New Image</button>
        </div>
    `;
    document.getElementById('retry')?.addEventListener('click', () => showImageUpload(container));
    
    const fd = new FormData(); fd.append('file', file);
    try {
        const res = await fetch(`${BACKEND_URL}/predict?conf=0.1`, { method: 'POST', body: fd });
        const data = await res.json();
        document.getElementById('load')?.remove();
        if (data.image) {
            (document.getElementById('static-ai-view') as HTMLImageElement).src = data.image;
            document.getElementById('results-panel')?.classList.remove('hidden');
            
            const fertileCount = data.predictions.filter((p: any) => p.class === 0).length;
            const infertileCount = data.predictions.filter((p: any) => p.class === 1).length;
            (document.getElementById('static-count-fertile') as HTMLElement).textContent = fertileCount.toString();
            (document.getElementById('static-count-infertile') as HTMLElement).textContent = infertileCount.toString();
        }
    } catch (e) { alert('Backend error.'); showImageUpload(container); }
};

setupDemo();
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (this: HTMLAnchorElement, e: Event) {
        e.preventDefault(); const href = this.getAttribute('href');
        if (href) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    });
});
