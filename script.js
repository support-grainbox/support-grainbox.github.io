/* ==========================================================================
   CONTENT — Grain Box portfolio (images + linked films / music videos)
   ========================================================================== */

const WORKS = [
  {
    index:'01', title:'A Little Space We All Need', client:'Pratibha Production',
    tag:'TV & Film', category:'SHORT FILM', img:'assets/work-01.jpg',
    url:'https://www.instagram.com/reel/DLwxP5Jx4aO/',
    desc:'Festival short — Honorable Mention, Film That Move Jamaica 2025; Official Selection, Indian Independent Film Festival & Amader International Short Film Festival 2025.'
  },
  {
    index:'02', title:'The Last Yug', client:'Himalayan Oracle Films',
    tag:'TV & Film', category:'FEATURE FILM', img:'assets/work-02.jpg',
    url:'https://www.instagram.com/reel/DLwxP5Jx4aO/',
    desc:'Mythic prophecy thriller. DP: Samir Patel & Sagar Unagar. Post & VFX: Ocean / Sagar Unagar.'
  },
  {
    index:'03', title:'Highover', client:'BAWA BELT / Mafia Origins',
    tag:'Commercial', category:'MUSIC VIDEO', img:'assets/yt-highover.jpg',
    url:'https://youtu.be/qbsyLU3TxU4',
    desc:'Official music video — Highover by BAWA BELT with Minus1Celsious & 7Stroma.'
  },
  {
    index:'04', title:'Tere Siva', client:'Ocean Music',
    tag:'Commercial', category:'MUSIC VIDEO', img:'assets/yt-teresiva.jpg',
    url:'https://youtu.be/ASsEL4rFOZ4',
    desc:'Official video featuring Sagar Unagar & Payal Tailor. Music: Rinkesh Jangid. Post: Ocean Music.'
  },
  {
    index:'05', title:'Adhura Muqadma', client:'Ocean',
    tag:'Commercial', category:'MUSIC VIDEO', img:'assets/yt-adhura.jpg',
    url:'https://youtu.be/UznVtlB1ygY',
    desc:'Original Indian chill-rap video shot in Uttarakhand. DOP: Jemin Devganiya. Edit: Ocean.'
  },
  {
    index:'06', title:'Showreel 2026', client:'Sagar Unagar / Grain Box',
    tag:'Editorial', category:'SHOWREEL',     img:'assets/work-03.jpg',
    url:'https://youtu.be/_m_ax-qDtto',
    desc:'Selected frames — film, music video, commercial and brand work.'
  },
  {
    index:'07', title:'COITONIC', client:'COITONIC Athletics',
    tag:'Commercial', category:'BRAND CAMPAIGN', img:'assets/work-05.jpg',
    url:'https://youtu.be/_m_ax-qDtto',
    desc:'Studio campaign stills for athletic apparel — color and monochrome looks.'
  },
  {
    index:'08', title:'Infinium Tecginics', client:'Infinium Tecginics',
    tag:'Commercial', category:'PRODUCT FILM', img:'assets/work-04.jpg',
    url:'https://youtu.be/_m_ax-qDtto',
    desc:'Beauty & skincare campaign — Face Balance Acne Facewash and 360 Bright Skin Glow.'
  },
];

const ARCHIVE = [
  { label:'00:04', ar:'3/4',  img:'assets/archive-01.jpg' },
  { label:'00:11', ar:'3/4',  img:'assets/archive-02.jpg' },
  { label:'00:02', ar:'3/4',  img:'assets/archive-03.jpg' },
  { label:'00:18', ar:'4/5',  img:'assets/archive-04.jpg' },
  { label:'00:07', ar:'3/4',  img:'assets/archive-05.jpg' },
  { label:'00:23', ar:'4/5',  img:'assets/archive-06.jpg' },
  { label:'00:09', ar:'3/4',  img:'assets/archive-07.jpg' },
  { label:'00:14', ar:'3/4',  img:'assets/archive-08.jpg' },
  { label:'00:03', ar:'16/9', img:'assets/yt-highover.jpg' },
  { label:'00:19', ar:'16/9', img:'assets/yt-teresiva.jpg' },
  { label:'00:06', ar:'16/9', img:'assets/yt-adhura.jpg' },
  { label:'00:21', ar:'16/9', img:'assets/work-03.jpg' },
];

/* ==========================================================================
   HELPERS
   ========================================================================== */

