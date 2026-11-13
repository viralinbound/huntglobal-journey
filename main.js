import * as THREE from 'three';

/* =========================================================
   DATA — all content taken from huntglobal.co
   ========================================================= */
const COMPANIES = [
  {
    id: 'biltflow', name: 'Biltflow', cat: 'Construction Intelligence', filter: 'construction',
    logo: '/assets/biltflow.svg',
    desc: 'The AI operating system for construction — BiltFlow OS™ connects every team, document, estimate, and supplier into one intelligent agentic workflow, from site discovery to project closeout.',
    site: 'https://biltflow.com/', page: '/portfolio/biltflow/',
    meta: [['Sector', 'Construction Intelligence'], ['Product', 'BiltFlow OS™']]
  },
  {
    id: 'replaice', name: 'Replaice Technologies', cat: 'Technology and Engineering', filter: 'technology',
    logo: '/assets/replaice.png',
    desc: 'Autonomous AI Agents for enterprise growth — agentic CRM/ERP/HRMS/DMS systems, enterprise RAG (eRAG), AI Agent Workspace, LLM gateway.',
    site: 'https://replaice.ai/', page: '/portfolio/replaice-technologies/',
    meta: [['Sector', 'Technology and Engineering'], ['Focus', 'Autonomous AI agents for enterprise']]
  },
  {
    id: 'huntjobs', name: 'HuntJobs', cat: 'AI · Talent Marketplace', filter: 'talent',
    logo: '/assets/huntjobs.webp',
    desc: 'Your next opportunity, delivered in a heartbeat. An AI-powered jobs marketplace matching professionals with employers globally. Mobile apps available on the App Store and Google Play; used by candidates hired at major global companies.',
    site: 'https://huntjobs.ai/', page: '/portfolio/huntjobs/',
    meta: [['Sector', 'AI · Talent Marketplace'], ['Apps', 'App Store · Google Play']]
  },
  {
    id: 'northstar', name: 'Northstar Humanoids and Robotics', short: 'Northstar', cat: 'Humanoids · Robotics', filter: 'robotics',
    logo: null, wordmark: 'NORTHSTAR',
    desc: 'Humanoids for industry. Northstar builds humanoid robotics and operational intelligence for industrial environments, operating from Singapore, Bangalore and San Francisco — orchestrated and governed from Singapore.',
    site: null, page: '/portfolio/northstar/',
    meta: [['Sector', 'Humanoids · Robotics'], ['Locations', 'Singapore · Bangalore · San Francisco']]
  },
  {
    id: 'tribe', name: 'Tribe', cat: 'Property and Lifestyle Technology', filter: 'property',
    logo: '/assets/tribe.svg',
    desc: 'The AI-powered operating and lifestyle platform for modern rental communities - connecting leasing, residents, property teams and neighbourhood services through one intelligent experience.',
    site: 'https://tribeapp.com.au/', page: '/portfolio/tribe/',
    meta: [['Sector', 'Property and Lifestyle Technology']]
  }
];

const REGIONS = [
  { text: 'Group HQ in Singapore, scaling autonomous intelligence across South East Asia, India and Australia.', cities: [0, 1, 2], focus: [1.35, 103.82] },
  { text: 'Enterprise AI deployments and strategic partnerships across the Gulf region.', cities: [], focus: [25.2, 55.3] },
  { text: 'Capital integration and enterprise operating infrastructure for European markets.', cities: [4], focus: [51.5, -0.12] },
  { text: 'Deep-tech integration and scaling autonomous products across the Americas.', cities: [3], focus: [37.77, -122.42] }
];
const CITIES = [
  { name: 'Singapore', ll: [1.35, 103.82] },
  { name: 'Sydney', ll: [-33.87, 151.21] },
  { name: 'Bangalore', ll: [12.97, 77.59] },
  { name: 'San Francisco', ll: [37.77, -122.42] },
  { name: 'London', ll: [51.5, -0.12] }
];

const TICKER = [
  'Hunt Global — Singapore’s Global Technology Holding Group',
  '120+ team worldwide · 39+ patents filed · 4 operating regions',
  'Biltflow — BiltFlow OS™ connects every team, document, estimate and supplier',
  'HuntJobs — mobile apps on the App Store and Google Play',
  'Northstar — humanoid robotics from Singapore, Bangalore and San Francisco',
  'Insight — Enterprise AI and Institutional Governance',
  'Replaice — enterprise RAG, AI Agent Workspace, LLM gateway'
];

/* Visual state per section: background gradient, ink, orb colours & placement */
/* Every section is a stop on one journey. The globe travels between stops (left ↔ right) and,
   like blueyard.com, it is always one sphere whose MATERIAL changes with the story:
   gl = glitter core, mem = glass membrane, rb = flowing ribbons, pn = panels, hx = honeycomb, ir = iris of light. */
const M0 = { gl: 0, mem: 0, rb: 0, pn: 0, hx: 0, ir: 0 };
const STATES = {
  hero:         { ...M0, gl: 1, mem: .7, m1: '#9CC7FF', m2: '#ffffff', bg: ['#0b0d12', '#0b0d12', '#0b0d12'], ink: '#ffffff', a: '#ffffff', b: '#9CC7FF', c: '#5B9BFF', inner: '#1b2a4d', x: 0,     y: 0.12,  s: 1.0,  noise: 1.0, spread: 1.0, sat: 0, city: 0, alpha: .9, shape: 'sphere', glass: 1, spin: 1, tag: 'Start · Singapore' },
  house:        { ...M0, gl: 1, mem: .9, m1: '#ffb08f', m2: '#fff4e0', bg: ['#fadfc8', '#f3a38b', '#e4604f'], ink: '#17130f', a: '#ff4836', b: '#ffd6ae', c: '#fff4e0', inner: '#ff9c82', x: 0.6,   y: 0.02,  s: 1.12, noise: 1.2, spread: 1.0, sat: 0, city: 0, alpha: 1, shape: 'sphere', glass: 1, spin: 1, tag: 'One house · capital, technology, operations' },
  heart:        { ...M0, gl: .15, mem: .4, hx: .55, ir: 1, m1: '#6d5cff', m2: '#ffffff', bg: ['#d3c8ff', '#9585ff', '#4b3ac9'], ink: '#ffffff', a: '#c5d1ff', b: '#ffffff', c: '#9ff3ff', inner: '#5b4ae0', x: -0.6, y: 0,     s: 1.02, noise: 0.6, spread: 0.5, sat: 1, city: 0, alpha: 1, shape: 'sphere', glass: .5, spin: 1, tag: 'The Heart · an iris of agents' },
  portfolio:    { ...M0, gl: 1, mem: .8, m1: '#ff9090', m2: '#ffffff', bg: ['#ffe3d8', '#ffa08e', '#f6615a'], ink: '#17130f', a: '#ff3a58', b: '#ffd3ba', c: '#ffffff', inner: '#ff9090', x: 0.6,   y: 0.02,  s: 1.05, noise: 1.3, spread: 1.0, sat: 0, city: 0, alpha: 1, shape: 'sphere', glass: 1, spin: 1, tag: 'Five companies · one house' },
  // the five company chapters (sideways story) — each gets its own globe material + backdrop
  'pf-biltflow':  { ...M0, gl: .1, mem: .5, pn: 1, m1: '#9a7a52', m2: '#fff6ea', bg: ['#f8f1e6', '#ecdcc2', '#d2ad7c'], ink: '#17130f', a: '#c98a3a', b: '#fff1dc', c: '#ffffff', inner: '#e8cfa8', x: 0.6, y: 0.02, s: 1.05, noise: 0.4, spread: 0.4, sat: 0, city: 0, alpha: 1, shape: 'sphere', glass: .4, spin: 1, tag: 'Construction · built panel by panel' },
  'pf-replaice':  { ...M0, gl: .05, mem: .5, rb: 1, m1: '#4a7bd6', m2: '#f2f7ff', bg: ['#eef4fd', '#cfe0f7', '#8fb3ea'], ink: '#17130f', a: '#4a7bd6', b: '#e8f3ff', c: '#ffffff', inner: '#b9d0f2', x: 0.6, y: 0.02, s: 1.05, noise: 0.4, spread: 0.5, sat: 0, city: 0, alpha: 1, shape: 'sphere', glass: .5, spin: 1, tag: 'Autonomous agents · flowing data' },
  'pf-huntjobs':  { ...M0, gl: .4, mem: .6, hx: 1, m1: '#7b5cff', m2: '#ffffff', bg: ['#f4f2fe', '#ddd6fa', '#a996f0'], ink: '#17130f', a: '#8f73ff', b: '#f1ecff', c: '#ffffff', inner: '#cfc4fa', x: 0.6, y: 0.02, s: 1.05, noise: 0.8, spread: 0.7, sat: 0, city: 0, alpha: 1, shape: 'sphere', glass: .5, spin: 1, tag: 'Talent · every cell a match' },
  'pf-northstar': { ...M0, gl: .15, mem: .4, hx: .35, ir: 1, m1: '#b8860b', m2: '#fff4cf', bg: ['#fbf6e8', '#efdfb3', '#d9b45a'], ink: '#17130f', a: '#d4a020', b: '#fff4cf', c: '#ffffff', inner: '#ead08a', x: 0.6, y: 0.02, s: 1.05, noise: 0.6, spread: 0.5, sat: 0, city: 0, alpha: 1, shape: 'sphere', glass: .5, spin: 1, tag: 'Humanoids · a robot’s eye' },
  'pf-tribe':     { ...M0, gl: 1, mem: .9, m1: '#6a9a6f', m2: '#f4fff2', bg: ['#f2f6f0', '#d6e5cf', '#99c08e'], ink: '#17130f', a: '#5d9c62', b: '#eaffe6', c: '#ffffff', inner: '#c7dfc0', x: 0.6, y: 0.02, s: 1.05, noise: 1.1, spread: 0.9, sat: 0, city: 0, alpha: 1, shape: 'sphere', glass: 1, spin: 1, tag: 'Communities · many lights, one home' },
  investment:   { ...M0, gl: .1, mem: .5, rb: 1, m1: '#b8650a', m2: '#fff2c0', bg: ['#fdf3d6', '#f6d47e', '#e3993d'], ink: '#17130f', a: '#ff9814', b: '#fff2c0', c: '#ffffff', inner: '#f2b44a', x: 0.6,   y: 0.02,  s: 1.08, noise: 0.5, spread: 0.6, sat: 0, city: 0, alpha: 1, shape: 'sphere', glass: .6, spin: 1, tag: 'Permanent capital · flowing gold' },
  venture:      { ...M0, gl: .45, mem: .6, hx: 1, m1: '#8d45ff', m2: '#ffe6fb', bg: ['#f5dcff', '#c99dff', '#8a69ff'], ink: '#17130f', a: '#a14bff', b: '#ffd6f7', c: '#ffffff', inner: '#c79bff', x: -0.6,  y: 0,     s: 1.08, noise: 0.9, spread: 0.7, sat: 0, city: 0, alpha: 1, shape: 'sphere', glass: .5, spin: 1, tag: 'Venture building · cells that grow' },
  technology:   { ...M0, gl: .05, mem: .5, rb: 1, m1: '#5a5dff', m2: '#f3ecff', bg: ['#dfeaff', '#a0c1ff', '#5686ff'], ink: '#17130f', a: '#5a7dff', b: '#e8f3ff', c: '#9ff3ff', inner: '#9fb6ff', x: 0.6,   y: 0,     s: 1.08, noise: 0.3, spread: 0.5, sat: 0, city: 0, alpha: 1, shape: 'sphere', glass: .6, spin: 1, tag: 'IP at the core · iridescent data' },
  construction: { ...M0, gl: 0, mem: .4, pn: 1, m1: '#3e7a4a', m2: '#eaffd9', bg: ['#f1fbd9', '#c9ec8d', '#78c995'], ink: '#17130f', a: '#62b81e', b: '#f1ffd6', c: '#ffffff', inner: '#9fd27a', x: -0.6,  y: 0,     s: 1.08, noise: 0.3, spread: 0.4, sat: 0, city: 0, alpha: 1, shape: 'sphere', glass: .3, spin: 1, tag: 'BiltFlow OS™ · built panel by panel' },
  operate:      { ...M0, gl: 1, mem: .9, m1: '#cfc1b0', m2: '#ffffff', bg: ['#f6f1ea', '#e8dfd2', '#cfc1b0'], ink: '#17130f', a: '#2a2420', b: '#9c8a78', c: '#e8322a', inner: '#efe5d8', x: 0.62,  y: -0.05, s: 1.05, noise: 0.8, spread: 0.7, sat: 0, city: 0, alpha: 1, shape: 'sphere', glass: 1, spin: 1, tag: 'Four principles · conviction & discipline' },
  regions:      { ...M0, gl: 1, mem: .9, m1: '#9fb7ff', m2: '#ffffff', bg: ['#a9c6ff', '#4d6fe0', '#18226e'], ink: '#ffffff', a: '#bcd0ff', b: '#ffffff', c: '#ff5b4a', inner: '#3d5bd0', x: 0.58,  y: -0.05, s: 0.95, noise: 0.2, spread: 0.15, sat: 0, city: 1, alpha: 1, shape: 'globe', glass: 1, spin: 1, tag: 'The world · governed from Singapore' },
  governance:   { ...M0, gl: 0, mem: .5, pn: 1, m1: '#5c74a8', m2: '#ffffff', bg: ['#f1f3f8', '#d2dbe9', '#a6b5cf'], ink: '#17130f', a: '#6f86b3', b: '#ffffff', c: '#e8322a', inner: '#c5d2ea', x: -0.6,  y: -0.05, s: 1.05, noise: 0.3, spread: 0.3, sat: 0, city: 0, alpha: 1, shape: 'sphere', glass: .3, spin: 1, tag: 'Governance · armoured in silver' },
  contact:      { ...M0, gl: 1, mem: .8, m1: '#ffb08f', m2: '#fff4e0', bg: ['#fbeecf', '#f7c6a4', '#ee7c60'], ink: '#17130f', a: '#ff5a3c', b: '#ffc790', c: '#ffffff', inner: '#ffb08f', x: -0.05, y: -0.85, s: 1.0,  noise: 1.0, spread: 1.0, sat: 0, city: 0, alpha: 1, shape: 'sphere', glass: 1, spin: 1, tag: 'Journey complete · governed from Singapore' }
};

