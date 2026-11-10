/**
 * Single-owner muted loop playback for hero / decorative videos.
 * Components bind once; Layout must not call play/pause on owned videos.
 */

export type HeroLoopOptions = {
  /** Element measured + observed for viewport presence (defaults to video). */
  host?: Element;
  /** Element that receives `.is-playing` / `.is-blocked` (poster wrap). */
  markHost?: Element | null;
  /**
   * true  → play immediately when geometrically visible at init (page hero).
   * false → wait until the host enters the viewport (below-fold loops).
   */
  eager?: boolean;
  onPlaying?: () => void;
  onStill?: () => void;
  onBlocked?: () => void;
};

export type HeroLoopHandle = {
  play: () => void;
  pause: () => void;
  destroy: () => void;
};

type OwnedVideo = HTMLVideoElement & { __heroLoop?: HeroLoopHandle };

let lifecycleBound = false;

function ensureLifecycle() {
  if (lifecycleBound || typeof document === 'undefined') return;
  lifecycleBound = true;
  document.addEventListener('astro:before-swap', () => {
    document.querySelectorAll<OwnedVideo>('video[data-loop-owned]').forEach((video) => {
      video.__heroLoop?.destroy();
    });
  });
}

/** Idempotent: register VT cleanup so owned loops never leak across soft navigations. */
export function installHeroLoopLifecycle() {
  ensureLifecycle();
}

/** True when any pixel of the element intersects the viewport. */
export function geometricallyVisible(el: Element): boolean {
  const rect = el.getBoundingClientRect();
  if (rect.width < 1 || rect.height < 1) return false;
  const vh = window.innerHeight || document.documentElement.clientHeight || 0;
  const vw = window.innerWidth || document.documentElement.clientWidth || 0;
  return rect.bottom > 0 && rect.top < vh && rect.right > 0 && rect.left < vw;
}

function reduceMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function armVideo(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;
  video.playsInline = true;
  video.controls = false;
  video.loop = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', 'true');
  video.removeAttribute('controls');
  const src = video.getAttribute('data-src');
  if (src && video.getAttribute('src') !== src) video.setAttribute('src', src);
  const source = video.querySelector('source');
  if (src && source && source.getAttribute('src') !== src) source.setAttribute('src', src);
  video.preload = 'auto';
}

/**
 * Bind exclusive playback ownership for a muted loop video.
 * Replaces any previous owner on the same element.
 */
