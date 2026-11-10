/**
 * Single-owner muted loop playback for hero / decorative videos.
 * Components bind once; Layout must not call play/pause on owned videos.
 */

import { isVideoDebug, snapshotMedia, videoDebugLog } from './video-debug';

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
  /**
   * When true (default), a click on the mark host while playing counts as a
   * manual pause and will not auto-resume from IO / tab focus.
   * Set false when the host has its own click semantics (e.g. BAH expand).
   */
  clickToPause?: boolean;
  onPlaying?: () => void;
  onStill?: () => void;
  onBlocked?: () => void;
};

export type HeroLoopHandle = {
  play: () => void;
  /** System pause (modal, off-screen). Does not mark a manual user pause. */
  pause: () => void;
  destroy: () => void;
};

type OwnedVideo = HTMLVideoElement & { __heroLoop?: HeroLoopHandle };

/** No-op stub — View Transitions / ClientRouter removed; full page loads reset media. */
export function installHeroLoopLifecycle() {}

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
  const owned = video as OwnedVideo;
  owned.__heroLoop?.destroy();

  const host = opts.host || video;
  const markHost = opts.markHost === undefined
    ? video.closest('.video-decorative-wrap, .pz-board-photo, .hero-strip-film, .hero-strip-mobile-visual')
    : opts.markHost;
  const eager = opts.eager !== false;
  const clickToPause = opts.clickToPause !== false;

  let destroyed = false;
  let wantPlay = false;
  /** Explicit user pause — must not be cleared by IO / tab focus alone. */
  let userPaused = false;
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

  const dbg = (tag: string, data?: Record<string, unknown>) => {
    if (!isVideoDebug()) return;
    videoDebugLog(tag, { ...data, ...snapshotMedia(video, host), wantPlay, userPaused, eager });
  };

  const revealWhenPainted = () => {
    if (destroyed || video.paused) return;
    // Prefer a decoded frame callback, but never depend on it alone: after Astro
    // View Transitions some engines stall rvfc until a later layout/paint (e.g.
    // first scroll), which leaves the poster up while the element is already
    // playing. timeupdate proves frames are advancing without scroll hacks.
    if (typeof video.requestVideoFrameCallback === 'function') {
      let revealed = false;
      const finish = (via: string) => {
        if (revealed || destroyed || video.paused) return;
        revealed = true;
        dbg('reveal', { via });
        markPlaying();
      };
      dbg('rvfc:arm');
      video.requestVideoFrameCallback(() => finish('rvfc'));
      video.addEventListener('timeupdate', () => finish('timeupdate'), { once: true });
      if (!video.paused && video.currentTime > 0) finish('currentTime');
      return;
    }
    markPlaying();
  };

  const tryPlay = () => {
    if (destroyed || !wantPlay || userPaused || reduceMotion()) {
      dbg('tryPlay:skip', {
        reason: destroyed ? 'destroyed' : !wantPlay ? 'wantPlay=false' : userPaused ? 'userPaused' : 'reduceMotion',
      });
      return;
    }
    // Never start playback from a stale canplay while the host is off-screen.
    if (!geometricallyVisible(host)) {
      dbg('tryPlay:skip', { reason: 'host-not-visible' });
      return;
    }
    armVideo(video);
    dbg('tryPlay:call');
    const run = video.play();
    if (run && typeof run.then === 'function') {
      run.then(() => {
        if (destroyed) return;
        dbg('tryPlay:resolved');
        revealWhenPainted();
      }).catch((err: unknown) => {
        if (destroyed) return;
        const e = err as { name?: string; message?: string };
        dbg('tryPlay:rejected', { name: e?.name || 'Error', message: e?.message || String(err) });
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
    // Auto-resume paths must not override an explicit user pause.
    if (on && userPaused) {
      dbg('setWantPlay:blocked-userPaused');
      return;
    }
    wantPlay = on;
    dbg(on ? 'setWantPlay:on' : 'setWantPlay:off');
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
    dbg('unlock:gesture');
    userPaused = false;
    setWantPlay(true);
  };

  const armUnlock = () => {
    if (unlockBound || destroyed) return;
    unlockBound = true;
    dbg('armUnlock', { listeners: ['pointerdown', 'touchstart', 'keydown'] });
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
    if (wantPlay && !userPaused) tryPlay();
  };
  const onVisibility = () => {
    if (destroyed) return;
    // While hidden, leave wantPlay alone — IO often reports ratio 0 and must
    // not permanently clear playback intent for the tab-return path.
    if (document.visibilityState !== 'visible') return;
    if (userPaused || reduceMotion()) return;
    if (!geometricallyVisible(host)) return;
    wantPlay = true;
    tryPlay();
  };
  const onHostClick = (event: Event) => {
    if (destroyed) return;
    const target = event.target as Element | null;
    if (target?.closest?.('a, button')) return;
    if (!video.paused) {
      if (!clickToPause) return;
      userPaused = true;
      setWantPlay(false);
      return;
    }
    userPaused = false;
    setWantPlay(true);
  };

  // IntersectionObserver: resume when visible, pause only when geometry confirms off-screen.
  // Never treat a lone intersectionRatio === 0 as proof if the element still intersects the viewport.
  // Ignore IO while the tab is hidden (ratio often drops to 0 and would clear wantPlay).
  const io = new IntersectionObserver(
    (entries) => {
      if (destroyed) return;
      if (document.visibilityState === 'hidden') {
        dbg('io:ignored-hidden');
        return;
      }
      entries.forEach((entry) => {
        const rect = host.getBoundingClientRect();
        // Zero-size during VT/layout settle is not proof the host left the viewport.
        if (rect.width < 1 || rect.height < 1) {
          dbg('io:skip-zero-size');
          return;
        }
        const visible = geometricallyVisible(host);
        dbg('io', {
          ratio: Math.round(entry.intersectionRatio * 1000) / 1000,
          isIntersecting: entry.isIntersecting,
          geoVisible: visible,
        });
        if (visible) {
          if (!userPaused) setWantPlay(true);
          return;
        }
        if (entry.intersectionRatio === 0 && !visible) {
          dbg('io:pause', { reason: 'ratio0+geoHidden' });
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

  dbg('bind', {
    geoVisible: geometricallyVisible(host),
    reduce: reduceMotion(),
  });

  // Eager heroes: first play at init when already in the viewport — not gated on IO.
  if (eager && geometricallyVisible(host) && !reduceMotion()) {
    setWantPlay(true);
  } else if (!eager) {
    // Lazy: IO will set wantPlay on first real intersection.
    wantPlay = false;
    dbg('bind:lazy-wait-io');
  } else {
    dbg('bind:no-eager-play', {
      reason: reduceMotion() ? 'reduceMotion' : 'host-not-visible',
    });
  }

  const handle: HeroLoopHandle = {
    play: () => {
      userPaused = false;
      setWantPlay(true);
    },
    pause: () => setWantPlay(false),
    destroy: () => {
      if (destroyed) return;
      dbg('destroy');
      destroyed = true;
      wantPlay = false;
      userPaused = false;
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

/** Resume owned loops (e.g. after modal close). play() clears manual-pause and respects geometry. */
export function resumeOwnedLoops(root: ParentNode = document) {
  root.querySelectorAll<OwnedVideo>('video[data-loop-owned]').forEach((video) => {
    video.__heroLoop?.play();
  });
}