// The same script runs the home page and every sub page. A sub page has only some of the home page's
// parts, so an id lookup that finds nothing returns a detached stand-in instead of null (nothing breaks).
const $ = (s, el = document) => el.querySelector(s) || (s[0] === '#' && !s.includes(' ') ? document.createElement('div') : null);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const HOME = !document.body.classList.contains('pg');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = () => innerWidth < 760;

/* =========================================================
   STORY: the five companies as chapters of one sideways journey,
   and the practices as a "path" of the companies they power
   ========================================================= */
const STORY = {
  biltflow: { line: 'The AI operating system for construction.', loc: 'Global Operations', tint: '#efe3cf' },
  replaice: { line: 'Autonomous AI agents for enterprise growth.', loc: 'Bangalore', tint: '#dbe8fa' },
  huntjobs: { line: 'AI-powered talent matching at scale.', loc: 'Global Operations', tint: '#e5e0fb' },
  northstar: { line: 'Humanoids for industry.', loc: 'Singapore · Bangalore · San Francisco', tint: '#f3e6c4' },
  tribe: { line: 'The intelligent operating system for rental living.', loc: 'Global Operations', tint: '#dde8d8' }
};
const monoLogo = c => c.logo ? `<img src="${c.logo}" alt="${c.name}">` : `<span class="wordmark">${c.wordmark}</span>`;
{
  const track = $$('#pfTrack')[0];
  if (track) track.insertAdjacentHTML('beforeend', COMPANIES.map((c, i) => `
    <article class="pf-scene" data-state="pf-${c.id}" data-stop="${c.short || c.name}" style="--tint:${STORY[c.id].tint}">
      <div class="pf-in">
        <p class="pf-k mono"><i></i><span>${c.cat}</span></p>
        <h3 class="pf-name">${c.short || c.name}</h3>
        <p class="pf-line">${STORY[c.id].line}</p>
        <p class="pf-desc">${c.desc}</p>
        <dl class="pf-meta mono"><div><dt>Location</dt><dd>${STORY[c.id].loc}</dd></div><div><dt>Governance</dt><dd>Singapore HQ</dd></div></dl>
        <div class="pf-cta"><a class="link mono" href="${c.page}">Read the full story <span>&rarr;</span></a>${c.site ? `<a class="link mono" href="${c.site}" target="_blank" rel="noopener">Visit site <span>&nearr;</span></a>` : ''}</div>
      </div>
    </article>`).join(''));
  const road = $('#pfStops');
  if (road) road.innerHTML = ['Start', ...COMPANIES.map(c => c.short || c.name)].map((n, j) => `<li><button data-pf="${j}"><i></i><span>${n}</span></button></li>`).join('');
  // practices: the companies on that path, as a little timeline
  $$('.thread').forEach(box => {
    const list = box.dataset.companies.split(',').map(id => COMPANIES.find(c => c.id === id));
    box.innerHTML = `<p class="thread-h mono">On this path</p><div class="thread-line" aria-hidden="true"><i></i></div><ol>${list.map((c, k) => `
      <li><span class="t-dot" aria-hidden="true"></span><button class="t-card${c.logo ? "" : " no-logo"}" data-open="${c.id}" aria-label="${c.name} — read the story"><span class="t-tab mono">${c.cat}</span>${c.logo ? `<span class="t-logo">${monoLogo(c)}</span>` : `<span class="t-name">${c.short || c.name}</span>`}<span class="t-go" aria-hidden="true">&rarr;</span></button></li>`).join('')}</ol>`;
  });
}

/* =========================================================
   TEXT: split headings + scroll-read words
   ========================================================= */
$$('.split').forEach(el => {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w, i) => `<span class="w"><span style="--i:${i}">${w}</span></span>`).join(' ');
  el.setAttribute('aria-label', words.join(' '));
});
$$('[data-read]').forEach(el => {
  el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="rw">${w}</span>`).join(' ');
});
// stagger reveals inside the same parent
$$('.reveal').forEach(el => {
  const sibs = [...el.parentElement.children].filter(c => c.classList.contains('reveal'));
  el.style.setProperty('--d', `${(sibs.indexOf(el) % 5) * 90}ms`);
});

/* =========================================================
   PORTFOLIO cards (folder style)
   ========================================================= */
function logoHTML(c) {
  return c.logo ? `<img src="${c.logo}" alt="${c.name}" loading="lazy">` : `<span class="wordmark">${c.wordmark}</span>`;
}
function cardHTML(c) {
  return `<button class="card folder" data-id="${c.id}" data-filter="${c.filter}" aria-label="${c.name} — open details">
    <span class="tab mono">${c.cat}</span>
    <span class="c-logo">${logoHTML(c)}</span>
    <span class="c-desc">${c.desc}</span>
    <span class="c-foot"><span class="c-name">${c.short || c.name}</span><span class="c-more mono">Details +</span></span>
  </button>`;
}
if ($('#folders')) $('#folders').innerHTML = COMPANIES.map(cardHTML).join('');
$$('.mini-folders').forEach(box => {
  const ids = box.dataset.companies.split(',');
  box.innerHTML = ids.map(id => cardHTML(COMPANIES.find(c => c.id === id))).join('');
});
// speeds for parallax on main grid
$$('#folders .card').forEach((c, i) => { c.dataset.speed = [0.06, -0.08, 0.1, -0.05, 0.08][i] ?? 0; c.style.setProperty('--rot', ['-1.5deg', '1deg', '2deg', '-1deg', '1.5deg'][i]); });
$$('.mini-folders .card').forEach((c, i) => { if (i % 2) c.style.setProperty('--py', '40px'); });

// 3D tilt on hover
document.addEventListener('pointermove', e => {
  const card = e.target.closest?.('.card');
  if (!card || e.pointerType !== 'mouse') return;
  const r = card.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
  card.style.setProperty('--rx', `${(-py * 8).toFixed(2)}deg`);
  card.style.setProperty('--ry', `${(px * 10).toFixed(2)}deg`);
});
document.addEventListener('pointerout', e => {
  const card = e.target.closest?.('.card');
  if (card && !card.contains(e.relatedTarget)) { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); }
});

// filters
$$('.portfolio .filters button').forEach(b => b.addEventListener('click', () => {
  $$('.portfolio .filters button').forEach(x => x.classList.toggle('on', x === b));
  const f = b.dataset.filter;
  $$('#folders .card').forEach(c => c.classList.toggle('dim', f !== 'all' && c.dataset.filter !== f));
  orbKick(0.6);
}));

/* =========================================================
   DRAWER
   ========================================================= */
const drawer = $('#drawer');
let dIdx = 0, lastFocus = null;
function openDrawer(id) {
  dIdx = COMPANIES.findIndex(c => c.id === id);
  fillDrawer();
  lastFocus = document.activeElement;
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('locked');
  setTimeout(() => $('.drawer-x').focus(), 50);
  orbKick(1);
}
function fillDrawer() {
  const c = COMPANIES[dIdx];
  $('#dTab').textContent = c.cat;
  // the name appears once: the logo when there is one (title kept for screen readers), else the title
  $('#dLogo').innerHTML = c.logo ? logoHTML(c) : '';
  $('#dLogo').hidden = !c.logo;
  $('#dTitle').textContent = c.name;
  $('#dTitle').classList.toggle('sr', !!c.logo);
  $('#dDesc').textContent = c.desc;
  $('#dMeta').innerHTML = c.meta.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('') + `<dt>Governed</dt><dd>From Singapore HQ</dd>`;
  $('#dLinks').innerHTML =
    (c.site ? `<a href="${c.site}" target="_blank" rel="noopener">Visit website ↗</a>` : '') +
    `<a class="ghost" href="${c.page}">Full story →</a>`;
}
function closeDrawer() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('locked');
  lastFocus?.focus?.();
}
document.addEventListener('click', e => {
  const card = e.target.closest('.card');
  if (card) openDrawer(card.dataset.id);
  const op = e.target.closest('[data-open]');
  if (op) openDrawer(op.dataset.open);
  if (e.target.closest('[data-close]')) closeDrawer();
});
$('#dPrev').onclick = () => { dIdx = (dIdx + COMPANIES.length - 1) % COMPANIES.length; fillDrawer(); };
$('#dNext').onclick = () => { dIdx = (dIdx + 1) % COMPANIES.length; fillDrawer(); };

/* =========================================================
   MENU, COUNTER, TICKER
   ========================================================= */
const chapters = $$('section[data-chapter]');
$('#cTot').textContent = String(chapters.length).padStart(2, '0');
// the menu is the site map (written by build.mjs on every page)
const menu = $('#menu'), menuBtn = $('#menuBtn');
function setMenu(open) {
  menu.hidden = !open;
  menuBtn.setAttribute('aria-expanded', open);
  if (open) $('#menuClose').focus();
}
menuBtn.onclick = () => setMenu(menu.hidden);
$('#menuClose').onclick = () => setMenu(false);
menu.addEventListener('click', e => { if (e.target.closest('a[href^="#"]')) setMenu(false); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { setMenu(false); if (drawer.classList.contains('open')) closeDrawer(); }
  if (drawer.classList.contains('open')) {
    if (e.key === 'ArrowRight') $('#dNext').click();
    if (e.key === 'ArrowLeft') $('#dPrev').click();
  }
});
document.addEventListener('click', e => {
  if (!menu.hidden && !menu.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
});

let curChapter = 0;
const goChapter = i => chapters[Math.max(0, Math.min(chapters.length - 1, i))].scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
$('#cUp').onclick = () => goChapter(curChapter - (window.scrollY > chapters[curChapter].offsetTop + 40 ? 0 : 1));
$('#cDown').onclick = () => goChapter(curChapter + 1);

const tickerHTML = TICKER.map(t => `<span>${t}</span>`).join('');
$('#tickerMove').innerHTML = tickerHTML + tickerHTML;
$('#tickerX').onclick = () => $('#ticker').classList.add('off');

/* =========================================================
   PRINCIPLES accordion, regions, insights, forms
   ========================================================= */
$$('#principles li').forEach(li => li.querySelector('button').addEventListener('click', () => {
  $$('#principles li').forEach(x => x.classList.toggle('open', x === li ? !x.classList.contains('open') : false));
}));

const regionText = $('#regionText');
function setRegion(i) {
  $$('.region-tabs button').forEach(b => b.classList.toggle('on', +b.dataset.region === i));
  regionText.textContent = REGIONS[i].text;
  $$('#cities button').forEach(b => b.classList.toggle('on', REGIONS[i].cities.includes(+b.dataset.city)));
  focusLatLon(REGIONS[i].focus);
}
$$('.region-tabs button').forEach(b => b.onclick = () => setRegion(+b.dataset.region));
$$('#cities button').forEach(b => b.onclick = () => {
  const i = +b.dataset.city;
  $$('#cities button').forEach(x => x.classList.toggle('on', x === b));
  focusLatLon(CITIES[i].ll);
  orbKick(0.5);
});

$$('#insFilters button').forEach(b => b.onclick = () => {
  $$('#insFilters button').forEach(x => x.classList.toggle('on', x === b));
  const f = b.dataset.ins;
  let shown = 0;
  $$('#insList .ins-card').forEach(c => { const v = f === 'all' || c.dataset.type === f; c.hidden = !v; shown += v; });
  $('#insList .ins-empty').hidden = shown > 0;
});

$('#enquiry').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const subject = `${f.get('topic')} — ${f.get('company') || f.get('name')}`;
  const body = `Name: ${f.get('name')}\nEmail: ${f.get('email')}\nCompany: ${f.get('company') || '-'}\nEnquiry: ${f.get('topic')}\n\n${f.get('message')}`;
  location.href = `mailto:hello@huntglobal.co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  $('#formNote').textContent = 'Your email app should now be open with the enquiry ready to send.';
});
$('#news').addEventListener('submit', e => {
  e.preventDefault();
  const v = $('#newsEmail').value;
  location.href = `mailto:hello@huntglobal.co?subject=${encodeURIComponent('Newsletter subscription')}&body=${encodeURIComponent('Please subscribe: ' + v)}`;
});

