// Hunt Global — Sample 9 sub-page generator.
// Every page of huntglobal.co (sitemap, 2026-11-13) rebuilt in the v9 journey design: each page is a run of
// sections the same travelling globe moves through (data-state = a key of STATES in main.js).
// All copy comes from the live huntglobal.co pages. Run:  node build.mjs
// It writes the sub-page folders and also refreshes the shared menu + footer inside index.html.
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname } from 'node:path';

const V = 24;   // cache-bust version for css/js

/* ======================= DATA (huntglobal.co) ======================= */
const COMPANIES = [
  { slug: 'biltflow', story: 'One intelligent agentic workflow.', state: 'pf-biltflow', name: 'Biltflow', cat: 'Construction Intelligence', logo: '/assets/biltflow.svg', loc: 'Global Operations', site: 'https://biltflow.com/', siteLabel: 'Visit Biltflow',
    desc: 'The AI operating system for construction — BiltFlow OS™ connects every team, document, estimate, and supplier into one intelligent agentic workflow, from site discovery to project closeout.',
    head: 'The AI operating system for construction.',
    body: ['BiltFlow OS™ is designed to unify the fragmented construction industry. By connecting every team, document, estimate, and supplier into a single intelligent agentic workflow, we bring unprecedented transparency and control to complex projects.', 'Operating globally, Biltflow provides commercial intelligence, data modeling, and operational oversight, orchestrating everything from site discovery to project closeout.'],
    chips: ['BiltFlow OS™', 'Agentic workflow', 'Commercial intelligence', 'Data modeling', 'Operational oversight'] },
  { slug: 'replaice-technologies', story: 'Enterprise-grade autonomous systems.', state: 'pf-replaice', name: 'Replaice Technologies', short: 'Replaice', cat: 'Technology and Engineering', logo: '/assets/replaice.png', loc: 'Bangalore', site: 'https://replaice.ai/', siteLabel: 'Visit Replaice',
    desc: 'Autonomous AI Agents for enterprise growth — agentic CRM/ERP/HRMS/DMS systems, enterprise RAG (eRAG), AI Agent Workspace, LLM gateway.',
    head: 'Autonomous AI agents for enterprise growth.',
    body: ['Replaice Technologies delivers enterprise-grade autonomous systems. Our suite includes agentic CRM, ERP, HRMS, and DMS solutions powered by enterprise RAG (eRAG) infrastructure.', 'Headquartered operationally in Bangalore with governance from Singapore, Replaice provides the AI Agent Workspace and LLM gateways that secure and scale institutional AI deployment, fully compliant with international and MAS Technology Risk Management frameworks.'],
    chips: ['Agentic CRM', 'ERP', 'HRMS', 'DMS', 'eRAG', 'AI Agent Workspace', 'LLM gateway'] },
  { slug: 'huntjobs', story: 'Your next opportunity, delivered in a heartbeat.', state: 'pf-huntjobs', name: 'HuntJobs', cat: 'AI · Talent Marketplace', logo: '/assets/huntjobs.webp', loc: 'Global Operations', site: 'https://huntjobs.ai/', siteLabel: 'Visit HuntJobs',
    desc: 'Your next opportunity, delivered in a heartbeat. An AI-powered jobs marketplace matching professionals with employers globally. Mobile apps available on the App Store and Google Play; used by candidates hired at major global companies.',
    head: 'AI-powered talent matching at scale.',
    body: ['HuntJobs is a sophisticated talent marketplace leveraging AI to match top-tier professionals with employers globally. Delivering candidates in a heartbeat, the platform significantly reduces time-to-hire while improving retention outcomes.', 'Available on the App Store and Google Play, HuntJobs is utilized by major global companies and is a cornerstone of our human capital infrastructure.'],
    chips: ['AI matching', 'App Store', 'Google Play', 'Global employers'] },
  { slug: 'northstar', story: 'Robust hardware. Proprietary AI.', state: 'pf-northstar', name: 'Northstar', full: 'Northstar Humanoids and Robotics', cat: 'Humanoids · Robotics', logo: null, loc: 'Singapore · Bangalore · San Francisco', site: null,
    desc: 'Humanoids for industry. Northstar builds humanoid robotics and operational intelligence for industrial environments, operating from Singapore, Bangalore and San Francisco — orchestrated and governed from Singapore.',
    head: 'Humanoids for industry.',
    body: ['Northstar builds humanoid robotics and advanced operational intelligence specifically designed for industrial environments. We combine robust hardware engineering with proprietary AI models to automate physical tasks safely and efficiently.', 'Operating from San Francisco and Bangalore, with strict governance and orchestration from Singapore, Northstar represents the convergence of deep-tech talent and institutional capital.'],
    chips: ['Humanoid robotics', 'Operational intelligence', 'Proprietary AI models', 'Industrial environments'] },
  { slug: 'tribe', story: 'The entire rental journey, one connected platform.', state: 'pf-tribe', name: 'Tribe', cat: 'Property and Lifestyle Technology', logo: '/assets/tribe.svg', loc: 'Global Operations', site: 'https://tribeapp.com.au/', siteLabel: 'Visit Tribe',
    desc: 'The AI-powered operating and lifestyle platform for modern rental communities - connecting leasing, residents, property teams and neighbourhood services through one intelligent experience.',
    head: 'The intelligent operating system for rental living.',
    body: ['Tribe brings the entire rental journey into one connected platform - from property discovery and applications to leasing, payments, maintenance, amenities and everyday resident services.', 'Built around an AI-first operating model, Tribe connects residents, property teams and neighbourhood partners through intelligent workflows and a unified digital experience.', 'Residents can manage their home, access building services, book amenities, raise maintenance requests and discover nearby services from one place, while property teams gain greater automation, visibility and operational control.', 'With integrated AI assistants working across leasing, resident support and property operations, Tribe enables communities to operate more efficiently while delivering a more personalised living experience.'],
    chips: ['Leasing', 'Payments', 'Maintenance', 'Amenities', 'Resident services', 'AI assistants'] }
];
const co = slug => COMPANIES.find(c => c.slug === slug);
const PRACTICES = [
  { slug: 'investment', state: 'investment', t: 'Investment', lead: 'Permanent Capital.', p: 'We deploy our own patient capital with complete alignment and active ownership.', more: "We invest our own capital, ensuring complete alignment with our ventures. We don't dabble. We dominate.", cos: ['biltflow', 'replaice-technologies', 'huntjobs', 'northstar', 'tribe'] },
  { slug: 'venture-building', state: 'venture', t: 'Venture Building', lead: 'Operational Depth.', p: 'Our 120+ team works inside every venture — forming companies, developing commercial models and scaling operating infrastructure.', more: 'We build from within, we do not advise from the sidelines.', cos: ['northstar', 'tribe', 'huntjobs'] },
  { slug: 'technology-engineering', state: 'technology', t: 'Technology & Engineering', lead: 'IP at the Core.', p: 'We build proprietary systems designed to compound — 39+ patents filed across our portfolio.', more: 'With 39+ patents filed across our portfolio, we develop proprietary, patent-protected technology designed to compound into long-term structural advantage.', cos: ['replaice-technologies', 'huntjobs', 'northstar'] },
  { slug: 'construction-intelligence', state: 'construction', t: 'Construction Intelligence', lead: 'The AI operating system for construction.', p: 'BiltFlow OS™ connects every team, document, estimate, and supplier into one intelligent agentic workflow.', more: 'From site discovery to project closeout.', cos: ['biltflow'] }
];
const PRACTICE_BODY = ['Our practice areas represent the convergence of capital, technology, and operating capability. We invest our own capital (Permanent Capital) and deploy our 120+ team worldwide (Operational Depth) to ensure the success of our ventures.', 'With IP at the core of our strategy, we build proprietary systems designed to compound, scaling these innovations globally from our Singapore headquarters.'];
const PRINCIPLES = [
  { t: 'Permanent Capital', state: 'investment', p: "We invest our own capital, ensuring complete alignment with our ventures. We don't dabble. We dominate." },
  { t: 'Operational Depth', state: 'venture', p: 'Our 120+ team works inside every venture. We build from within, we do not advise from the sidelines — forming companies, developing commercial models and scaling operating infrastructure.' },
  { t: 'IP at the Core', state: 'technology', p: 'With 39+ patents filed across our portfolio, we develop proprietary, patent-protected technology designed to compound into long-term structural advantage.' },
  { t: 'Global by Design', state: 'regions', p: 'We grow our core regions through autonomous products and partner with enterprises building their own AI — consistently governed from our Singapore headquarters.' }
];
const REGIONS = [
  { t: 'APAC', p: 'Group HQ in Singapore, scaling autonomous intelligence across South East Asia, India and Australia.' },
  { t: 'MENA', p: 'Enterprise AI deployments and strategic partnerships across the Gulf region.' },
  { t: 'UK/Europe', p: 'Capital integration and enterprise operating infrastructure for European markets.' },
  { t: 'North America', p: 'Deep-tech integration and scaling autonomous products across the Americas.' }
];
const CITIES = [['Singapore', 'Group HQ', 'Asia/Singapore'], ['Sydney', 'Australia', 'Australia/Sydney'], ['Bangalore', 'India', 'Asia/Kolkata'], ['San Francisco', 'USA', 'America/Los_Angeles'], ['London', 'UK', 'Europe/London']];
const BADGES = ['SOC 2 Type II', 'ISO/IEC 27001', 'ISO/IEC 42001 (AI)', 'GDPR', 'Singapore PDPA', 'MAS TRM Aligned', 'ACRA Registered'];
const VALUES = ['Conviction', 'Discipline', 'Ownership', 'Execution', 'Partnership', 'Long-term thinking'];
const POST = { slug: 'institutional-ai', t: 'Enterprise AI and Institutional Governance', d: 'How rigorous MAS and ACRA frameworks accelerate our global AI deployment.', year: '2024',
  body: ['Enterprise AI does not fail on capability. It fails on trust. Boards, regulators, and enterprise counterparties do not ask whether a system is intelligent — they ask whether it is governed. This is where Singapore gives Hunt Global a structural advantage.', 'Operating within the MAS technology risk framework and as an ACRA-registered institution, every platform we build is designed for institutional scrutiny from day one: auditable decision trails, controlled model deployment, and data governance aligned with PDPA and GDPR. Governance is not a constraint on our velocity — it is the reason enterprises deploy our systems at all.', 'As autonomous systems move from pilots to production across construction, talent, and robotics, the companies that win will be those whose intelligence is matched by their accountability. We build both, from Singapore, for the world.'] };

