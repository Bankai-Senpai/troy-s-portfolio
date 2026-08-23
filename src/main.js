import './styles.css';

const profile = {
  name: 'Troy Sacote',
  role: 'Web Application Developer',
  specialty: 'AI Automation Specialist',
  email: 'hello@troysacote.dev',
  intro: 'A practical builder combining modern web technologies, AI APIs, workflow automation, and AI-assisted development to turn ideas into working applications.',
};

const projects = [
  { id: 'web-app', index: '01', type: 'Full-stack concept', title: 'AI-Powered Web Application', description: 'A product-ready architecture for a modern AI application: responsive frontend, server-side API routes, authentication, a database layer, and a swappable model gateway.', tags: ['Next.js', 'React', 'OpenRouter', 'Supabase'], accent: 'cyan', status: 'Architecture in progress', outcome: 'A clear foundation for shipping an AI-enabled web product without hiding the engineering work behind a demo.' },
  { id: 'documents', index: '02', type: 'Workflow system', title: 'AI Document Processing', description: 'Upload a document, extract useful information, return structured results, validate the output, and make the next business action visible.', tags: ['AI APIs', 'Structured output', 'n8n', 'Webhooks'], accent: 'violet', status: 'Prototype concept', outcome: 'Turns unstructured files into a reliable handoff between AI processing and a business workflow.' },
  { id: 'voice', index: '03', type: 'Voice automation', title: 'AI Voice Receptionist', description: 'A voice agent concept connecting calls, conversation logic, speech, automation, and notifications into one understandable system.', tags: ['Vapi', 'ElevenLabs', 'n8n', 'APIs'], accent: 'amber', status: 'Integration study', outcome: 'Shows how voice AI becomes useful when it can trigger business actions—not just answer questions.' },
  { id: 'agent', index: '04', type: 'Agent system', title: 'AI Business Assistant', description: 'An action-oriented assistant pattern with context, tools, external APIs, and automation triggers so the agent can move work forward.', tags: ['OpenClaw', 'AI agents', 'Tools', 'Context'], accent: 'mint', status: 'System concept', outcome: 'Explores the difference between a chatbot that talks and an agent that can safely do something.' },
];

const workflows = [
  { id: 'lead', number: '01', title: 'Lead qualification', subtitle: 'Score intent, route attention', nodes: ['Incoming lead', 'AI classification', 'Lead scoring', 'Database', 'Notification', 'Follow-up'], result: 'Demo lead successfully classified as HIGH PRIORITY.' },
  { id: 'inquiry', number: '02', title: 'Customer inquiry', subtitle: 'Turn messages into action', nodes: ['Message', 'AI analysis', 'Intent detection', 'Routing', 'AI response', 'CRM'], result: 'Inquiry routed to the right response path.' },
  { id: 'voice', number: '03', title: 'Voice receptionist', subtitle: 'Connect conversation to action', nodes: ['Phone call', 'Vapi', 'AI agent', 'ElevenLabs', 'n8n', 'Business action'], result: 'Call intent captured and workflow action prepared.' },
  { id: 'document', number: '04', title: 'Document processing', subtitle: 'Extract, validate, hand off', nodes: ['Upload', 'AI extraction', 'Structured data', 'Validation', 'Database', 'Notification'], result: 'Document fields extracted and ready for review.' },
];

const skillGroups = [
  { label: 'Hands-on', tone: 'cyan', items: ['AI automation', 'n8n', 'Prompt engineering', 'AI API integration', 'OpenRouter', 'AI agents', 'Vapi', 'ElevenLabs', 'Claude Code', 'Codex', 'GitHub', 'Vercel', 'Cloudflare', 'Stripe integration', 'REST / APIs', 'Webhooks'] },
  { label: 'Working knowledge', tone: 'violet', items: ['JavaScript', 'Python', 'HTML', 'CSS', 'JSON', 'API concepts', 'Git', 'Database concepts'] },
  { label: 'Currently developing', tone: 'amber', items: ['React', 'Next.js', 'TypeScript', 'SQL', 'PostgreSQL', 'Backend development', 'Full-stack architecture'] },
];