/* =========================================================
   REVEALS + COUNT-UPS
   ========================================================= */
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  en.target.classList.add('in');
  if (en.target.matches('.stat')) countUp(en.target.querySelector('b'));
  io.unobserve(en.target);
}), { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
$$('.reveal, .split, .badges').forEach(el => io.observe(el));
$$('#badges li').forEach((li, i) => { li.style.setProperty('--d', `${i * 80}ms`); li.style.setProperty('--r', `${[-2, 1.5, -1, 2, -1.5, 1, -2][i]}deg`); });

function countUp(el) {
  const to = +el.dataset.count, suf = el.dataset.suffix || '';
  if (reduceMotion) { el.textContent = to + suf; return; }
  const t0 = performance.now(), dur = 1600;
  const step = t => {
    const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.round(to * e) + suf;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* The Heart — live counters */
let tasks = 140283, msgs = 892105;
const fmt = n => n.toLocaleString('en-US');
setInterval(() => {
  tasks += 1 + Math.floor(Math.random() * 3);
  msgs += 3 + Math.floor(Math.random() * 11);
  $('#tasks').textContent = fmt(tasks);
  $('#msgs').textContent = fmt(msgs);
  const i = Math.floor(Math.random() * 5);
  const li = $$('#agents li')[i];
  if (!li) return;
  li.classList.add('flash'); setTimeout(() => li.classList.remove('flash'), 420);
  satPulse[i] = 1;
}, 1100);

/* =========================================================
   CURSOR
   ========================================================= */
const cursor = $('#cursor');
let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
const mouse = { x: 0, y: 0 };
addEventListener('pointermove', e => {
  tx = e.clientX; ty = e.clientY;
  mouse.x = e.clientX / innerWidth * 2 - 1; mouse.y = -(e.clientY / innerHeight * 2 - 1);
  cursor.classList.toggle('hover', !!e.target.closest?.('a, button, .card, label, input, textarea'));
});

/* =========================================================
   WEBGL — the travelling ball
   ========================================================= */
const NOISE = `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

let renderer, scene, camera, orb, globe, sats, satMeshes = [], markers = [], arcs = [], pointsMat, innerMat, ringMat, geo, skinMat;
const satPulse = [0, 0, 0, 0, 0];
const cur = { x: 0, y: 0.12, s: 1, noise: 1, spread: 1, sat: 0, city: 0, alpha: 1, glass: 1, spin: 1, kick: 0, gl: 1, mem: .7, rb: 0, pn: 0, hx: 0, ir: 0 };
const col = { a: new THREE.Color('#ffffff'), b: new THREE.Color('#9CC7FF'), c: new THREE.Color('#5B9BFF'), inner: new THREE.Color('#1b2a4d') };
const mat = { m1: new THREE.Color('#9CC7FF'), m2: new THREE.Color('#ffffff') };
let focusQ = null;
const satLabels = $('#satLabels');
const SAT_NAMES = ['Biltflow', 'Replaice', 'HuntJobs', 'Northstar', 'Group HQ'];
const N_CORE = isMobile() ? 6500 : 30000, N_SHELL = isMobile() ? 700 : 3200, NP = N_CORE + N_SHELL;

function llToVec(lat, lon, r = 1) {
  const phi = (90 - lat) * Math.PI / 180, th = (lon + 180) * Math.PI / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
}
function focusLatLon([lat, lon]) {
  if (!globe) return;
  const dir = llToVec(lat, lon).normalize();
  focusQ = new THREE.Quaternion().setFromUnitVectors(dir, new THREE.Vector3(0, 0.25, 1).normalize());
}
function orbKick(v) { cur.kick = Math.max(cur.kick, v); }

/* ---------- shapes the ball can become ---------- */
const SHAPES = {};
const clampN = (v, a, b) => Math.max(a, Math.min(b, v));
function fromList(list, size = 4) {
  const M = list.length / 3, out = new Float32Array(NP * 3);
  let a = 1e9, b = -1e9, c = 1e9, d = -1e9;
  for (let j = 0; j < M; j++) { const x = list[j * 3], y = list[j * 3 + 1]; a = Math.min(a, x); b = Math.max(b, x); c = Math.min(c, y); d = Math.max(d, y); }
  const cx = (a + b) / 2, cy = (c + d) / 2, k = size / (Math.max(b - a, d - c) || 1);
  for (let i = 0; i < NP; i++) { const j = (Math.random() * M) | 0; out[i * 3] = (list[j * 3] - cx) * k; out[i * 3 + 1] = (list[j * 3 + 1] - cy) * k; out[i * 3 + 2] = list[j * 3 + 2] * k; }
  return out;
}
const fib = (n, r, out = [], cx = 0, cy = 0, cz = 0) => { const ga = Math.PI * (3 - Math.sqrt(5)); for (let i = 0; i < n; i++) { const y = 1 - 2 * (i + .5) / n, rr = Math.sqrt(1 - y * y), t = ga * i; out.push(cx + Math.cos(t) * rr * r, cy + y * r, cz + Math.sin(t) * rr * r); } return out; };
const seg = (out, a, b, n, j = .02) => { for (let i = 0; i < n; i++) { const t = Math.random(); out.push(a[0] + (b[0] - a[0]) * t + (Math.random() - .5) * j, a[1] + (b[1] - a[1]) * t + (Math.random() - .5) * j, a[2] + (b[2] - a[2]) * t + (Math.random() - .5) * j); } };
function sampleCanvas(cv, worldW, depth, test) { const ctx = cv.getContext('2d'), W = cv.width, H = cv.height, dt = ctx.getImageData(0, 0, W, H).data, L = []; const st = Math.max(2, Math.round(Math.sqrt(W * H / 60000))); for (let y = 0; y < H; y += st) for (let x = 0; x < W; x += st) { const k = (y * W + x) * 4; if (test(dt[k], dt[k + 1], dt[k + 2], dt[k + 3])) L.push((x - W / 2) / W * worldW, -(y - H / 2) / W * worldW, (Math.random() - .5) * depth); } return L; }
function buildShapes(spherePos) {
  const P = NP;
  SHAPES.sphere = spherePos;
  { const cv = document.createElement('canvas'); cv.width = 1040; cv.height = 980; const ctx = cv.getContext('2d'); ctx.setTransform(.2, 0, 0, -.2, 0, 980); ctx.fillStyle = '#fff'; $$('#hgMark path').forEach(p => ctx.fill(new Path2D(p.getAttribute('d')))); SHAPES.hg = fromList(sampleCanvas(cv, 5, .45, (r, g, b, a) => a > 128), 3.7); }
  { const L = fib(Math.round(P * .3), .85), v = new THREE.Vector3(); [[.3, 0, 1.7], [1.1, .4, 2.1], [-.7, 1.2, 2.4], [.2, 2.1, 2.7], [1.5, -.8, 3]].forEach(([rx, rz, R]) => { const e = new THREE.Euler(rx, 0, rz); for (let i = 0; i < P * .14; i++) { const a = Math.random() * 6.283; v.set(Math.cos(a) * R, (Math.random() - .5) * .04, Math.sin(a) * R).applyEuler(e); L.push(v.x, v.y, v.z); } }); SHAPES.core = fromList(L, 4.3); }
  { const L = fib(Math.round(P * .32), .75), nodes = []; for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * Math.PI * 2 / 5; nodes.push([Math.cos(a) * 1.9, -Math.sin(a) * 1.9, 0]); } nodes.forEach(n => { fib(Math.round(P * .1), .42, L, ...n); seg(L, [0, 0, 0], n, P * .025, .03); }); nodes.forEach((n, k) => seg(L, n, nodes[(k + 1) % 5], P * .012)); SHAPES.five = fromList(L, 4.4); }
  { const L = []; for (let i = 0; i < 10; i++) { const x = (i - 4.5) * .46, h = .35 * Math.pow(1.27, i), base = -1.7, n = Math.round(P * .075 * (.4 + h / 3.2)); for (let k = 0; k < n; k++) { const f = Math.random(); let px = x + (Math.random() - .5) * .32, py = base + Math.random() * h; if (f < .5) px = x + (Math.random() < .5 ? -.16 : .16); else if (f < .7) py = base + h; L.push(px, py, (Math.random() - .5) * .32); } } for (let i = 0; i < P * .12; i++) { const t = Math.random() * 9; L.push((t - 4.5) * .46, -1.7 + .35 * Math.pow(1.27, t) + .35, 0); } SHAPES.bars = fromList(L, 4.2); }
  { const nodes = [[0, 0, 0, .75], [-2, 1.1, .3, .42], [1.9, 1.3, -.2, .5], [-1.7, -1.3, .2, .38], [1.8, -1.2, .4, .5], [0, 2.2, -.4, .32], [0, -2.2, .3, .32]], L = [], tot = nodes.reduce((s, n) => s + n[3] * n[3], 0); nodes.forEach(n => fib(Math.round(P * .7 * n[3] * n[3] / tot), n[3], L, n[0], n[1], n[2])); nodes.slice(1).forEach(n => seg(L, nodes[0], n, P * .04, .03)); [[1, 5], [2, 5], [3, 6], [4, 6], [1, 3], [2, 4]].forEach(([a, b]) => seg(L, nodes[a], nodes[b], P * .012)); SHAPES.cluster = fromList(L, 4.3); }
  { const L = [], Q = 1.6; for (let i = 0; i < P * .32; i++) L.push(Math.round((Math.random() - .5) * 18) / 10, Math.round((Math.random() - .5) * 18) / 10, .05); [[[-Q, -Q, 0], [Q, -Q, 0]], [[Q, -Q, 0], [Q, Q, 0]], [[Q, Q, 0], [-Q, Q, 0]], [[-Q, Q, 0], [-Q, -Q, 0]]].forEach(([a, b]) => seg(L, a, b, P * .04)); for (let k = 0; k < 12; k++) { const o = -1.4 + k * (2.8 / 11); seg(L, [o, Q, 0], [o, Q + .55, 0], P * .006); seg(L, [o, -Q, 0], [o, -Q - .55, 0], P * .006); seg(L, [Q, o, 0], [Q + .55, o, 0], P * .006); seg(L, [-Q, o, 0], [-Q - .55, o, 0], P * .006); } const c = Math.cos(-.5), s = Math.sin(-.5); for (let i = 0; i < L.length; i += 3) { const y = L[i + 1], z = L[i + 2]; L[i + 1] = y * c - z * s; L[i + 2] = y * s + z * c; } SHAPES.chip = fromList(L, 4); }
  { const L = [], base = -1.8; [[-2.5, .6, 1.5], [-1.7, .7, 2.8], [-.85, .55, 2], [0, .8, 3.5], [.95, .6, 2.4], [1.75, .7, 3], [2.55, .5, 1.3]].forEach(([x, w, h]) => { const n = Math.round(P * .1 * h / 2.4); for (let k = 0; k < n; k++) L.push(x + Math.round((Math.random() - .5) * w / .12) * .12, base + Math.round(Math.random() * h / .16) * .16, (Math.random() - .5) * .05); seg(L, [x - w / 2, base, 0], [x - w / 2, base + h, 0], P * .01); seg(L, [x + w / 2, base, 0], [x + w / 2, base + h, 0], P * .01); seg(L, [x - w / 2, base + h, 0], [x + w / 2, base + h, 0], P * .008); }); seg(L, [3.2, base, 0], [3.2, 2.5, 0], P * .03); seg(L, [1.6, 2.5, 0], [4.1, 2.5, 0], P * .03); seg(L, [2.2, 2.5, 0], [2.2, 1.6, 0], P * .008); seg(L, [-3.4, base, 0], [4.2, base, 0], P * .04); SHAPES.skyline = fromList(L, 4.6); }
  { const L = []; [-2.1, -.7, .7, 2.1].forEach(x => { for (let i = 0; i < P * .22; i++) { const a = Math.random() * 6.283; L.push(x + Math.cos(a) * .36, -1.8 + Math.random() * 3.6, Math.sin(a) * .36); } }); seg(L, [-2.8, -1.85, 0], [2.8, -1.85, 0], P * .06, .08); seg(L, [-2.8, 1.9, 0], [2.8, 1.9, 0], P * .06, .08); SHAPES.pillars = fromList(L, 4.2); }
  { const L = [], sd = (px, py, ax, ay, bx, by) => { const dx = bx - ax, dy = by - ay, t = clampN(((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy), 0, 1); return Math.hypot(px - ax - dx * t, py - ay - dy * t); }; while (L.length < 50000 * 3) { const x = (Math.random() - .5) * 3.4, y = -2.3 + Math.random() * 4.1, w = y > -.2 ? 1.6 - Math.max(0, y - 1.4) * .6 : 1.6 * Math.sqrt(Math.max(0, (y + 2.2) / 2)); if (Math.abs(x) > w || y > 1.7) continue; if (Math.min(sd(x, y, -.7, .05, -.15, -.6), sd(x, y, -.15, -.6, .85, .8)) < .17) continue; if (!(w - Math.abs(x) < .08 || y > 1.62) && Math.random() < .35) continue; L.push(x, y, (Math.random() - .5) * .25); } SHAPES.shield = fromList(L, 3.9); }
  SHAPES.globe = spherePos; // replaced by real land once the map loads
  const img = new Image(); img.onload = () => {
    const W = 1024, H = 512, cv = document.createElement('canvas'); cv.width = W; cv.height = H; const ctx = cv.getContext('2d'); ctx.drawImage(img, 0, 0, W, H); const d = ctx.getImageData(0, 0, W, H).data;
    const L = [], M = 60000, ga = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < M; i++) { const y = 1 - 2 * (i + .5) / M, rr = Math.sqrt(1 - y * y), t = ga * i, x = Math.cos(t) * rr, z = Math.sin(t) * rr, lat = 90 - Math.acos(y) * 180 / Math.PI; let lon = Math.atan2(z, -x) * 180 / Math.PI - 180; if (lon < -180) lon += 360; const px = clampN(((lon + 180) / 360 * W) | 0, 0, W - 1), py = clampN(((90 - lat) / 180 * H) | 0, 0, H - 1); if (d[(py * W + px) * 4] < 100 || Math.random() < .04) L.push(x * 2, y * 2, z * 2); }
    const out = new Float32Array(NP * 3), M2 = L.length / 3; for (let i = 0; i < NP; i++) { const j = (Math.random() * M2) | 0; out.set([L[j * 3], L[j * 3 + 1], L[j * 3 + 2]], i * 3); }
    SHAPES.globe = out; pairKey = ''; // force the buffers to refresh
  };
  img.src = '/assets/earth-water.png';
}

function initGL() {
  const canvas = $('#gl');
  renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile(), alpha: true, powerPreference: 'high-performance' });
  // resolution: phones start lighter; an auto-quality loop (in frame) lowers/raises it to keep scrolling smooth
  const PR_MAX = isMobile() ? 1.25 : Math.min(devicePixelRatio, 1.75); renderer.setPixelRatio(PR_MAX); renderer.userData = { prMax: PR_MAX };
  renderer.setSize(innerWidth, innerHeight, false);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.1, 100);
  camera.position.z = 10;
  orb = new THREE.Group(); scene.add(orb);
  globe = new THREE.Group(); orb.add(globe);

  // base sphere (core + drifting shell sparkles), radius 2
  const sph = new Float32Array(NP * 3), rnd = new Float32Array(NP), shell = new Float32Array(NP);
  const ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < NP; i++) {
    let x, y, z;
    if (i < N_CORE) { const t = i / N_CORE, yy = 1 - 2 * t, r = Math.sqrt(1 - yy * yy), th = ga * i, depth = 1 - Math.pow(Math.random(), 3) * 0.25; x = Math.cos(th) * r * depth; y = yy * depth; z = Math.sin(th) * r * depth; }
    else { const v = new THREE.Vector3().randomDirection(); x = v.x; y = v.y; z = v.z; shell[i] = 1; }
    sph.set([x * 2, y * 2, z * 2], i * 3); rnd[i] = Math.random();
  }
  buildShapes(sph);
  geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(sph.slice(), 3));
  geo.setAttribute('aA', new THREE.BufferAttribute(sph.slice(), 3));
  geo.setAttribute('aB', new THREE.BufferAttribute(sph.slice(), 3));
  geo.setAttribute('aRand', new THREE.BufferAttribute(rnd, 1));
  geo.setAttribute('aShell', new THREE.BufferAttribute(shell, 1));

  pointsMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: {
      uTime: { value: 0 }, uNoise: { value: 1 }, uSpread: { value: 1 }, uSize: { value: 2.9 }, uAB: { value: 0 }, uRound: { value: 1 },
      uPixel: { value: renderer.getPixelRatio() }, uAlpha: { value: 1 }, uCore: { value: 1 }, uTrail: { value: new THREE.Vector3() },
      uA: { value: col.a }, uB: { value: col.b }, uC: { value: col.c }
    },
    vertexShader: `
      uniform float uTime, uNoise, uSpread, uSize, uPixel, uAB, uRound; uniform vec3 uTrail;
      attribute vec3 aA; attribute vec3 aB; attribute float aRand; attribute float aShell;
      varying float vN; varying float vRand; varying float vFres; varying float vBack; varying float vShellA; varying float vSh; varying float vTw;
      ${NOISE}
      void main(){
        float m = clamp(uAB * 1.6 - aRand * 0.6, 0.0, 1.0); m = m * m * (3.0 - 2.0 * m);
        vec3 base = mix(aA, aB, m);
        vec3 dir = normalize(base + vec3(0.0001));
        float n = snoise(dir * 1.5 + vec3(0.0, uTime * 0.12, uTime * 0.05));
        float n2 = snoise(dir * 4.2 - uTime * 0.22);
        float life = fract(aRand * 13.37 + uTime * (0.025 + aRand * 0.03));
        vec3 p = base + dir * ((n * uNoise * 0.12 + n2 * 0.02 * uNoise) * 2.0 + aShell * (0.06 + life * 0.85 * uSpread) * 2.0);
        // while travelling between stops the particles loosen into a swarm
        float travel = sin(m * 3.14159);
        p += vec3(n, n2, snoise(dir * 2.0 + uTime * 0.1)) * travel * 0.45;
        // comet tail: the back half of the glitter lags behind while the globe travels
        p += uTrail * aRand * aRand * (1.0 + aShell);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float sz = mix(0.55 + aRand * 0.9, 0.7 + aRand * 1.4, aShell);
        gl_PointSize = uSize * uPixel * sz * (10.0 / -mv.z);
        vN = n * 0.5 + 0.5 + n2 * 0.18; vRand = aRand;
        vec3 nrm = normalize(normalMatrix * dir);
        vFres = mix(0.7, 1.0 - abs(nrm.z), uRound); vBack = step(nrm.z, 0.0) * uRound;
        vShellA = mix(1.0, (1.0 - life) * 0.9, aShell); vSh = aShell; vTw = pow(fract(aRand * 91.7 + uTime * (0.25 + aRand * 0.6)), 10.0);
      }`,
    fragmentShader: `
      uniform vec3 uA, uB, uC; uniform float uAlpha, uCore; varying float vSh; varying float vTw;
      varying float vN; varying float vRand; varying float vFres; varying float vBack; varying float vShellA;
      void main(){
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.05, d);
        vec3 col = mix(uA, uB, smoothstep(0.25, 0.85, vN));
        col = mix(col, uC, step(0.965, vRand)); col = mix(col, vec3(1.0), vTw * 0.85);
        float alpha = a * uAlpha * vShellA * (0.5 + vFres * 0.5) * mix(1.0, 0.32, vBack) * mix(uCore, max(uCore, 0.6), vSh) * (0.75 + vTw * 1.2);
        gl_FragColor = vec4(col, alpha);
      }`
  });
  const points = new THREE.Points(geo, pointsMat);
  points.frustumCulled = false; points.renderOrder = 2;
  globe.add(points);

  innerMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uInner: { value: col.inner }, uB: { value: col.b }, uAlpha: { value: 1 } },
    vertexShader: `varying vec3 vN; varying vec3 vV;
      void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`,
    fragmentShader: `uniform vec3 uInner, uB; uniform float uAlpha; varying vec3 vN; varying vec3 vV;
      void main(){ float f = pow(1.0 - max(dot(vN, vV), 0.0), 2.2);
        vec3 c = mix(uInner, uB, f * 0.9 + vN.y * 0.12);
        gl_FragColor = vec4(c, (0.22 + f * 0.6) * uAlpha); }`
  });
  const inner = new THREE.Mesh(new THREE.SphereGeometry(1.94, isMobile() ? 40 : 64, isMobile() ? 40 : 64), innerMat);
  inner.renderOrder = 1; orb.add(inner);

  // the skin: one sphere whose material changes per stop (BlueYard-style)
  skinMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { tLogo: { value: null }, uLogoA: { value: -1 }, uLogoB: { value: -1 }, uLogoMix: { value: 0 }, uLogoC: { value: new THREE.Color('#ffffff') }, uLite: { value: isMobile() ? 1 : 0 }, uTime: { value: 0 }, uMem: { value: 1 }, uRb: { value: 0 }, uPn: { value: 0 }, uHx: { value: 0 }, uIr: { value: 0 }, uAlpha: { value: 1 }, uM1: { value: mat.m1 }, uM2: { value: mat.m2 } },
    vertexShader: `varying vec3 vP; varying vec3 vNv; varying vec3 vV;
      void main(){ vP = normalize(position); vec4 mv = modelViewMatrix * vec4(position, 1.0); vNv = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `
      uniform float uTime, uMem, uRb, uPn, uHx, uIr, uAlpha, uLite; uniform vec3 uM1, uM2;
      uniform sampler2D tLogo; uniform float uLogoA, uLogoB, uLogoMix; uniform vec3 uLogoC;
      float logoAt(float idx, vec2 lp){ if (idx < -0.5) return 0.0; vec2 uv = vec2(lp.x / 1.3 + 0.5, lp.y / 0.65 + 0.5); if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return 0.0; return texture2D(tLogo, vec2((idx + uv.x) / 5.0, uv.y)).a; }
      varying vec3 vP; varying vec3 vNv; varying vec3 vV;
      ${NOISE}
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      vec3 film(float x){ return 0.5 + 0.5 * cos(6.2831 * (x + vec3(0.0, 0.33, 0.67))); }
      void main(){
        vec3 N = normalize(vNv), V = normalize(vV), P = vP; float t = uTime;
        float ndv = max(dot(N, V), 0.0), fr = pow(1.0 - ndv, 2.4);
        vec3 L1 = normalize(vec3(-0.45, 0.65, 0.8)), L2 = normalize(vec3(0.7, -0.2, 0.6));
        float hv = max(dot(N, normalize(L1 + V)), 0.0); float spec = pow(hv, 300.0) * 0.45 + pow(hv, 18.0) * 0.05;
        vec3 col = vec3(0.0); float a = 0.0;
        // glass membrane — soft rim + highlights (always a little present)
        col += (mix(uM1, vec3(1.0), 0.55) * fr * 1.1 + vec3(spec)) * uMem;
        a += (fr * 0.75 + spec * 0.7) * uMem;
        // flowing ribbons (liquid metal / iridescent data)
        if (uRb > 0.001) {
          vec3 q = P * 1.1; float n0 = snoise(P * 0.8 + t * 0.05); q += (uLite > 0.5 ? vec3(n0, n0 * 0.8, -n0) : vec3(n0, snoise(P * 0.9 - t * 0.04), snoise(P * 0.7 + t * 0.035))) * 0.3;
          float w = (q.y + q.x * 0.3) * 3.4 + (uLite > 0.5 ? n0 * 0.2 : snoise(q * 0.9 + t * 0.05) * 0.28);
          float band = abs(sin(w * 6.2831)), fine = abs(sin(w * 6.2831 * 3.0 + (uLite > 0.5 ? n0 * 1.2 : snoise(q * 3.0) * 1.5)));
          float line = smoothstep(0.78, 1.0, band), thin = smoothstep(0.94, 1.0, fine);
          vec3 ir = film(fr * 1.3 + w * 0.12 + t * 0.03);
          vec3 c = mix(uM1, uM2, line * 0.8 + thin * 0.2) * 0.8 + ir * 0.16 * (0.4 + fr);
          col += (c * (0.55 + line * 0.9 + thin * 0.6) + vec3(spec) * 1.4 + ir * fr * 0.5) * uRb;
          a += clamp(0.18 + line * 0.7 + thin * 0.45 + fr * 0.45, 0.0, 1.0) * uRb;
        }
        // panels with glowing seams (built / armoured)
        if (uPn > 0.001) {
          float lon = atan(P.z, P.x), lat = asin(clamp(P.y, -1.0, 1.0));
          vec2 g = vec2(lon / 3.14159 * 30.0, lat / 1.5708 * 15.0); g.x += step(0.5, fract(floor(g.y) * 0.5)) * 0.5;
          vec2 cell = floor(g), f = fract(g); float h = hash(cell);
          float e = min(min(f.x, 1.0 - f.x), min(f.y, 1.0 - f.y));
          float sx = (1.0 - smoothstep(0.0, 0.035, min(f.x, 1.0 - f.x))) * step(0.45, hash(cell + 3.1)); float sy = (1.0 - smoothstep(0.0, 0.035, min(f.y, 1.0 - f.y))) * step(0.4, hash(cell + 7.7)); float seam = max(sx, sy);
          float lit = smoothstep(0.86, 1.0, fract(h * 7.13 + t * 0.07));
          float slit = step(0.7, h) * (1.0 - smoothstep(0.0, 0.08, abs(f.y - 0.5))) * step(0.12, f.x) * step(f.x, 0.88) * (0.6 + 0.4 * sin(t * 2.0 + h * 40.0));
          vec3 chrome = mix(uM1, uM2, clamp(0.58 + N.y * 0.34 + fr * 0.25 + (h - 0.5) * 0.06, 0.0, 1.0)) + vec3(spec) * 1.6 + film(fr * 0.8 + 0.55) * fr * 0.18;
          col += (chrome * (1.0 - seam * 0.28) + vec3(0.85, 0.93, 1.0) * (slit * 1.1 + seam * lit * 0.6)) * uPn;
          a += (0.86 + seam * 0.12) * uPn;
        }
        // honeycomb bubble (cells)
        if (uHx > 0.001) {
          float lon = atan(P.z, P.x), lat = asin(clamp(P.y, -1.0, 1.0));
          vec2 p = vec2(lon * 8.0, lat * 8.0 / 0.866);
          vec2 r = vec2(1.0, 1.732), h2 = r * 0.5;
          vec2 a1 = mod(p, r) - h2, b1 = mod(p - h2, r) - h2;
          vec2 gv = dot(a1, a1) < dot(b1, b1) ? a1 : b1;
          vec2 ag = abs(gv); float hd = max(dot(ag, normalize(vec2(1.0, 1.732))), ag.x);
          float edge = smoothstep(0.40, 0.47, hd);
          vec3 c = mix(uM1, uM2, fr) + film(fr + 0.25) * 0.25;
          col += (c * edge * 1.3 + uM2 * fr * 0.5 + vec3(spec)) * uHx;
          a += (edge * (0.4 + fr * 0.6) + fr * 0.3 + spec * 0.6) * uHx;
        }
        // iris of light (always faces you)
        if (uIr > 0.001) {
          vec2 s = N.xy; float rr = length(s), an = atan(s.y, s.x);
          float fib = snoise(vec3(an * 9.0, rr * 4.0 - t * 0.35, t * 0.1)) * 0.5 + 0.5;
          float fib2 = uLite > 0.5 ? fract(sin(floor(an * 24.0) * 43.1) * 437.5) * 0.6 + fib * 0.4 : snoise(vec3(an * 24.0, rr * 2.0, t * 0.2)) * 0.5 + 0.5;
          float ring = smoothstep(0.17, 0.25, rr) * (1.0 - smoothstep(0.82, 0.98, rr));
          float pupil = 1.0 - smoothstep(0.15, 0.19, rr);
          vec3 c = mix(uM1, uM2, fib) * (0.45 + fib2 * 0.9) * ring + vec3(1.0) * pow(fib2, 6.0) * ring * 0.9;
          c += uM1 * pupil * 0.25 + uM2 * fr * 0.4;
          col += c * uIr; a += (ring * (0.5 + fib * 0.45) + pupil * 0.75 + fr * 0.25) * uIr;
        }
        // the project's own logo, glowing on the face of the globe (faces you, curves with the sphere)
        if (uLogoA > -0.5 || uLogoB > -0.5) {
          vec2 lp = N.xy * 1.08;
          float face = smoothstep(0.25, 0.55, N.z);
          float lg = mix(logoAt(uLogoA, lp), logoAt(uLogoB, lp), uLogoMix) * face;
          float halo = mix(logoAt(uLogoA, lp * 0.96), logoAt(uLogoB, lp * 0.96), uLogoMix) * face;
          col = mix(col, uLogoC, lg * 0.95) + uM2 * max(halo - lg, 0.0) * 0.35;
          a = max(a, lg * 0.97);
        }
        gl_FragColor = vec4(col, clamp(a, 0.0, 1.0) * uAlpha);
      }`
  });
  const skin = new THREE.Mesh(new THREE.SphereGeometry(2.03, isMobile() ? 72 : 128, isMobile() ? 72 : 128), skinMat);
  skin.renderOrder = 3; globe.add(skin);

  // satellites for "The Heart"
  sats = new THREE.Group(); orb.add(sats);
  ringMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false });
  for (let i = 0; i < 5; i++) {
    const tilt = new THREE.Group(); tilt.rotation.set(0.35 + i * 0.32, i * 1.25, 0.2 * i);
    const R = 2.55 + i * 0.16;
    tilt.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(new THREE.EllipseCurve(0, 0, R, R).getPoints(96).map(p => new THREE.Vector3(p.x, 0, p.y))), ringMat));
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.075, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false }));
    m.userData = { R, speed: 0.22 + i * 0.05, phase: i * 1.3 }; tilt.add(m); sats.add(tilt); satMeshes.push(m);
    const lab = document.createElement('div'); lab.className = 'sat'; lab.innerHTML = `<b>●</b>${SAT_NAMES[i]}`; satLabels.appendChild(lab); m.userData.label = lab;
  }

  // city markers + arcs from Singapore
  const sg = llToVec(1.35, 103.82, 2.04);
  CITIES.forEach((c, i) => {
    const v = llToVec(c.ll[0], c.ll[1], 2.04);
    const mk = new THREE.Mesh(new THREE.SphereGeometry(i === 0 ? 0.07 : 0.05, 16, 16), new THREE.MeshBasicMaterial({ color: 0xff4b3a, transparent: true, opacity: 0, depthWrite: false }));
    mk.position.copy(v);
    const halo = new THREE.Mesh(new THREE.RingGeometry(0.08, 0.11, 32), new THREE.MeshBasicMaterial({ color: 0xff4b3a, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false }));
    halo.position.copy(v); halo.lookAt(v.clone().multiplyScalar(2));
    globe.add(mk, halo); markers.push({ mk, halo, v });
    if (i > 0) {
      const mid = sg.clone().add(v).multiplyScalar(0.5); mid.setLength(2.04 + sg.distanceTo(v) * 0.35);
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(new THREE.QuadraticBezierCurve3(sg, mid, v).getPoints(60)), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthWrite: false }));
      globe.add(line); arcs.push(line);
    }
  });
}