/* globe placement per state (x < 0 = globe on the LEFT, so the text sits right: .flip) — mirrors STATES in main.js */
const FLIP = new Set(['heart', 'venture', 'construction', 'governance']);
const NAV = [['/', 'Home'], ['/about/', 'About'], ['/portfolio/', 'Portfolio'], ['/practice/', 'Practice'], ['/regions/', 'Global Presence'], ['/insights/', 'Insights'], ['/careers/', 'Careers'], ['/contact/', 'Contact']];

/* ======================= PARTIALS ======================= */
const amp = s => s.replace(/&(?!amp;|#|nbsp;)/g, '&amp;');
const nm = c => c.short || c.name;
const HGDEFS = readFileSync('index.html', 'utf8').match(/<!-- Brand monogram[\s\S]*?<\/svg>/)[0];

const menu = path => `<nav class="menu" id="menu" aria-label="Site navigation" hidden>
  <button class="menu-close" id="menuClose" aria-label="Close menu">&times;</button>
  <ol class="menu-list" id="menuList">
${NAV.map(([h, l]) => `    <li><a href="${h}"${(h === '/' ? path === '/' : path.startsWith(h)) ? ' class="cur" aria-current="page"' : ''}>${amp(l)}</a></li>`).join('\n')}
  </ol>
  <div class="menu-foot mono">
    <a href="/privacy/">Privacy</a>
    <a href="/terms/">Terms</a>
    <a href="mailto:hello@huntglobal.co">hello@huntglobal.co</a>
    <a href="https://linkedin.com/" target="_blank" rel="noopener">LinkedIn</a>
  </div>
</nav>`;

const footer = () => `<footer class="foot">
  <div class="wrap">
    <div class="foot-top">
      <a href="/" class="logo big">HUNT<br>GLOBAL</a>
      <form class="news" id="news">
        <label class="mono" for="newsEmail">Subscribe to our newsletter</label>
        <div><input id="newsEmail" type="email" placeholder="Email address" required><button class="mono" type="submit">Submit</button></div>
      </form>
    </div>
    <div class="foot-cols">
      <div>
        <p class="mono h">Hunt Global</p>
        <p>Level 8, 2 Venture Drive<br>Singapore 608526</p>
        <a href="mailto:hello@huntglobal.co">hello@huntglobal.co</a>
        <a href="/insights/">Insights</a>
        <a href="/careers/">Careers</a>
        <a href="/contact/">Contact</a>
      </div>
      <div>
        <p class="mono h">About</p>
        <a href="/about/">About Us</a>
        <a href="/about/vision-values/">Vision &amp; Values</a>
        <a href="/about/approach/">Approach</a>
        <a href="/about/why-singapore/">Why Singapore</a>
        <a href="/about/recognition/">Recognition</a>
      </div>
      <div>
        <p class="mono h">Portfolio</p>
${COMPANIES.map(c => `        <a href="/portfolio/${c.slug}/">${c.name}</a>`).join('\n')}
      </div>
      <div>
        <p class="mono h">Practice</p>
${PRACTICES.map(p => `        <a href="/practice/${p.slug}/">${amp(p.t)}</a>`).join('\n')}
      </div>
      <div>
        <p class="mono h">Global presence</p>
        <a href="/regions/">Global Presence</a>
        <p>Singapore — Group HQ<br>Sydney, Australia<br>Bangalore, India<br>San Francisco, USA<br>London, UK</p>
      </div>
    </div>
    <div class="foot-bottom mono">
      <span>© 2026 Hunt Global PTE Ltd. All rights reserved.</span>
      <span><a href="/privacy/">Privacy Policy</a> · <a href="/terms/">Terms &amp; Conditions</a> · <a href="https://linkedin.com/" target="_blank" rel="noopener">LinkedIn</a></span>
    </div>
  </div>
</footer>`;

const layout = ({ path, title, desc, body }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} — Hunt Global</title>
<meta name="description" content="${desc.replace(/"/g, '&quot;')}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&family=Instrument+Sans:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;700;800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles.css?v=${V}">
<link rel="stylesheet" href="/journey.css?v=${V}">
<link rel="stylesheet" href="/motion.css?v=${V}">
<link rel="stylesheet" href="/pages.css?v=${V}">
<script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"}}</script>
</head>
<body class="pg" data-page="${path}">
${HGDEFS}
<canvas id="gl" aria-hidden="true"></canvas>
<div class="grain" aria-hidden="true"></div>
<div class="sat-labels" id="satLabels" aria-hidden="true"></div>
<div class="cursor" id="cursor" aria-hidden="true"><span></span></div>