const stack = [
  ['React', 'Web', 'Building interfaces and strengthening component fundamentals.'],
  ['Next.js', 'Web', 'Developing with modern app architecture and server-side patterns.'],
  ['TypeScript', 'Web', 'Currently developing typed application habits.'],
  ['OpenRouter', 'AI', 'Connecting applications to model APIs through a flexible gateway.'],
  ['AI agents', 'AI', 'Exploring context, tools, actions, and safe automation triggers.'],
  ['n8n', 'Automation', 'Designing workflows that connect AI decisions to business actions.'],
  ['Vapi', 'Voice', 'Building voice-agent concepts that can hand off to workflows.'],
  ['ElevenLabs', 'Voice', 'Working with expressive voice output in voice AI systems.'],
  ['GitHub', 'Development', 'Keeping projects visible, versioned, and ready to iterate.'],
  ['Vercel', 'Deployment', 'Deploying modern web projects with a fast feedback loop.'],
  ['Cloudflare', 'Deployment', 'Understanding the edge and practical web infrastructure.'],
  ['Stripe', 'Payments', 'Integrating payments when a real product requirement calls for it.'],
];

const chatKnowledge = {
  experience: 'Troy is a developing Web Application Developer and AI Automation Specialist with hands-on experience building AI-powered applications, workflow automations, voice-agent concepts, and web-based tools.',
  tools: 'Troy works with n8n, OpenRouter, AI agents, OpenClaw, Vapi, ElevenLabs, prompt engineering, Claude Code, OpenAI Codex, GitHub, Vercel, Cloudflare, APIs, webhooks, and Stripe integrations.',
  learning: 'Troy is actively strengthening React, Next.js, TypeScript, Git/GitHub, REST APIs, SQL, PostgreSQL, backend architecture, testing, and production deployment.',
  senior: 'No. Troy does not present himself as a senior developer. He has a growing programming foundation, practical AI and automation experience, and is actively developing his software engineering skills.',
  role: 'Troy is interested in joining a technology team where he can contribute to AI-enabled web applications, learn from experienced developers, and continue becoming a stronger full-stack builder.',
  voice: 'Yes. Troy has worked with Vapi, ElevenLabs, AI agents, workflow automation, and APIs in voice AI system concepts.',
  n8n: 'Troy uses n8n to connect AI decisions, webhooks, APIs, notifications, and business actions into understandable automations.',
};

