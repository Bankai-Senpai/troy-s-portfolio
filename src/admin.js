import './admin.css';
import { projectImageBucket, supabase, supabaseConfigured } from './supabase.js';

const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
const slugify = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || `project-${Date.now()}`;
const publicImageUrl = (path) => path ? supabase.storage.from(projectImageBucket).getPublicUrl(path).data.publicUrl : '';
let currentUser = null;
let editingProject = null;

function setMessage(selector, message, error = false) {
  const element = document.querySelector(selector);
  if (element) { element.textContent = message; element.classList.toggle('error', error); }
}

function openAdmin() {
  const shell = document.querySelector('#admin-shell');
  shell.classList.add('open'); shell.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
}

function closeAdmin() {
  const shell = document.querySelector('#admin-shell');
  shell.classList.remove('open'); shell.setAttribute('aria-hidden', 'true'); document.body.style.overflow = '';
}

function renderPublicProjects(projects) {
  const grid = document.querySelector('.project-grid');
  if (!grid || !projects.length) return;
  grid.innerHTML = projects.map((project, index) => {
    const image = publicImageUrl(project.image_path);
    const tags = (project.technologies || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
    const imageStyle = image ? ` style="background-image:linear-gradient(180deg,rgba(7,9,15,.05),rgba(7,9,15,.85)),url('${escapeHtml(image)}');background-size:cover;background-position:center"` : '';
    return `<article class="project-card cyan"><div class="project-top"><span>${String(index + 1).padStart(2, '0')} / ${escapeHtml(project.category)}</span><span class="project-status">Published</span></div><div class="project-visual visual-cyan"${imageStyle}><div class="visual-grid"></div><div class="visual-beam"></div><span class="visual-code">${escapeHtml(project.slug).toUpperCase()}</span></div><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.description)}</p><div class="tag-row">${tags}</div><button class="card-link" data-managed-detail="${escapeHtml(project.id)}">View system notes <span>↗</span></button></article>`;
  }).join('');
  grid.querySelectorAll('[data-managed-detail]').forEach((button) => button.addEventListener('click', () => {
    const project = projects.find((item) => item.id === button.dataset.managedDetail);
    if (!project) return;
    document.querySelector('#project-modal-content').innerHTML = `<span class="detail-category">${escapeHtml(project.category)}</span><h2>${escapeHtml(project.title)}</h2><p>${escapeHtml(project.description)}</p><div class="modal-callout"><span>PROJECT LINKS</span><strong>${project.live_url ? `<a href="${escapeHtml(project.live_url)}" target="_blank" rel="noreferrer">Open live project ↗</a>` : 'Live project link coming soon.'}</strong></div><div class="tag-row">${(project.technologies || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>`;
    const modal = document.querySelector('#project-modal'); modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
  }));
}

async function loadPublishedProjects() {
  const { data } = await supabase.from('projects').select('*').eq('is_published', true).order('sort_order', { ascending: true }).order('created_at', { ascending: false });
  if (data?.length) renderPublicProjects(data);
}

function editorReset() {
  editingProject = null;
  document.querySelector('#editor-heading').textContent = 'New project';
  document.querySelector('#project-form').reset();
  document.querySelector('#project-category').value = 'PROJECT';
  document.querySelector('#project-order').value = '0';
  setMessage('#project-message', '');
}

function editorFill(project) {
  editingProject = project;
  document.querySelector('#editor-heading').textContent = 'Edit project';
  document.querySelector('#project-title').value = project.title;
  document.querySelector('#project-category').value = project.category;
  document.querySelector('#project-order').value = project.sort_order;
  document.querySelector('#project-description').value = project.description;
  document.querySelector('#project-technologies').value = (project.technologies || []).join(', ');
  document.querySelector('#project-live').value = project.live_url || '';
  document.querySelector('#project-source').value = project.source_url || '';
  document.querySelector('#project-published').checked = project.is_published;
  setMessage('#project-message', '');
}

async function loadAdminProjects() {
  const { data, error } = await supabase.from('projects').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: false });
  if (error) { setMessage('#project-message', error.message, true); return; }
  const list = document.querySelector('#admin-project-list');
  list.innerHTML = data.length ? data.map((project) => `<div class="admin-project"><div><h3>${escapeHtml(project.title)}</h3><p>${escapeHtml(project.description.slice(0, 120))}${project.description.length > 120 ? '…' : ''}</p><span class="admin-badge ${project.is_published ? '' : 'draft'}">${project.is_published ? 'Published' : 'Draft'}</span></div><div class="admin-project-actions"><button data-edit-project="${project.id}">Edit</button><button data-delete-project="${project.id}">Delete</button></div></div>`).join('') : '<p class="admin-help">No projects yet. Create your first project on the right.</p>';
  list.querySelectorAll('[data-edit-project]').forEach((button) => button.addEventListener('click', () => editorFill(data.find((project) => project.id === button.dataset.editProject))));
  list.querySelectorAll('[data-delete-project]').forEach((button) => button.addEventListener('click', async () => {
    const project = data.find((item) => item.id === button.dataset.deleteProject);
    if (!project || !window.confirm(`Delete “${project.title}”?`)) return;
    const { error: deleteError } = await supabase.from('projects').delete().eq('id', project.id);
    if (deleteError) setMessage('#project-message', deleteError.message, true); else { editorReset(); await loadAdminProjects(); await loadPublishedProjects(); }
  }));
}