/* =========================================================
   THE JOURNEY — stops, route, position
   ========================================================= */
// sections AND the five company chapters inside the sideways portfolio ride, in page order
const stops = $$('section[data-state], .pf-scene[data-state]');
const SKEYS = stops.map(s => s.dataset.state);
const ST_LIST = SKEYS.map(k => STATES[k]);
let WP = [], WA = [], WB = [];      // centre, hold-start, hold-end (document-y of the viewport centre) per stop
let pfST = null;                    // the pinned sideways ride (set up further down)
const plateau = t => { const u = clampN((t - 0.2) / 0.6, 0, 1); return u * u * (3 - 2 * u); };   // rest at stops, travel between
const docY = el => el.getBoundingClientRect().top + scrollY;
function measureStops() {
  const pfEls = [$('#portfolio'), ...$$('.pf-scene[data-state]')];
  WA = []; WB = [];
  WP = stops.map((s, i) => {
    let c, hold = 0;
    const k = pfEls.indexOf(s);
    if (k >= 0 && pfST) {                                       // a chapter of the sideways ride: rest while its panel is centred
      const span = (pfST.end - pfST.start) / (pfEls.length - 1);
      c = pfST.start + k * span + innerHeight / 2; hold = span * 0.24;
    } else if (i === 0) c = docY(s) + s.offsetHeight - innerHeight * 0.5;   // hero: leave once the pinned hero is done
    else { const top = docY(s), h = s.offsetHeight; c = top + Math.min(h, innerHeight * 1.4) / 2 + Math.max(0, h - innerHeight * 1.4) / 2; }
    WA.push(c - hold); WB.push(c + hold); return c;
  });
}
function journeyAt(y) {               // y = document y of the viewport centre → 0 … stops-1
  const n = WP.length - 1;
  if (y <= WB[0]) return 0;
  for (let i = 1; i <= n; i++) {
    if (y < WA[i]) return i - 1 + (y - WB[i - 1]) / Math.max(1, WA[i] - WB[i - 1]);
    if (y <= WB[i]) return i;
  }
  return n;
}
const sideX = st => isMobile() ? 0 : st.x;
function xAt(j) { const i = Math.min(Math.floor(j), ST_LIST.length - 2), t = plateau(j - i); return sideX(ST_LIST[i]) + (sideX(ST_LIST[i + 1]) - sideX(ST_LIST[i])) * t; }