export function bindHeroLoop(video: HTMLVideoElement, opts: HeroLoopOptions = {}): HeroLoopHandle {
  ensureLifecycle();
  const owned = video as OwnedVideo;
  owned.__heroLoop?.destroy();

  const host = opts.host || video;
  const markHost = opts.markHost === undefined
    ? video.closest('.video-decorative-wrap, .pz-board-photo, .hero-strip-film, .hero-strip-mobile-visual')
    : opts.markHost;
  const eager = opts.eager !== false;

  let destroyed = false;
  let wantPlay = false;
  let unlockBound = false;

  const markPlaying = () => {
    if (destroyed || video.paused) return;
    video.classList.add('is-playing', 'is-live');
    markHost?.classList.add('is-playing');
    markHost?.classList.remove('is-blocked');
    opts.onPlaying?.();
  };

  const markStill = () => {
    video.classList.remove('is-playing', 'is-live');
    markHost?.classList.remove('is-playing');
    opts.onStill?.();
  };

  const markBlocked = () => {
    markStill();
    markHost?.classList.add('is-blocked');
    opts.onBlocked?.();
  };

  const revealWhenPainted = () => {
    if (destroyed || video.paused) return;
    if (typeof video.requestVideoFrameCallback === 'function') {
      video.requestVideoFrameCallback(() => {
        if (!destroyed && !video.paused) markPlaying();
      });
      return;
    }
    markPlaying();
  };

  const tryPlay = () => {
    if (destroyed || !wantPlay || reduceMotion()) return;
    // Never start playback from a stale canplay while the host is off-screen.
    if (!geometricallyVisible(host)) return;
    armVideo(video);
    const run = video.play();
    if (run && typeof run.then === 'function') {
      run.then(revealWhenPainted).catch(() => {
        markBlocked();
        armUnlock();
      });
    } else if (!video.paused) {
      revealWhenPainted();
    }
  };

  const setWantPlay = (on: boolean) => {
    if (destroyed) return;
    if (reduceMotion()) {
      wantPlay = false;
      try {
        video.pause();
      } catch {
        /* ignore */
      }
      markStill();
      return;
    }
    wantPlay = on;
    if (on) tryPlay();
    else {
      try {
        video.pause();
      } catch {
        /* ignore */
      }
      markStill();
    }
  };

  const unlock = () => {
    if (destroyed || !video.paused) return;
    if (!geometricallyVisible(host)) return;
    setWantPlay(true);
  };

  const armUnlock = () => {
    if (unlockBound || destroyed) return;
    unlockBound = true;
    ['pointerdown', 'touchstart', 'keydown'].forEach((ev) => {
      window.addEventListener(ev, unlock, { passive: true });
    });
  };

  const onPlaying = () => revealWhenPainted();
  const onPause = () => {
    window.setTimeout(() => {
      if (destroyed || !video.paused) return;
      markStill();
    }, 180);
  };
  const onCanPlay = () => {
    if (wantPlay) tryPlay();
  };
  const onVisibility = () => {
    if (document.visibilityState !== 'visible') return;
    if (wantPlay && geometricallyVisible(host)) tryPlay();
  };
  const onHostClick = (event: Event) => {
    if (!video.paused) return;
    const target = event.target as Element | null;
    if (target?.closest?.('a, button')) return;
    setWantPlay(true);
  };

  // IntersectionObserver: resume when visible, pause only when geometry confirms off-screen.
  // Never treat a lone intersectionRatio === 0 as proof if the element still intersects the viewport.
  const io = new IntersectionObserver(
    (entries) => {
      if (destroyed) return;
      entries.forEach((entry) => {
        const visible = geometricallyVisible(host);
        if (visible) {
          setWantPlay(true);
          return;
        }
        if (entry.intersectionRatio === 0 && !visible) {
          setWantPlay(false);
        }
      });
    },
    { threshold: [0, 0.01, 0.1, 0.25, 0.5, 1] }
  );

  armVideo(video);
  video.setAttribute('data-loop-owned', '1');
  video.addEventListener('playing', onPlaying);
  video.addEventListener('pause', onPause);
  video.addEventListener('canplay', onCanPlay);
  video.addEventListener('loadeddata', onCanPlay);
  document.addEventListener('visibilitychange', onVisibility);
  markHost?.addEventListener('click', onHostClick);
  io.observe(host);

  // Eager heroes: first play at init when already in the viewport — not gated on IO.
  if (eager && geometricallyVisible(host) && !reduceMotion()) {
    setWantPlay(true);
  } else if (!eager) {
    // Lazy: IO will set wantPlay on first real intersection.
    wantPlay = false;
  }

  const handle: HeroLoopHandle = {
    play: () => setWantPlay(true),
    pause: () => setWantPlay(false),
    destroy: () => {
      if (destroyed) return;
      destroyed = true;
      wantPlay = false;
      io.disconnect();
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('loadeddata', onCanPlay);
      document.removeEventListener('visibilitychange', onVisibility);
      markHost?.removeEventListener('click', onHostClick);
      if (unlockBound) {
        ['pointerdown', 'touchstart', 'keydown'].forEach((ev) => {
          window.removeEventListener(ev, unlock);
        });
      }
      try {
        video.pause();
      } catch {
        /* ignore */
      }
      markStill();
      markHost?.classList.remove('is-blocked');
      video.removeAttribute('data-loop-owned');
      if (owned.__heroLoop === handle) delete owned.__heroLoop;
    },
  };

  owned.__heroLoop = handle;
  return handle;
}

/** Pause every owned loop (e.g. modal open). Does not destroy ownership. */
export function pauseOwnedLoops(root: ParentNode = document) {
  root.querySelectorAll<OwnedVideo>('video[data-loop-owned]').forEach((video) => {
    video.__heroLoop?.pause();
  });
}

/** Resume owned loops that are geometrically visible. */
export function resumeOwnedLoops(root: ParentNode = document) {
  root.querySelectorAll<OwnedVideo>('video[data-loop-owned]').forEach((video) => {
    const host = video.closest('.video-decorative-wrap, .pz-board-photo, .hero-strip-film, .hero-strip-mobile-visual') || video;
    if (geometricallyVisible(host)) video.__heroLoop?.play();
  });
}
