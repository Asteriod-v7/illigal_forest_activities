/* ForestGuard – plain JavaScript single-page site (hash routing, no build step). */
const app = document.getElementById('app')
const navEl = document.getElementById('nav-links')
const menuBtn = document.getElementById('menu-btn')

const pages = [
  ['', 'Home'], ['threats', 'Forest threats'], ['impacts', 'Impacts'],
  ['solutions', 'Solutions'], ['report', 'Report a concern'],
  ['resources', 'Resources'], ['about', 'About']
]
const ic = (name, size) => `<i data-lucide="${name}" aria-hidden="true"${size ? ` style="width:${size}px;height:${size}px"` : ''}></i>`
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
const list = a => `<ul>${a.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`
const ticks = a => `<ul class="ticks">${a.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`
const ext = 'target="_blank" rel="noopener noreferrer"'
const header = (title, intro) => `<section class="page-head"><div class="wrap"><h1>${title}</h1><p class="lead">${intro}</p></div></section>`

/* ---------- Hero art: conifer treeline with one cleared patch ---------- */
function treeRow(y, h, fill, seed, gap) {
  let s = seed; const r = () => (s = (s * 16807) % 2147483647) / 2147483647
  let out = ''
  for (let x = -10; x < 1210; x += 26 + r() * 14) {
    const th = h * (0.7 + r() * 0.6), w = th * 0.42
    out += gap && x > gap[0] && x < gap[1]
      ? `<rect x="${x}" y="${y - 7}" width="10" height="7" fill="#8A6B52"/>`
      : `<polygon points="${x},${y} ${x + w / 2},${y - th} ${x + w},${y}" fill="${fill}"/>`
  }
  return out
}
const treeline = () => `<svg class="treeline" viewBox="0 0 1200 360" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  ${treeRow(300, 150, '#2E6B47', 7)}${treeRow(330, 170, '#1F5C3A', 13, [640, 860])}${treeRow(362, 200, '#0B2217', 29)}</svg>`

/* ---------- Pages ---------- */
const stats = [
  ['25.17%', "of India's land area is forest and tree cover (ISFR 2023)"],
  ['21.76%', 'is recorded forest cover; 3.41% is tree cover outside forests'],
  ['1,445 sq km', 'net rise in forest and tree cover since the 2021 assessment'],
  ['4,992 sq km', 'of mangrove cover recorded in the country']
]
const tips = [
  'Ask for legal documents when buying timber or wood products.',
  'Never buy wildlife products, and report online wildlife sales to the authorities.',
  'Leave no waste behind on forest trails.',
  'Note what you see and where, and report from a safe distance.'
]

function home() {
  return `
  <section class="hero">${treeline()}
    <div class="wrap hero-in">
      <h1>Protect Our Forests, Preserve Our Future.</h1>
      <p class="lead">Illegal logging, encroachment, poaching, mining and dumping quietly erase forests that clean our air, hold our water and shelter wildlife. ForestGuard explains what is happening, why it matters and what people can do.</p>
      <div class="btns">
        <a href="#/threats" class="btn primary">Explore Forest Threats ${ic('arrow-right')}</a>
        <a href="#/solutions" class="btn ghost">Discover Solutions</a>
      </div>
    </div>
  </section>
  <section class="section wrap">
    <h2>Where India's forests stand</h2>
    <p class="muted">Figures are from the India State of Forest Report 2023, published by the Forest Survey of India. They measure cover, not illegal activity: the report does not tell us how much loss is unlawful.</p>
    <dl class="stats">${stats.map(([n, l]) => `<div><dt>${n}</dt><dd>${l}</dd></div>`).join('')}</dl>
    <a class="src" href="https://fsi.nic.in" ${ext}>Source: Forest Survey of India ${ic('external-link')}</a>
  </section>
  <section class="section alt"><div class="wrap">
    <h2>Five threats to know</h2>
    <div class="grid">${threats.map(t => `<a href="#/threats/${t.id}" class="card link-card">${ic(t.icon)}<h3>${t.title}</h3><p>${t.summary}</p></a>`).join('')}</div>
  </div></section>
  <section class="section wrap two-col">
    <div><h2>Small habits that help</h2>${ticks(tips)}</div>
    <div class="cta"><h2>Seen something suspicious?</h2><p>Learn how to record what you saw safely and who to contact.</p><a href="#/report" class="btn primary">Report a concern</a></div>
  </section>`
}