<header class="top">
  <a href="/" class="logo" aria-label="Hunt Global — home">HUNT<br>GLOBAL</a>
  <button class="menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="menu"><i></i><i></i><i></i></button>
</header>
${menu(path)}

<main>
${body}
</main>

${footer()}

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script type="module" src="/main.js?v=${V}"></script>
<script type="module" src="/motion.js?v=${V}"></script>
</body>
</html>
`;

/* one stop of the journey */
let SEC = 0;
const sec = (state, inner, { cls = '', name = '' } = {}) =>
  `<section class="ch pg-sec${FLIP.has(state) ? ' flip' : ''}${cls ? ' ' + cls : ''}" id="s${++SEC}" data-state="${state}" data-chapter="${amp(name || state)}">
  <div class="wrap">
${inner}
  </div>
</section>`;

const crumb = list => `<p class="crumb mono reveal"><a href="/">Hunt Global</a>${list.map(([l, h]) => `<i></i>${h ? `<a href="${h}">${amp(l)}</a>` : `<b>${amp(l)}</b>`}`).join('')}</p>`;
const hero = (state, { crumbs, label, title, lead, extra = '' }) => sec(state, `    ${crumb(crumbs)}
    <p class="label mono reveal">${amp(label)}</p>
    <h1 class="huge split">${title}</h1>
    ${lead ? `<p class="lead reveal">${lead}</p>` : ''}
    ${extra}
    <p class="pg-cue mono reveal"><i></i>Scroll</p>`, { cls: 'pg-hero', name: label });
const paras = list => list.map(p => `<p class="reveal">${p}</p>`).join('\n    ');
const stats = () => `<div class="stats">
      <div class="stat reveal"><b data-count="5">0</b><span class="mono">Portfolio companies</span></div>
      <div class="stat reveal"><b data-count="120" data-suffix="+">0</b><span class="mono">Team worldwide</span></div>
      <div class="stat reveal"><b data-count="4">0</b><span class="mono">Operating regions</span></div>
      <div class="stat reveal"><b data-count="39" data-suffix="+">0</b><span class="mono">Patents filed</span></div>
    </div>`;
const badges = (list = BADGES) => `<ul class="badges pg-badges">${list.map(b => `<li>${b}</li>`).join('')}</ul>`;
const chips = list => `<ul class="pg-chips reveal">${list.map(x => `<li>${x}</li>`).join('')}</ul>`;
// a company row shows its name ONCE: the logo if it has one, otherwise the name
const rows = list => `<ul class="pg-rows">${list.map(c => `<li class="reveal"><a href="/portfolio/${c.slug}/">
      <span class="r-mark">${c.logo ? `<img src="${c.logo}" alt="${c.name}" loading="lazy">` : `<b>${nm(c)}</b>`}</span>
      <span class="r-cat mono">${c.cat}</span><span class="r-go" aria-hidden="true">&rarr;</span></a></li>`).join('')}</ul>`;
const links = list => `<ul class="pg-links">${list.map(([h, t, d]) => `<li class="reveal"><a href="${h}"><b>${amp(t)}</b><span>${d}</span><i aria-hidden="true">&rarr;</i></a></li>`).join('')}</ul>`;
const next = (href, label, kicker = 'Next') => `<a class="pg-next reveal" href="${href}"><span class="mono">${kicker}</span><b>${amp(label)} <i>&rarr;</i></b></a>`;
const cities = () => `<ul class="pg-cities">${CITIES.map(([n, t, tz]) => `<li class="reveal"><b>${n}</b><span class="mono">${t}</span><span class="mono" data-tz="${tz}">--:--</span></li>`).join('')}</ul>`;
const regionsList = () => `<ul class="pg-regions">${REGIONS.map(r => `<li class="reveal"><b>${r.t}</b><p>${r.p}</p></li>`).join('')}</ul>`;

/* ======================= PAGES ======================= */
const pages = {};
const page = (path, title, desc, parts) => { SEC = 0; pages[path] = layout({ path, title, desc, body: parts.join('\n\n') }); };

/* ---------- About ---------- */
page('/about/', 'About', "Singapore's Global Technology Holding Group. We build the companies that define industries.", [
  hero('house', { crumbs: [['About']], label: 'About Hunt Global', title: 'We build the companies that define industries.', lead: 'A Singapore institution. Built for the world.' }),
  sec('heart', `    <p class="label mono reveal">Who we are</p>
    <h2 class="big-read" data-read>Singapore's global technology holding group.</h2>
    <p class="lead reveal">We invest our own capital, operate from within, and hold proprietary IP designed to compound.</p>
    ${stats()}`, { name: 'Who we are' }),
  sec('operate', `    <p class="label mono reveal">How we operate</p>
    <h2 class="big-read" data-read>Four principles behind every company we build.</h2>
    <ol class="principles" id="principles">
