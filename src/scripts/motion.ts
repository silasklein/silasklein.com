// Arrival motion: text and blocks rise into place once as they enter the viewport, then stay
// fixed. Only elements below the fold are prepared, so nothing on screen is ever hidden on load.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const items = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];

if (!reduce && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.remove('is-pending');
      io.unobserve(e.target);
    }
  }, { rootMargin: '0px 0px -10% 0px' });
  const order = new Map<Element, number>();
  for (const el of items) {
    if (el.getBoundingClientRect().top < innerHeight) continue;
    const parent = el.parentElement!;
    const i = order.get(parent) ?? 0;
    order.set(parent, i + 1);
    el.style.setProperty('--d', `${Math.min(i, 6) * 80}ms`);
    el.classList.add('is-pending');
    io.observe(el);
  }
  // Safety net: never leave content hidden (e.g. jumping straight to an anchor).
  addEventListener('hashchange', () => items.forEach((el) => el.classList.remove('is-pending')));
}

// Top bar edge + active section in the menu
const topbar = document.querySelector('.topbar');
const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav]')];
const sections = [...new Set(navLinks.map((a) => a.dataset.nav!))]
  .map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
let ticking = false;
const onScroll = () => {
  topbar?.classList.toggle('is-scrolled', scrollY > 8);
  let active = '';
  for (const s of sections) if (s.getBoundingClientRect().top < innerHeight * 0.4) active = s.id;
  for (const a of navLinks) a.classList.toggle('is-active', a.dataset.nav === active);
  ticking = false;
};
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();

// Mobile menu
const btn = document.querySelector<HTMLButtonElement>('.topbar__menu');
const menu = document.getElementById('mobile-nav');
btn?.addEventListener('click', () => {
  const open = btn.getAttribute('aria-expanded') !== 'true';
  btn.setAttribute('aria-expanded', String(open));
  if (menu) menu.hidden = !open;
});
addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && btn?.getAttribute('aria-expanded') === 'true') {
    btn.setAttribute('aria-expanded', 'false');
    if (menu) menu.hidden = true;
    btn.focus();
  }
});
menu?.addEventListener('click', (e) => {
  if ((e.target as HTMLElement).closest('a')) { btn?.setAttribute('aria-expanded', 'false'); menu.hidden = true; }
});

// Copy bio
for (const b of document.querySelectorAll<HTMLButtonElement>('[data-copy]')) {
  b.addEventListener('click', async () => {
    const src = document.querySelector(b.dataset.copy!);
    if (!src) return;
    try {
      await navigator.clipboard.writeText((src as HTMLElement).innerText.trim());
      const label = b.lastChild as Text;
      const old = label.textContent;
      label.textContent = ' ' + (b.dataset.done || 'Copied');
      setTimeout(() => (label.textContent = old), 1800);
    } catch { /* clipboard unavailable */ }
  });
}

// Post galleries: one image at a time; buttons, swipe or arrow keys move between them.
for (const g of document.querySelectorAll<HTMLElement>('.gallery')) {
  const track = g.querySelector<HTMLElement>('.gallery__track')!;
  const count = g.querySelector('.gallery__count')!;
  const prev = g.querySelector<HTMLButtonElement>('.gallery__prev')!;
  const next = g.querySelector<HTMLButtonElement>('.gallery__next')!;
  const total = track.children.length;
  const current = () => Math.round(track.scrollLeft / track.clientWidth);
  const go = (i: number) => track.scrollTo({ left: Math.max(0, Math.min(total - 1, i)) * track.clientWidth, behavior: 'smooth' });
  const update = () => {
    const i = current();
    count.textContent = `${i + 1} / ${total}`;
    prev.disabled = i === 0;
    next.disabled = i === total - 1;
  };
  prev.addEventListener('click', () => go(current() - 1));
  next.addEventListener('click', () => go(current() + 1));
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(current() + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(current() - 1); }
  });
  track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  update();
}