/* the drawn route: a line that snakes left ↔ right from start to end */
const routeSvg = $('#route'), ghost = $('#routeGhost'), fill = $('#routeFill'), stopsG = $('#routeStops');
let routeY = [], routeLen = [];
const tallScale = () => { const a = innerWidth / innerHeight; return a >= 1.3 ? 1 : Math.max(.55, .55 + (a - .7) * .75); };
function ballRadiusPx(st) { const halfHw = Math.tan(THREE.MathUtils.degToRad(17.5)) * 10; return st.s * (isMobile() ? 1 : tallScale()) * 2 / halfHw * innerHeight / 2; }
function drawRoute() {
  measureStops();
  const W = innerWidth, H = document.documentElement.scrollHeight;
  routeSvg.setAttribute('width', W); routeSvg.setAttribute('height', H); routeSvg.style.height = H + 'px';
  let d = '', len = 0, px = 0, py = 0; routeY = []; routeLen = [];
  const y0 = WP[0], y1 = WP[WP.length - 1];
  for (let y = y0; y <= y1 + 1; y += 10) {
    const X = W / 2 * (1 + xAt(journeyAt(y)));
    if (d) len += Math.hypot(X - px, y - py);
    d += (d ? ' L' : 'M') + X.toFixed(1) + ' ' + y.toFixed(1);
    routeY.push(y); routeLen.push(len); px = X; py = y;
  }
  ghost.setAttribute('d', d); fill.setAttribute('d', d);
  fill.style.strokeDasharray = `0 ${len + 10}`;
  stopsG.innerHTML = stops.map((s, i) => {
    const st = ST_LIST[i], X = W / 2 * (1 + sideX(st)), Y = WP[i], r = ballRadiusPx(st);
    const first = i === 0, last = i === stops.length - 1;
    const quiet = true;   // stop markers only — text labels collided with page text on small/short screens
    const label = s.dataset.stop || '';
    const ly = last ? Y - r - 40 : Y + r + 34;
    return `<g class="stop${first ? ' start' : ''}${last ? ' end' : ''}" data-i="${i}" transform="translate(${X.toFixed(1)} ${Y.toFixed(1)})">
      <circle class="ring" r="11"/><circle class="dot" r="4"/>
      ${quiet ? '' : `<line class="stop-line" x1="0" y1="${(ly - Y - 16).toFixed(1)}" x2="0" y2="14"/>`}
      ${quiet ? '' : `<text x="0" y="${(ly - Y).toFixed(1)}" text-anchor="middle">${label}</text><text class="tag" x="0" y="${(ly - Y + 16).toFixed(1)}" text-anchor="middle" opacity=".55">${st.tag}</text>`}
    </g>`;
  }).join('');
}
function routeProgress(yc) {
  if (!routeY.length) return 0;
  if (yc <= routeY[0]) return 0;
  const n = routeY.length - 1; if (yc >= routeY[n]) return routeLen[n];
  const k = Math.min(n - 1, Math.floor((yc - routeY[0]) / 10)), f = (yc - routeY[k]) / 10;
  return routeLen[k] + (routeLen[k + 1] - routeLen[k]) * f;
}