${PRINCIPLES.map((p, i) => `      <li${i === 0 ? ' class="open"' : ''}><button>${p.t}<i>+</i></button><div><p>${p.p}</p></div></li>`).join('\n')}
    </ol>
    <a class="link mono reveal" href="/about/approach/">Our approach <span>&rarr;</span></a>`, { name: 'How we operate' }),
  sec('regions', `    <p class="label mono reveal">Why Singapore</p>
    <h2 class="huge split">The strategic foundation.</h2>
    <p class="lead reveal">“Singapore is not where we happen to be. It is the strategic foundation everything we build is designed around.”</p>
    <p class="reveal narrow">Institutional IP framework. World-class governance. The gateway connecting enterprise partners across Sydney, Bangalore, London and San Francisco.</p>
    <a class="link mono reveal" href="/about/why-singapore/">Why Singapore <span>&rarr;</span></a>`, { name: 'Why Singapore' }),
  sec('governance', `    <p class="label mono reveal">Group HQ · Singapore</p>
    <h2 class="huge split">Four operating regions.</h2>
    ${regionsList()}`, { name: 'Operating regions' }),
  sec('contact', `    <p class="label mono reveal">Explore</p>
    <h2 class="big-read" data-read>More about Hunt Global.</h2>
    ${links([['/about/vision-values/', 'Vision & Values', 'Operating principles that guide our venture building.'], ['/about/approach/', 'Our Approach', 'Permanent capital, operational depth, IP at the core.'], ['/about/why-singapore/', 'Why Singapore', 'Singapore as the strategic foundation for everything we build.'], ['/about/recognition/', 'Recognition', 'Institutional validation across our operating regions.']])}
    ${next('/portfolio/', 'Portfolio')}`, { cls: 'pg-end', name: 'Explore' })
]);

page('/about/vision-values/', 'Vision & Values', 'Operating principles that guide our venture building.', [
  hero('operate', { crumbs: [['About', '/about/'], ['Vision & Values']], label: 'Vision & Values', title: 'Vision &amp; Values.', lead: 'Operating principles that guide our venture building.' }),
  sec('heart', `    <p class="label mono reveal">Our foundation</p>
    <h2 class="big-read" data-read>Conviction, Discipline, Ownership, Execution, Partnership, Long-term thinking.</h2>
    <p class="lead reveal">Hunt Global is built on a foundation of Conviction, Discipline, Ownership, Execution, Partnership, and Long-term thinking. We do not dabble. We dominate.</p>
    <ul class="pg-values">${VALUES.map(v => `<li class="reveal">${v}</li>`).join('')}</ul>`, { name: 'Our foundation' }),
  sec('investment', `    <p class="label mono reveal">Conviction, backed by capital</p>
    <h2 class="huge split">We don't dabble. We dominate.</h2>
    <p class="reveal narrow">Our conviction is backed by our own capital, ensuring complete alignment with the ventures we build. We execute with precision, leveraging our 120+ team of operators who work from within, driving growth rather than advising from the sidelines.</p>
    ${next('/about/approach/', 'Our Approach')}`, { cls: 'pg-end', name: 'Conviction' })
]);

page('/about/approach/', 'Our Approach', "Permanent capital, operational depth, IP at the core. We don't dabble. We dominate.", [
  hero('construction', { crumbs: [['About', '/about/'], ['Our Approach']], label: 'Our Approach', title: 'We don’t dabble. We dominate.', lead: 'Permanent capital, operational depth, IP at the core — global by design.' }),
  ...PRINCIPLES.map(p => sec(p.state, `    <p class="label mono reveal">Our approach</p>
    <h2 class="huge split">${p.t}</h2>
    <p class="lead reveal">${p.p}</p>`, { name: p.t })),
  sec('house', `    <p class="label mono reveal">Global by design</p>
    <h2 class="big-read" data-read>Orchestrated from our Singapore headquarters.</h2>
    <p class="lead reveal">Orchestrated from our Singapore headquarters, we scale our ventures across five global cities from Asia-Pacific to the Americas.</p>
    ${stats()}
    ${next('/about/why-singapore/', 'Why Singapore')}`, { cls: 'pg-end', name: 'Global by design' })
]);

page('/about/why-singapore/', 'Why Singapore', 'Singapore as the strategic foundation for everything we build.', [
  hero('regions', { crumbs: [['About', '/about/'], ['Why Singapore']], label: 'Why Singapore', title: 'Why Singapore.', lead: '“Singapore is not where we happen to be. It is the strategic foundation everything we build is designed around.”' }),
  sec('governance', `    <p class="label mono reveal">Institutional by design</p>
    <h2 class="huge split">The ultimate gateway to global capital.</h2>
    ${paras(['Singapore provides the institutional IP framework, world-class governance, and stability required to build enduring global enterprises. Operating within the robust MAS framework and registered with ACRA, we leverage Singapore as the ultimate gateway to global capital.', 'From this strategic foundation, we seamlessly connect enterprise partners across APAC, MENA, UK/Europe and North America with our operational centers in Sydney, Bangalore, London and San Francisco.'])}
    ${badges(['MAS TRM Aligned', 'ACRA Registered', 'Singapore PDPA'])}`, { name: 'Institutional by design' }),
  sec('house', `    <p class="label mono reveal">Connected from Singapore</p>
    <h2 class="huge split">Operational centers, one governance.</h2>
    ${cities()}
    ${next('/about/recognition/', 'Recognition')}`, { cls: 'pg-end', name: 'Operational centers' })
]);

page('/about/recognition/', 'Recognition', 'Institutional validation across our operating regions.', [
  hero('governance', { crumbs: [['About', '/about/'], ['Recognition']], label: 'Recognition', title: 'Institutional validation.', lead: 'As a Singapore-headquartered institution, our commitment to excellence, governance, and technological innovation is continuously recognized across our operating regions.' }),
  sec('technology', `    <p class="label mono reveal">Across the portfolio</p>
    <h2 class="big-read" data-read>Built on proprietary, patent-protected IP.</h2>
    <p class="lead reveal">Our portfolio companies frequently achieve industry accolades for advancements in enterprise AI, construction intelligence, and robotics, reflecting our core strategy of building proprietary, patent-protected IP.</p>
    ${badges()}
    ${next('/portfolio/', 'Portfolio')}`, { cls: 'pg-end', name: 'Across the portfolio' })
]);

/* ---------- Portfolio ---------- */
page('/portfolio/', 'Portfolio', 'Companies built for long-term relevance — technology, construction intelligence, talent, robotics and property platforms.', [
  hero('portfolio', { crumbs: [['Portfolio']], label: 'Portfolio & Divisions', title: 'Companies built for long-term relevance.', lead: 'Our portfolio comprises technology, construction intelligence, talent, robotics and property-related platforms operating globally.' }),
  ...COMPANIES.map(c => sec(c.state, `    <p class="label mono reveal">${c.cat}</p>
    <h2 class="huge split">${nm(c)}</h2>
    <p class="lead reveal">${c.head}</p>
    <p class="reveal narrow">${c.desc}</p>
    <a class="link mono reveal" href="/portfolio/${c.slug}/">Read the full story <span>&rarr;</span></a>`, { name: nm(c) })),
  sec('heart', `    <p class="label mono reveal">Governed from Singapore</p>
    <h2 class="big-read" data-read>Every company is operated from within.</h2>
    <p class="lead reveal">Every company is operated from within by our 120+ team, built on proprietary IP and governed from our Singapore headquarters.</p>
    ${stats()}
    ${next('/practice/', 'How we build')}`, { cls: 'pg-end', name: 'Governed from Singapore' })
]);

COMPANIES.forEach((c, i) => {
  const nx = COMPANIES[(i + 1) % COMPANIES.length];
  page(`/portfolio/${c.slug}/`, c.full || c.name, c.desc, [
    hero(c.state, { crumbs: [['Portfolio', '/portfolio/'], [nm(c)]], label: c.cat, title: c.full || c.name, lead: c.head,
      extra: `<dl class="pg-meta mono reveal"><div><dt>Sector</dt><dd>${c.cat}</dd></div><div><dt>Location</dt><dd>${c.loc}</dd></div><div><dt>Governance</dt><dd>Singapore HQ</dd></div></dl>
    ${c.site ? `<a class="btn dark mono reveal" href="${c.site}" target="_blank" rel="noopener">${c.siteLabel} <span>&nearr;</span></a>` : ''}` }),
    sec(c.state, `    <p class="label mono reveal">The story</p>
    <h2 class="big-read" data-read>${c.story}</h2>
    ${paras(c.body)}
    ${chips(c.chips)}`, { name: 'The story' }),
    sec('house', `    <p class="label mono reveal">Also in the portfolio</p>
    <h2 class="huge split">More companies.</h2>
    ${rows(COMPANIES.filter(o => o !== c))}
    ${next(`/portfolio/${nx.slug}/`, nm(nx), 'Next company')}`, { cls: 'pg-end', name: 'More companies' })
  ]);
});

/* ---------- Practice ---------- */
page('/practice/', 'Practice', 'How we build — strategic operating capabilities across four key practices.', [
  hero('operate', { crumbs: [['Practice']], label: 'Practice', title: 'How we build.', lead: 'Strategic operating capabilities across four key practices.' }),
  ...PRACTICES.map(p => sec(p.state, `    <p class="label mono reveal">Practice · ${amp(p.t)}</p>
    <h2 class="huge split">${p.lead}</h2>
    <p class="lead reveal">${p.p}</p>
    <a class="link mono reveal" href="/practice/${p.slug}/">Explore practice <span>&rarr;</span></a>`, { name: p.t })),
  sec('house', `    <p class="label mono reveal">Deep operational and capital deployment</p>
    <h2 class="big-read" data-read>Capital, technology and operating capability.</h2>
    ${paras(PRACTICE_BODY)}
    ${next('/regions/', 'Global Presence')}`, { cls: 'pg-end', name: 'Deep deployment' })
]);

PRACTICES.forEach((p, i) => {
  const nx = PRACTICES[(i + 1) % PRACTICES.length];
  page(`/practice/${p.slug}/`, p.t, `${p.t} — ${p.lead} ${p.p}`, [
    hero(p.state, { crumbs: [['Practice', '/practice/'], [p.t]], label: `Practice · ${p.t}`, title: amp(p.t), lead: `<strong>${p.lead}</strong> ${p.p}` }),
    sec(FLIP.has(p.state) ? 'house' : 'heart', `    <p class="label mono reveal">Deep operational and capital deployment</p>
    <h2 class="big-read" data-read>${p.more}</h2>
    ${paras(PRACTICE_BODY)}
    <div class="stats pg-stats3">
      <div class="stat reveal"><b data-count="120" data-suffix="+">0</b><span class="mono">Operators inside every venture</span></div>
      <div class="stat reveal"><b data-count="39" data-suffix="+">0</b><span class="mono">Patents filed</span></div>
      <div class="stat reveal"><b data-count="4">0</b><span class="mono">Operating regions</span></div>
    </div>`, { name: 'Deep deployment' }),
    sec(p.state, `    <p class="label mono reveal">${p.cos.length === COMPANIES.length ? 'Across the portfolio' : 'On this path'}</p>
    <h2 class="huge split">${p.cos.length === COMPANIES.length ? 'Every company we build.' : 'Where this practice operates.'}</h2>
    ${rows(p.cos.map(co))}
    ${next(`/practice/${nx.slug}/`, nx.t, 'Next practice')}`, { cls: 'pg-end', name: 'Companies' })
  ]);
});

/* ---------- Regions ---------- */
page('/regions/', 'Global Presence', 'Governed from Singapore. Delivering autonomous intelligence to the world.', [
  hero('regions', { crumbs: [['Global Presence']], label: 'Global Presence', title: 'Governed from Singapore.', lead: 'Delivering autonomous intelligence to the world.' }),
  sec('governance', `    <p class="label mono reveal">Enterprise partnership</p>
    <h2 class="huge split">Regional growth through autonomous technology.</h2>
    <p class="lead reveal">Our global footprint is defined not by capital deployment, but by enterprise partnership.</p>
    ${paras(['We partner with large institutional clients across our key regions to build, integrate, and scale autonomous AI solutions.', 'By deploying our proprietary operating systems into these markets, we help accelerate regional growth, enabling our partners to operate with unprecedented intelligence and efficiency. Every deployment is orchestrator-led and governed from our Singapore headquarters, ensuring institutional-grade security and capability globally.'])}`, { name: 'Enterprise partnership' }),
  sec('regions', `    <p class="label mono reveal">Strategic nodes</p>
    <h2 class="huge split">Every node, one globe.</h2>
    <div class="region-panel reveal">
      <div class="region-tabs mono" role="tablist">
