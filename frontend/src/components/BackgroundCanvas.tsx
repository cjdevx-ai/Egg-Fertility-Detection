import React, { useEffect, useRef } from 'react';

const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      type: 'embryo' | 'cell' | 'particle';
      opacity: number;
      pulseSpeed: number;
      pulsePhase: number;
      color: string;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 20 + 5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.2 + 0.2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
        
        const types: ('embryo' | 'cell' | 'particle')[] = ['embryo', 'cell', 'particle'];
        this.type = types[Math.floor(Math.random() * types.length)];
        
        if (this.type === 'embryo') this.color = '#06b6d4';
        else if (this.type === 'cell') this.color = '#6366f1';
        else this.color = '#a855f7';
      }

      update(width: number, height: number) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.pulsePhase += this.pulseSpeed;

        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const currentOpacity = this.opacity * (0.8 + Math.sin(this.pulsePhase) * 0.2);
        ctx.save();
        ctx.globalAlpha = currentOpacity;
        ctx.translate(this.x, this.y);

        if (this.type === 'embryo') {
          // Gradient ellipse
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
          grad.addColorStop(0, '#06b6d4');
          grad.addColorStop(1, '#a855f7');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size, this.size * 0.6, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
          // Glow
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#06b6d4';
        } else if (this.type === 'cell') {
          // Circle with nucleus
          ctx.fillStyle = '#6366f1';
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#f1f5f9';
          ctx.beginPath();
          ctx.arc(this.size * 0.1, -this.size * 0.1, this.size * 0.15, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Glowing orb
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
          grad.addColorStop(0, '#06b6d4');
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = [];
      const count = 70;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
      style={{ filter: 'blur(2px)' }}
    />
  );
};

export default BackgroundCanvas;
