// Two local clips, alternating with a decoded-frame crossfade. No audio or tracking.
(() => {
  const films = [document.getElementById('film-a'), document.getElementById('film-b')];
  const sources = ['assets/starport-flight.mp4', 'assets/starport-orbit.mp4'];
  const control = document.getElementById('motion');
  let active = 0, started = false, suspended = true;
  let mixing = false, ready = false, progress = 0, previous = 0, frameId = 0;
  const fadeSeconds = 1.8;
  films.forEach(video => { video.muted = true; video.defaultMuted = true; });
  function play(video) {
    return video.play().catch(() => { /* Autoplay denied: retain a still frame and offer Play. */
      if (!suspended) { suspended = true; films.forEach(v => v.pause()); document.dispatchEvent(new Event('starport-autoplay-blocked')); }
    });
  }
  function startNext() {
    if (mixing || suspended) return;
    mixing = true; ready = false; progress = 0;
    const incoming = films[1-active];
    incoming.currentTime = 0;
    // Begin fading only after the incoming video has a frame to show.
    incoming.addEventListener('playing', () => { ready = true; previous = performance.now(); }, {once:true});
    play(incoming);
  }
  function tick(now) {
    frameId = 0;
    if (suspended) return;
    const elapsed = Math.min((now-previous)/1000, .1); previous = now;
    const outgoing = films[active], incoming = films[1-active];
    if (!mixing && Number.isFinite(outgoing.duration) && outgoing.duration > 0 && outgoing.duration-outgoing.currentTime <= Math.min(fadeSeconds,outgoing.duration/3)) startNext();
    if (mixing && ready && incoming.readyState >= 3) {
      progress = Math.min(1,progress+elapsed/fadeSeconds);
      const blend = progress*progress*(3-2*progress);
      // Keep the outgoing image opaque underneath; fade the incoming on top.
      outgoing.style.zIndex = '0'; incoming.style.zIndex = '1';
      outgoing.style.opacity = '1'; incoming.style.opacity = String(blend);
      if (progress === 1) { outgoing.pause(); outgoing.style.opacity='0'; active=1-active; mixing=false; ready=false; }
    }
    frameId=requestAnimationFrame(tick);
  }
  function sync(stop) {
    if (stop) { suspended=true; films.forEach(v=>v.pause()); cancelAnimationFrame(frameId);frameId=0;return; }
    suspended=false;
    if (!started) {
      started=true;
      films.forEach((video,i)=>{video.src=sources[i];video.preload='auto';video.load();video.style.opacity=i===0?'1':'0';});
    }
    play(films[active]);
    if(mixing) play(films[1-active]);
    previous=performance.now();
    if(!frameId)frameId=requestAnimationFrame(tick);
  }
  document.addEventListener('starport-motion',event=>sync(event.detail.paused));
  films.forEach(video=>video.addEventListener('ended',()=>{if(video===films[active])startNext();}));
  // Respect data-saving on first load; an explicit Play starts the clips.
  const initiallyStopped=matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData || document.hidden;
  if(initiallyStopped) {control.setAttribute('aria-pressed','true');control.textContent='Play motion ▷';}
  else sync(false);
})();
