import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

export default function CommandCenter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;

    if (!canvasElement) {
      return;
    }

    const context = canvasElement.getContext("2d");

    if (!context) {
      return;
    }

    // Explicit non-null references for TypeScript
    const canvas: HTMLCanvasElement = canvasElement;
    const ctx: CanvasRenderingContext2D = context;

    let animationFrame = 0;

    const PARTICLE_COUNT = 180;
    const particles: Particle[] = [];

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    function resize() {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = "100vw";
      canvas.style.height = "100vh";

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      particles.length = 0;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,

          // Slow random movement
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,

          radius: Math.random() * 2 + 1,
        });
      }
    }

    function handleMouseMove(event: MouseEvent) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }

    resize();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    function animate() {
      ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );

      // ==========================================
      // MOUSE GLOW
      // ==========================================

      const gradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        300
      );

      gradient.addColorStop(
        0,
        "rgba(239,68,68,0.20)"
      );

      gradient.addColorStop(
        0.5,
        "rgba(239,68,68,0.08)"
      );

      gradient.addColorStop(
        1,
        "rgba(239,68,68,0)"
      );

      ctx.fillStyle = gradient;

      ctx.fillRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );

      // ==========================================
      // CONNECTION LINES
      // ==========================================

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx =
            particles[i].x - particles[j].x;

          const dy =
            particles[i].y - particles[j].y;

          const distance = Math.sqrt(
            dx * dx + dy * dy
          );

          if (distance < 120) {
            ctx.beginPath();

            ctx.moveTo(
              particles[i].x,
              particles[i].y
            );

            ctx.lineTo(
              particles[j].x,
              particles[j].y
            );

            const opacity =
              Math.max(0, 0.18 - distance / 700);

            ctx.strokeStyle = `rgba(239,68,68,${opacity})`;

            ctx.lineWidth = 1;

            ctx.stroke();
          }
        }
      }

      // ==========================================
      // PARTICLES
      // ==========================================

      ctx.fillStyle = "#ff4b4b";
      ctx.shadowColor = "#ff4b4b";
      ctx.shadowBlur = 15;

      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap horizontally
        if (particle.x < 0) {
          particle.x = window.innerWidth;
        }

        if (particle.x > window.innerWidth) {
          particle.x = 0;
        }

        // Wrap vertically
        if (particle.y < 0) {
          particle.y = window.innerHeight;
        }

        if (particle.y > window.innerHeight) {
          particle.y = 0;
        }

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      ctx.shadowBlur = 0;

      animationFrame =
        requestAnimationFrame(animate);
    }

    animate();

    // ==========================================
    // CLEANUP
    // ==========================================

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener(
        "resize",
        resize
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}