function dropcap(str){
  return String(str).replace(/(^|\s|\[)([A-ZÀ-ÖØ-Þ])/g, (m, pre, letter) => `${pre}<em>${letter}</em>`);
}

function el(html){
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function mediaHTML(src, label, extraClass = ''){
  return `<div class="ph ${extraClass}" data-label="${label || ''}"><img src="${src}" alt="${label || ''}" loading="lazy"></div>`;
}

function youtubeId(url){
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

function openProject(url){
  if (!url) return;
  const id = youtubeId(url);
  if (id){
    openVideoModal(id);
    return;
  }
  window.open(url, '_blank', 'noopener');
}

function openVideoModal(id){
  const modal = document.getElementById('video-modal');
  const frame = document.getElementById('video-frame');
  frame.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  modal.classList.add('is-open');
}

function closeVideoModal(){
  const modal = document.getElementById('video-modal');
  const frame = document.getElementById('video-frame');
  frame.src = '';
  modal.classList.remove('is-open');
}

function splitTitle(title){
  const words = title.split(' ');
  const mid = Math.ceil(words.length / 2);
  return { left: words.slice(0, mid).join(' '), right: words.slice(mid).join(' ') };
}

/* ==========================================================================
   VIEW ROUTING
   ========================================================================== */
const views = document.querySelectorAll('.view');
const navLinks = document.querySelectorAll('.nav__link');
const workModeToggle = document.getElementById('work-mode-toggle');
const footerFilters = document.getElementById('footer-filters');
let currentPage = 'work';

function setActiveNav(page){
  navLinks.forEach(l => l.classList.toggle('is-active', l.dataset.page === page));
}

function showPage(page){
  if (page === currentPage) return;
  currentPage = page;

  views.forEach(v => {
    const on = v.dataset.view === page;
    v.classList.toggle('is-active', on);
    if (on){
      v.classList.remove('is-entering');
      void v.offsetWidth;
      v.classList.add('is-entering');
    }
  });

  setActiveNav(page);
  document.body.classList.toggle('is-work', page === 'work');
  document.getElementById('main').scrollTop = 0;
  const activeView = document.querySelector('.view.is-active');
  if (activeView) activeView.scrollTop = 0;
}

navLinks.forEach(link => {
  link.addEventListener('click', () => showPage(link.dataset.page));
});

document.querySelectorAll('[data-page]').forEach(node => {
  if (node.classList.contains('nav__link')) return;
  node.addEventListener('click', (e) => {
    e.preventDefault();
    showPage(node.dataset.page);
  });
});

/* ==========================================================================
   WORK — SLIDER
   ========================================================================== */
let workIndex = 0;
let workFilter = 'all';
let workAnimating = false;

function filteredWorks(){
  return workFilter === 'all' ? WORKS : WORKS.filter(w => w.tag === workFilter);
}

function renderSlider(animate = true){
  const list = filteredWorks();
  if (!list.length) return;
  workIndex = ((workIndex % list.length) + list.length) % list.length;
  const w = list[workIndex];
  const parts = splitTitle(w.title);
  const slider = document.getElementById('work-slider');
  const media = document.getElementById('work-media');

  if (animate){
    slider.classList.remove('is-swap');
    void slider.offsetWidth;
    slider.classList.add('is-swap');
  }

  // On narrow screens show the full title as one block (avoids split looking broken)
  const narrow = window.matchMedia('(max-width: 900px)').matches;
  const titleLeft = document.getElementById('work-title-left');
  const titleRight = document.getElementById('work-title-right');
  if (narrow){
    titleLeft.textContent = w.title;
    titleRight.textContent = '';
    titleRight.setAttribute('hidden', '');
  } else {
    titleLeft.textContent = parts.left;
    titleRight.textContent = parts.right;
    titleRight.removeAttribute('hidden');
  }
  document.getElementById('work-tag-left').textContent  = w.category;
  document.getElementById('work-tag-right').textContent = w.tag.toUpperCase();
  media.setAttribute('data-label', w.client);
  media.innerHTML = `<img src="${w.img}" alt="${w.title}">`;
  document.getElementById('work-index').textContent = w.index + '.';
  document.getElementById('work-client').textContent = w.client;
  document.getElementById('work-count').textContent = '.' + String(list.length).padStart(2,'0');
}

function advanceWork(delta){
  if (workAnimating) return;
  workAnimating = true;
  workIndex += delta;
  renderSlider(true);
  setTimeout(() => { workAnimating = false; }, 420);
}

window.matchMedia('(max-width: 900px)').addEventListener('change', () => {
  if (document.getElementById('view-work')?.classList.contains('is-active')){
    renderSlider(false);
  }
});

document.getElementById('work-frame').addEventListener('click', () => {
  const w = filteredWorks()[workIndex];
  if (w?.url) openProject(w.url);
  else advanceWork(1);
});

let wheelLock = false;
document.getElementById('view-work').addEventListener('wheel', (e) => {
  if (document.getElementById('view-work').classList.contains('mode-list')) return;
  if (!document.getElementById('view-work').classList.contains('is-active')) return;
  e.preventDefault();
  if (wheelLock) return;
  wheelLock = true;
  advanceWork(e.deltaY > 0 ? 1 : -1);
  setTimeout(() => { wheelLock = false; }, 500);
}, { passive: false });

/* Mobile: vertical swipe changes work slides (wheel events don't fire on phones) */
(function initWorkTouchSwipe(){
  const view = document.getElementById('view-work');
  if (!view) return;
  let startY = 0;
  let startX = 0;
  let tracking = false;

  view.addEventListener('touchstart', (e) => {
    if (!view.classList.contains('is-active') || view.classList.contains('mode-list')) return;
    if (e.touches.length !== 1) return;
    tracking = true;
    startY = e.touches[0].clientY;
    startX = e.touches[0].clientX;
  }, { passive: true });

  view.addEventListener('touchmove', (e) => {
    if (!tracking) return;
    if (!view.classList.contains('is-active') || view.classList.contains('mode-list')) return;
    e.preventDefault();
  }, { passive: false });

  view.addEventListener('touchend', (e) => {
    if (!tracking) return;
    tracking = false;
    if (!view.classList.contains('is-active') || view.classList.contains('mode-list')) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const dy = touch.clientY - startY;
    const dx = touch.clientX - startX;
    if (Math.abs(dy) < 36) return;
    if (Math.abs(dy) < Math.abs(dx) * 1.1) return;
    advanceWork(dy < 0 ? 1 : -1);
  }, { passive: true });
})();

/* ==========================================================================
   WORK — LIST
   ========================================================================== */
function renderList(){
  const container = document.getElementById('work-list');
  container.innerHTML = '';
  filteredWorks().forEach(w => {
    const row = el(`
      <div class="work-row">
        <span class="work-row__index">${w.index}.</span>
        <div class="work-row__titles">
          <h3>${dropcap(w.title)}</h3>
          <span>${w.client}</span>
        </div>
        <div class="work-row__media ph"><img src="${w.img}" alt="${w.title}"></div>
        <span class="work-row__tag">${w.tag.toUpperCase()}</span>
      </div>
    `);
    row.addEventListener('click', () => openProject(w.url));
    container.appendChild(row);
  });
}

workModeToggle.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-mode]');
  if (!btn) return;
  const mode = btn.dataset.mode;
  document.getElementById('view-work').classList.toggle('mode-list', mode === 'list');
  [...workModeToggle.querySelectorAll('button')].forEach(b => b.classList.toggle('is-active', b === btn));
  if (mode === 'list') renderList();
});

