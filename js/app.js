// اللغة الحالية
let LANG = localStorage.getItem('ph_lang') || 'ar';

// الوضع الداكن
(function initTheme(){
  const saved = localStorage.getItem('ph_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

function toggleTheme(){
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('ph_theme', next);
  const btn = document.getElementById('themeToggle');
  if(btn){
    btn.innerHTML = next === 'dark'
      ? '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    btn.title = next === 'dark' ? (LANG==='ar'?'الوضع الفاتح':'Light mode') : (LANG==='ar'?'الوضع الداكن':'Dark mode');
  }
}

const T = {
  ar: {
    brand:'مسار', home:'الرئيسية', categories:'التصنيفات',
    searchPh:'ابحث عن بودكاست أو حلقة...', search:'بحث',
    hero1:'اكتشف أفضل البودكاستات', hero2:'من كل الأنواع في مكان واحد',
    heroDesc:'تقنية • تطوير ذات • ثقافة • دين • أعمال • صحة • وأكثر. شاهد الحلقات بجودة عالية.',
    free:'محتوى مجاني', hd:'فيديو عالي الجودة', multi:'محتوى متنوع',
    sPodcasts:'بودكاست وحلقة', sCats:'تصنيف مختلف', sSources:'منصة مصدر', sFree:'مجاني بالكامل',
    browse:'تصفح حسب التصنيف', viewAll:'عرض الكل ←', latest:'أحدث الحلقات المضافة',
    all:'الكل', start:'ابدأ رحلة الاستماع اليوم', join:'انضم لآلاف المستمعين واكتشف محتوى يغير نظرتك.',
    explore:'استكشف الحلقات', aboutText:'منصة عربية مجانية تجمع أفضل البودكاستات في مكان واحد مع تجربة مشاهدة عالية الجودة.',
    quick:'روابط سريعة', disc:'إخلاء مسؤولية',
    discText:'جميع المواد ملك أصحابها الأصليين. المنصة توفر تجربة مشاهدة منظمة فقط.',
    copy:'© 2026 مسار — جميع الحقوق محفوظة',
    back:'← العودة للرئيسية', fs:'تكبير الشاشة', exitFs:'تصغير',
    related:'حلقات مشابهة', noRes:'لا توجد نتائج', views:'مشاهدة',
    allCats:'كل التصنيفات', choose:'اختر التصنيف الذي يناسب اهتماماتك',
    searchCat:'ابحث داخل التصنيفات أو الحلقات...', noEp:'لا توجد حلقات حالياً',
    myEps:'حلقاتي', mySub:'كل الحلقات التي فتحتها، مع نسبة تقدم المشاهدة', myEmpty:'لم تشاهد أي حلقة بعد'
  },
  en: {
    brand:'Masar', home:'Home', categories:'Categories',
    searchPh:'Search for a podcast or episode...', search:'Search',
    hero1:'Discover the Best Podcasts', hero2:'of Every Kind in One Place',
    heroDesc:'Tech • Self-Development • Culture • Religion • Business • Health & more. Watch in high quality.',
    free:'Free Content', hd:'High Quality Video', multi:'Diverse Content',
    sPodcasts:'Podcasts & Episodes', sCats:'Categories', sSources:'Source Platforms', sFree:'Completely Free',
    browse:'Browse by Category', viewAll:'View All →', latest:'Latest Added Episodes',
    all:'All', start:'Start Your Listening Journey Today', join:'Join thousands of listeners and discover life-changing content.',
    explore:'Explore Episodes', aboutText:'A free platform gathering the best podcasts in one place with high-quality viewing.',
    quick:'Quick Links', disc:'Disclaimer',
    discText:'All materials belong to their original owners. The platform provides an organized viewing experience only.',
    copy:'© 2026 Masar — All rights reserved',
    back:'← Back to Home', fs:'Fullscreen', exitFs:'Exit Fullscreen',
    related:'Related Episodes', noRes:'No results found', views:'views',
    allCats:'All Categories', choose:'Choose the category that matches your interests',
    searchCat:'Search within categories or episodes...', noEp:'No episodes yet',
    myEps:'My Episodes', mySub:'All episodes you opened, with watch progress', myEmpty:'No episodes watched yet'
  }
};

function t(key){ return T[LANG][key] || key; }
function txt(obj){ return obj[LANG] || obj.ar || ''; }

function setLang(l){
  LANG = l;
  localStorage.setItem('ph_lang', l);
  document.documentElement.lang = l;
  document.documentElement.dir = l==='ar' ? 'rtl' : 'ltr';
  document.body.className = l==='ar' ? 'rtl' : 'ltr';
  if(typeof renderPage === 'function') renderPage();
}

function catLabel(c){ return CATEGORIES[c] ? CATEGORIES[c][LANG] : c; }

/** تحويل المشاهدات مثل 7.9M+ أو 500K إلى رقم للترتيب */
function parseViews(v){
  if(v == null) return 0;
  if(typeof v === 'number') return v;
  const s = String(v).trim().toUpperCase().replace(/,/g,'').replace(/\+/g,'');
  const m = s.match(/^([\d.]+)\s*([KMB])?$/i);
  if(!m) return parseFloat(s) || 0;
  const n = parseFloat(m[1]) || 0;
  const u = (m[2] || '').toUpperCase();
  if(u === 'K') return n * 1e3;
  if(u === 'M') return n * 1e6;
  if(u === 'B') return n * 1e9;
  return n;
}

function sortByPopularity(list){
  return list.slice().sort(function(a, b){
    return parseViews(b.views) - parseViews(a.views);
  });
}

function cardHTML(p){
  const fallback = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='270' viewBox='0 0 480 270'%3E%3Crect fill='%231a1a2e' width='480' height='270'/%3E%3Ccircle cx='240' cy='120' r='36' fill='%23e94560'/%3E%3Cpolygon points='230,100 230,140 260,120' fill='white'/%3E%3Ctext x='240' y='200' text-anchor='middle' fill='%23aaa' font-family='Arial' font-size='14'%3Eمسار%3C/text%3E%3C/svg%3E";
  return `<a href="podcast.html?id=${p.id}" class="card">
    <div class="card-thumb">
      <img src="https://i.ytimg.com/vi/${p.youtubeId}/hqdefault.jpg" 
           alt="" 
           loading="lazy"
           onerror="this.onerror=null;this.src='${fallback}'"/>
      <span class="card-duration">${p.duration}</span>
      <div class="card-play"><span>▶</span></div>
    </div>
    <div class="card-body">
      <div class="card-show">${txt(p.show)}</div>
      <div class="card-title">${txt(p.title)}</div>
      <div class="card-meta"><span>${txt(p.host)}</span><span>${p.views}</span></div>
    </div>
  </a>`;
}

function getUser(){
  try { return JSON.parse(localStorage.getItem('ph_user')||'null'); } catch(e){ return null; }
}
function saveUser(u){ localStorage.setItem('ph_user', JSON.stringify(u)); }


// ========== نظام حلقاتي / التقدم ==========
let _historyCache = null;
let _historyLoadedFor = null;

function getHistory(){
  if(_historyCache) return _historyCache;
  try {
    _historyCache = JSON.parse(localStorage.getItem('ph_history') || '{}');
  } catch(e){
    _historyCache = {};
  }
  return _historyCache;
}

function saveHistory(h){
  _historyCache = h;
  localStorage.setItem('ph_history', JSON.stringify(h));
}

function updateEpisodeProgress(id, progress, extra){
  const h = getHistory();
  const key = String(id);
  const prev = h[key] || {};
  const pct = Math.max(0, Math.min(100, Math.round(Number(progress) || 0)));
  const newPct = Math.max(prev.progress || 0, pct);
  h[key] = {
    id: Number(id),
    progress: newPct,
    lastWatched: Date.now(),
    title: (extra && extra.title) || prev.title || '',
    show: (extra && extra.show) || prev.show || '',
    youtubeId: (extra && extra.youtubeId) || prev.youtubeId || '',
    duration: (extra && extra.duration) || prev.duration || ''
  };
  saveHistory(h);
  const user = getUser();
  if(user && user.uid && typeof firebaseDb !== 'undefined' && firebaseDb && !String(user.uid).startsWith('local_')){
    try {
      firebaseDb.collection('users').doc(user.uid).collection('history').doc(key).set(h[key], { merge: true }).catch(function(){});
    } catch(e){}
  }
  return h[key];
}

async function loadHistoryFromCloud(uid){
  if(!uid || String(uid).startsWith('local_')) return;
  if(_historyLoadedFor === uid) return;
  if(typeof firebaseDb === 'undefined' || !firebaseDb) return;
  try {
    const snap = await firebaseDb.collection('users').doc(uid).collection('history').get();
    const local = getHistory();
    snap.forEach(function(doc){
      const d = doc.data();
      const id = String(d.id || doc.id);
      const prev = local[id];
      if(!prev || (d.progress || 0) > (prev.progress || 0) || (d.lastWatched || 0) > (prev.lastWatched || 0)){
        local[id] = Object.assign({}, prev || {}, d, { id: Number(id) });
      }
    });
    saveHistory(local);
    _historyLoadedFor = uid;
  } catch(e){
    console.warn('loadHistoryFromCloud', e);
  }
}

function renderMyEpisodes(){
  renderNavbar();
  renderFooter();
  const grid = document.getElementById('myGrid');
  const empty = document.getElementById('myEmpty');
  if(!grid) return;

  const h = getHistory();
  const items = Object.values(h)
    .filter(function(x){ return x && x.id; })
    .sort(function(a,b){ return (b.lastWatched || 0) - (a.lastWatched || 0); });

  if(document.getElementById('myTitle')){
    document.getElementById('myTitle').textContent = t('myEps');
  }
  if(document.getElementById('mySub')){
    document.getElementById('mySub').textContent = t('mySub');
  }

  if(!items.length){
    grid.innerHTML = '';
    if(empty){
      empty.style.display = 'block';
      empty.innerHTML = '<div style="font-size:3rem;margin-bottom:0.5rem">▶</div><p>' + t('myEmpty') + '</p><a href="index.html" class="btn btn-primary" style="margin-top:1rem">' + t('explore') + '</a>';
    }
    return;
  }
  if(empty) empty.style.display = 'none';

  grid.innerHTML = items.map(function(item){
    const p = PODCASTS.find(function(x){ return x.id === item.id; });
    const title = item.title || (p ? txt(p.title) : ('#' + item.id));
    const show = item.show || (p ? txt(p.show) : '');
    const ytid = item.youtubeId || (p && p.youtubeId) || '';
    const thumb = ytid ? ('https://i.ytimg.com/vi/' + ytid + '/hqdefault.jpg') : '';
    const fallback = "data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'480\' height=\'270\' viewBox=\'0 0 480 270\'%3E%3Crect fill=\'%231a1a2e\' width=\'480\' height=\'270\'/%3E%3Ccircle cx=\'240\' cy=\'120\' r=\'36\' fill=\'%23e94560\'/%3E%3Cpolygon points=\'230,100 230,140 260,120\' fill=\'white\'/%3E%3Ctext x=\'240\' y=\'200\' text-anchor=\'middle\' fill=\'%23aaa\' font-family=\'Arial\' font-size=\'14\'%3Eمسار%3C/text%3E%3C/svg%3E";
    const pct = Math.max(0, Math.min(100, item.progress || 0));
    const dur = item.duration || (p && p.duration) || '';
    return '<a href="podcast.html?id=' + item.id + '" class="history-item">' +
      '<div class="history-thumb">' +
        (thumb ? '<img src="' + thumb + '" alt="" loading="lazy" onerror="this.onerror=null;this.src=\'' + fallback + '\'"/>' : '<div class="history-thumb-placeholder">▶</div>') +
        (dur ? '<span class="card-duration">' + dur + '</span>' : '') +
      '</div>' +
      '<div class="history-body">' +
        '<div class="history-show">' + show + '</div>' +
        '<div class="history-title">' + title + '</div>' +
        '<div class="history-progress-wrap">' +
          '<div class="history-progress-bar"><div class="history-progress-fill" style="width:' + pct + '%"></div></div>' +
          '<span class="history-pct">' + pct + '%</span>' +
        '</div>' +
      '</div></a>';
  }).join('');
}

// ========== شاشة التحميل ==========
function showLoadingScreen(){
  if(sessionStorage.getItem('ph_loaded') === '1') {
    document.body.classList.add('page-ready');
    return;
  }
  if(document.getElementById('siteLoader')) return;
  document.body.classList.add('page-loading');
  var overlay = document.createElement('div');
  overlay.id = 'siteLoader';
  overlay.className = 'site-loader';
  overlay.innerHTML = '<video id="loaderVideo" autoplay muted playsinline><source src="img/loading.mp4" type="video/mp4"/></video>';
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  var video = document.getElementById('loaderVideo');
  var hide = function(){
    sessionStorage.setItem('ph_loaded', '1');
    overlay.classList.add('hide');
    document.body.style.overflow = '';
    document.body.classList.remove('page-loading');
    document.body.classList.add('page-ready');
    // start counters after page appears
    setTimeout(animateStatCounters, 400);
    setTimeout(function(){ if(overlay.parentNode) overlay.remove(); }, 700);
  };
  if(video){
    video.addEventListener('ended', hide);
    video.addEventListener('error', hide);
    setTimeout(hide, 6000); // short intro ~5s + buffer
  } else {
    setTimeout(hide, 1200);
  }
}
if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', showLoadingScreen);
} else {
  showLoadingScreen();
}

// ===== عداد الإحصائيات =====
function animateStatCounters(){
  function animate(el, target, suffix, duration){
    if(!el) return;
    var start = 0;
    var startTime = null;
    function step(ts){
      if(!startTime) startTime = ts;
      var p = Math.min((ts - startTime) / duration, 1);
      // easeOut
      p = 1 - Math.pow(1 - p, 3);
      var val = Math.floor(start + (target - start) * p);
      el.textContent = val.toLocaleString() + (suffix || '');
      if(p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + (suffix || '');
    }
    requestAnimationFrame(step);
  }
  // 1: 100% free
  var s1 = document.getElementById('stat1');
  if(s1) animate(s1, 100, '%', 1200);
  // 2: categories count
  var s2 = document.getElementById('stat2');
  if(s2) animate(s2, Object.keys(CATEGORIES).length, '', 1000);
  // 3: episodes
  var s3 = document.getElementById('stat3');
  if(s3) animate(s3, PODCASTS.length, '', 1800);
  // 4: views-like number
  var s4 = document.getElementById('stat4');
  if(s4) animate(s4, 12, 'K+', 1400);
}

// if page already loaded (no intro), still run counters
if(sessionStorage.getItem('ph_loaded') === '1'){
  document.addEventListener('DOMContentLoaded', function(){
    setTimeout(animateStatCounters, 300);
  });
}



function toggleAvatarMenu(e){
  if(e) e.stopPropagation();
  const dd = document.getElementById('avatarDropdown');
  if(!dd) return;
  dd.classList.toggle('show');
}
document.addEventListener('click', function(e){
  const wrap = document.getElementById('avatarWrap');
  const dd = document.getElementById('avatarDropdown');
  if(dd && wrap && !wrap.contains(e.target)){
    dd.classList.remove('show');
  }
});

async function showSiteStats(){
  const dd = document.getElementById('avatarDropdown');
  if(dd) dd.classList.remove('show');
  let usersCount = '—';
  let watchedCount = '—';
  let topCountries = LANG==='ar'
    ? ['السعودية','مصر','الإمارات','الكويت','الأردن']
    : ['Saudi Arabia','Egypt','UAE','Kuwait','Jordan'];
  try {
    if(typeof firebaseDb !== 'undefined' && firebaseDb){
      const usersSnap = await firebaseDb.collection('users').get();
      usersCount = usersSnap.size;
      let totalWatched = 0;
      // sample history counts
      for(const doc of usersSnap.docs.slice(0, 50)){
        try {
          const h = await firebaseDb.collection('users').doc(doc.id).collection('history').get();
          totalWatched += h.size;
        } catch(e){}
      }
      watchedCount = totalWatched > 0 ? totalWatched + '+' : Object.keys(getHistory()).length || 0;
    } else {
      watchedCount = Object.keys(getHistory()).length || 0;
      usersCount = localStorage.getItem('ph_user') ? 1 : 0;
    }
  } catch(e){
    console.error(e);
    watchedCount = Object.keys(getHistory()).length || 0;
  }

  // create/show modal
  let modal = document.getElementById('statsModal');
  if(!modal){
    modal = document.createElement('div');
    modal.id = 'statsModal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }
  const countriesHTML = topCountries.map((c,i)=>`<div class="stat-country"><span class="stat-rank">${i+1}</span><span>${c}</span></div>`).join('');
  modal.innerHTML = `
    <div class="modal stats-modal">
      <h2>${LANG==='ar'?'إحصائيات الموقع':'Site Statistics'}</h2>
      <p>${LANG==='ar'?'نظرة عامة على نشاط المنصة':'Overview of platform activity'}</p>
      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-num" id="statUsers">${usersCount}</div>
          <div class="stat-label">${LANG==='ar'?'مستخدم مسجل':'Registered Users'}</div>
        </div>
        <div class="stat-box">
          <div class="stat-num" id="statWatched">${watchedCount}</div>
          <div class="stat-label">${LANG==='ar'?'حلقات تمت مشاهدتها':'Episodes Watched'}</div>
        </div>
        <div class="stat-box">
          <div class="stat-num">${PODCASTS.length}</div>
          <div class="stat-label">${LANG==='ar'?'حلقات متاحة':'Available Episodes'}</div>
        </div>
      </div>
      <h3 class="stats-subtitle">${LANG==='ar'?'أكثر الدول زيارة':'Top Countries'}</h3>
      <div class="stats-countries">${countriesHTML}</div>
      <button class="btn btn-primary" style="width:100%;margin-top:1.25rem" onclick="document.getElementById('statsModal').classList.remove('show')">${LANG==='ar'?'إغلاق':'Close'}</button>
    </div>`;
  modal.classList.add('show');
  modal.onclick = function(e){ if(e.target === modal) modal.classList.remove('show'); };
}


function renderNavbar(){
  const nav = document.getElementById('navbar');
  if(!nav) return;
  const user = getUser();
  const path = location.pathname;
  const isHome = path.endsWith('index.html') || path.endsWith('/') || path === '';
  const isCat = path.includes('categories');
  const isAbout = path.includes('about');
  const isMy = path.includes('my.html');
  const isProf = path.includes('profile');

  let avatarHTML = '';
  if(user){
    const letter = (user.name||user.email||'U').charAt(0).toUpperCase();
    const isAdmin = (user.email||'').toLowerCase() === 'xrammar4@gmail.com';
    const avatarInner = user.avatar
      ? `<img src="${user.avatar}" alt=""/>`
      : letter;
    avatarHTML = `
      <div class="avatar-wrap" id="avatarWrap">
        <button class="avatar-btn" onclick="toggleAvatarMenu(event)" title="${user.name||''}">${avatarInner}</button>
        <div class="avatar-dropdown" id="avatarDropdown">
          <div class="avatar-dd-header">
            <div class="avatar-dd-name">${user.name || (LANG==='ar'?'مستخدم':'User')}</div>
            <div class="avatar-dd-email">${user.email || ''}</div>
          </div>
          <a href="profile.html" class="avatar-dd-item">${LANG==='ar'?'الملف الشخصي':'Profile'}</a>
          ${isAdmin ? `<button class="avatar-dd-item avatar-dd-stats" onclick="showSiteStats()">${LANG==='ar'?'إحصائيات الموقع':'Site Statistics'}</button>` : ''}
          <button class="avatar-dd-item avatar-dd-logout" onclick="logout()">${LANG==='ar'?'تسجيل الخروج':'Logout'}</button>
        </div>
      </div>`;
  } else {
    avatarHTML = `<button class="avatar-btn" onclick="openAuthModal()" title="تسجيل الدخول">?</button>`;
  }

  nav.innerHTML = `
  <div class="nav-inner">
    <a href="/" class="logo">
      <img src="logo.png" alt="مسار" class="logo-img"/>
    </a>
    <div class="nav-links" id="navLinks">
      <a href="index.html" class="${isHome?'active':''}">${t('home')}</a>
      <a href="categories.html" class="${isCat?'active':''}">${t('categories')}</a>
      <a href="my.html" class="${isMy?'active':''}">${t('myEps')}</a>
      <a href="about.html" class="${isAbout?'active':''}">${LANG==='ar'?'عن المنصة':'About'}</a>
    </div>
    <div class="nav-actions">
      <div class="nav-search">
        <span>⌕</span>
        <input type="text" placeholder="${t('searchPh')}" id="navSearchInput" onkeypress="if(event.key==='Enter'){location.href='categories.html?q='+encodeURIComponent(this.value)}"/>
        <span>K</span>
      </div>
      <button class="theme-toggle" id="themeToggle" onclick="toggleTheme()" title="${(document.documentElement.getAttribute('data-theme')==='dark') ? (LANG==='ar'?'الوضع الفاتح':'Light mode') : (LANG==='ar'?'الوضع الداكن':'Dark mode')}">
        ${(document.documentElement.getAttribute('data-theme')==='dark')
          ? '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
          : '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'}
      </button>
      <button class="btn btn-ghost" onclick="setLang(LANG==='ar'?'en':'ar')">${LANG==='ar'?'EN':'عربي'}</button>
      ${avatarHTML}
      <button class="mobile-menu-btn" onclick="document.getElementById('navLinks').classList.toggle('open')">☰</button>
    </div>
  </div>
  <div class="modal-overlay" id="authModal">
    <div class="modal">
      <h2 id="authTitle">${LANG==='ar'?'تسجيل الدخول':'Login'}</h2>
      <p id="authSub">${LANG==='ar'?'سجّل دخولك لحفظ تقدمك وتخصيص تجربتك':'Sign in to save progress and customize your experience'}</p>
      <div class="form-group">
        <label>Email</label>
        <input type="email" id="authEmail" placeholder="email@example.com"/>
      </div>
      <div class="form-group">
        <label>${LANG==='ar'?'كلمة المرور':'Password'}</label>
        <input type="password" id="authPassword" placeholder="••••••••"/>
      </div>
      <div class="form-group" id="authNameGroup" style="display:none">
        <label>${LANG==='ar'?'الاسم':'Name'}</label>
        <input type="text" id="authName" placeholder="${LANG==='ar'?'اسمك':'Your name'}"/>
      </div>
      <div class="auth-error" id="authError"></div>
      <div class="modal-btns">
        <button class="btn btn-outline" onclick="closeAuthModal()">${LANG==='ar'?'إلغاء':'Cancel'}</button>
        <button class="btn btn-primary" id="authSubmitBtn" onclick="handleAuth()">${LANG==='ar'?'دخول':'Login'}</button>
      </div>
      <div class="auth-switch">
        <span id="authSwitchText">${LANG==='ar'?'ليس لديك حساب؟':'No account?'}</span>
        <a id="authSwitchLink" onclick="toggleAuthMode()">${LANG==='ar'?'إنشاء حساب':'Sign up'}</a>
      </div>
    </div>
  </div>`;
}

let authMode = 'login'; // login | register
function openAuthModal(){
  if(!location.pathname.includes('login.html')){
    sessionStorage.setItem('ph_return', location.pathname + location.search);
    location.href = 'login.html';
    return;
  }
  const m = document.getElementById('authModal');
  if(m) m.classList.add('show');
}
function closeAuthModal(){
  const m = document.getElementById('authModal');
  if(m) m.classList.remove('show');
  const err = document.getElementById('authError');
  if(err) err.style.display = 'none';
}

function requireLogin(returnUrl){
  const url = returnUrl || (location.pathname + location.search);
  sessionStorage.setItem('ph_return', url);
  location.href = 'login.html';
}

function showAuthError(msg){
  const errEl = document.getElementById('authError');
  if(errEl){
    errEl.textContent = msg;
    errEl.style.display = 'block';
  } else {
    alert(msg);
  }
}

async function signInWithGoogle(){
  const errEl = document.getElementById('authError');
  if(errEl){ errEl.style.display = 'none'; errEl.textContent = ''; }

  if(location.protocol === 'file:'){
    showAuthError('لا يمكن تسجيل الدخول من ملف محلي. استخدم الموقع المرفوع.');
    return;
  }

  if(typeof firebase === 'undefined'){
    showAuthError('مكتبة Firebase لم تُحمّل. تحقق من اتصال الإنترنت.');
    return;
  }
  if(typeof firebaseAuth === 'undefined' || !firebaseAuth){
    if(typeof initFirebase === 'function') initFirebase();
  }
  if(!firebaseAuth){
    showAuthError('Firebase غير مفعّل. تأكد من مفاتيح المشروع في firebase-config.js');
    return;
  }

  const btn = document.querySelector('.btn-google');
  if(btn){ btn.disabled = true; btn.style.opacity = '0.7'; }

  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    provider.setCustomParameters({ prompt: 'select_account' });

    let cred;
    try {
      cred = await firebaseAuth.signInWithPopup(provider);
    } catch(popupErr){
      console.warn('popup failed, trying redirect', popupErr);
      if(popupErr.code === 'auth/popup-blocked' ||
         popupErr.code === 'auth/popup-closed-by-user' ||
         popupErr.code === 'auth/cancelled-popup-request'){
        await firebaseAuth.signInWithRedirect(provider);
        return;
      }
      throw popupErr;
    }

    const u = {
      uid: cred.user.uid,
      email: cred.user.email,
      name: cred.user.displayName || (cred.user.email ? cred.user.email.split('@')[0] : 'User'),
      avatar: cred.user.photoURL || ''
    };
    saveUser(u);
    if(typeof loadHistoryFromCloud === 'function'){
      await loadHistoryFromCloud(u.uid);
    }
    closeAuthModal();
    renderNavbar();

    const ret = sessionStorage.getItem('ph_return');
    sessionStorage.removeItem('ph_return');
    if(ret && !ret.includes('login.html')){
      location.href = ret;
    } else {
      location.href = 'index.html';
    }
  } catch(e){
    console.error('Google sign-in error:', e);
    let msg = e.message || 'Google sign-in failed';
    if(e.code === 'auth/unauthorized-domain'){
      msg = 'النطاق غير مصرح. أضف نطاق موقعك من Firebase → Authentication → Settings → Authorized domains';
    } else if(e.code === 'auth/operation-not-allowed'){
      msg = 'تسجيل Google غير مفعّل. من Firebase → Authentication → Sign-in method → Google → Enable';
    } else if(e.code === 'auth/popup-closed-by-user'){
      msg = 'تم إغلاق نافذة Google. حاول مرة أخرى.';
    } else if(e.code === 'auth/network-request-failed'){
      msg = 'مشكلة شبكة. تحقق من الإنترنت.';
    }
    showAuthError(msg);
  } finally {
    if(btn){ btn.disabled = false; btn.style.opacity = '1'; }
  }
}

async function handleAuth(){ return signInWithGoogle(); }

function logout(){
  if(typeof firebaseAuth !== 'undefined' && firebaseAuth) firebaseAuth.signOut().catch(()=>{});
  localStorage.removeItem('ph_user');
  _historyCache = null;
  _historyLoadedFor = null;
  location.href = 'index.html';
}

function renderProfile(){
  renderNavbar(); renderFooter();
  const user = getUser();
  if(!user){
    document.getElementById('profileContent').innerHTML = `<div class="empty"><p>${LANG==='ar'?'يجب تسجيل الدخول أولاً':'Please login first'}</p><button class="btn btn-primary" onclick="openAuthModal()">${LANG==='ar'?'تسجيل الدخول':'Login'}</button></div>`;
    return;
  }
  const letter = (user.name||'U').charAt(0).toUpperCase();
  document.getElementById('profileContent').innerHTML = `
  <div class="profile-card">
    <div class="profile-avatar-wrap">
      <div class="profile-avatar" id="profAvatar">
        ${user.avatar ? `<img src="${user.avatar}" alt=""/>` : letter}
      </div>
      <div>
        <button class="avatar-upload-btn" onclick="document.getElementById('avatarFile').click()">${LANG==='ar'?'تغيير الصورة':'Change photo'}</button>
        <input type="file" id="avatarFile" accept="image/*" style="display:none" onchange="onAvatarChange(event)"/>
      </div>
    </div>
    <div class="form-group">
      <label>${LANG==='ar'?'الاسم':'Name'}</label>
      <input type="text" id="profName" value="${user.name||''}"/>
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="email" value="${user.email||''}" disabled style="opacity:0.7"/>
    </div>
    <div class="modal-btns">
      <button class="btn btn-outline" onclick="logout()">${LANG==='ar'?'تسجيل الخروج':'Logout'}</button>
      <button class="btn btn-primary" onclick="saveProfile()">${LANG==='ar'?'حفظ':'Save'}</button>
    </div>
  </div>`;
}

function onAvatarChange(e){
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(ev){
    const user = getUser() || {};
    user.avatar = ev.target.result;
    saveUser(user);
    const el = document.getElementById('profAvatar');
    if(el) el.innerHTML = `<img src="${ev.target.result}" alt=""/>`;
    renderNavbar();
  };
  reader.readAsDataURL(file);
}

function saveProfile(){
  const user = getUser();
  if(!user) return;
  user.name = document.getElementById('profName').value.trim() || user.name;
  saveUser(user);
  // Update Firebase profile if available
  if(typeof firebaseAuth !== 'undefined' && firebaseAuth && firebaseAuth.currentUser){
    firebaseAuth.currentUser.updateProfile({ displayName: user.name }).catch(()=>{});
  }
  alert(LANG==='ar'?'تم الحفظ':'Saved');
  renderNavbar();
  renderProfile();
}


function renderFooter(){
  const f = document.getElementById('footer');
  if(!f) return;
  f.innerHTML = `
  <div class="footer-inner">
    <div>
      <div class="logo" style="margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem">
        <img src="logo.png" alt="مسار" class="logo-img" style="height:44px;"/>
      </div>
      <p style="max-width:360px;font-size:0.9rem">${t('aboutText')}</p>
    </div>
    <div><h4>${t('quick')}</h4>
      <div style="display:flex;flex-direction:column;gap:0.4rem;font-size:0.9rem">
        <a href="index.html">${t('home')}</a>
        <a href="categories.html">${t('categories')}</a>
        <a href="my.html">${t('myEps')}</a>
        <a href="about.html">${LANG==='ar'?'عن المنصة':'About'}</a>
      </div>
    </div>
    <div><h4>${t('disc')}</h4>
      <p style="font-size:0.85rem;opacity:0.7">${t('discText')}</p>
    </div>
  </div>
  <div class="footer-bottom">
    <div>${t('copy')}</div>
    <div class="dev-credit">Developed By <a href="https://www.instagram.com/9lilx.8" target="_blank" rel="noopener noreferrer">AMMaR</a></div>
  </div>`;
}

// ===== About =====
function renderAbout(){
  renderNavbar(); renderFooter();
  document.title = (LANG==='ar' ? 'عن المنصة | مسار' : 'About | Masar');
  if(LANG === 'ar'){
    document.getElementById('aboutTitle').textContent = 'عن منصة مسار';
    document.getElementById('aboutDesc').textContent = 'منصة عربية مجانية تجمع أفضل البودكاستات والحلقات الفكرية في مكان واحد، بتجربة مشاهدة منظمة وعالية الجودة.';
    document.getElementById('feat1t').textContent = 'محتوى مجاني';
    document.getElementById('feat1d').textContent = 'مئات الحلقات المجانية في التطوير الذاتي والثقافة والأعمال والدين وأكثر.';
    document.getElementById('feat2t').textContent = 'تجربة مشاهدة مميزة';
    document.getElementById('feat2d').textContent = 'واجهة نظيفة وتصنيفات واضحة وبحث سريع لتصل لما تحتاجه بسرعة.';
    document.getElementById('feat3t').textContent = 'تنوع فكري';
    document.getElementById('feat3d').textContent = 'نختار وننظم أفضل المحتوى العربي ليكون رحلتك الفكرية أسهل وأكثر إثراءً.';
    document.getElementById('ctaAboutTitle').textContent = 'هل أنت مستعد للبدء؟';
    document.getElementById('ctaAboutDesc').textContent = 'انضم إلينا الآن واستكشف مئات الحلقات المميزة. رحلتك الفكرية تبدأ بخطوة.';
    document.getElementById('ctaAboutBtn').textContent = 'تصفح المنصة';
  } else {
    document.getElementById('aboutTitle').textContent = 'About Masar';
    document.getElementById('aboutDesc').textContent = 'A free Arabic platform that gathers the best podcasts and intellectual episodes in one place, with an organized high-quality viewing experience.';
    document.getElementById('feat1t').textContent = 'Free Content';
    document.getElementById('feat1d').textContent = 'Hundreds of free episodes on self-development, culture, business, religion and more.';
    document.getElementById('feat2t').textContent = 'Great Viewing Experience';
    document.getElementById('feat2d').textContent = 'Clean interface, clear categories and fast search so you find what you need quickly.';
    document.getElementById('feat3t').textContent = 'Intellectual Diversity';
    document.getElementById('feat3d').textContent = 'We select and organize the best Arabic content to make your intellectual journey richer and easier.';
    document.getElementById('ctaAboutTitle').textContent = 'Ready to start?';
    document.getElementById('ctaAboutDesc').textContent = 'Join us now and explore hundreds of outstanding episodes. Your intellectual journey starts with one step.';
    document.getElementById('ctaAboutBtn').textContent = 'Browse Platform';
  }
}

// ===== Home =====
function renderHome(){
  renderNavbar(); renderFooter();
  // Keep modern hero texts (designed to match the reference image)
  if(LANG === 'ar'){
    document.getElementById('heroTitle').innerHTML = 'اكتشف أفضل البودكاستات<br>العربية مع <span>مسار</span>';
    document.getElementById('heroDesc').textContent = 'انضم إلى آلاف المستمعين العرب. تصفح مئات الحلقات المجانية في التطوير الذاتي، الثقافة، الأعمال، الدين وأكثر واحصل على تجربة مشاهدة عالية الجودة.';
    document.getElementById('searchBtn').textContent = 'ابحث الآن';
    document.getElementById('searchInput').placeholder = 'ابحث عن حلقة (مثال: تطوير الذات)...';
    document.getElementById('badges').innerHTML = '<span>✓ محتوى مجاني</span><span>✓ فيديو عالي الجودة</span><span>✓ محتوى متنوع</span>';
  } else {
    document.getElementById('heroTitle').innerHTML = t('hero1')+'<br><span>'+t('hero2')+'</span>';
    document.getElementById('heroDesc').textContent = t('heroDesc');
    document.getElementById('searchInput').placeholder = t('searchPh');
    document.getElementById('searchBtn').textContent = t('search');
    document.getElementById('badges').innerHTML = `<span>✓ ${t('free')}</span><span>✓ ${t('hd')}</span><span>✓ ${t('multi')}</span>`;
  }
  // stats section optional (may be removed from homepage)
  const _set = (id, val) => { const el = document.getElementById(id); if(el) el.textContent = val; };
  if(LANG === 'ar'){
    _set('stat1','0%'); _set('stat1l','محتوى مجاني');
    _set('stat2','0'); _set('stat2l','تصنيف مختلف');
    _set('stat3','0'); _set('stat3l','حلقة متاحة');
    _set('stat4','0'); _set('stat4l','مشاهدة للحلقات');
  } else {
    _set('stat1','0%'); _set('stat1l',t('sFree'));
    _set('stat2','0'); _set('stat2l',t('sCats'));
    _set('stat3','0'); _set('stat3l',t('sPodcasts'));
    _set('stat4','0'); _set('stat4l','Views');
  }
  const latestEl = document.getElementById('latestTitle');
  if(latestEl) latestEl.textContent = t('latest');
  document.getElementById('ctaTitle').textContent = t('start');
  document.getElementById('ctaDesc').textContent = t('join');
  document.getElementById('ctaBtn').textContent = t('explore');

  // تصنيفات نوع البودكاست على الجهة المقابلة للعنوان
  renderHomeCatFilters();
  updateSortUI();
  filterHome();
}

let homeQuery = '';
let homeSort = 'newest'; // newest | oldest | popular
let homeCat = 'all';
let _homeList = [];
let _homeShown = 0;
const PAGE_SIZE = 48;

function renderHomeCatFilters(){
  const el = document.getElementById('homeCatFilters');
  if(!el) return;
  const cats = ['all', ...Object.keys(CATEGORIES).slice(0, 8)];
  el.innerHTML = cats.map(function(c){
    const label = c === 'all' ? t('all') : catLabel(c);
    const active = c === homeCat ? ' active' : '';
    return `<button type="button" class="chip${active}" data-cat="${c}" onclick="setHomeCat('${c}')">${label}</button>`;
  }).join('');
}

function setHomeCat(cat){
  homeCat = cat || 'all';
  document.querySelectorAll('#homeCatFilters .chip').forEach(function(b){
    b.classList.toggle('active', b.getAttribute('data-cat') === homeCat);
  });
  filterHome();
}

function parseDate(d){
  if(!d) return 0;
  const s = String(d).trim();
  if(/^\d{4}$/.test(s)) return Date.parse(s + '-01-01') || 0;
  const t = Date.parse(s);
  return isNaN(t) ? 0 : t;
}

const SORT_LABELS = {
  ar: { newest: 'الأحدث', oldest: 'الأقدم', popular: 'الأشهر' },
  en: { newest: 'Newest', oldest: 'Oldest', popular: 'Popular' }
};

function updateSortUI(){
  const labels = SORT_LABELS[LANG] || SORT_LABELS.ar;
  const sortLabel = document.getElementById('sortLabel');
  if(sortLabel) sortLabel.textContent = labels[homeSort] || labels.newest;
  document.querySelectorAll('#sortMenu .sort-option').forEach(function(btn){
    const key = btn.getAttribute('data-sort');
    btn.textContent = labels[key] || key;
    btn.classList.toggle('active', key === homeSort);
  });
}

function toggleSortMenu(e){
  if(e) e.stopPropagation();
  const menu = document.getElementById('sortMenu');
  const btn = document.getElementById('sortBtn');
  if(!menu || !btn) return;
  const open = menu.hasAttribute('hidden');
  if(open){
    menu.removeAttribute('hidden');
    btn.setAttribute('aria-expanded', 'true');
    btn.classList.add('open');
  } else {
    menu.setAttribute('hidden', '');
    btn.setAttribute('aria-expanded', 'false');
    btn.classList.remove('open');
  }
}

function closeSortMenu(){
  const menu = document.getElementById('sortMenu');
  const btn = document.getElementById('sortBtn');
  if(menu) menu.setAttribute('hidden', '');
  if(btn){
    btn.setAttribute('aria-expanded', 'false');
    btn.classList.remove('open');
  }
}

function setHomeSort(sort){
  homeSort = sort || 'newest';
  updateSortUI();
  closeSortMenu();
  filterHome();
}

// إتاحة الدوال للـ onclick في HTML
window.setHomeSort = setHomeSort;
window.toggleSortMenu = toggleSortMenu;
window.setHomeCat = setHomeCat;
window.filterHome = filterHome;
window.loadMoreHome = loadMoreHome;

document.addEventListener('click', function(e){
  const wrap = document.getElementById('sortWrap');
  if(wrap && !wrap.contains(e.target)) closeSortMenu();
});

function filterHome(){
  let list = PODCASTS.slice();
  if(homeCat && homeCat !== 'all'){
    list = list.filter(function(p){ return p.category === homeCat; });
  }
  if(homeQuery){
    const q = homeQuery.toLowerCase();
    list = list.filter(function(p){
      return txt(p.title).toLowerCase().includes(q)
        || txt(p.show).toLowerCase().includes(q)
        || txt(p.host).toLowerCase().includes(q);
    });
  }
  if(homeSort === 'popular'){
    list.sort(function(a, b){
      const d = parseViews(b.views) - parseViews(a.views);
      return d !== 0 ? d : (b.id - a.id);
    });
  } else if(homeSort === 'oldest'){
    list.sort(function(a, b){
      const d = parseDate(a.date) - parseDate(b.date);
      return d !== 0 ? d : (a.id - b.id);
    });
  } else {
    // newest
    list.sort(function(a, b){
      const d = parseDate(b.date) - parseDate(a.date);
      return d !== 0 ? d : (b.id - a.id);
    });
  }

  _homeList = list;
  _homeShown = 0;
  const grid = document.getElementById('grid');
  if(!grid) return;
  if(!list.length){
    grid.innerHTML = `<div class="empty">${t('noRes')}</div>`;
    return;
  }
  grid.innerHTML = '';
  loadMoreHome();
}

function loadMoreHome(){
  const grid = document.getElementById('grid');
  if(!grid) return;
  const oldBtn = document.getElementById('loadMoreBtn');
  if(oldBtn) oldBtn.remove();
  const next = _homeList.slice(_homeShown, _homeShown + PAGE_SIZE);
  _homeShown += next.length;
  grid.insertAdjacentHTML('beforeend', next.map(cardHTML).join(''));
  if(_homeShown < _homeList.length){
    grid.insertAdjacentHTML('beforeend', `
      <div id="loadMoreBtn" style="grid-column:1/-1;text-align:center;padding:24px">
        <button class="btn btn-primary" onclick="loadMoreHome()" style="min-width:200px">
          ${LANG==='ar' ? 'عرض المزيد (' + _homeShown + ' / ' + _homeList.length + ')' : 'Load More (' + _homeShown + ' / ' + _homeList.length + ')'}
        </button>
      </div>`);
  }
}

function doSearch(){
  homeQuery = document.getElementById('searchInput').value.trim();
  filterHome();
  const sec = document.getElementById('latestSec');
  if(sec) sec.scrollIntoView({behavior:'smooth'});
}

// ===== Categories =====
function renderCategories(){
  renderNavbar(); renderFooter();
  document.getElementById('pageTitle').textContent = t('allCats');
  document.getElementById('pageSub').textContent = t('choose');
  document.getElementById('catSearch').placeholder = t('searchCat');

  const params = new URLSearchParams(location.search);
  let active = params.get('cat') || 'all';

  const chips = document.getElementById('catChips');
  const allCats = ['all', ...Object.keys(CATEGORIES)];
  function drawChips(){
    chips.innerHTML = allCats.map(c=>`<button class="chip ${c===active?'active':''}" onclick="active='${c}';drawChips();drawGrid()">${c==='all'?t('all'):catLabel(c)}</button>`).join('');
  }
  window.drawChips = drawChips;

  let _catList = [];
  let _catShown = 0;
  const CAT_PAGE = 48;

  function drawGrid(){
    const q = document.getElementById('catSearch').value.trim().toLowerCase();
    let list = PODCASTS;
    if(active!=='all') list = list.filter(p=>p.category===active);
    if(q) list = list.filter(p=>txt(p.title).toLowerCase().includes(q)||txt(p.show).toLowerCase().includes(q));
    list = sortByPopularity(list);
    _catList = list;
    _catShown = 0;
    const grid = document.getElementById('grid');
    if(!list.length){ grid.innerHTML = `<div class="empty">${t('noEp')}</div>`; return; }
    grid.innerHTML = '';
    loadMoreCat();
  }

  function loadMoreCat(){
    const grid = document.getElementById('grid');
    if(!grid) return;
    const oldBtn = document.getElementById('loadMoreCatBtn');
    if(oldBtn) oldBtn.remove();
    const next = _catList.slice(_catShown, _catShown + CAT_PAGE);
    _catShown += next.length;
    grid.insertAdjacentHTML('beforeend', next.map(cardHTML).join(''));
    if(_catShown < _catList.length){
      grid.insertAdjacentHTML('beforeend', `
        <div id="loadMoreCatBtn" style="grid-column:1/-1;text-align:center;padding:24px">
          <button class="btn btn-primary" onclick="loadMoreCat()" style="min-width:200px">
            ${LANG==='ar' ? 'عرض المزيد (' + _catShown + ' / ' + _catList.length + ')' : 'Load More (' + _catShown + ' / ' + _catList.length + ')'}
          </button>
        </div>`);
    }
  }
  window.drawGrid = drawGrid;
  window.loadMoreCat = loadMoreCat;
  document.getElementById('catSearch').oninput = drawGrid;
  drawChips(); drawGrid();
}

// ===== Podcast page =====
function renderPodcast(){
  renderNavbar(); renderFooter();
  const id = parseInt(new URLSearchParams(location.search).get('id')) || 1;
  const p = PODCASTS.find(x=>x.id===id) || PODCASTS[0];

  document.title = txt(p.title) + ' | ' + t('brand');
  document.getElementById('backLink').textContent = t('back');
  document.getElementById('badge').textContent = catLabel(p.category);
  document.getElementById('showName').textContent = txt(p.show);
  document.getElementById('duration').textContent = p.duration;
  document.getElementById('views').textContent = p.views+' '+t('views');
  document.getElementById('title').textContent = txt(p.title);
  document.getElementById('desc').textContent = txt(p.description);
  document.getElementById('host').textContent = txt(p.host);
  document.getElementById('relatedTitle').textContent = t('related');

  // سجّل الحلقة فوراً بنسبة أولية
  updateEpisodeProgress(p.id, 1, {
    title: txt(p.title),
    show: txt(p.show),
    youtubeId: p.youtubeId,
    duration: p.duration
  });

  const box = document.getElementById('playerBox');
  const bar = box.querySelector('.player-bar');
  box.innerHTML = '';
  if(bar) box.appendChild(bar);

  // YouTube IFrame API لتتبع التقدم
  const playerDiv = document.createElement('div');
  playerDiv.id = 'ytPlayer';
  playerDiv.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
  box.insertBefore(playerDiv, box.firstChild);

  function startYtPlayer(){
    if(typeof YT === 'undefined' || !YT.Player){
      // fallback iframe بدون تتبع دقيق
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + p.youtubeId + '?rel=0&modestbranding=1&controls=1&playsinline=1&fs=1';
      iframe.title = txt(p.title);
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen';
      iframe.allowFullscreen = true;
      iframe.setAttribute('frameborder', '0');
      iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:0;';
      playerDiv.replaceWith(iframe);
      // تقدير تقريبي حسب الوقت على الصفحة
      let secs = 0;
      const approx = setInterval(function(){
        secs += 5;
        // نفترض متوسط مدة ~90 دقيقة إذا لم نعرف
        const est = Math.min(95, Math.round((secs / 5400) * 100));
        updateEpisodeProgress(p.id, est);
      }, 5000);
      window.addEventListener('beforeunload', function(){ clearInterval(approx); });
      return;
    }
    const player = new YT.Player('ytPlayer', {
      videoId: p.youtubeId,
      playerVars: {
        rel: 0, modestbranding: 1, controls: 1, playsinline: 1, fs: 1,
        iv_load_policy: 3, cc_load_policy: 0
      },
      events: {
        onStateChange: function(e){
          if(e.data === YT.PlayerState.PLAYING){
            if(window._ytProgressTimer) clearInterval(window._ytProgressTimer);
            window._ytProgressTimer = setInterval(function(){
              try {
                const cur = player.getCurrentTime() || 0;
                const dur = player.getDuration() || 0;
                if(dur > 0){
                  const pct = Math.min(100, Math.round((cur / dur) * 100));
                  updateEpisodeProgress(p.id, pct);
                }
              } catch(err){}
            }, 3000);
          } else if(e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED){
            if(window._ytProgressTimer) clearInterval(window._ytProgressTimer);
            try {
              const cur = player.getCurrentTime() || 0;
              const dur = player.getDuration() || 0;
              if(dur > 0){
                const pct = e.data === YT.PlayerState.ENDED ? 100 : Math.min(100, Math.round((cur / dur) * 100));
                updateEpisodeProgress(p.id, pct);
              }
            } catch(err){}
          }
        }
      }
    });
  }

  if(typeof YT !== 'undefined' && YT.Player){
    startYtPlayer();
  } else {
    window.onYouTubeIframeAPIReady = startYtPlayer;
    if(!document.getElementById('ytApiScript')){
      const s = document.createElement('script');
      s.id = 'ytApiScript';
      s.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(s);
    }
    // احتياطي إذا الـ API ما اشتغلت
    setTimeout(function(){ if(typeof YT === 'undefined') startYtPlayer(); }, 4000);
  }

  const related = PODCASTS.filter(x=>x.category===p.category && x.id!==p.id).slice(0,6);
  document.getElementById('relatedGrid').innerHTML = related.map(cardHTML).join('') || `<div class="empty">${t('noEp')}</div>`;
}

let isFs = false;
function toggleFs(){
  const box = document.getElementById('playerBox');
  if(!isFs){
    box.classList.add('fullscreen');
    isFs = true;
    if(box.requestFullscreen) box.requestFullscreen();
    else if(box.webkitRequestFullscreen) box.webkitRequestFullscreen();
  } else {
    box.classList.remove('fullscreen');
    isFs = false;
    if(document.exitFullscreen) document.exitFullscreen();
    else if(document.webkitExitFullscreen) document.webkitExitFullscreen();
  }
}
document.addEventListener('fullscreenchange',()=>{
  if(!document.fullscreenElement && isFs){
    document.getElementById('playerBox')?.classList.remove('fullscreen');
    isFs = false;
  }
});

// Init language on load
document.documentElement.lang = LANG;
document.documentElement.dir = LANG==='ar'?'rtl':'ltr';
document.body.className = LANG==='ar'?'rtl':'ltr';
