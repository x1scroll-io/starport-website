const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(name, focus = false) {
  tabs.forEach(tab => {
    const selected = tab.id === `tab-${name}`;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
    if (selected && focus) tab.focus();
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab.id.slice(4)));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectTab(tabs[next].id.slice(4), true); }
  });
});
document.querySelector('[data-tab="swap"]').addEventListener('click', () => selectTab('swap', true));
document.getElementById('demo-route').addEventListener('click', () => selectTab('activity', true));
document.getElementById('demo-amount').addEventListener('input', event => {
  const value = Number(event.target.value);
  document.getElementById('demo-output').textContent = Number.isFinite(value) && value >= 0 && value <= 1000000 ? (value * 60000).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2}) : '—';
});
const dialog = document.getElementById('info-dialog');
function showInfo(title, copy) {
  document.getElementById('dialog-title').textContent = title;
  document.getElementById('dialog-copy').textContent = copy;
  dialog.showModal();
}
document.querySelectorAll('[data-demo]').forEach(button => button.addEventListener('click', () => {
  const send = button.dataset.demo === 'send';
  showInfo(send ? 'Your next move, made clear.' : 'The right address, in reach.', send ? 'In the wallet, Send lets you choose an asset, network, amount, and recipient before reviewing the transaction. This website is a sample preview and cannot move funds.' : 'In the wallet, Receive shows the public address for your chosen network. This preview does not generate an address. Always confirm that the sending and receiving networks match.');
}));
document.getElementById('site-privacy').addEventListener('click', () => showInfo('About this website', 'This website preview uses no analytics, advertising trackers, signup database, or wallet connection. The interactive wallet uses sample data. When deployed, the hosting provider may process request information such as IP addresses and access logs. Email links open your email application; any message you send is handled by Starport LLC at support@starportwallet.xyz. This notice describes this website, not the wallet’s privacy policy or terms.'));
const frame = document.getElementById('gyro');
const motion = document.getElementById('motion');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let paused = reduced.matches || Boolean(navigator.connection?.saveData);
let inView = true;
function syncMotion() {
  motion.setAttribute('aria-pressed', String(paused));
  motion.textContent = paused ? 'Play motion ▷' : 'Pause motion Ⅱ';
  frame.contentWindow?.postMessage({type:'starport-motion', paused:paused || !inView || document.hidden}, location.protocol === 'file:' ? '*' : location.origin);
  document.dispatchEvent(new CustomEvent('starport-motion', {detail:{paused:paused || document.hidden}}));
}
motion.addEventListener('click', () => {paused = !paused; syncMotion();});
document.addEventListener('starport-autoplay-blocked', () => {paused = true; syncMotion();});
reduced.addEventListener('change', () => {paused = reduced.matches; syncMotion();});
frame.addEventListener('load', syncMotion);
document.addEventListener('visibilitychange', syncMotion);
new IntersectionObserver(entries => {inView = entries[0].isIntersecting; syncMotion();}, {rootMargin:'100px'}).observe(frame);
syncMotion();

function revealInstall(){if(location.hash==='#beta-install')document.getElementById('beta-install').open=true;}
window.addEventListener('hashchange',revealInstall);revealInstall();
