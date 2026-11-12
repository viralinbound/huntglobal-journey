/* Sample 9 — motion layer.
   Every section change is a "slide change": the old section drifts away, the new one builds itself
   in (lines, words, cards, numbers), a giant chapter numeral slides behind it, and the globe lands
   with a shockwave. Everything replays each time you arrive, scrolling down or back up. */
const gsap = window.gsap, ST = window.ScrollTrigger; gsap.registerPlugin(ST);
const $ = (s, e = document) => e.querySelector(s), $$ = (s, e = document) => [...e.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobile = () => innerWidth < 761;
if (!reduce) {
  document.body.classList.add('motion');

  /* ---------- text scramble for small mono labels ---------- */
  const GLYPHS = '▪◆/\\_<>+*0123456789ABCDEFGHJKLMNPRSTUVWXYZ';
  function scramble(el, dur = 0.9) {
    const final = el.dataset.final ?? (el.dataset.final = el.textContent);
    const o = { p: 0 };
    gsap.killTweensOf(o);
    return gsap.to(o, { p: 1, duration: dur, ease: 'none', onUpdate() {
      const n = Math.floor(o.p * final.length);
      el.textContent = final.slice(0, n) + [...final.slice(n)].map(c => c === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0]).join('').slice(0, Math.max(0, final.length - n));
    }, onComplete() { el.textContent = final; } });
  }

  /* ---------- giant outline chapter numerals behind each section ---------- */
  if (false) $$('section.ch[data-stop]').forEach((sec, i) => {   // big chapter numerals: switched off (no numbering on the site)
    const n = document.createElement('div');
    n.className = 'ghost-n' + (sec.classList.contains('flip') ? ' r' : '');
    n.setAttribute('aria-hidden', 'true');
    n.textContent = String(i + 1).padStart(2, '0');
    sec.prepend(n);
  });

  /* ---------- per-section entrance timelines ---------- */
  const sections = $$('section.ch');
  sections.forEach(sec => {
    // elements inside a company chapter are animated by the chapter itself (main.js), never twice
    const q = s => $$(s, sec).filter(el => !el.closest('.pf-scene:not(.pf-intro)'));
    const words = q('.split .w > span');
    const labels = q('.label');
    const blocks = q('.lead, p.reveal, .link, .values-note, .region-text, .two-col > p, .ins-head, .contact-grid > div > p');
    const cards = q('.card');
    const boxes = q('.core, .region-panel, .enquiry, .quote, .insights .ins-card, .filters');
    const stats = q('.stat');
    const badges = q('.badges li');
    const prin = q('.principles li');
    const threadItems = q('.thread li'), threadLine = q('.thread-line i'), threadHead = q('.thread-h');
    const agents = q('.core-agents li');
    const ghost = $('.ghost-n', sec);
    const bigRead = q('.big-read');

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
    if (ghost) tl.fromTo(ghost, { xPercent: ghost.classList.contains('r') ? -30 : 30, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1.8 }, 0);
    if (labels.length) tl.fromTo(labels, { opacity: 0, x: -24 }, { opacity: .75, x: 0, duration: .9, onStart: () => labels.forEach(l => scramble(l)) }, 0.05);
    if (words.length) tl.fromTo(words, { y: 0, yPercent: 115, rotate: 7, opacity: 0 }, { y: 0, yPercent: 0, rotate: 0, opacity: 1, duration: 1.3, stagger: 0.045 }, 0.1);
    if (bigRead.length) tl.fromTo(bigRead, { y: 70, opacity: 0, clipPath: 'inset(0 0 100% 0)' }, { y: 0, opacity: 1, clipPath: 'inset(0 0 -10% 0)', duration: 1.4 }, 0.1);
    if (blocks.length) tl.fromTo(blocks, { y: 40, opacity: 0, clipPath: 'inset(0 0 100% 0)' }, { y: 0, opacity: 1, clipPath: 'inset(0 0 -20% 0)', duration: 1.2, stagger: 0.08 }, 0.35);
    if (stats.length) tl.fromTo(stats, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.09 }, 0.45);
    if (boxes.length) tl.fromTo(boxes, { y: 70, opacity: 0, scale: .94 }, { y: 0, opacity: 1, scale: 1, duration: 1.3, stagger: 0.1, clearProps: 'transform' }, 0.4);
    if (agents.length) tl.fromTo(agents, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: 0.06 }, 0.8);
    if (cards.length) tl.fromTo(cards, { y: 140, rotateX: -65, opacity: 0, transformPerspective: 1100, transformOrigin: '50% 100%' }, { y: 0, rotateX: 0, opacity: 1, duration: 1.4, stagger: 0.09, clearProps: 'transform,transformPerspective,opacity' }, 0.45);
    if (badges.length) tl.fromTo(badges, { scale: 0, rotation: -18, opacity: 0, y: 40 }, { scale: 1, rotation: (i, el) => parseFloat(getComputedStyle(el).getPropertyValue('--r')) || 0, opacity: 1, y: 0, duration: 1, stagger: 0.07, ease: 'back.out(2.2)', clearProps: 'transform' }, 0.5);
    if (prin.length) tl.fromTo(prin, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1, stagger: 0.1 }, 0.4);
    if (threadHead.length) tl.fromTo(threadHead, { opacity: 0, y: 14 }, { opacity: .7, y: 0, duration: .8, onStart: () => threadHead.forEach(h => scramble(h, .6)) }, 0.5);
    if (threadLine.length) tl.fromTo(threadLine, { scaleY: 0 }, { scaleY: 1, duration: 1.6, ease: 'power3.inOut' }, 0.55);
    if (threadItems.length) tl.fromTo(threadItems, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, stagger: 0.13 }, 0.65);

    // reset to the "before" state, then play whenever we arrive (down or back up)
    tl.progress(1).progress(0);
    // play on the way DOWN only. On the way UP the content is simply there (instantly, if it never played,
    // e.g. after a menu jump or a reload half-way down). Reset only once the section is fully below the
    // screen, so nothing ever disappears while you can still see it.
    const show = () => { if (tl.progress() < 1) { gsap.killTweensOf(tl); tl.progress(1).pause(); } };
    const play = ST.create({
      trigger: sec, start: 'top 82%', end: 'bottom top',
      onEnter: () => { if (tl.progress() === 0) tl.restart(); else show(); },
      onEnterBack: show
    });
    ST.create({ trigger: sec, start: 'top bottom', onLeaveBack: () => { gsap.killTweensOf(tl); tl.pause(0); } });
    if (play.progress > 0 || play.isActive) show();

    // slide-change exit: the section we are leaving drifts up, shrinks and fades
    const inner = $('.wrap', sec);
    // (no exit fade: content must stay fully visible when you scroll back up)
    // the giant numeral drifts slower than the page
    if (ghost) gsap.fromTo(ghost, { y: 120 }, { y: -160, ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* ---------- the globe lands: shockwave + label ---------- */
  const fx = document.createElement('div'); fx.className = 'arrive-fx'; fx.setAttribute('aria-hidden', 'true'); document.body.appendChild(fx);
  const tag = document.createElement('div'); tag.className = 'arrive-tag mono'; tag.setAttribute('aria-hidden', 'true'); document.body.appendChild(tag);
  let first = true;
  addEventListener('hg:arrive', ({ detail: d }) => {
    if (first && d.i === 0) { first = false; return; }
    first = false;
    if (mobile()) return;
    for (let k = 0; k < 3; k++) {
      const r = document.createElement('i'); r.style.left = d.x + 'px'; r.style.top = d.y + 'px'; r.style.width = r.style.height = d.r * 2 + 'px';
      r.style.borderColor = d.ink; fx.appendChild(r);
      gsap.fromTo(r, { scale: .92, opacity: .55 - k * .12 }, { scale: 1.35 + k * .22, opacity: 0, duration: 1.6 + k * .25, delay: k * .12, ease: 'expo.out', onComplete: () => r.remove() });
    }
    // a flash of tiny sparks thrown off the rim
    for (let k = 0; k < 18; k++) {
      const s = document.createElement('b'), a = Math.random() * Math.PI * 2, R = d.r * (1.02 + Math.random() * .1);
      s.style.left = d.x + Math.cos(a) * R + 'px'; s.style.top = d.y + Math.sin(a) * R + 'px'; s.style.background = d.ink; fx.appendChild(s);
      gsap.to(s, { x: Math.cos(a) * (60 + Math.random() * 120), y: Math.sin(a) * (60 + Math.random() * 120), opacity: 0, scale: .2, duration: 1.2 + Math.random() * .6, ease: 'expo.out', onComplete: () => s.remove() });
    }
    tag.textContent = d.name; tag.dataset.final = d.name; tag.style.color = d.ink;
    gsap.killTweensOf(tag);
    gsap.set(tag, { left: d.x, top: d.y - d.r - 34, xPercent: -50 });
    gsap.timeline().fromTo(tag, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .6, ease: 'expo.out', onStart: () => scramble(tag, .7) }).to(tag, { opacity: 0, y: -10, duration: .6, delay: 1.6, ease: 'power2.in' });
  });

  /* ---------- chapter counter: digits roll, name scrambles ---------- */
  const cNum = $('#cNum'), cName = $('#cName');
  if (cNum) new MutationObserver(() => {
    if (cNum.dataset.rolling) return; cNum.dataset.rolling = 1;
    gsap.fromTo(cNum, { yPercent: 70, opacity: 0, rotateX: -80 }, { yPercent: 0, opacity: 1, rotateX: 0, duration: .7, ease: 'expo.out', onComplete: () => delete cNum.dataset.rolling });
    if (cName) { cName.dataset.final = cName.textContent; scramble(cName, .6); }
  }).observe(cNum, { childList: true, characterData: true, subtree: true });

  /* ---------- scroll speed gives headlines a little skew ---------- */
  const heads = $$('.huge, .big-read');
  let lastY = scrollY, skew = 0;
  gsap.ticker.add(() => {
    if (mobile()) return;   // no headline skew on phones (keeps scrolling light)
    const v = scrollY - lastY; lastY = scrollY;
    skew += (Math.max(-6, Math.min(6, v * 0.12)) - skew) * 0.12;
    if (Math.abs(skew) > .02) heads.forEach(h => h.style.transform = `skewY(${(-skew).toFixed(2)}deg)`);
  });

  /* ---------- magnetic links and buttons ---------- */
  if (matchMedia('(hover: hover)').matches) $$('.link, .btn, .btn-line, .filters button').forEach(b => {
    b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .25, y: (e.clientY - r.top - r.height / 2) * .35, duration: .5, ease: 'power3.out' }); });
    b.addEventListener('pointerleave', () => gsap.to(b, { x: 0, y: 0, duration: .9, ease: 'elastic.out(1, .4)' }));
  });

  /* ---------- glass cards: a soft light follows the cursor ---------- */
  document.addEventListener('pointermove', e => {
    const c = e.target.closest?.('.card'); if (!c) return;
    const r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });

  ST.refresh();
}