const app = document.querySelector('#app');
app.innerHTML = `
  <canvas id="galaxy" aria-hidden="true"></canvas>
  <div class="noise" aria-hidden="true"></div>
  <header class="topbar">
    <a class="brand" href="#top" aria-label="Troy Sacote home"><span class="brand-mark">TS</span><span>TROY <i>SACOTE</i></span></a>
    <nav class="nav-links" aria-label="Primary navigation">${['About','Projects','AI Lab','Stack','Experience','Contact'].map((item) => `<a href="#${item.toLowerCase().replace(' ', '-')}">${item}</a>`).join('')}</nav>
    <button class="nav-chat" data-open-chat><span class="pulse-dot"></span> Ask Troy's AI</button>
    <button class="menu-button" aria-label="Open navigation" aria-expanded="false">☰</button>
  </header>

  <main id="top">
    <section class="hero section-wrap">
      <div class="hero-copy reveal">
        <p class="eyebrow"><span class="eyebrow-line"></span> PERSONAL SYSTEM / 2026</p>
        <h1>Building useful things<br /><em>in the space between</em><br />code & intelligence.</h1>
        <p class="hero-lede">${profile.intro}</p>
        <div class="hero-actions"><a class="button button-primary" href="#projects">Explore my work <span>↗</span></a><button class="button button-ghost" data-open-chat>Talk to my AI <span>↗</span></button></div>
        <div class="hero-meta"><span><b>01</b> WEB APPLICATIONS</span><span><b>02</b> AI AUTOMATION</span><span><b>03</b> VOICE AI</span></div>
      </div>
      <div class="hero-orbit reveal-delay" aria-label="A stylized orbital system visualizing AI, automation, and web development">
        <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="orbit orbit-three"></div>
        <div class="orbit-label label-top">AI SYSTEMS <small>01</small></div><div class="orbit-label label-right">AUTOMATIONS <small>02</small></div><div class="orbit-label label-bottom">WEB APPS <small>03</small></div>
        <div class="core"><div class="core-inner">TS</div></div>
        <div class="satellite sat-one"></div><div class="satellite sat-two"></div><div class="satellite sat-three"></div>
      </div>
      <div class="scroll-cue"><span>SCROLL TO EXPLORE</span><i></i></div>
    </section>

    <section class="signal-strip"><div class="section-wrap strip-inner"><span class="status"><i></i> SYSTEMS ONLINE</span><span>AI-POWERED APPLICATIONS</span><span>WORKFLOW AUTOMATION</span><span>MODERN WEB DEVELOPMENT</span></div></section>

    <section id="about" class="section-wrap section about-section">
      <div class="section-kicker"><span>01 — PROFILE</span><span>THE BUILDER BEHIND THE SYSTEM</span></div>
      <div class="about-grid"><div><h2>Curious by nature.<br /><em>Practical by design.</em></h2></div><div class="about-copy"><p class="lead">I’m Troy — a developing Web Application Developer and AI Automation Specialist building at the intersection of <span>web development</span>, <span>AI</span>, and <span>automation</span>.</p><p>I have a growing programming foundation and practical experience building AI-powered applications, workflow automations, voice agents, and web-based tools. I can read and work with JavaScript and Python, and I use AI-assisted development tools as an accelerator while reviewing, testing, debugging, and understanding the result.</p><a class="text-link" href="#stack">See the stack I’m growing into <span>↓</span></a></div></div>
      <div class="profile-card"><div class="portrait-wrap"><img src="/profile.png" alt="Portrait of Troy Sacote" /></div><div><p class="card-label">CURRENT DIRECTION</p><h3>Web Application Development<br /><span>+</span> AI Automation</h3><p>Looking to contribute to an AI-enabled technology team, learn from experienced developers, and ship production-quality systems.</p></div><div class="card-coordinates">14°35' N<br />120°59' E</div></div>
    </section>

    <section id="projects" class="section-wrap section projects-section"><div class="section-kicker"><span>02 — SELECTED SYSTEMS</span><span>PROJECT ARCHIVE / 04 ENTRIES</span></div><div class="section-heading"><h2>Work in <em>motion.</em></h2><p>Real product patterns, clearly labeled as concepts where the details are still being developed.</p></div><div class="project-grid">${projects.map((project) => `<article class="project-card ${project.accent}" data-project="${project.id}"><div class="project-top"><span>${project.index} / ${project.type}</span><span class="project-status">${project.status}</span></div><div class="project-visual visual-${project.accent}"><div class="visual-grid"></div><div class="visual-beam"></div><span class="visual-code">${project.id === 'voice' ? 'VAPI → N8N' : project.id === 'documents' ? 'PDF / JSON' : project.id === 'agent' ? 'TOOLS + CONTEXT' : 'APP / API / AI'}</span></div><h3>${project.title}</h3><p>${project.description}</p><div class="tag-row">${project.tags.map((tag) => `<span>${tag}</span>`).join('')}</div><button class="card-link" data-project-detail="${project.id}">View system notes <span>↗</span></button></article>`).join('')}</div></section>

    <section id="ai-lab" class="section-wrap section lab-section"><div class="section-kicker"><span>03 — AI AUTOMATION LAB</span><span>SAFE DEMO MODE AVAILABLE</span></div><div class="lab-header"><div><h2>From signal<br />to <em>action.</em></h2></div><div><p>Automation is most useful when every handoff is visible. Explore the systems I’m learning to connect — and run a safe local simulation.</p><span class="lab-note">// LIVE EXECUTION LAYER</span></div></div><div class="workflow-grid">${workflows.map((workflow) => `<article class="workflow-card" data-workflow-card="${workflow.id}"><div class="workflow-heading"><span class="workflow-number">${workflow.number}</span><div><h3>${workflow.title}</h3><p>${workflow.subtitle}</p></div><span class="workflow-arrow">↗</span></div><div class="flow-nodes">${workflow.nodes.map((node, i) => `<div class="flow-node"><span>${String(i+1).padStart(2,'0')}</span>${node}</div>${i < workflow.nodes.length - 1 ? '<b>→</b>' : ''}`).join('')}</div><button class="run-demo" data-run-workflow="${workflow.id}"><span class="play-icon">▶</span> Run workflow demo</button><div class="execution" aria-live="polite"></div></article>`).join('')}</div></section>

    <section id="stack" class="section-wrap section stack-section"><div class="section-kicker"><span>04 — DEVELOPMENT STACK</span><span>SELECT A NODE TO INSPECT</span></div><div class="stack-layout"><div><h2>The tools are<br /><em>connected.</em></h2><p class="stack-intro">I’m building fluency across the full path from idea to deployed product. Each tool has a job; the value is in how they work together.</p><div class="stack-detail" id="stack-detail"><span class="detail-category">WEB / 01</span><h3>Select a constellation node</h3><p>Choose a tool to see how it fits into Troy’s current development practice.</p></div></div><div class="constellation">${stack.map(([name, category, desc], i) => `<button class="stack-node node-${i+1}" data-stack="${i}"><span></span>${name}<small>${category}</small></button>`).join('')}<div class="stack-core">TS<small>DEVELOPMENT<br />STACK</small></div><svg viewBox="0 0 600 520" aria-hidden="true"><path d="M300 250 L110 100 M300 250 L240 58 M300 250 L450 95 M300 250 L520 220 M300 250 L465 370 M300 250 L370 470 M300 250 L185 420 M300 250 L75 300 M300 250 L115 190 M300 250 L245 465 M300 250 L500 320 M300 250 L405 48" /></svg></div></div></section>

    <section id="experience" class="section-wrap section experience-section"><div class="section-kicker"><span>05 — DIRECTION</span><span>THE NEXT ITERATION</span></div><div class="experience-grid"><div><h2>Learning is part of<br /><em>the architecture.</em></h2><p class="lead">I believe strong developers never stop learning.</p></div><div class="timeline"><div class="timeline-item active"><span>NOW</span><div><h3>Web Application Development + AI Automation</h3><p>Actively building practical AI applications, workflow automations, voice-agent concepts, and modern web projects.</p></div></div><div class="timeline-item"><span>NEXT</span><div><h3>Strengthen the foundations</h3><p>React, Next.js, TypeScript, Git/GitHub, REST APIs, SQL, PostgreSQL, testing, and deeper backend architecture.</p></div></div><div class="timeline-item"><span>THEN</span><div><h3>Contribute inside a technology team</h3><p>Bring curiosity, hands-on momentum, and a willingness to learn to AI-enabled web application work.</p></div></div></div></div><div class="learning-grid"><span class="learning-title">CURRENTLY LEVELING UP</span>${['React','Next.js','TypeScript','Git / GitHub','REST APIs','SQL','PostgreSQL','Testing','Production deployment'].map((item,i) => `<div class="learning-pill"><span>0${i+1}</span>${item}</div>`).join('')}</div></section>

    <section id="contact" class="section-wrap section contact-section"><div class="contact-card"><div><span class="eyebrow"><span class="eyebrow-line"></span> OPEN CHANNEL</span><h2>Let’s build<br /><em>something useful.</em></h2><p>Have an AI product, workflow, or web application in mind? Start a conversation.</p></div><div class="contact-actions"><a class="button button-primary" href="mailto:${profile.email}">Email Troy <span>↗</span></a><a class="contact-line" href="https://github.com" target="_blank" rel="noreferrer">GitHub <span>↗</span></a><a class="contact-line" href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a></div><span class="contact-coordinate">MANILA, PH / AVAILABLE TO COLLABORATE</span></div></section>
  </main>
  <footer class="footer section-wrap"><a class="brand" href="#top"><span class="brand-mark">TS</span><span>TROY <i>SACOTE</i></span></a><span>© 2026 / BUILT WITH CURIOSITY + AI</span><span>WEB · AI · AUTOMATION</span></footer>

  <div class="modal" id="project-modal" aria-hidden="true"><div class="modal-backdrop" data-close-modal></div><div class="modal-panel"><button class="close-button" data-close-modal aria-label="Close project details">×</button><span class="eyebrow">SYSTEM NOTES</span><div id="project-modal-content"></div></div></div>
  <div class="chat-panel" id="chat-panel" aria-hidden="true"><div class="chat-header"><div><span class="status"><i></i> AI PORTFOLIO GUIDE</span><h2>Ask Troy’s AI</h2></div><button class="close-button" data-close-chat aria-label="Close chat">×</button></div><div class="chat-messages" id="chat-messages"><div class="chat-message bot">Hi — I can help you explore Troy’s projects, tools, automation experience, and current learning path.</div><div class="suggestions">${['What can Troy build?','What is he learning?','Has he built voice AI?'].map((q) => `<button data-question="${q}">${q}</button>`).join('')}</div></div><form class="chat-form" id="chat-form"><input id="chat-input" autocomplete="off" placeholder="Ask about the portfolio…" aria-label="Ask Troy's AI" /><button aria-label="Send message">↗</button></form></div>
`;