/* buffers for the pair of shapes we are travelling between */
let pairKey = '';
function setPair(i0, i1) {
  const key = SKEYS[i0] + '>' + SKEYS[i1] + (SHAPES.globe ? SHAPES.globe.length : 0);
  if (key === pairKey || !geo) return; pairKey = key;
  geo.attributes.aA.array.set(SHAPES[ST_LIST[i0].shape] || SHAPES.sphere); geo.attributes.aA.needsUpdate = true;
  geo.attributes.aB.array.set(SHAPES[ST_LIST[i1].shape] || SHAPES.sphere); geo.attributes.aB.needsUpdate = true;
}

const tmpV = new THREE.Vector3(), camDir = new THREE.Vector3(), IDQ = new THREE.Quaternion(), tA = new THREE.Color(), tB = new THREE.Color();
let last = performance.now(), scrollVel = 0, lastScroll = scrollY, jS = 0;
let lastArrive = 0, prevOrb = new THREE.Vector3(), trail = new THREE.Vector3(); const qInv = new THREE.Quaternion();
const NUMS = ['x', 'y', 's', 'noise', 'spread', 'sat', 'city', 'alpha', 'glass', 'spin', 'gl', 'mem', 'rb', 'pn', 'hx', 'ir'];

/* auto quality: if frames get slow (older phones), drop the globe's render resolution a step; climb back when smooth */
let aqT = 0, aqN = 0, aqGood = 0;
function setPR(v) { renderer.setPixelRatio(v); renderer.setSize(innerWidth, innerHeight, false); pointsMat.uniforms.uPixel.value = v; }
function autoQuality(dt) {
  aqT += dt; aqN++;
  if (aqT < 1.2) return;
  const ms = aqT / aqN * 1000; aqT = 0; aqN = 0;
  const pr = renderer.getPixelRatio(), max = renderer.userData.prMax;
  if (ms > 26 && pr > 0.6) { setPR(Math.max(0.6, +(pr - 0.2).toFixed(2))); aqGood = 0; }
  else if (ms < 17.5) { if (++aqGood >= 3 && pr < max) { setPR(Math.min(max, +(pr + 0.15).toFixed(2))); aqGood = 0; } }
  else aqGood = 0;
  document.documentElement.dataset.pr = renderer.getPixelRatio();
}

