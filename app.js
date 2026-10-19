const WD = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];
const VAK_VOLGORDE = ['db', 'wi', 'pr', 'bk', 'sv'];

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const isoOf = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const todayIso = isoOf(new Date());
const pillStyle = c => `background:var(--${c}-bg);color:var(--${c}-fg)`;

const ALLE_DAGEN = WEEKS.flatMap(([, days]) => days.filter(Boolean));

// Afgevinkte blokken, alleen in deze browser bewaard
let afgevinkt = {};
try { afgevinkt = JSON.parse(localStorage.getItem('afgevinkt') || '{}'); } catch (e) {}
const bewaar = () => { try { localStorage.setItem('afgevinkt', JSON.stringify(afgevinkt)); } catch (e) {} };

// Totalen
const urenPerVak = {};
ALLE_DAGEN.forEach(([, , items]) => Array.isArray(items) && items.forEach(([c, h]) => { urenPerVak[c] = (urenPerVak[c] || 0) + h; }));
const totaal = Object.values(urenPerVak).reduce((a, b) => a + b, 0);
document.getElementById('total').textContent = totaal + ' uur';

/* ---------- Planning ---------- */

const chip = (iso, idx) => ([c, h, note]) => {
  const key = iso + ':' + idx;
  const done = afgevinkt[key] ? ' done' : '';
  return `
    <div class="chip${done}" style="${pillStyle(c)}">
      <div class="row">
        <button class="check" data-key="${key}" aria-label="Afvinken"></button>
        <a class="name" href="#leerstof/${c}">${VAKKEN[c].kort || VAKKEN[c].naam}</a>
        <span class="h">${h}u</span>
      </div>
      ${note ? `<span class="note">${esc(note)}</span>` : ''}
    </div>`;
};

const dayHtml = (d, i) => {
  if (!d) return '<div class="day empty"></div>';
  const [iso, label, items, exam] = d;
  const cls = iso === todayIso ? ' today' : iso < todayIso ? ' past' : '';
  const head = total => `<div class="head"><span><span class="wd">${WD[i]}</span><span class="date">${label}</span></span><span class="hrs">${total}</span></div>`;
  if (items === 'vrij') {
    return `<div class="day free${cls}">${head('')}<span class="free-label">Vrij</span><span class="free-sub">Rust pakken, verdiend</span></div>`;
  }
  const total = items.reduce((s, x) => s + x[1], 0);
  return `<div class="day${cls}">${head(total ? total + 'u' : '')}
    ${exam ? `<div class="exam"><small>TOETS</small><span>${esc(exam)}</span></div>` : ''}
    ${items.map((it, idx) => chip(iso, idx)(it)).join('')}
  </div>`;
};

const dagenTot = iso => Math.round((new Date(iso + 'T00:00') - new Date(todayIso + 'T00:00')) / 864e5);

function renderToday() {
  const vandaag = ALLE_DAGEN.find(d => d[0] === todayIso);
  const volgende = ALLE_DAGEN.find(d => d[3] && d[0] >= todayIso);
  let links;
  if (vandaag && vandaag[2] === 'vrij') {
    links = `<h2>Vandaag is je vrije dag</h2><p class="free-sub">Rust pakken, verdiend.</p>`;
  } else if (vandaag) {
    links = `<h2>Vandaag · ${vandaag[1]}</h2>
      ${vandaag[3] ? `<div class="exam" style="margin-bottom:8px"><small>TOETS</small><span>${esc(vandaag[3])}</span></div>` : ''}
      <div class="today-items">${vandaag[2].map((it, idx) => chip(vandaag[0], idx)(it)).join('') || '<span class="free-sub">Geen studie-uren gepland.</span>'}</div>`;
  } else if (todayIso < ALLE_DAGEN[0][0]) {
    links = `<h2>De planning begint op ${ALLE_DAGEN[0][1]}</h2>`;
  } else {
    links = `<h2>Alle tentamens zijn klaar 🎉</h2>`;
  }
  let rechts = '';
  if (volgende) {
    const n = dagenTot(volgende[0]);
    rechts = `<div class="countdown"><small>VOLGENDE TOETS</small><b>${n === 0 ? 'Vandaag' : n === 1 ? 'Morgen' : 'Over ' + n + ' dagen'}</b><span>${esc(volgende[3])} · ${volgende[1]}</span></div>`;
  }
  document.getElementById('today').innerHTML = `<div class="today-card"><div>${links}</div>${rechts}</div>`;
}