// Atmosphere: lightweight 2D canvas preserves the galaxy feel without making the page depend on WebGL.
const canvas = document.querySelector('#galaxy');
const ctx = canvas.getContext('2d');
let stars = [], pointer = { x: 0, y: 0 }, reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function resizeGalaxy() { canvas.width = innerWidth * devicePixelRatio; canvas.height = innerHeight * devicePixelRatio; canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); const count = innerWidth < 700 ? 110 : 240; stars = Array.from({length: count}, (_, i) => ({ x: Math.random()*innerWidth, y: Math.random()*innerHeight, r: Math.random()*1.4+.15, a: Math.random()*.75+.1, p: Math.random()*Math.PI*2, speed: Math.random()*.3+.05, tint: i % 5 === 0 ? '124, 182, 255' : i % 9 === 0 ? '184, 125, 255' : '220, 231, 246' })); }
function drawGalaxy(t=0) { ctx.clearRect(0,0,innerWidth,innerHeight); const glow = ctx.createRadialGradient(innerWidth*.72, innerHeight*.35, 0, innerWidth*.72, innerHeight*.35, innerWidth*.62); glow.addColorStop(0,'rgba(91,73,180,.16)'); glow.addColorStop(.45,'rgba(20,67,112,.08)'); glow.addColorStop(1,'rgba(2,4,8,0)'); ctx.fillStyle=glow; ctx.fillRect(0,0,innerWidth,innerHeight); stars.forEach(s => { const x=s.x + pointer.x*(s.r*3), y=s.y + pointer.y*(s.r*2), pulse=reducedMotion?1:Math.sin(t*.001*s.speed+s.p)*.18+1; ctx.beginPath(); ctx.arc(x,y,s.r*pulse,0,Math.PI*2); ctx.fillStyle=`rgba(${s.tint},${s.a})`; ctx.fill(); }); if (!reducedMotion) requestAnimationFrame(drawGalaxy); }
resizeGalaxy(); drawGalaxy(); addEventListener('resize', resizeGalaxy); addEventListener('pointermove', (e) => { pointer.x=(e.clientX/innerWidth-.5)*2; pointer.y=(e.clientY/innerHeight-.5)*2; if (reducedMotion) drawGalaxy(); });

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }), { threshold: .12 }); document.querySelectorAll('.section, .reveal').forEach((el) => observer.observe(el));