footerFilters.addEventListener('click', (e) => {
  const item = e.target.closest('.footer__filters-item');
  if (!item) return;
  applyWorkFilter(item.dataset.filter);
});

document.getElementById('work-filters')?.addEventListener('click', (e) => {
  const item = e.target.closest('.footer__filters-item');
  if (!item) return;
  applyWorkFilter(item.dataset.filter);
});

function applyWorkFilter(filter){
  workFilter = filter === 'all' ? 'all' : filter;
  workIndex = 0;
  document.querySelectorAll('.footer__filters-item').forEach(i => {
    i.classList.toggle('is-active', i.dataset.filter === filter);
  });
  renderSlider(true);
  renderList();
  const count = '(' + String(filteredWorks().length).padStart(2,'0') + ')';
  document.querySelectorAll('.filter-count').forEach(node => { node.textContent = count; });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape'){
    closeVideoModal();
    return;
  }
  if (document.getElementById('view-work').classList.contains('is-active') &&
      !document.getElementById('view-work').classList.contains('mode-list')){
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') advanceWork(-1);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') advanceWork(1);
  }
});

/* ==========================================================================
   ARCHIVE
   ========================================================================== */
function renderArchive(){
  const grid = document.getElementById('archive-grid');
  grid.innerHTML = '';
  ARCHIVE.forEach((item, i) => {
    grid.appendChild(el(`
      <div class="archive__item" style="--ar:${item.ar}">
        <div class="ph"><img src="${item.img}" alt="Archive frame ${i + 1}" loading="lazy"></div>
        <span class="archive__item__tc">${item.label}</span>
      </div>
    `));
  });
}

/* ==========================================================================
   CLOCK / VIDEO MODAL
   ========================================================================== */
function tickClock(){
  document.getElementById('clock').textContent = new Date().toLocaleTimeString('en-GB', { hour12:false });
}
setInterval(tickClock, 1000);

document.getElementById('video-close')?.addEventListener('click', closeVideoModal);
document.getElementById('video-modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'video-modal') closeVideoModal();
});

/* Background reel — muted autoplay (retry if browser defers play) */
(function initBgVideo(){
  const el = document.getElementById('bg-video');
  if (!el) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    el.pause();
    return;
  }
  const tryPlay = () => el.play().catch(() => {});
  tryPlay();
  el.addEventListener('loadeddata', tryPlay, { once:true });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) tryPlay();
  });
})();

/* ==========================================================================
   INIT
   ========================================================================== */
document.querySelectorAll('[data-dropcap]').forEach(node => {
  if (node.textContent.trim()) node.innerHTML = dropcap(node.textContent);
});

renderSlider(false);
renderList();
renderArchive();
tickClock();

currentPage = null;
showPage('work');
document.querySelectorAll('.filter-count').forEach(node => {
  node.textContent = '(' + String(WORKS.length).padStart(2,'0') + ')';
});
