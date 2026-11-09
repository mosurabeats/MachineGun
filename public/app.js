import { SECTIONS } from './data/curriculum.js';
import { subscribe } from './lib/store.js';
import { esc } from './lib/ui.js';
import { renderStation } from './views/station.js';
import { renderMentor } from './views/mentor.js';
import { renderLedger } from './views/ledger.js';
import { renderPath, renderWorkshop, renderArchive, renderPortfolio } from './views/sections.js';

const nav = document.getElementById('nav');
const main = document.getElementById('main');

function parse() {
  const [path, query = ''] = location.hash.replace(/^#\/?/, '').split('?');
  const [section = 'path', sub, arg, arg2] = path.split('/');
  return { section, sub, arg, arg2, params: new URLSearchParams(query) };
}

function render() {
  const { section, sub, arg, arg2, params } = parse();
  nav.innerHTML = SECTIONS.map((s) => `<a href="#/${s.id}" class="${s.id === section ? 'active' : ''} ${s.primary ? 'primary' : ''}" title="${esc(s.blurb)}">${esc(s.name)}</a>`).join('');
  const scrollY = window.scrollY;
  switch (section) {
    case 'station': renderStation(main, sub, arg, arg2); break;
    case 'workshop': renderWorkshop(main, sub); break;
    case 'archive': renderArchive(main, sub); break;
    case 'mentor': renderMentor(main, params); break;
    case 'ledger': renderLedger(main); break;
    case 'portfolio': renderPortfolio(main); break;
    default: renderPath(main);
  }
  // On phones the menus scroll sideways: keep the current item in view.
  document.querySelectorAll('.mainnav a.active, .subnav a.active').forEach((el) => {
    const bar = el.parentElement;
    if (bar.scrollWidth > bar.clientWidth) bar.scrollLeft = el.offsetLeft - bar.offsetLeft - 16;
  });
  return scrollY;
}

window.addEventListener('hashchange', () => { render(); window.scrollTo(0, 0); });
// Re-render on state changes but keep the scroll position.
subscribe(() => { const y = render(); window.scrollTo(0, y); });
render();