const parts = [['causes', 'Causes'], ['consequences', 'Environmental consequences'], ['signs', 'Warning signs'], ['mitigation', 'Mitigation']]
function threatPanel(t) {
  return `<article id="threat-panel" role="tabpanel" aria-labelledby="tab-${t.id}" class="panel">
    <h2>${t.title}</h2>
    <p class="lead"><strong>Definition.</strong> ${t.definition}</p>
    <div class="grid four">${parts.map(([k, l]) => `<div class="card ${k === 'signs' ? 'warn' : ''}"><h3>${l}</h3>${list(t[k])}</div>`).join('')}</div>
    <p class="note">${t.lawful}</p></article>`
}
function threatsPage(arg) {
  const t = threats.find(x => x.id === arg) || threats[0]
  return header('Illegal forest activities', 'Five common ways forests are harmed unlawfully, how to recognise them and what reduces them. Lawful forest use is explained too, so that legitimate work is not mistaken for crime.') +
    `<section class="section wrap">
      <div role="tablist" aria-label="Forest threats" class="tabs">
        ${threats.map(x => `<button role="tab" id="tab-${x.id}" data-id="${x.id}" aria-selected="${x.id === t.id}" aria-controls="threat-panel">${ic(x.icon)} ${x.title}</button>`).join('')}
      </div><div id="panel-slot">${threatPanel(t)}</div></section>`
}
function initThreats() {
  document.querySelectorAll('.tabs button').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.tabs button').forEach(x => x.setAttribute('aria-selected', x === b))
    document.getElementById('panel-slot').innerHTML = threatPanel(threats.find(t => t.id === b.dataset.id))
  }))
}

function impactsPage() {
  return header('Environmental impacts', 'Harm to a forest rarely stays in the forest. Each chain below shows how one kind of damage leads to the next.') +
    `<section class="section wrap stack">${impacts.map(i => `
      <article class="impact">
        <div class="impact-text">${ic(i.icon)}<h2>${i.title}</h2><p>${i.text}</p></div>
        <ol class="chain" aria-label="How ${i.title.toLowerCase()} unfolds">${i.chain.map((c, n) => `<li>${c}${n < i.chain.length - 1 ? ic('arrow-right') : ''}</li>`).join('')}</ol>
      </article>`).join('')}</section>`
}

function solutionCards(who) {
  const shown = who === 'All' ? solutions : solutions.filter(s => s.who.includes(who))
  return `<p class="muted" aria-live="polite">Showing ${shown.length} of ${solutions.length} solutions</p>
    <div class="grid">${shown.map(s => `<article class="card">${ic(s.icon)}<h2 class="h3">${s.title}</h2>
      <h3>How it works</h3><p>${s.how}</p><h3>Who can do it</h3><p>${s.who.join(', ')}</p>
      <h3>Benefits</h3>${list(s.benefits)}</article>`).join('')}</div>`
}
function solutionsPage() {
  return header('Solutions and mitigation', 'No single fix works alone. Filter by who can act to see what is within reach.') +
    `<section class="section wrap"><div class="chips" role="group" aria-label="Filter by who can act">
      ${['All', ...WHO].map(w => `<button data-who="${w}" aria-pressed="${w === 'All'}">${w}</button>`).join('')}</div>
      <div id="sol-slot">${solutionCards('All')}</div></section>`
}
function initSolutions() {
  document.querySelectorAll('.chips button').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.chips button').forEach(x => x.setAttribute('aria-pressed', x === b))
    document.getElementById('sol-slot').innerHTML = solutionCards(b.dataset.who)
    lucide.createIcons()
  }))
}