document.querySelectorAll('[data-project-detail]').forEach((button) => button.addEventListener('click', () => { const project = projects.find((p) => p.id === button.dataset.projectDetail); document.querySelector('#project-modal-content').innerHTML = `<span class="detail-category">${project.index} / ${project.type}</span><h2>${project.title}</h2><p>${project.description}</p><div class="modal-callout"><span>KEY OUTCOME</span><strong>${project.outcome}</strong></div><div class="tag-row">${project.tags.map((tag) => `<span>${tag}</span>`).join('')}</div><p class="muted">Project details coming soon — this archive is ready to be replaced with screenshots, live demos, repositories, and technical notes as each system matures.</p>`; const modal=document.querySelector('#project-modal'); modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); }));
document.querySelectorAll('[data-close-modal]').forEach((el) => el.addEventListener('click', () => { const modal=document.querySelector('#project-modal'); modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); }));

document.querySelectorAll('[data-run-workflow]').forEach((button) => button.addEventListener('click', async () => { const card=button.closest('.workflow-card'), execution=card.querySelector('.execution'), workflow=workflows.find((w)=>w.id===button.dataset.runWorkflow); button.disabled=true; execution.innerHTML='<span class="exec-live">●</span> Preparing demo…'; const steps=['Trigger sent','n8n workflow executing','AI processing','Workflow completed']; for (const step of steps) { await new Promise((resolve)=>setTimeout(resolve, reducedMotion?80:520)); execution.innerHTML += `<span class="exec-step">↓ ${step}</span>`; } execution.innerHTML += `<strong>${workflow.result}</strong><small>Demo Mode · no external webhook configured</small>`; button.disabled=false; }));

