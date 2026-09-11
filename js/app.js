// اللغة الحالية
let LANG = localStorage.getItem('ph_lang') || 'ar';

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
    searchCat:'ابحث داخل التصنيفات أو الحلقات...', noEp:'لا توجد حلقات حالياً'
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
    searchCat:'Search within categories or episodes...', noEp:'No episodes yet'
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

function cardHTML(p){
  return `<a href="podcast.html?id=${p.id}" class="card">
    <div class="card-thumb">
      <img src="https://i.ytimg.com/vi/${p.youtubeId}/hqdefault.jpg" alt="" loading="lazy"/>
      <span class="card-duration">${p.duration}</span>
      <span class="card-cat">${catLabel(p.category)}</span>
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

function renderNavbar(){
  const nav = document.getElementById('navbar');
  if(!nav) return;
  const user = getUser();
  const path = location.pathname;
  const isHome = path.endsWith('index.html') || path.endsWith('/') || path === '';
  const isCat = path.includes('categories');
  const isAbout = path.includes('about');
  const isProf = path.includes('profile');

  let avatarHTML = '';
  if(user){
    if(user.avatar){
      avatarHTML = `<button class="avatar-btn" onclick="location.href='profile.html'" title="${user.name||''}"><img src="${user.avatar}" alt=""/></button>`;
    } else {
      const letter = (user.name||user.email||'U').charAt(0).toUpperCase();
      avatarHTML = `<button class="avatar-btn" onclick="location.href='profile.html'" title="${user.name||''}">${letter}</button>`;
    }
  } else {
    avatarHTML = `<button class="avatar-btn" onclick="openAuthModal()" title="تسجيل الدخول">?</button>`;
  }

  nav.innerHTML = `
  <div class="nav-inner">
    <a href="index.html" class="logo">
      <img src="img/logo.png" alt="مسار" class="logo-img"/>
    </a>
    <div class="nav-links" id="navLinks">
      <a href="index.html" class="${isHome?'active':''}">${t('home')}</a>
      <a href="categories.html" class="${isCat?'active':''}">${t('categories')}</a>
      <a href="about.html" class="${isAbout?'active':''}">${LANG==='ar'?'عن المنصة':'About'}</a>
    </div>
    <div class="nav-actions">
      <div class="nav-search">
        <span>⌕</span>
        <input type="text" placeholder="${t('searchPh')}" id="navSearchInput" onkeypress="if(event.key==='Enter'){location.href='categories.html?q='+encodeURIComponent(this.value)}"/>
        <span>K</span>
      </div>
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
function logout(){
  if(typeof firebaseAuth !== 'undefined' && firebaseAuth) firebaseAuth.signOut().catch(()=>{});
  localStorage.removeItem('ph_user');
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
        <img src="img/logo.png" alt="مسار" class="logo-img" style="height:40px;background:#fff;border-radius:8px;padding:4px 8px;"/>
      </div>
      <p style="max-width:360px;font-size:0.9rem">${t('aboutText')}</p>
    </div>
    <div><h4>${t('quick')}</h4>
      <div style="display:flex;flex-direction:column;gap:0.4rem;font-size:0.9rem">
        <a href="index.html">${t('home')}</a>
        <a href="categories.html">${t('categories')}</a>
        <a href="about.html">${LANG==='ar'?'عن المنصة':'About'}</a>
      </div>
    </div>
    <div><h4>${t('disc')}</h4>
      <p style="font-size:0.85rem;opacity:0.7">${t('discText')}</p>
    </div>
  </div>
  <div class="footer-bottom">${t('copy')}</div>`;
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
    document.getElementById('stat1').textContent = '100%';
    document.getElementById('stat1l').textContent = 'محتوى مجاني';
    document.getElementById('stat2').textContent = Object.keys(CATEGORIES).length;
    document.getElementById('stat2l').textContent = 'تصنيف مختلف';
    document.getElementById('stat3').textContent = PODCASTS.length;
    document.getElementById('stat3l').textContent = 'حلقة متاحة';
    document.getElementById('stat4').textContent = '12,000+';
    document.getElementById('stat4l').textContent = 'مشاهدة للحلقات';
  } else {
    document.getElementById('heroTitle').innerHTML = t('hero1')+'<br><span>'+t('hero2')+'</span>';
    document.getElementById('heroDesc').textContent = t('heroDesc');
    document.getElementById('searchInput').placeholder = t('searchPh');
    document.getElementById('searchBtn').textContent = t('search');
    document.getElementById('badges').innerHTML = `<span>✓ ${t('free')}</span><span>✓ ${t('hd')}</span><span>✓ ${t('multi')}</span>`;
    document.getElementById('stat1').textContent = '100%';
    document.getElementById('stat1l').textContent = t('sFree');
    document.getElementById('stat2').textContent = Object.keys(CATEGORIES).length;
    document.getElementById('stat2l').textContent = t('sCats');
    document.getElementById('stat3').textContent = PODCASTS.length;
    document.getElementById('stat3l').textContent = t('sPodcasts');
    document.getElementById('stat4').textContent = '12,000+';
    document.getElementById('stat4l').textContent = 'Views';
  }
  document.getElementById('browseTitle').textContent = t('browse');
  document.getElementById('viewAll').textContent = t('viewAll');
  document.getElementById('latestTitle').textContent = t('latest');
  document.getElementById('ctaTitle').textContent = t('start');
  document.getElementById('ctaDesc').textContent = t('join');
  document.getElementById('ctaBtn').textContent = t('explore');

  // category chips
  const catsEl = document.getElementById('homeCats');
  const mainCats = Object.keys(CATEGORIES).slice(0,8);
  catsEl.innerHTML = mainCats.map(c=>`<a href="categories.html?cat=${c}" class="chip chip-outline">${catLabel(c)}</a>`).join('');

  // filter chips
  const filters = document.getElementById('filters');
  filters.innerHTML = `<button class="chip active" data-cat="all" onclick="filterHome('all',this)">${t('all')}</button>` +
    ['technology','selfdev','culture','business'].map(c=>`<button class="chip" data-cat="${c}" onclick="filterHome('${c}',this)">${catLabel(c)}</button>`).join('');

  filterHome('all');
}

let homeQuery = '';
function filterHome(cat, btn){
  if(btn){
    document.querySelectorAll('#filters .chip').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  }
  let list = PODCASTS;
  if(cat && cat!=='all') list = list.filter(p=>p.category===cat);
  if(homeQuery){
    const q = homeQuery.toLowerCase();
    list = list.filter(p=>txt(p.title).toLowerCase().includes(q)||txt(p.show).toLowerCase().includes(q)||txt(p.host).toLowerCase().includes(q));
  }
  const grid = document.getElementById('grid');
  if(!list.length){ grid.innerHTML = `<div class="empty">${t('noRes')}</div>`; return; }
  grid.innerHTML = list.slice(0,24).map(cardHTML).join('');
}

function doSearch(){
  homeQuery = document.getElementById('searchInput').value.trim();
  filterHome(document.querySelector('#filters .chip.active')?.dataset.cat||'all');
  document.getElementById('latestSec').scrollIntoView({behavior:'smooth'});
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

  function drawGrid(){
    const q = document.getElementById('catSearch').value.trim().toLowerCase();
    let list = PODCASTS;
    if(active!=='all') list = list.filter(p=>p.category===active);
    if(q) list = list.filter(p=>txt(p.title).toLowerCase().includes(q)||txt(p.show).toLowerCase().includes(q));
    const grid = document.getElementById('grid');
    if(!list.length){ grid.innerHTML = `<div class="empty">${t('noEp')}</div>`; return; }
    grid.innerHTML = list.map(cardHTML).join('');
  }
  window.drawGrid = drawGrid;
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

  const box = document.getElementById('playerBox');
  // Clean the box first (keep only the player-bar)
  const bar = box.querySelector('.player-bar');
  box.innerHTML = '';
  if(bar) box.appendChild(bar);

  // Standard YouTube embed - most reliable for playback
  const embedUrl = `https://www.youtube.com/embed/${p.youtubeId}?rel=0&modestbranding=1&controls=1&playsinline=1&fs=1&iv_load_policy=3&disablekb=0&cc_load_policy=0`;
  
  const iframe = document.createElement('iframe');
  iframe.src = embedUrl;
  iframe.title = txt(p.title);
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen';
  iframe.allowFullscreen = true;
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
  iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;border:0;';
  
  // Put iframe first, then the bar on top
  box.insertBefore(iframe, box.firstChild);

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
