/**
 * Rapid celebratory confetti burst for correct answers during quizzes.
 * Launches dual-cannon confetti from screen sides toward the center.
 * Respects prefers-reduced-motion and automatically removes canvas.
 */
export function fireCorrectAnswerConfetti(isStreak: boolean = false) {
  if (typeof window === 'undefined') return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }

  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  // Palette: Emerald (#16A34A, #22C55E), Crimson (#EF233C), Gold (#F59E0B), Navy (#2B2D42), Ice (#EDF2F4)
  const colors = isStreak
    ? ['#F59E0B', '#FBBF24', '#22C55E', '#16A34A', '#EF233C', '#FFFFFF']
    : ['#22C55E', '#16A34A', '#EF233C', '#2B2D42', '#F59E0B', '#EDF2F4'];

  interface ConfettiBit {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    rotation: number;
    vRot: number;
    opacity: number;
    isStar: boolean;
  }

  const bits: ConfettiBit[] = [];
  const countPerSide = isStreak ? 24 : 18;

  // Left cannon (launches upwards & rightwards)
  for (let i = 0; i < countPerSide; i++) {
    bits.push({
      x: width * 0.1,
      y: height * 0.75,
      vx: Math.random() * 9 + 4,
      vy: -Math.random() * 11 - 6,
      size: Math.random() * 7 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 14,
      opacity: 1,
      isStar: isStreak && Math.random() > 0.6,
    });
  }

  // Right cannon (launches upwards & leftwards)
  for (let i = 0; i < countPerSide; i++) {
    bits.push({
      x: width * 0.9,
      y: height * 0.75,
      vx: -(Math.random() * 9 + 4),
      vy: -Math.random() * 11 - 6,
      size: Math.random() * 7 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 14,
      opacity: 1,
      isStar: isStreak && Math.random() > 0.6,
    });
  }

  const startTime = performance.now();
  const duration = 1400; // 1.4 seconds fast burst

  function animate(now: number) {
    if (!ctx) return;
    const elapsed = now - startTime;
    if (elapsed > duration) {
      canvas.remove();
      return;
    }

    ctx.clearRect(0, 0, width, height);

    for (const b of bits) {
      b.x += b.vx;
      b.y += b.vy;
      b.vy += 0.36; // gravity
      b.vx *= 0.975; // drag
      b.rotation += b.vRot;
      b.opacity = Math.max(0, 1 - elapsed / duration);

      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate((b.rotation * Math.PI) / 180);
      ctx.globalAlpha = b.opacity;
      ctx.fillStyle = b.color;

      if (b.isStar) {
        ctx.beginPath();
        ctx.arc(0, 0, b.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-b.size / 2, -b.size / 2, b.size, b.size * 0.6);
      }

      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

/**
 * Zero-dependency, lightweight canvas celebration for mastery moments.
 * Respects prefers-reduced-motion and cleans up automatically.
 */
export function fireMasteryCelebration() {
  if (typeof window === 'undefined') return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }

  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  // Brand palette: Slate navy (#2B2D42), Slate grey (#8D99AE), Vivid crimson (#EF233C), Deep crimson (#D90429)
  const colors = ['#2B2D42', '#8D99AE', '#EF233C', '#D90429', '#EDF2F4', '#3D415C'];

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    rotation: number;
    vRot: number;
    opacity: number;
  }

  const particles: Particle[] = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: width * 0.5 + (Math.random() - 0.5) * 200,
      y: height * 0.4 + (Math.random() - 0.5) * 100,
      vx: (Math.random() - 0.5) * 12,
      vy: -Math.random() * 10 - 4,
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      opacity: 1,
    });
  }

  const startTime = performance.now();
  const duration = 1800; // 1.8 seconds max

  function animate(now: number) {
    if (!ctx) return;
    const elapsed = now - startTime;
    if (elapsed > duration) {
      canvas.remove();
      return;
    }

    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.vx *= 0.98; // air drag
      p.rotation += p.vRot;
      p.opacity = Math.max(0, 1 - elapsed / duration);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
