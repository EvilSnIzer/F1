const fs = require('fs');
const vm = require('vm');

// ---------- minimal DOM shim ----------
const elements = new Map();
function makeEl(id, classes = []) {
  const el = {
    id, _classes: new Set(classes),
    style: { setProperty(k, v) { this[k] = v; } }, dataset: {}, listeners: {}, _children: [],
    setAttribute(k, v) { this[k] = v; },
    getAttribute(k) { return this[k]; },
    _html: '', _text: '',
    set innerHTML(v) { this._html = v; this._text = String(v).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(); },
    get innerHTML() { return this._html; },
    set textContent(v) { this._text = String(v); this._html = String(v); },
    get textContent() { return this._text; },
    addEventListener(t, fn) { (el.listeners[t] ||= []).push(fn); },
    focus() {},
    closest() { return null; },
    remove() {},
    insertAdjacentHTML() {},
    querySelectorAll: () => [],
    querySelector: () => null,
    classList: {
      add: (...cs) => cs.forEach(c => el._classes.add(c)),
      remove: (...cs) => cs.forEach(c => el._classes.delete(c)),
      toggle: (c, force) => { const on = force !== undefined ? force : !el._classes.has(c); on ? el._classes.add(c) : el._classes.delete(c); return on; },
      contains: (c) => el._classes.has(c),
    },
  };
  return el;
}

const tabEls = ['overview','car','history','season'].map(p => { const e = makeEl('mtab-'+p, ['mtab']); e.dataset.tab = p; return e; });
const paneEls = ['overview','car','history','season'].map(p => makeEl('pane-'+p, ['mtabpane']));
const allClassEls = [...tabEls, ...paneEls];
for (const e of allClassEls) elements.set(e.id, e);

const document = {
  getElementById(id) {
    if (!elements.has(id)) elements.set(id, makeEl(id));
    return elements.get(id);
  },
  querySelector(sel) {
    if (sel.startsWith('#')) return this.getElementById(sel.slice(1));
    if (sel.startsWith('.')) return allClassEls.find(e => e._classes.has(sel.slice(1))) || makeEl('q-'+sel);
    return makeEl('q-'+sel);
  },
  querySelectorAll(sel) {
    if (sel.startsWith('.')) return allClassEls.filter(e => e._classes.has(sel.slice(1)));
    return [];
  },
  addEventListener(t, fn) { (this.listeners ||= {})[t] = fn; },
  body: makeEl('body'),
  activeElement: makeEl('active'),
};

class IntersectionObserver {
  constructor(cb) { this.cb = cb; }
  observe(el) { this.cb([{ isIntersecting: true, target: el }], this); }
  unobserve() {}
}
global.IntersectionObserver = IntersectionObserver;
global.requestAnimationFrame = (fn) => setTimeout(() => fn(performance.now()), 0);
global.document = document;
global.window = { addEventListener() {}, scrollY: 0, innerHeight: 800 };
global.performance = performance;

// ---------- run the page script ----------
const js = fs.readFileSync('f1.js', 'utf8');
vm.runInThisContext(js, { filename: 'f1.js' });

// fire DOMContentLoaded
const dcl = document.listeners && document.listeners['DOMContentLoaded'];
if (!dcl) { console.error('FAIL: DOMContentLoaded handler not registered'); process.exit(1); }
dcl();

// ---------- assertions ----------
const assert = (cond, msg) => { if (!cond) { console.error('FAIL: ' + msg); process.exit(1); } };
assert(document.getElementById('driversStanding').innerHTML.includes('Antonelli'), 'drivers standing rendered');
assert(document.getElementById('driversStanding').innerHTML.includes('219'), 'Antonelli points shown');
assert(document.getElementById('teamsStanding').innerHTML.includes('Mercedes'), 'constructors standing rendered');
assert(document.getElementById('teamsGrid').innerHTML.split('team-card').length === 12, '11 team cards rendered');
assert(document.getElementById('teamsGrid').innerHTML.includes('images/teams/mercedes-livery.png'), 'team livery wired');
assert(document.getElementById('teamsGrid').innerHTML.includes('images/logos/mercedes.png'), 'team logo wired');
assert(!document.getElementById('teamsGrid').innerHTML.includes('onclick='), 'no inline onclick in team cards');
assert(document.getElementById('driversGrid').innerHTML.split('driver-card').length === 23, '22 driver cards rendered');
assert(document.getElementById('driversGrid').innerHTML.includes('images/drivers/kimi-antonelli.png'), 'driver photo wired');
assert(document.getElementById('driversGrid').innerHTML.includes('images/logos/mercedes.png'), 'driver card team logo wired');
assert(document.getElementById('calendarList').innerHTML.split('race-row').length === 12, '11 calendar rows rendered');
assert(document.getElementById('statsGrid').innerHTML.split('stat-card').length === 7, '6 stat cards rendered');
assert(document.getElementById('nextCard').innerHTML.includes('Dutch Grand Prix'), 'next race card rendered');
assert(document.getElementById('winnersStrip').innerHTML.includes('Norris'), 'winners strip rendered');

// exercise modal open/close + tab switching
const openFn = vm.runInThisContext('openTeamModal');
openFn('ferrari');
assert(document.getElementById('modalTitle').textContent.includes('Ferrari'), 'modal title set');
assert(document.getElementById('overviewGrid').innerHTML.includes('Maranello'), 'overview populated');
assert(document.getElementById('modalCar').innerHTML.includes('images/teams/ferrari-livery.png'), 'modal livery wired');
assert(document.getElementById('modalCar').getAttribute('data-team') === 'ferrari', 'modal car data-team set');
assert(document.getElementById('modalBadge').innerHTML.includes('images/logos/ferrari.png'), 'modal logo wired');
assert(document.getElementById('historyText').textContent.includes('oldest'), 'history populated');
assert(document.getElementById('seasonStats').innerHTML.includes('307'), 'season stats populated');

// countdown tick produced digits
assert(/^\d{2}$/.test(document.getElementById('cdD').textContent) || document.getElementById('cdD').textContent === '--', 'countdown days formatted');

// image fallback handler exists and initials works
const initialsFn = vm.runInThisContext('initials');
assert(initialsFn('Max Verstappen') === 'MV', 'initials function works');

console.log('ALL RUNTIME CHECKS PASSED');
process.exit(0);
