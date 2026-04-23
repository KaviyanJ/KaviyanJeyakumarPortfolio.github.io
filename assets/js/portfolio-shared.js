// ============================================================
// KAVIYAN JEYAKUMAR — Shared Portfolio JS
// Used by all project sub-pages
// ============================================================

// CUSTOM CURSOR
const ring = document.getElementById('cur-ring');
const dot  = document.getElementById('cur-dot');
const TRAIL = 8;
const trails = Array.from({length: TRAIL}, (_, i) => {
  const el = document.createElement('div');
  el.className = 'cur-trail';
  const s = Math.max(1.5, 3.5 - i * 0.22);
  el.style.cssText = `width:${s}px;height:${s}px;opacity:${(1 - i / TRAIL) * 0.32}`;
  document.body.appendChild(el);
  return { el, x: 0, y: 0 };
});

let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cur-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cur-hover'));
});

(function animCursor() {
  dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  for (let i = TRAIL - 1; i > 0; i--) {
    trails[i].x += (trails[i-1].x - trails[i].x) * 0.28;
    trails[i].y += (trails[i-1].y - trails[i].y) * 0.28;
    trails[i].el.style.left = trails[i].x + 'px';
    trails[i].el.style.top  = trails[i].y + 'px';
  }
  trails[0].x += (mx - trails[0].x) * 0.5;
  trails[0].y += (my - trails[0].y) * 0.5;
  trails[0].el.style.left = trails[0].x + 'px';
  trails[0].el.style.top  = trails[0].y + 'px';
  requestAnimationFrame(animCursor);
})();

// PARTICLES
const cvs = document.getElementById('c-particles');
const ctx = cvs.getContext('2d');
function resize() { cvs.width = innerWidth; cvs.height = innerHeight; }
resize(); window.addEventListener('resize', resize);

class P {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * cvs.width; this.y = Math.random() * cvs.height;
    this.r = Math.random() * 1.2 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.22; this.vy = (Math.random() - 0.5) * 0.22;
    this.a = Math.random() * 0.3 + 0.07;
    this.c = Math.random() > 0.55 ? '#00e5ff' : Math.random() > 0.5 ? '#a855f7' : '#ffffff';
  }
  step() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > cvs.width || this.y < 0 || this.y > cvs.height) this.reset();
  }
  draw() {
    ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.c; ctx.globalAlpha = this.a; ctx.fill(); ctx.globalAlpha = 1;
  }
}

const pts = Array.from({ length: 100 }, () => new P());
(function animP() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  pts.forEach(p => { p.step(); p.draw(); });
  pts.forEach((p, i) => {
    pts.slice(i + 1, i + 5).forEach(q => {
      const d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < 100) {
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = '#00e5ff'; ctx.globalAlpha = (1 - d / 100) * 0.06;
        ctx.lineWidth = 0.5; ctx.stroke(); ctx.globalAlpha = 1;
      }
    });
  });
  requestAnimationFrame(animP);
})();

// REVEAL ON SCROLL
const revEls = document.querySelectorAll('.reveal');
function checkReveal() {
  revEls.forEach(el => {
    if (el.getBoundingClientRect().top < innerHeight * 0.92) el.classList.add('up');
  });
}
window.addEventListener('scroll', checkReveal, { passive: true });
window.addEventListener('load', () => { checkReveal(); setTimeout(checkReveal, 300); });
checkReveal();
