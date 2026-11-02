// استخدام:  YT_API_KEY=xxxx node scripts/fetch-episodes.mjs
// يجلب كل حلقات القنوات من YouTube Data API، يستبعد الشورتس والحلقات القصيرة (< 15 دقيقة)،
// ويكتب js/episodes-extra.js. أضف أي قناة في القائمة (query = اسم القناة للبحث).
import fs from 'node:fs';
const KEY = process.env.YT_API_KEY;
if (!KEY) { console.error('ضع YT_API_KEY'); process.exit(1); }
const MIN_SEC = 15 * 60;
const CHANNELS = [
  { query: 'الدحيح',            show: 'الدحيح',          showEn: 'Al-Daheeh', host: 'أحمد الغندور',     category: 'science' },
  { query: 'بودكاست فنجان',      show: 'بودكاست فنجان',    showEn: 'Finjan',    host: 'عبدالرحمن أبومالح', category: 'culture' },
  { query: 'سقراط بودكاست',      show: 'سقراط',           showEn: 'Socrates',  host: 'عبدالله البواري',   category: 'interview' },
  { query: 'بدون ورق',          show: 'بدون ورق',        showEn: 'Bedoon Waraq', host: 'محمد الحديثي',   category: 'psychology' },
  // { query: 'سوالف بيزنس', show: 'سوالف بيزنس', showEn: 'Swalif Business', host: 'مشهور الدبيان', category: 'business' },
  // { query: 'نقطة أسامة الجامع', show: 'نقطة', showEn: 'Noqta', host: 'أسامة الجامع', category: 'culture' },
  // { query: 'مربع حاتم النجار', show: 'مربع', showEn: 'Moraba', host: 'حاتم النجار', category: 'culture' },
];
const api = async (p, q) => {
  const r = await fetch(`https://www.googleapis.com/youtube/v3/${p}?${new URLSearchParams({ ...q, key: KEY })}`);
  if (!r.ok) throw new Error(p + ' ' + r.status + ' ' + await r.text());
  return r.json();
};
const iso = d => { const m = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(d) || []; return (+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + (+m[3] || 0); };
const fmt = s => { const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60, p = n => String(n).padStart(2, '0'); return h ? `${h}:${p(m)}:${p(x)}` : `${m}:${p(x)}`; };
const kfmt = n => n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e3 ? Math.round(n / 1e3) + 'K' : String(n);
const out = []; let id = 100000;
for (const c of CHANNELS) {
  const ch = (await api('search', { part: 'snippet', type: 'channel', q: c.query, maxResults: 1 })).items?.[0];
  if (!ch) { console.warn('لم يتم العثور على', c.query); continue; }
  const channelId = ch.snippet.channelId, uploads = 'UU' + channelId.slice(2);
  console.log(c.show, '→', ch.snippet.title, channelId);
  let page, n = 0;
  do {
    const pl = await api('playlistItems', { part: 'contentDetails', playlistId: uploads, maxResults: 50, ...(page && { pageToken: page }) });
    const ids = pl.items.map(i => i.contentDetails.videoId);
    const vs = await api('videos', { part: 'contentDetails,snippet,statistics', id: ids.join(',') });
    for (const v of vs.items) {
      const sec = iso(v.contentDetails.duration);
      if (sec < MIN_SEC) continue; // شورتس / قصير
      const t = v.snippet.title;
      out.push({ id: id++, title: { ar: t, en: t }, show: { ar: c.show, en: c.showEn }, host: { ar: c.host, en: c.host },
        category: c.category, duration: fmt(sec), views: kfmt(+v.statistics.viewCount || 0), youtubeId: v.id,
        description: { ar: `حلقة من ${c.show}: ${t}`, en: `Episode from ${c.showEn}: ${t}` }, date: v.snippet.publishedAt.slice(0, 10) });
      n++;
    }
    page = pl.nextPageToken;
  } while (page);
  console.log('  حلقات طويلة:', n);
}
fs.writeFileSync('js/episodes-extra.js', '// مُولَّد تلقائياً — scripts/fetch-episodes.mjs\nvar EXTRA_PODCASTS = ' + JSON.stringify(out) + ';\n');
console.log('تم. الإجمالي:', out.length);