function reportPage() {
  return header('Report a concern', 'Practise preparing a clear, safe report. This is a demonstration form.') +
  `<section class="section wrap two-col top"><div>
    <div class="banner" role="note">${ic('triangle-alert')}<p><strong>Educational prototype.</strong> Nothing you enter here is sent to any authority or saved anywhere. To report a real incident, use the guidance on this page.</p></div>
    <form id="report-form" novalidate>
      <label for="type">Type of suspected activity</label>
      <select id="type"><option value="">Select…</option>${threats.map(t => `<option value="${t.id}">${t.title}</option>`).join('')}</select>
      <p class="err" id="e-type" hidden></p>
      <label for="area">General area</label>
      <input id="area" placeholder="District, forest range or nearest village" />
      <p class="hint">Use a general area. Do not share exact locations of vulnerable wildlife such as nests or dens.</p>
      <p class="err" id="e-area" hidden></p>
      <label for="details">What did you see?</label>
      <textarea id="details" rows="5" placeholder="What, when, how many people or vehicles. Do not include names or personal details."></textarea>
      <p class="err" id="e-details" hidden></p>
      <label for="img">Photo (optional)</label>
      <input id="img" type="file" accept="image/*" />
      <p class="err" id="e-img" hidden></p>
      <img id="img-prev" class="preview" alt="" hidden />
      <button class="btn primary" type="submit">Preview my report</button>
    </form>
    <div id="result" class="card" aria-live="polite" hidden></div>
  </div>
  <aside class="card"><h2 class="h3">How to report for real</h2>
    ${ticks(['Stay at a safe distance and never confront anyone.', 'Note date, time, general place, and what you saw.', 'Take photos only if it is safe. Do not post them online with exact locations.', 'Contact your local Range Forest Officer or Divisional Forest Officer. Find the office on your state forest department website.', 'For wildlife crime, see the Wildlife Crime Control Bureau website for official contacts.'])}
    <p class="note">${ic('phone')} If someone is in danger, call <strong>112</strong>, India's emergency number.</p>
    <a href="https://wccb.gov.in" ${ext}>Wildlife Crime Control Bureau</a></aside></section>`
}
function initReport() {
  const $ = id => document.getElementById(id)
  const form = $('report-form'), prev = $('img-prev')
  let imgUrl = null
  const setErr = (k, msg) => {
    const e = $('e-' + k); e.textContent = msg || ''; e.hidden = !msg
    const f = $(k); if (f) f.setAttribute('aria-invalid', !!msg)
  }
  $('img').addEventListener('change', e => {
    const file = e.target.files[0]
    if (imgUrl) URL.revokeObjectURL(imgUrl)
    imgUrl = null; prev.hidden = true; setErr('img', '')
    if (!file) return
    if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) { e.target.value = ''; return setErr('img', 'Choose an image file under 5 MB.') }
    imgUrl = URL.createObjectURL(file); prev.src = imgUrl; prev.alt = 'Preview of ' + file.name; prev.hidden = false
  })
  form.addEventListener('submit', e => {
    e.preventDefault()
    const type = $('type').value, area = $('area').value.trim(), details = $('details').value.trim()
    setErr('type', type ? '' : 'Select the type of activity.')
    setErr('area', area ? '' : 'Enter a general area, such as a district or forest range.')
    setErr('details', details.length >= 20 ? '' : 'Describe what you saw in at least 20 characters.')
    if (!type || !area || details.length < 20) return
    const t = threats.find(x => x.id === type)
    $('result').innerHTML = `<h2 class="h3">Report preview (not sent)</h2>
      <p><strong>Type:</strong> ${t.title}</p><p><strong>Area:</strong> ${esc(area)}</p><p><strong>Details:</strong> ${esc(details)}</p>
      ${imgUrl ? `<img class="preview" src="${imgUrl}" alt="Attached photo" />` : ''}
      <p class="note">Nothing has been submitted. Take these details to your local forest office.</p>
      <button class="btn ghost dark" id="reset" type="button">Start over</button>`
    form.hidden = true; $('result').hidden = false
    $('reset').addEventListener('click', () => { form.reset(); prev.hidden = true; imgUrl = null; form.hidden = false; $('result').hidden = true })
  })
}