document.querySelectorAll('[data-stack]').forEach((node) => node.addEventListener('click', () => { const [name, category, desc]=stack[Number(node.dataset.stack)]; document.querySelectorAll('.stack-node').forEach((n)=>n.classList.remove('selected')); node.classList.add('selected'); document.querySelector('#stack-detail').innerHTML=`<span class="detail-category">${category.toUpperCase()} / ${String(Number(node.dataset.stack)+1).padStart(2,'0')}</span><h3>${name}</h3><p>${desc}</p>`; }));

const chatPanel=document.querySelector('#chat-panel'), chatMessages=document.querySelector('#chat-messages'); function openChat(){ chatPanel.classList.add('open'); chatPanel.setAttribute('aria-hidden','false'); document.querySelector('#chat-input').focus(); } function closeChat(){ chatPanel.classList.remove('open'); chatPanel.setAttribute('aria-hidden','true'); } document.querySelectorAll('[data-open-chat]').forEach((b)=>b.addEventListener('click',openChat)); document.querySelector('[data-close-chat]').addEventListener('click',closeChat);
function answer(question){ const q=question.toLowerCase(); if(q.includes('senior')) return chatKnowledge.senior; if(q.includes('learn')) return chatKnowledge.learning; if(q.includes('voice')||q.includes('vapi')||q.includes('eleven')) return chatKnowledge.voice; if(q.includes('n8n')||q.includes('automation')) return chatKnowledge.n8n; if(q.includes('tool')||q.includes('tech')) return chatKnowledge.tools; if(q.includes('role')||q.includes('looking')) return chatKnowledge.role; if(q.includes('build')||q.includes('experience')) return chatKnowledge.experience; return "I don't have enough information about that in Troy's portfolio knowledge base."; }
function addMessage(text,type){ const item=document.createElement('div'); item.className=`chat-message ${type}`; item.textContent=text; chatMessages.append(item); chatMessages.scrollTop=chatMessages.scrollHeight; }
document.querySelectorAll('[data-question]').forEach((b)=>b.addEventListener('click',()=>{ const q=b.dataset.question; addMessage(q,'user'); setTimeout(()=>addMessage(answer(q),'bot'), reducedMotion?80:400); })); document.querySelector('#chat-form').addEventListener('submit',(e)=>{e.preventDefault(); const input=document.querySelector('#chat-input'), q=input.value.trim(); if(!q)return; addMessage(q,'user'); input.value=''; setTimeout(()=>addMessage(answer(q),'bot'), reducedMotion?80:400); });

const menuButton=document.querySelector('.menu-button'), nav=document.querySelector('.nav-links'); menuButton.addEventListener('click',()=>{ const open=nav.classList.toggle('open'); menuButton.setAttribute('aria-expanded',String(open)); }); nav.querySelectorAll('a').forEach((a)=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));