function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  const t = now / 1000;
  const k = 1 - Math.pow(0.0015, dt);
  scrollVel += ((scrollY - lastScroll) - scrollVel) * 0.15; lastScroll = scrollY;

  if (renderer && WP.length) {
    const mob = isMobile(), motion = reduceMotion ? 0 : 1;
    const jT = journeyAt(scrollY + innerHeight / 2);
    jS += (jT - jS) * (reduceMotion ? 1 : k * 1.15);
    const i0 = Math.min(Math.floor(jS), ST_LIST.length - 2), i1 = i0 + 1, f = plateau(jS - i0);
    const A = ST_LIST[i0], B = ST_LIST[i1];
    setPair(i0, i1);
    pointsMat.uniforms.uAB.value = f;
    // every look parameter blends continuously along the route
    const tgt = {};
    NUMS.forEach(n => tgt[n] = A[n] + (B[n] - A[n]) * f);
    tgt.x = xAt(jS);
    if (mob) { tgt.y *= 0.6; tgt.s *= 0.62; tgt.sat = 0; tgt.alpha *= (A === STATES.hero && f < .5) ? 1 : 0.55; }
    else if (camera.aspect < 1.3) { tgt.s *= tallScale(); }   // tablets / tall windows: smaller globe so it never covers the text
    NUMS.forEach(n => cur[n] = n === 'x' ? tgt.x : cur[n] + (tgt[n] - cur[n]) * k);
    cur.kick *= Math.pow(0.04, dt);
    col.a.copy(tA.set(A.a).lerp(tB.set(B.a), f)); col.b.copy(tA.set(A.b).lerp(tB.set(B.b), f));
    col.c.copy(tA.set(A.c).lerp(tB.set(B.c), f)); col.inner.copy(tA.set(A.inner).lerp(tB.set(B.inner), f));
    mat.m1.copy(tA.set(A.m1).lerp(tB.set(B.m1), f)); mat.m2.copy(tA.set(A.m2).lerp(tB.set(B.m2), f));

    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z, halfW = halfH * camera.aspect;
    orb.position.set(cur.x * halfW, cur.y * halfH, 0);
    { // velocity → tail (in the swarm’s own space)
      const v = tmpV.copy(orb.position).sub(prevOrb).divideScalar(Math.max(dt, 1e-3)); prevOrb.copy(orb.position);
      globe.getWorldQuaternion(qInv).invert(); v.applyQuaternion(qInv).divideScalar(Math.max(orb.scale.x, .3));
      trail.lerp(v.multiplyScalar(-0.22).clampLength(0, 2.6), 0.12); pointsMat.uniforms.uTrail.value.copy(trail);
    }
    orb.scale.setScalar(cur.s * (1 + Math.sin(t * 0.8) * 0.012 + cur.kick * 0.05));
    orb.rotation.x += ((mouse.y * 0.18) - orb.rotation.x) * 0.04;
    orb.rotation.y += ((mouse.x * 0.25) - orb.rotation.y) * 0.04;

    pointsMat.uniforms.uTime.value = t * motion;
    pointsMat.uniforms.uNoise.value = cur.noise + Math.min(1.2, Math.abs(scrollVel) * 0.015) + cur.kick;
    pointsMat.uniforms.uSpread.value = cur.spread + cur.kick * 0.6;
    pointsMat.uniforms.uAlpha.value = cur.alpha; pointsMat.uniforms.uCore.value = cur.gl;
    { const u = skinMat.uniforms; const la = LOGO_IDX[SKEYS[i0]] ?? -1, lb = LOGO_IDX[SKEYS[i1]] ?? -1; u.uLogoA.value = la; u.uLogoB.value = lb; u.uLogoMix.value = f; u.uLogoC.value.set(LOGO_INK[SKEYS[f < .5 ? i0 : i1]] || '#ffffff'); u.uTime.value = t * motion; u.uMem.value = cur.mem; u.uRb.value = cur.rb; u.uPn.value = cur.pn; u.uHx.value = cur.hx; u.uIr.value = cur.ir; u.uAlpha.value = mob ? 0.32 : 1; }
    pointsMat.uniforms.uRound.value = cur.glass;
    innerMat.uniforms.uAlpha.value = cur.alpha * cur.glass;

    // spin round things; turn flat things to face us
    if (cur.city > 0.5 && focusQ) globe.quaternion.slerp(focusQ, 1 - Math.pow(0.02, dt));
    else if (cur.spin > 0.5) globe.rotation.y += dt * 0.12 * motion;
    else { globe.quaternion.slerp(IDQ, 1 - Math.pow(0.05, dt)); }

    ringMat.opacity = cur.sat * 0.35;
    camera.getWorldDirection(camDir);
    satMeshes.forEach((m, i) => {
      const u = m.userData, a = t * u.speed * motion + u.phase;
      m.position.set(Math.cos(a) * u.R, 0, Math.sin(a) * u.R);
      satPulse[i] *= Math.pow(0.05, dt); m.scale.setScalar(1 + satPulse[i] * 1.8); m.material.opacity = cur.sat;
      m.getWorldPosition(tmpV); tmpV.project(camera);
      u.label.style.transform = `translate(${(tmpV.x * 0.5 + 0.5) * innerWidth + 16}px, ${(-tmpV.y * 0.5 + 0.5) * innerHeight - 9}px)`;
      u.label.style.opacity = tmpV.z < 1 ? (0.55 + satPulse[i] * 0.45) : 0;
    });
    satLabels.classList.toggle('on', cur.sat > 0.4);
    markers.forEach(({ mk, halo }, i) => {
      mk.getWorldPosition(tmpV);
      const nn = tmpV.clone().sub(orb.position).normalize();
      const facing = THREE.MathUtils.smoothstep(nn.dot(new THREE.Vector3(0, 0, 1)), -0.1, 0.35);
      mk.material.opacity = cur.city * facing; mk.visible = halo.visible = cur.city > 0.01;
      const pulse = (t * 0.8 + i * 0.2) % 1;
      halo.scale.setScalar(1 + pulse * 2.2); halo.material.opacity = cur.city * facing * (1 - pulse) * 0.9;
    });
    arcs.forEach(l => { l.material.opacity = cur.city * 0.55; l.visible = cur.city > 0.01; }); sats.visible = cur.sat > 0.01;

    // route: fill up to where the ball is, light the stop it rests at
    // (the route line is hidden, so no per-frame route work)
    const near = Math.round(jS), resting = Math.abs(jS - near) < 0.18;
    // arriving at a stop: burst the glitter and tell the page (ripple, labels…)
    if (resting && near !== lastArrive) {
      lastArrive = near; orbKick(1.25);
      tmpV.copy(orb.position).project(camera);
      dispatchEvent(new CustomEvent("hg:arrive", { detail: { i: near, x: (tmpV.x * .5 + .5) * innerWidth, y: (-tmpV.y * .5 + .5) * innerHeight, r: ballRadiusPx(ST_LIST[near]) * (mob ? .62 : 1), ink: ST_LIST[near].ink, name: stops[near].dataset.stop || "" } }));
    }
    if (Math.abs(jS - near) > 0.32) lastArrive = -1;
    autoQuality(dt);

    renderer.render(scene, camera);
  }
  cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22;
  cursor.style.transform = `translate(${cx}px, ${cy}px)`;
  requestAnimationFrame(frame);
}

/* =========================================================
   SCROLL — page colour, chapter counter, read text, parallax
   ========================================================= */
const chaptersAll = chapters;
const root = document.documentElement;
let activeState = '';
function applyState(name) {
  if (name === activeState) return;
  activeState = name;
  const s = STATES[name];
  root.style.setProperty('--bg1', s.bg[0]); root.style.setProperty('--bg2', s.bg[1]); root.style.setProperty('--bg3', s.bg[2]); root.style.setProperty('--ink', s.ink); root.style.setProperty('--acc', s.b);
  if (name === 'regions' && !focusQ) setRegion(0);
  orbKick(0.35);
}
const heroEl = $('#hero'), heroBg = $('#heroBg');
function onScroll() {
  const mid = innerHeight * 0.5;
  if (WP.length) applyState(SKEYS[Math.min(SKEYS.length - 1, Math.floor(journeyAt(scrollY + mid) + 0.6))]);
  // the hero video sits under the ball: let it scroll away with the hero
  const heroEnd = heroEl.offsetTop + heroEl.offsetHeight - innerHeight;
  const off = Math.max(0, scrollY - heroEnd);
  heroBg.style.transform = `translate3d(0, ${-off}px, 0)`;
  heroBg.style.visibility = off > innerHeight ? 'hidden' : 'visible';
  document.body.classList.toggle('in-hero', scrollY < heroEnd + innerHeight * 0.3);
  let ci = 0;
  chaptersAll.forEach((s, i) => { if (s.getBoundingClientRect().top <= mid) ci = i; });
  if (ci !== curChapter || !$('#cNum').dataset.set) {
    curChapter = ci; $('#cNum').dataset.set = 1;
    $('#cNum').textContent = String(ci + 1).padStart(2, '0');
    if (chaptersAll[ci]) $('#cName').textContent = chaptersAll[ci].dataset.chapter;
  }
  $$('[data-read]').forEach(el => {
    const r = el.getBoundingClientRect();
    const p = (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35);
    const words = el.children; let lit = Math.floor(Math.max(0, Math.min(1, p)) * words.length * 1.05);
    // once read, words stay lit while scrolling back up; they reset only when the heading is fully below the screen
    if (r.top > innerHeight) el._lit = 0; else { el._lit = Math.max(el._lit || 0, lit); lit = el._lit; }
    for (let i = 0; i < words.length; i++) words[i].classList.toggle('lit', i < lit);
  });
  if (!isMobile() && !reduceMotion) {
    $$('#folders .card').forEach(c => { const r = c.getBoundingClientRect(); c.style.setProperty('--py', `${((r.top + r.height / 2 - innerHeight / 2) * +c.dataset.speed).toFixed(1)}px`); });
  }
}
let ticking = false;
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { onScroll(); ticking = false; }); } }, { passive: true });
let rT; addEventListener('resize', () => {
  if (renderer) { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight, false); }
  clearTimeout(rT); rT = setTimeout(() => { drawRoute(); onScroll(); }, 150);
});
new ResizeObserver(() => { clearTimeout(rT); rT = setTimeout(() => { ScrollTrigger.refresh(); drawRoute(); }, 200); }).observe(document.body);

/* =========================================================
   HERO (from Sample 4) — loader, intro, video frame, floating cards
   ========================================================= */
const gsap = window.gsap, ScrollTrigger = window.ScrollTrigger; gsap.registerPlugin(ScrollTrigger);
const TINT = { biltflow: 'var(--t-sand)', replaice: 'var(--t-sky)', huntjobs: 'var(--t-lav)', northstar: 'var(--t-gold)', tribe: 'var(--t-sage)' };
const FLOAT_POS = [[12, 22, -5], [78, 18, 4], [8, 58, 3], [84, 54, -4], [70, 76, 2]];
COMPANIES.forEach((c, i) => {
  const el = document.createElement('a');
  el.className = 'fcard'; el.style.background = TINT[c.id]; el.dataset.tab = c.cat; el.href = '#portfolio';
  el.style.left = FLOAT_POS[i][0] + '%'; el.style.top = FLOAT_POS[i][1] + '%';
  el.innerHTML = `<div class="fl">${c.logo ? `<img src="${c.logo}" alt="">` : `<span class="wm">${c.wordmark}</span>`}</div><div class="fn"><span class="sr">${c.short || c.name}</span><i>↗</i></div>`;
  el.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); openDrawer(c.id); });
  $('#floaters').appendChild(el);
  gsap.set(el, { rotation: FLOAT_POS[i][2], opacity: 0, y: 60 });
  el._float = gsap.to(el, { y: '-=14', duration: 2.6 + i * .3, yoyo: true, repeat: -1, ease: 'sine.inOut', paused: true });
});
const floaters = $$('.fcard');
addEventListener('pointermove', e => { const mx = e.clientX / innerWidth - .5; floaters.forEach((f, i) => gsap.to(f, { x: mx * (20 + i * 8), duration: 1.2, ease: 'power3.out', overwrite: 'auto' })); });