async function showDashboard(user) {
  currentUser = user;
  const { data: admin, error } = await supabase.from('site_admins').select('user_id').eq('user_id', user.id).maybeSingle();
  if (error || !admin) { setMessage('#admin-login-message', 'This account is not authorized as a site administrator.', true); await supabase.auth.signOut(); return; }
  document.querySelector('#admin-login').classList.add('admin-hidden');
  document.querySelector('#admin-dashboard').classList.remove('admin-hidden');
  document.querySelector('#admin-user').textContent = `Signed in as ${user.email}`;
  await loadAdminProjects();
}

async function saveProject(event) {
  event.preventDefault();
  if (!currentUser) return;
  setMessage('#project-message', 'Saving…');
  const title = document.querySelector('#project-title').value.trim();
  const file = document.querySelector('#project-image').files[0];
  let imagePath = editingProject?.image_path || null;
  if (file) {
    const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]/g, '-');
    imagePath = `${currentUser.id}/${crypto.randomUUID()}-${safeName}`;
    const { error: uploadError } = await supabase.storage.from(projectImageBucket).upload(imagePath, file, { contentType: file.type, upsert: false });
    if (uploadError) { setMessage('#project-message', uploadError.message, true); return; }
  }
  const payload = { title, slug: editingProject?.slug || slugify(title), description: document.querySelector('#project-description').value.trim(), category: document.querySelector('#project-category').value.trim() || 'PROJECT', technologies: document.querySelector('#project-technologies').value.split(',').map((tag) => tag.trim()).filter(Boolean), image_path: imagePath, live_url: document.querySelector('#project-live').value.trim() || null, source_url: document.querySelector('#project-source').value.trim() || null, is_published: document.querySelector('#project-published').checked, sort_order: Number(document.querySelector('#project-order').value) || 0, owner_id: currentUser.id, updated_at: new Date().toISOString() };
  const result = editingProject ? await supabase.from('projects').update(payload).eq('id', editingProject.id) : await supabase.from('projects').insert(payload);
  if (result.error) { setMessage('#project-message', result.error.message, true); return; }
  editorReset(); setMessage('#project-message', 'Saved.'); await loadAdminProjects(); await loadPublishedProjects();
}