function resourcesPage() {
  return header('Resources and awareness', 'Laws, official sources and ways to take part. Laws are summarised in plain language. Read the official text on India Code before relying on any detail.') + `
  <section class="section wrap"><h2>Key Indian laws</h2>
    <ul class="laws">${laws.map(l => `<li><strong>${l.name}</strong><span>${l.note}</span></li>`).join('')}</ul>
    <a class="src" href="https://www.indiacode.nic.in" ${ext}>Official texts: India Code ${ic('external-link')}</a></section>
  <section class="section alt"><div class="wrap"><h2>Conservation guidelines for visitors and citizens</h2>${ticks(contribute)}</div></section>
  <section class="section wrap"><h2>Frequently asked questions</h2>
    <div class="faq">${faqs.map(([q, a]) => `<div class="disc"><button aria-expanded="false"><span>${q}</span>${ic('chevron-down')}</button><div class="disc-body" hidden><p>${a}</p></div></div>`).join('')}</div></section>
  <section class="section wrap"><h2>Official departments and organisations</h2>
    <div class="grid">${officialLinks.map(l => `<a href="${l.url}" ${ext} class="card link-card"><h3>${l.name}</h3><p>${l.type} ${ic('external-link')}</p></a>`).join('')}</div></section>`
}
function initResources() {
  document.querySelectorAll('.disc button').forEach(b => b.addEventListener('click', () => {
    const d = b.parentElement, open = b.getAttribute('aria-expanded') !== 'true'
    b.setAttribute('aria-expanded', open); d.classList.toggle('open', open)
    d.querySelector('.disc-body').hidden = !open
  }))
}

const objectives = [
  'Raise awareness about illegal forest activities, their causes, and their environmental impacts.',
  'Educate users about illegal logging, forest encroachment, poaching, and illegal mining.',
  'Explain the effects of these activities on biodiversity, wildlife habitats, climate, and local communities.',
  'Recommend practical mitigation strategies and preventive measures to protect forest ecosystems.',
  'Encourage public participation in forest conservation and responsible reporting of suspected illegal activities.',
  'Provide educational resources about forest conservation laws, government initiatives, and useful environmental organisations.'
]
function aboutPage() {
  return header('About the project', 'ForestGuard is an educational website built as a college engineering project.') + `
  <section class="section wrap two-col top"><div>
    <h2>Problem statement</h2><p>Many people cannot tell lawful forest use from illegal activity, do not know what damage it causes, and do not know how to act. This project makes that knowledge easy to find and understand.</p>
    <h2>Intended users</h2><p>Students, citizens, and environmental enthusiasts.</p>
    <h2>Scope</h2><p>Education and awareness only. The site does not detect illegal activity, does not store reports, and does not replace forest authorities.</p>
    <h2>Expected benefits</h2><p>Better public understanding, safer and more useful reporting, and more support for community and government conservation efforts.</p></div>
    <div><h2>Project objectives</h2><ol class="objectives">${objectives.map(o => `<li>${o}</li>`).join('')}</ol></div></section>`
}

/* ---------- Shell: nav, footer, router ---------- */
document.getElementById('footer').innerHTML = `
  <div class="wrap foot-grid">
    <div><h2 class="logo-text">ForestGuard</h2><p>An educational project on illegal forest activities and how to prevent them. It is not an official government service.</p></div>
    <nav aria-label="Footer"><h3>Pages</h3><ul>${pages.map(([p, l]) => `<li><a href="#/${p}">${l}</a></li>`).join('')}</ul></nav>
    <div><h3>Official sources</h3><ul>${officialLinks.slice(0, 5).map(l => `<li><a href="${l.url}" ${ext}>${l.name}</a></li>`).join('')}</ul></div>
  </div>
  <p class="wrap legal">Educational prototype. Reports made on this site are not sent to any authority. In an emergency in India, call 112.</p>`

navEl.innerHTML = pages.map(([p, l]) => `<a href="#/${p}" data-page="${p}">${l}</a>`).join('')
menuBtn.addEventListener('click', () => {
  const open = navEl.classList.toggle('open')
  menuBtn.setAttribute('aria-expanded', open)
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
})

const routes = {
  '': [home], threats: [threatsPage, initThreats], impacts: [impactsPage], solutions: [solutionsPage, initSolutions],
  report: [reportPage, initReport], resources: [resourcesPage, initResources], about: [aboutPage]
}
function route() {
  const [page, arg] = location.hash.replace(/^#\/?/, '').split('/')
  const [view, init] = routes[page] || routes['']
  const key = routes[page] ? page : ''
  app.innerHTML = view(arg)
  if (init) init()
  navEl.querySelectorAll('a').forEach(a => a.dataset.page === key ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'))
  navEl.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false')
  const label = pages.find(p => p[0] === key)[1]
  document.title = key ? `${label} – ForestGuard` : 'ForestGuard – Protect Our Forests'
  lucide.createIcons()
  window.scrollTo(0, 0)
}
window.addEventListener('hashchange', route)
route()
