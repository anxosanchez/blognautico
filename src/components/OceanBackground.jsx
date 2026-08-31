import React, { useEffect, useRef, useState } from 'react';

export default function OceanBackground() {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Particle system (bioluminescent plankton / marine bubbles)
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedY: -(Math.random() * 0.4 + 0.15),
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulse: Math.random() * Math.PI,
      color: Math.random() > 0.4 ? 'rgba(0, 242, 254, ' : 'rgba(16, 185, 129, ',
    }));

    // Radar blips
    const blips = [
      { angle: 0.8, radius: 0.35, label: 'CSOV-01', pulse: 0 },
      { angle: 2.3, radius: 0.55, label: 'OPS-DOCK', pulse: 0.4 },
      { angle: 4.1, radius: 0.42, label: 'VGO-TRAWLER', pulse: 0.8 },
      { angle: 5.4, radius: 0.68, label: 'METHANOL-FLEET', pulse: 0.2 },
    ];

    let time = 0;
    let radarAngle = 0;

    const render = () => {
      time += 0.015;
      radarAngle = (radarAngle + 0.008) % (Math.PI * 2);

      ctx.clearRect(0, 0, width, height);

      // 1. Bathymetric contour lines (isobaths)
      ctx.save();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.04)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        const baseRadius = (height * 0.28) * i;
        ctx.arc(width * 0.5, height * 0.45, baseRadius + Math.sin(time * 0.5 + i) * 12, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Animated Deep Ocean Hydrodynamic Wave Layers
      const waves = [
        { amp: 18, freq: 0.002, speed: 0.8, color: 'rgba(0, 242, 254, 0.035)', yOffset: height * 0.65 },
        { amp: 24, freq: 0.0015, speed: 0.5, color: 'rgba(16, 185, 129, 0.025)', yOffset: height * 0.72 },
        { amp: 30, freq: 0.001, speed: 0.3, color: 'rgba(14, 165, 233, 0.03)', yOffset: height * 0.8 },
      ];

      waves.forEach((w) => {
        ctx.beginPath();
        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 15) {
          const waveY =
            w.yOffset +
            Math.sin(x * w.freq + time * w.speed) * w.amp +
            Math.cos(x * w.freq * 0.7 + time * 0.4) * (w.amp * 0.4);
          ctx.lineTo(x, waveY);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = w.color;
        ctx.fill();
      });

      // 3. Bioluminescent Marine Floating Particles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.pulse) * 0.2;
        p.pulse += p.pulseSpeed;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + currentAlpha + ')';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00F2FE';
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Canvas Waves & Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />

      {/* Decorative Rotating Compass Rose in Top-Right Background */}
      <div 
        className="absolute -top-24 -right-24 w-[480px] h-[480px] opacity-[0.035] transition-transform duration-1000 ease-out pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px) rotate(15deg)`,
        }}
      >
        <svg viewBox="0 0 500 500" fill="none" stroke="currentColor" className="w-full h-full text-cyan-400 animate-[spin_160s_linear_infinite]">
          {/* Compass circles */}
          <circle cx="250" cy="250" r="230" strokeWidth="1.5" strokeDasharray="4 8" />
          <circle cx="250" cy="250" r="190" strokeWidth="1" />
          <circle cx="250" cy="250" r="140" strokeWidth="1" strokeDasharray="2 4" />
          <circle cx="250" cy="250" r="80" strokeWidth="1" />
          
          {/* Compass Stars & Rays */}
          <polygon points="250,30 265,235 470,250 265,265 250,470 235,265 30,250 235,235" fill="currentColor" fillOpacity="0.15" strokeWidth="1.5" />
          <polygon points="250,70 260,240 430,250 260,260 250,430 240,260 70,250 240,240" fill="currentColor" fillOpacity="0.25" strokeWidth="1" />
          
          {/* Crosshairs & Degrees */}
          <line x1="250" y1="10" x2="250" y2="490" strokeWidth="1" strokeOpacity="0.5" />
          <line x1="10" y1="250" x2="490" y2="250" strokeWidth="1" strokeOpacity="0.5" />
          <text x="250" y="25" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold" fontFamily="monospace">N</text>
          <text x="480" y="255" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold" fontFamily="monospace">E</text>
          <text x="250" y="490" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold" fontFamily="monospace">S</text>
          <text x="20" y="255" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold" fontFamily="monospace">W</text>
        </svg>
      </div>

      {/* Decorative Nautical Grid Lines in Bottom-Left */}
      <div 
        className="absolute -bottom-20 -left-20 w-[420px] h-[420px] opacity-[0.04] transition-transform duration-1000 ease-out pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`,
        }}
      >
        <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" className="w-full h-full text-emerald-400">
          <circle cx="200" cy="200" r="180" strokeWidth="1" />
          <circle cx="200" cy="200" r="120" strokeWidth="1" strokeDasharray="3 6" />
          <line x1="20" y1="200" x2="380" y2="200" strokeWidth="1" />
          <line x1="200" y1="20" x2="200" y2="380" strokeWidth="1" />
          {/* Sonar sweep vector */}
          <path d="M 200 200 L 350 290 A 180 180 0 0 1 200 380 Z" fill="currentColor" fillOpacity="0.08" />
        </svg>
      </div>

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.015] to-transparent h-24 pointer-events-none animate-scanline" />
    </div>
  );
}