function adminMarkup() {
  const root = document.createElement('section'); root.id = 'admin-shell'; root.className = 'admin-shell'; root.setAttribute('aria-hidden', 'true');
  root.innerHTML = `<div class="admin-inner"><div class="admin-head"><div><span class="admin-kicker">PRIVATE CONTROL ROOM</span><h1>Portfolio admin.</h1></div><a class="admin-close" href="#top">← Return to site</a></div><div id="admin-login" class="admin-card admin-login"><span class="admin-kicker">SUPABASE AUTH</span><h2>Sign in to edit.</h2><p class="admin-help">Use your Supabase account. Only authorized site administrators can access project management.</p><form id="admin-login-form"><div class="admin-field"><label for="admin-email">Email</label><input id="admin-email" type="email" autocomplete="email" required /></div><div class="admin-field"><label for="admin-password">Password</label><input id="admin-password" type="password" autocomplete="current-password" required /></div><button class="admin-button primary" type="submit">Sign in</button></form><p id="admin-login-message" class="admin-message" aria-live="polite"></p></div><div id="admin-dashboard" class="admin-hidden"><div class="admin-actions" style="justify-content:space-between;margin:26px 0 0"><span id="admin-user" class="admin-user"></span><button id="admin-logout" class="admin-button">Sign out</button></div><div class="admin-grid"><div class="admin-card"><div class="admin-actions" style="justify-content:space-between;margin-bottom:20px"><h2>Projects</h2><button id="new-project" class="admin-button primary">New project</button></div><div id="admin-project-list"></div></div><div class="admin-card"><span class="admin-kicker">PROJECT EDITOR</span><h2 id="editor-heading">New project</h2><form id="project-form"><div class="admin-field"><label for="project-title">Title</label><input id="project-title" required maxlength="160" /></div><div class="admin-two"><div class="admin-field"><label for="project-category">Category</label><input id="project-category" value="PROJECT" maxlength="60" /></div><div class="admin-field"><label for="project-order">Display order</label><input id="project-order" type="number" value="0" /></div></div><div class="admin-field"><label for="project-description">Description</label><textarea id="project-description" required></textarea></div><div class="admin-field"><label for="project-technologies">Technologies, comma separated</label><input id="project-technologies" placeholder="React, Supabase, Vite" /></div><div class="admin-field"><label for="project-image">Project image</label><input id="project-image" type="file" accept="image/png,image/jpeg,image/webp,image/gif" /></div><div class="admin-two"><div class="admin-field"><label for="project-live">Live URL</label><input id="project-live" type="url" placeholder="https://" /></div><div class="admin-field"><label for="project-source">Source URL</label><input id="project-source" type="url" placeholder="https://github.com/" /></div></div><label class="admin-user" style="display:flex;gap:8px;align-items:center;margin-bottom:18px"><input id="project-published" type="checkbox" /> Publish on the public site</label><div class="admin-actions"><button class="admin-button primary" type="submit">Save project</button><button id="cancel-edit" class="admin-button" type="button">Clear</button></div><p id="project-message" class="admin-message" aria-live="polite"></p></form></div></div></div></div>`;
  document.body.append(root); return root;
}

function wireAdminEvents() {
  document.querySelector('#admin-login-form').addEventListener('submit', async (event) => { event.preventDefault(); setMessage('#admin-login-message', 'Signing in…'); const { data, error } = await supabase.auth.signInWithPassword({ email: document.querySelector('#admin-email').value.trim(), password: document.querySelector('#admin-password').value }); if (error) setMessage('#admin-login-message', error.message, true); else await showDashboard(data.user); });
  document.querySelector('#project-form').addEventListener('submit', saveProject);
  document.querySelector('#new-project').addEventListener('click', editorReset);
  document.querySelector('#cancel-edit').addEventListener('click', editorReset);
  document.querySelector('#admin-logout').addEventListener('click', async () => { await supabase.auth.signOut(); location.reload(); });
  window.addEventListener('hashchange', () => { if (location.hash === '#admin') openAdmin(); else closeAdmin(); });
  if (location.hash === '#admin') openAdmin();
}

export function initAdmin() {
  if (!supabaseConfigured) return;
  adminMarkup();
  const link = document.createElement('a'); link.className = 'admin-link'; link.href = '#admin'; link.textContent = 'Admin'; document.querySelector('.topbar').append(link);
  wireAdminEvents(); loadPublishedProjects();
  supabase.auth.getSession().then(({ data }) => { if (data.session?.user) showDashboard(data.session.user); });
}