function renderPlanning() {
  document.getElementById('legend').innerHTML =
    VAK_VOLGORDE.map(c => `<a class="pill" href="#leerstof/${c}" style="${pillStyle(c)}"><span class="dot" style="background:var(--${c}-dot)"></span>${VAKKEN[c].naam} ${urenPerVak[c] || 0}u</a>`).join('') +
    `<div class="pill" style="background:var(--exam);color:#fff"><span class="dot" style="background:var(--exam-accent)"></span>Toetsdag</div>`;

  document.getElementById('weeks').innerHTML = WEEKS.map(([label, days]) => `
    <section class="week">
      <h2>${label}</h2>
      <div class="grid">${days.map(dayHtml).join('')}</div>
    </section>`).join('');

  renderToday();
}

document.addEventListener('click', e => {
  const btn = e.target.closest('.check');
  if (!btn) return;
  const key = btn.dataset.key;
  if (afgevinkt[key]) delete afgevinkt[key]; else afgevinkt[key] = true;
  bewaar();
  renderPlanning();
});

/* ---------- Leerstof ---------- */

const cache = {};

async function renderLeerstof(c) {
  if (!VAKKEN[c]) c = VAK_VOLGORDE[0];
  document.getElementById('vak-tabs').innerHTML = VAK_VOLGORDE.map(v =>
    `<a class="pill${v === c ? ' active' : ''}" href="#leerstof/${v}" style="${pillStyle(v)}"><span class="dot" style="background:var(--${v}-dot)"></span>${VAKKEN[v].naam}</a>`).join('');

  const v = VAKKEN[c], t = v.trainer;
  document.getElementById('trainer').innerHTML = t ? `
    <a class="trainer-card" href="#oefenen/${c}">
      <span><small>${v.trainerLabel || 'OEFENTENTAMEN'}</small><b>${v.trainerNaam || 'Tentamentrainer ' + v.naam}</b><span>${v.trainerTekst || 'Toetsen van 40 vragen met cijfer, uitleg bij elke fout en een samenvatting per hoofdstuk.'}</span></span>
      <span class="go">Start →</span>
    </a>` : '';

  const el = document.getElementById('leerstof');
  if (!cache[c]) {
    el.innerHTML = '<p class="melding">Laden…</p>';
    try {
      const res = await fetch('leerstof/' + VAKKEN[c].bestand, { cache: 'no-cache' });
      if (!res.ok) throw new Error(res.status);
      cache[c] = marked.parse(await res.text());
    } catch (e) {
      el.innerHTML = `<p class="melding">Kon <code>leerstof/${VAKKEN[c].bestand}</code> niet laden. Open de app via GitHub Pages (of een lokale server); direct dubbelklikken op index.html werkt niet voor de leerstof.</p>`;
      return;
    }
  }
  el.innerHTML = cache[c];
}

/* ---------- Navigatie ---------- */

// Oefenapps openen binnen de app. Het frame blijft geladen als je teruggaat,
// zodat een toets waar je mee bezig bent niet opnieuw begint.
function toonSpeler(vak) {
  const v = VAKKEN[vak];
  const open = !!(v && v.trainer);
  document.getElementById('speler').hidden = !open;
  document.body.classList.toggle('speelt', open);
  if (!open) return false;
  const frame = document.getElementById('speler-frame');
  if (frame.dataset.vak !== vak) { frame.src = v.trainer; frame.dataset.vak = vak; }
  document.getElementById('speler-titel').textContent = v.trainerNaam || 'Tentamentrainer ' + v.naam;
  document.getElementById('speler-terug').href = '#leerstof/' + vak;
  document.getElementById('speler-nieuw').href = v.trainer;
  return true;
}

function route() {
  const [tab, vak] = (location.hash.slice(1) || 'planning').split('/');
  if (tab === 'oefenen' && toonSpeler(vak)) return;
  toonSpeler(null);
  const isLeerstof = tab === 'leerstof';
  document.getElementById('view-planning').hidden = isLeerstof;
  document.getElementById('view-leerstof').hidden = !isLeerstof;
  document.querySelectorAll('.tabs a').forEach(a => a.classList.toggle('active', a.dataset.tab === (isLeerstof ? 'leerstof' : 'planning')));
  if (isLeerstof) { renderLeerstof(vak); window.scrollTo(0, 0); }
}

renderPlanning();
window.addEventListener('hashchange', route);
route();
