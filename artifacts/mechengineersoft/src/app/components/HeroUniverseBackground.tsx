import { useEffect, useRef } from 'react';

type Star = {
  x: number;
  y: number;
  depth: number;
  size: number;
  alpha: number;
  twinkle: number;
  phase: number;
};

type ShootingStar = {
  startedAt: number;
  duration: number;
  x: number;
  y: number;
  length: number;
};

const DESKTOP_STAR_COUNT = 2200;
const MOBILE_STAR_COUNT = 1050;

function createStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
    depth: Math.random(),
    size: Math.random() < 0.92 ? Math.random() * 0.9 + 0.15 : Math.random() * 1.5 + 0.8,
    alpha: Math.random() * 0.44 + 0.12,
    twinkle: Math.random() * 0.9 + 0.15,
    phase: Math.random() * Math.PI * 2,
  }));
}

export function HeroUniverseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointerQuery = window.matchMedia('(pointer: fine)');
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (!isVisible && frameId !== null) {
          cancelAnimationFrame(frameId);
          frameId = null;
        } else if (isVisible && !reducedMotionQuery.matches) {
          startLoop();
        }
      },
      { threshold: 0.01 },
    );

    let isVisible = true;
    let frameId: number | null = null;
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let nextShootingStarAt = performance.now() + 4200;
    let shootingStar: ShootingStar | null = null;
    let pointerX = 0;
    let pointerY = 0;
    let smoothPointerX = 0;
    let smoothPointerY = 0;

    const getStarCount = () => (window.innerWidth < 768 ? MOBILE_STAR_COUNT : DESKTOP_STAR_COUNT);

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const starCount = getStarCount();
      if (stars.length !== starCount) {
        stars = createStars(starCount);
      }

      if (reducedMotionQuery.matches) {
        draw(0);
      }
    };

    const drawNebula = () => {
      const blueNebula = context.createRadialGradient(
        width * 0.2,
        height * 0.26,
        0,
        width * 0.2,
        height * 0.26,
        Math.max(width, height) * 0.7,
      );
      blueNebula.addColorStop(0, 'rgba(37, 99, 235, 0.14)');
      blueNebula.addColorStop(0.34, 'rgba(29, 78, 216, 0.045)');
      blueNebula.addColorStop(1, 'rgba(5, 8, 22, 0)');
      context.fillStyle = blueNebula;
      context.fillRect(0, 0, width, height);

      const violetNebula = context.createRadialGradient(
        width * 0.82,
        height * 0.62,
        0,
        width * 0.82,
        height * 0.62,
        Math.max(width, height) * 0.62,
      );
      violetNebula.addColorStop(0, 'rgba(99, 102, 241, 0.09)');
      violetNebula.addColorStop(0.42, 'rgba(59, 130, 246, 0.025)');
      violetNebula.addColorStop(1, 'rgba(5, 8, 22, 0)');
      context.fillStyle = violetNebula;
      context.fillRect(0, 0, width, height);
    };

    const drawStars = (time: number) => {
      const isMobile = width < 768;
      const automaticX = isMobile ? Math.sin(time * 0.00011) * 0.22 : 0;
      const automaticY = isMobile ? Math.cos(time * 0.00008) * 0.12 : 0;
      const parallaxX = (smoothPointerX * 0.035) + automaticX;
      const parallaxY = (smoothPointerY * 0.025) + automaticY;
      const depthTravel = reducedMotionQuery.matches ? 0 : (time * 0.000012) % 1;

      for (const star of stars) {
        const depth = (star.depth - depthTravel + 1) % 1;
        const perspective = 0.4 + depth * 1.3;
        const nearScale = 1.15 - depth;
        const x = width * 0.5 + (star.x + parallaxX * nearScale) * width * 0.55 * nearScale;
        const y = height * 0.5 + (star.y + parallaxY * nearScale) * height * 0.63 * nearScale;

        if (x < -8 || x > width + 8 || y < -8 || y > height + 8) continue;

        const twinkle = reducedMotionQuery.matches
          ? 1
          : 0.82 + Math.sin(time * 0.001 * star.twinkle + star.phase) * 0.18;
        const radius = Math.max(0.22, star.size * (0.48 + (1 - depth) * 1.45) * perspective);
        const alpha = Math.min(0.82, star.alpha * twinkle * (0.7 + (1 - depth) * 0.5));

        context.beginPath();
        context.fillStyle = `rgba(185, 214, 255, ${alpha})`;
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();

        if (radius > 1.25) {
          context.beginPath();
          context.fillStyle = `rgba(96, 165, 250, ${alpha * 0.16})`;
          context.arc(x, y, radius * 3.5, 0, Math.PI * 2);
          context.fill();
        }
      }
    };

    const drawShootingStar = (time: number) => {
      if (reducedMotionQuery.matches || width < 480) return;

      if (!shootingStar && time >= nextShootingStarAt) {
        shootingStar = {
          startedAt: time,
          duration: 850 + Math.random() * 360,
          x: Math.random() * 0.82 + 0.04,
          y: Math.random() * 0.42 + 0.1,
          length: Math.min(width, height) * (0.1 + Math.random() * 0.08),
        };
      }

      if (!shootingStar) return;

      const progress = (time - shootingStar.startedAt) / shootingStar.duration;
      if (progress >= 1) {
        shootingStar = null;
        nextShootingStarAt = time + 4200 + Math.random() * 3400;
        return;
      }

      const easedProgress = 1 - Math.pow(1 - progress, 2);
      const headX = shootingStar.x * width + easedProgress * width * 0.18;
      const headY = shootingStar.y * height + easedProgress * height * 0.16;
      const tailX = headX - shootingStar.length;
      const tailY = headY - shootingStar.length * 0.7;
      const trail = context.createLinearGradient(tailX, tailY, headX, headY);
      trail.addColorStop(0, 'rgba(147, 197, 253, 0)');
      trail.addColorStop(0.72, 'rgba(147, 197, 253, 0.18)');
      trail.addColorStop(1, 'rgba(219, 234, 254, 0.85)');

      context.beginPath();
      context.moveTo(tailX, tailY);
      context.lineTo(headX, headY);
      context.strokeStyle = trail;
      context.lineWidth = 1.2;
      context.stroke();

      context.beginPath();
      context.fillStyle = 'rgba(239, 246, 255, 0.9)';
      context.arc(headX, headY, 1.5, 0, Math.PI * 2);
      context.fill();
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      drawNebula();
      drawStars(time);
      drawShootingStar(time);
    };

    const loop = (time: number) => {
      frameId = null;
      if (!isVisible || reducedMotionQuery.matches || document.visibilityState === 'hidden') return;

      smoothPointerX += (pointerX - smoothPointerX) * 0.035;
      smoothPointerY += (pointerY - smoothPointerY) * 0.035;
      draw(time);
      frameId = requestAnimationFrame(loop);
    };

    function startLoop() {
      if (frameId === null && isVisible && !reducedMotionQuery.matches) {
        frameId = requestAnimationFrame(loop);
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointerQuery.matches || width === 0 || height === 0) return;
      const bounds = canvas.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };

    const handleMotionPreference = () => {
      if (reducedMotionQuery.matches) {
        if (frameId !== null) cancelAnimationFrame(frameId);
        frameId = null;
        draw(0);
      } else {
        startLoop();
      }
    };

    resize();
    visibilityObserver.observe(canvas);
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    reducedMotionQuery.addEventListener('change', handleMotionPreference);
    document.addEventListener('visibilitychange', handleMotionPreference);

    if (reducedMotionQuery.matches) {
      draw(0);
    } else {
      startLoop();
    }

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      visibilityObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      reducedMotionQuery.removeEventListener('change', handleMotionPreference);
      document.removeEventListener('visibilitychange', handleMotionPreference);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,8,22,0.16)_100%)]" />
    </div>
  );
}