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
  const [section = 'path', sub, arg] = path.split('/');
  return { section, sub, arg, params: new URLSearchParams(query) };
}

function render() {
  const { section, sub, arg, params } = parse();
  nav.innerHTML = SECTIONS.map((s) => `<a href="#/${s.id}" class="${s.id === section ? 'active' : ''} ${s.primary ? 'primary' : ''}" title="${esc(s.blurb)}">${esc(s.name)}</a>`).join('');
  const scrollY = window.scrollY;
  switch (section) {
    case 'station': renderStation(main, sub, arg); break;
    case 'workshop': renderWorkshop(main); break;
    case 'archive': renderArchive(main, sub); break;
    case 'mentor': renderMentor(main, params); break;
    case 'ledger': renderLedger(main); break;
    case 'portfolio': renderPortfolio(main); break;
    default: renderPath(main);
  }
  return scrollY;
}

window.addEventListener('hashchange', () => { render(); window.scrollTo(0, 0); });
// Re-render on state changes but keep the scroll position.
subscribe(() => { const y = render(); window.scrollTo(0, y); });
render();
