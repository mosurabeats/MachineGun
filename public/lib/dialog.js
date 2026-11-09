// In-page replacements for alert/confirm/prompt, which are blocked when
// LINEAGE runs as a hosted page (and are poor UX on phones anyway).

function open({ message, input = false, okLabel = 'OK', cancelLabel = null, danger = false }) {
  return new Promise((resolve) => {
    const wrap = document.createElement('div');
    wrap.className = 'dlg-backdrop';
    wrap.innerHTML = `<div class="dlg" role="dialog" aria-modal="true">
      <p class="dlg-msg"></p>
      ${input ? '<textarea class="dlg-input" rows="4" id="dlg-input"></textarea>' : ''}
      <div class="row dlg-actions">
        ${cancelLabel ? `<button type="button" class="dlg-cancel secondary">${cancelLabel}</button>` : ''}
        <button type="button" class="dlg-ok ${danger ? 'danger' : ''}">${okLabel}</button>
      </div></div>`;
    wrap.querySelector('.dlg-msg').textContent = message;
    const done = (v) => { wrap.remove(); resolve(v); };
    wrap.querySelector('.dlg-ok').addEventListener('click', () => done(input ? wrap.querySelector('.dlg-input').value.trim() || null : true));
    wrap.querySelector('.dlg-cancel')?.addEventListener('click', () => done(input ? null : false));
    wrap.addEventListener('keydown', (e) => { if (e.key === 'Escape') done(input ? null : false); });
    document.body.append(wrap);
    (wrap.querySelector('.dlg-input') || wrap.querySelector('.dlg-ok')).focus();
  });
}

export const notify = (message) => open({ message });
export const confirmIt = (message, okLabel = 'Continue', danger = false) => open({ message, okLabel, cancelLabel: 'Cancel', danger });
export const ask = (message, okLabel = 'Save') => open({ message, input: true, okLabel, cancelLabel: 'Cancel' });