${REGIONS.map((r, i) => `        <button${i === 0 ? ' class="on"' : ''} data-region="${i}">${r.t}</button>`).join('\n')}
      </div>
      <p class="region-text" id="regionText"></p>
      <p class="mono small-label">Strategic nodes — tap to locate</p>
      <ul class="cities" id="cities">
${CITIES.map(([n, t], i) => `        <li><button data-city="${i}"><span>${n}</span><em class="mono">${t}</em></button></li>`).join('\n')}
      </ul>
    </div>`, { name: 'Strategic nodes' }),
  sec('house', `    <p class="label mono reveal">Operating regions</p>
    <h2 class="huge split">Four regions, one rhythm.</h2>
    ${regionsList()}
    ${cities()}
    ${next('/insights/', 'Insights')}`, { cls: 'pg-end', name: 'Operating regions' })
]);

/* ---------- Insights ---------- */
page('/insights/', 'Insights', 'Research, updates, and market perspectives from the Hunt Global portfolio.', [
  hero('technology', { crumbs: [['Insights']], label: 'Insights', title: 'Insights.', lead: 'Research, updates, and market perspectives from the Hunt Global portfolio.' }),
  sec('governance', `    <div class="ins-head">
      <p class="label mono reveal">Latest</p>
      <div class="filters mono reveal" id="insFilters"><button class="on" data-ins="all">All Insights</button><button data-ins="articles">Articles</button><button data-ins="news">News</button></div>
    </div>
    <div class="ins-list" id="insList">
      <a class="ins-card folder" data-type="articles" href="/insights/${POST.slug}/">
        <span class="tab mono">Articles · ${POST.year}</span>
        <h3>${POST.t}</h3>
        <p>${POST.d}</p>
        <span class="mono read">Read article &rarr;</span>
      </a>
      <p class="ins-empty mono" hidden>No news published yet.</p>
    </div>
    ${next('/contact/', 'Contact')}`, { cls: 'pg-end', name: 'Latest' })
]);

page(`/insights/${POST.slug}/`, POST.t, POST.d, [
  hero('governance', { crumbs: [['Insights', '/insights/'], ['Articles']], label: `Articles · ${POST.year} · 3 min read`, title: POST.t, lead: POST.d }),
  sec('technology', `    <article class="pg-article">
      <p class="lead reveal">${POST.body[0]}</p>
      <blockquote class="pg-pull reveal">Enterprise AI does not fail on capability. It fails on trust.</blockquote>
      ${paras(POST.body.slice(1))}
      ${badges(['MAS TRM Aligned', 'ACRA Registered', 'Singapore PDPA', 'GDPR'])}
    </article>
    ${next('/insights/', 'All insights', 'Back to')}`, { cls: 'pg-end', name: 'Article' })
]);

/* ---------- Careers ---------- */
page('/careers/', 'Careers', 'Build the companies that define industries. Join our team of 120+ operators worldwide.', [
  hero('venture', { crumbs: [['Careers']], label: 'Careers', title: 'Build the companies that define industries.', lead: 'Join our team of 120+ operators worldwide.' }),
  sec('house', `    <p class="label mono reveal">Build from within</p>
    <h2 class="big-read" data-read>Extreme conviction. Operational depth.</h2>
    ${paras(['We seek individuals with extreme conviction, operational depth, and a desire to build from within.', 'Whether in engineering at our Bangalore innovation center, enterprise partnerships in Sydney or London, robotics in San Francisco, or group strategy in Singapore, a career at Hunt Global means complete alignment with the ventures you scale.'])}
    ${cities()}
    <a class="btn dark mono reveal" href="mailto:hello@huntglobal.co?subject=Careers%20at%20Hunt%20Global">Contact our talent team <span>&rarr;</span></a>
    ${next('/contact/', 'Contact')}`, { cls: 'pg-end', name: 'Build from within' })
]);

/* ---------- Contact ---------- */
page('/contact/', 'Contact', 'For investment opportunities, strategic partnerships and portfolio enquiries.', [
  hero('house', { crumbs: [['Contact']], label: 'Contact', title: 'Start a conversation.', lead: 'For investment opportunities, strategic partnerships and portfolio enquiries.',
    extra: `<dl class="pg-meta mono reveal"><div><dt>Direct email</dt><dd><a href="mailto:hello@huntglobal.co">hello@huntglobal.co</a></dd></div><div><dt>Registered office</dt><dd>Level 8, 2 Venture Drive, Singapore 608526</dd></div><div><dt>Singapore time</dt><dd data-tz="Asia/Singapore">--:--</dd></div></dl>` }),
  sec('contact', `    <div class="contact-grid">
      <div>
        <p class="label mono reveal">Work with us</p>
        <h2 class="huge split">Let’s build what comes next.</h2>
        <p class="lead reveal">Governed from Singapore. Operating across APAC, MENA, UK/Europe and North America.</p>
      </div>
      <form class="enquiry folder reveal" id="enquiry">
        <span class="tab mono">Start a conversation</span>
        <fieldset class="topics mono">
          <legend class="sr">Enquiry type</legend>
          <label><input type="radio" name="topic" value="Investment opportunity" checked><span>Investment</span></label>
          <label><input type="radio" name="topic" value="Strategic partnership"><span>Partnership</span></label>
          <label><input type="radio" name="topic" value="Portfolio enquiry"><span>Portfolio</span></label>
        </fieldset>
        <label class="field"><span class="mono">Name</span><input name="name" required autocomplete="name"></label>
        <label class="field"><span class="mono">Email</span><input name="email" type="email" required autocomplete="email"></label>
        <label class="field"><span class="mono">Company</span><input name="company" autocomplete="organization"></label>
        <label class="field"><span class="mono">Message</span><textarea name="message" rows="3" required></textarea></label>
        <button class="btn dark mono" type="submit">Send enquiry <span>&rarr;</span></button>
        <p class="form-note mono" id="formNote">Opens your email app, addressed to hello@huntglobal.co</p>
      </form>
    </div>`, { cls: 'pg-end pg-contact', name: 'Work with us' })
]);

/* ---------- Legal ---------- */
page('/privacy/', 'Privacy Policy', 'Institutional data governance — Singapore PDPA and GDPR.', [
  hero('governance', { crumbs: [['Privacy Policy']], label: 'Privacy Policy', title: 'Institutional Data Governance.', lead: 'As an ACRA-registered Singapore institution operating globally, Hunt Global PTE Ltd adheres to the strictest international data protection standards, including the Singapore PDPA and GDPR.' }),
  sec('house', `    <p class="label mono reveal">Enterprise-grade security</p>
    <h2 class="big-read" data-read>The same rigor as our IP and capital.</h2>
    <p class="lead reveal">Our commitment to enterprise-grade security means your data is managed with the same rigor we apply to our proprietary IP and capital operations.</p>
    ${badges(['Singapore PDPA', 'GDPR', 'ACRA Registered'])}
    ${next('/terms/', 'Terms & Conditions')}`, { cls: 'pg-end', name: 'Security' })
]);

page('/terms/', 'Terms & Conditions', 'Terms of use for the Hunt Global platform and corporate resources.', [
  hero('governance', { crumbs: [['Terms & Conditions']], label: 'Terms & Conditions', title: 'Terms of Use.', lead: 'These terms govern your use of the Hunt Global platform and corporate resources. Hunt Global PTE Ltd is a Singapore-based investment holding company operating within the robust MAS framework.' }),
  sec('house', `    <p class="label mono reveal">Intellectual property</p>
    <h2 class="big-read" data-read>Protected intellectual property.</h2>
    <p class="lead reveal">All proprietary technology, including patents filed across our portfolio (Biltflow, Replaice, HuntJobs, Northstar), are protected intellectual property.</p>
    ${next('/privacy/', 'Privacy Policy')}`, { cls: 'pg-end', name: 'Intellectual property' })
]);

/* ======================= WRITE ======================= */
for (const [path, html] of Object.entries(pages)) {
  const file = path.slice(1) + 'index.html';
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}
// home page: same menu + footer, same version
let home = readFileSync('index.html', 'utf8');
home = home.replace(/<nav class="menu" id="menu"[\s\S]*?<\/nav>/, menu('/'))
  .replace(/<footer class="foot">[\s\S]*?<\/footer>\n(?=\n<!-- company drawer -->)/, footer() + '\n')
  .replace(/\?v=\d+/g, `?v=${V}`);
writeFileSync('index.html', home);
console.log('built', Object.keys(pages).length, 'pages:', Object.keys(pages).join(' '));