function heroCount(el) { const to = +el.dataset.hcount, suf = el.dataset.suf || '', o = { v: 0 }; gsap.to(o, { v: to, duration: 2, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(o.v) + suf; } }); }
function intro() {
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .to('.hero-h .ln > span', { y: 0, yPercent: 0, duration: 1.6, stagger: .12 }, 0)
    .fromTo('.eyebrow4 i', { scaleX: 0 }, { scaleX: 1, duration: 1.2 }, .2)
    .fromTo(['.eyebrow4', '.hero-row'], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.2, stagger: .15 }, .4)
    .fromTo('#heroStats', { yPercent: 100 }, { yPercent: 0, duration: 1.2 }, .5)
    .add(() => $$('#heroStats b').forEach(heroCount), .7)
    .add(() => gsap.to(floaters, { opacity: 1, y: 0, duration: 1.4, stagger: .12, ease: 'expo.out', onComplete() { floaters.forEach(f => f._float.play()); } }), .6)
    .fromTo('#heroMark', { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: 1.6 }, .2);
  orbKick(1);
}
if (HOME) {
gsap.timeline({ scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom bottom', scrub: .6 } })
  .to('#heroMedia', { clipPath: 'inset(14% 7% 22% 7%)', ease: 'none' }, 0)
  .to('#heroVideo', { scale: 1, ease: 'none' }, 0)
  .to('#heroCopy', { yPercent: -40, opacity: 0, ease: 'none', duration: .45 }, 0)
  .to('#heroStats', { yPercent: 100, opacity: 0, ease: 'none', duration: .3 }, 0)
  .fromTo('#heroAfter', { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: 'none', duration: .4 }, .55);
gsap.to('#heroMark', { opacity: 0, scale: .6, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: '25% top', scrub: true } });
gsap.timeline({ scrollTrigger: { trigger: '#hero', start: 'top top', end: '40% top', scrub: true } })
  .to(floaters, { yPercent: i => [-260, -320, -180, -240, -200][i], xPercent: i => [-60, 60, -80, 80, 40][i], ease: 'none' }, 0)
  .to('#floaters', { opacity: 0, ease: 'none' }, 0);
}
/* =========================================================
   PORTFOLIO — the sideways story ride (one chapter per company)
   ========================================================= */
{
  const track = $$('#pfTrack')[0], scenes = $$('.pf-scene', track || document), roadBtns = $$('#pfStops button'), fillBar = $('#pfFill');
  // one entrance timeline per chapter. A chapter animates ONCE, the first time you reach it going forward;
  // going back it simply stays visible (no hide, no replay). Everything resets only when you scroll back
  // above the whole Companies section, so it can play again next time down.
  const tls = scenes.map((sc, j) => {
    if (j === 0 || reduceMotion) return null;
    const q = s => $$(s, sc);
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
      .fromTo(q('.pf-k'), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: .8 }, 0)
      .fromTo(q('.pf-name'), { opacity: 0, yPercent: 60, y: 0, rotate: 3 }, { opacity: 1, yPercent: 0, y: 0, rotate: 0, duration: 1.2 }, .12)
      .fromTo(q('.pf-line, .pf-desc, .pf-meta, .pf-cta'), { opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0 0 -20% 0)', duration: 1, stagger: .08 }, .25);
    tl.progress(1).progress(0);
    return tl;
  });
  const played = new Set();
  const showAll = () => tls.forEach((t, k) => { if (t) { played.add(k); t.progress(1); } });
  const resetAll = () => { played.clear(); tls.forEach(t => t && t.pause(0)); };
  let activePf = -1;
  const playScene = j => {
    if (j === activePf) return; activePf = j;
    roadBtns.forEach((b, k) => { b.classList.toggle('on', k === j); b.classList.toggle('done', k < j); });
    for (let k = 1; k <= j; k++) {
      if (!tls[k] || played.has(k)) continue;
      played.add(k);
      if (k === j) tls[k].restart(); else tls[k].progress(1);   // skipped chapters (fast scroll / jump) just appear
    }
  };
  if (track && !isMobile() && !reduceMotion) {
    /* Desktop/tablet: the section is a tall block whose inner panel is CSS-sticky (handled by the browser
       itself, so it can never lag behind a fast scroll or sit on top of another section). Chapters sit on
       top of each other in that panel and change IN PLACE: text left, globe right — nothing slides under the globe. */
    document.documentElement.classList.add('pf-desk');
    const sec = $('#portfolio'), n = scenes.length;
    sec.style.height = `calc(100vh + ${(n - 1) * 85}vh)`;
    pfST = { get start() { return docY(sec); }, get end() { return docY(sec) + sec.offsetHeight - innerHeight; } };
    scenes.forEach((sc, k) => gsap.set(sc, { autoAlpha: k === 0 ? 1 : 0 }));
    let shown = 0;
    const switchTo = (j, dir) => {
      if (j === shown) return;
      const prev = scenes[shown];
      scenes.forEach((sc, k) => { if (k !== j && k !== shown) { gsap.killTweensOf(sc); gsap.set(sc, { autoAlpha: 0, y: 0 }); } });   // fast scroll: nothing in between stays
      gsap.killTweensOf(prev); gsap.to(prev, { autoAlpha: 0, y: dir > 0 ? -36 : 36, duration: .3, ease: 'power2.in' });
      const next = scenes[j]; gsap.killTweensOf(next);
      gsap.fromTo(next, { autoAlpha: 0, y: dir > 0 ? 36 : -36 }, { autoAlpha: 1, y: 0, duration: .55, delay: .28, ease: 'expo.out' });
      shown = j;
      if (dir > 0) playScene(j);                                        // first time going forward: full entrance
      else { activePf = j; if (tls[j]) { played.add(j); tls[j].progress(1); } }   // going back: just there
    };
    let ticking = false;
    const update = () => {
      ticking = false;
      const range = pfST.end - pfST.start, p = clampN((scrollY - pfST.start) / Math.max(1, range), 0, 1);
      const j = Math.round(p * (n - 1));
      if (j !== shown) switchTo(j, j > shown ? 1 : -1);
      if (scrollY + innerHeight < pfST.start) { if (played.size) { resetAll(); activePf = -1; } }   // section fully below the screen: replay next time
      else if (scrollY > pfST.end && played.size < n - 1) showAll();
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener('resize', update); update();
    roadBtns.forEach(b => b.addEventListener('click', () => { const j = +b.dataset.pf; scrollTo({ top: pfST.start + j / (n - 1) * (pfST.end - pfST.start) + 2, behavior: 'smooth' }); }));
  } else if (track) {
    // phones: chapters stack vertically and play as they arrive
    scenes.forEach((sc, j) => {
      const t = tls[j]; if (!t) return;
      const st = ScrollTrigger.create({ trigger: sc, start: 'top 85%', end: 'bottom top',
        onEnter: () => { if (!played.has(j)) { played.add(j); t.restart(); } },
        onEnterBack: () => { played.add(j); if (t.progress() < 1) t.progress(1); } });   // scrolling up: just show it
      ScrollTrigger.create({ trigger: sc, start: 'top bottom', onLeaveBack: () => { played.delete(j); t.pause(0); } });   // fully below the screen again
      if (st.progress > 0) { played.add(j); t.progress(1); }
    });
  }
}

const sgFmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Singapore', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
setInterval(() => { $('#sgt').textContent = sgFmt.format(new Date()); }, 1000);

/* live local time for any [data-tz] element (sub pages: cities, contact) */
const tzEls = $$('[data-tz]');
if (tzEls.length) {
  const fmts = {}, tick = () => tzEls.forEach(el => { const tz = el.dataset.tz; (fmts[tz] ||= new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false })); el.textContent = fmts[tz].format(new Date()); });
  tick(); setInterval(tick, 15000);
}

/* page-to-page: every internal link stays in this site, with a short fade out */
document.addEventListener('click', e => {
  const a = e.target.closest?.('a[href]');
  if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
  const url = new URL(a.href, location.href);
  if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return;
  e.preventDefault();
  document.body.classList.add('leaving');
  setTimeout(() => { location.href = url.href; }, reduceMotion ? 0 : 300);
});
addEventListener('pageshow', e => { if (e.persisted) document.body.classList.remove('leaving'); });

function bootPage() {   // sub pages: no loader, the page fades in and the journey starts at once
  drawRoute(); ScrollTrigger.refresh(); onScroll();
  orbKick(1);
}

function boot() {
  if (!HOME) return bootPage();
  document.body.classList.add('locked');
  const lp = { v: 0 };
  const tl = gsap.timeline();
  tl.to('.draw-mark path', { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', stagger: .2 }, 0)
    .to('.draw-mark .orbit', { strokeDashoffset: 0, duration: 1.8, ease: 'power3.inOut' }, .1)
    .to('.draw-mark .orbit-dot', { rotation: 360, duration: 1.8, ease: 'power3.inOut', svgOrigin: '226 297' }, .1)
    .to('.draw-mark path', { fill: '#000', duration: .5 }, 1.5)
    .from('.loader-word > *', { yPercent: 120, duration: .9, stagger: .1, ease: 'expo.out' }, 1.1)
    .to(lp, { v: 100, duration: 2.1, ease: 'power2.inOut', onUpdate: () => { $('#lpct').textContent = String(Math.round(lp.v)).padStart(3, '0'); } }, 0);
  const ready = Promise.all([
    Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 2500))]),
    new Promise(r => { const v = $('#heroVideo'); if (v.readyState >= 3) r(); else { v.addEventListener('canplay', r, { once: true }); setTimeout(r, 3000); } })
  ]);
  Promise.all([ready, new Promise(r => tl.eventCallback('onComplete', r))]).then(() => {
    gsap.to('#loader', { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut', onComplete: () => $('#loader').remove() });
    gsap.to('.loader-mark, .loader-word', { y: -60, opacity: 0, duration: .7, ease: 'power3.in' });
    document.body.classList.remove('locked');
    gsap.delayedCall(.45, intro);
    drawRoute(); ScrollTrigger.refresh(); onScroll();
  });
}

/* logo atlas: the five company marks, white on transparent, one cell each (same order as COMPANIES) */
const LOGO_IDX = Object.fromEntries(COMPANIES.map((c, i) => ['pf-' + c.id, i]));
const LOGO_INK = { 'pf-biltflow': '#2b2014', 'pf-replaice': '#ffffff', 'pf-huntjobs': '#33247f', 'pf-northstar': '#ffffff', 'pf-tribe': '#1f3a22' };
function buildLogoAtlas() {
  const CW = 512, CH = 256, atlas = document.createElement('canvas'); atlas.width = CW * 5; atlas.height = CH;
  const actx = atlas.getContext('2d'), tex = new THREE.CanvasTexture(atlas);
  tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  skinMat.uniforms.tLogo.value = tex;
  COMPANIES.forEach((c, i) => {
    const cell = document.createElement('canvas'); cell.width = CW; cell.height = CH; const x = cell.getContext('2d');
    const finish = () => { x.globalCompositeOperation = 'source-in'; x.fillStyle = '#fff'; x.fillRect(0, 0, CW, CH); actx.drawImage(cell, i * CW, 0); tex.needsUpdate = true; };
    if (!c.logo) { x.fillStyle = '#fff'; x.font = '800 54px "Instrument Sans", sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.letterSpacing = '9px'; x.fillText(c.wordmark, CW / 2, CH / 2); finish(); return; }
    const img = new Image(); img.onload = () => {
      const k = Math.min((CW * .86) / img.naturalWidth, (CH * .62) / img.naturalHeight), w = img.naturalWidth * k, h = img.naturalHeight * k;
      x.drawImage(img, (CW - w) / 2, (CH - h) / 2, w, h);
      // keep only the dark ink of the logo (drop white boxes), then paint it white
      const d = x.getImageData(0, 0, CW, CH); for (let p = 0; p < d.data.length; p += 4) { const l = .3 * d.data[p] + .59 * d.data[p + 1] + .11 * d.data[p + 2]; if (l > 235) d.data[p + 3] = 0; } x.putImageData(d, 0, 0);
      finish();
    };
    img.src = c.logo;
  });
}

try { initGL(); } catch (err) { console.warn('WebGL unavailable — continuing without the ball', err); renderer = null; }
if (renderer) buildLogoAtlas();
drawRoute(); onScroll();
requestAnimationFrame(frame);
boot();
