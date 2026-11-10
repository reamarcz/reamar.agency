/**
 * Opt-in hero-video diagnostics (?videoDebug=1).
 * Must not alter playback when disabled.
 */

declare global {
  interface Window {
    __vdEnabled?: boolean;
    __vdLog?: string[];
    __vdPush?: (line: string) => void;
    __vdOrigPlay?: HTMLVideoElement['play'];
    __vdInstalled?: boolean;
  }
}

const PANEL_ID = 'vd-panel';
const MAX_LINES = 220;
const t0 = typeof performance !== 'undefined' ? performance.now() : 0;

export function isVideoDebug(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.__vdEnabled) return true;
  try {
    return /(?:^|[?&])videoDebug=1(?:&|$)/.test(window.location.search);
  } catch {
    return false;
  }
}

function ensurePanel(): HTMLElement | null {
  if (typeof document === 'undefined') return null;
  let panel = document.getElementById(PANEL_ID);
  if (panel) return panel;
  panel = document.createElement('div');
  panel.id = PANEL_ID;
  panel.setAttribute('aria-live', 'polite');
  panel.innerHTML =
    '<div class="vd-h">videoDebug <button type="button" id="vd-copy">copy</button></div>' +
    '<pre id="vd-pre"></pre>';
  panel.style.cssText =
    'position:fixed;left:6px;top:6px;z-index:2147483646;width:min(96vw,420px);max-height:48vh;overflow:auto;margin:0;padding:8px;background:rgba(0,0,0,.82);color:#d8ffd8;font:11px/1.35 ui-monospace,SFMono-Regular,Menlo,monospace;border:1px solid rgba(255,255,255,.25);border-radius:0;-webkit-overflow-scrolling:touch;pointer-events:auto';
  const head = panel.querySelector('.vd-h') as HTMLElement | null;
  if (head) {
    head.style.cssText =
      'display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;color:#fff;font-weight:600';
  }
  const pre = panel.querySelector('#vd-pre') as HTMLElement | null;
  if (pre) {
    pre.style.cssText = 'margin:0;white-space:pre-wrap;word-break:break-word';
  }
  const mount = () => {
    if (!document.getElementById(PANEL_ID)) {
      (document.body || document.documentElement).appendChild(panel!);
    }
  };
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount, { once: true });

  panel.querySelector('#vd-copy')?.addEventListener('click', () => {
    const text = (window.__vdLog || []).join('\n');
    const done = () => videoDebugLog('debug', { copied: true, lines: (window.__vdLog || []).length });
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => {
        window.prompt('Copy log', text);
      });
    } else {
      window.prompt('Copy log', text);
    }
  });
  return panel;
}

function render() {
  const pre = document.getElementById('vd-pre');
  if (!pre) return;
  pre.textContent = (window.__vdLog || []).join('\n');
}

export function videoDebugLog(tag: string, data?: Record<string, unknown> | string) {
  if (!isVideoDebug()) return;
  const ms = Math.round((performance.now() - t0) * 10) / 10;
  let detail = '';
  if (typeof data === 'string') detail = data;
  else if (data) {
    try {
      detail = JSON.stringify(data);
    } catch {
      detail = String(data);
    }
  }
  const line = `${ms}ms [${tag}]${detail ? ` ${detail}` : ''}`;
  if (!window.__vdLog) window.__vdLog = [];
  window.__vdLog.push(line);
  if (window.__vdLog.length > MAX_LINES) window.__vdLog.splice(0, window.__vdLog.length - MAX_LINES);
  ensurePanel();
  render();
  // Keep scrolled to bottom so latest events are visible before first scroll.
  const panel = document.getElementById(PANEL_ID);
  if (panel) panel.scrollTop = panel.scrollHeight;
}

export function snapshotMedia(video: HTMLVideoElement, host?: Element | null) {
  const cs = getComputedStyle(video);
  const rect = video.getBoundingClientRect();
  const hostRect = host?.getBoundingClientRect();
  return {
    id: video.id || video.getAttribute('data-mhero-video') || video.getAttribute('data-hero-loop') || video.className.slice(0, 40),
    paused: video.paused,
    ended: video.ended,
    muted: video.muted,
    volume: video.volume,
    readyState: video.readyState,
    networkState: video.networkState,
    currentTime: Math.round(video.currentTime * 1000) / 1000,
    duration: Number.isFinite(video.duration) ? Math.round(video.duration * 100) / 100 : video.duration,
    autoplayAttr: video.hasAttribute('autoplay'),
    mutedAttr: video.hasAttribute('muted'),
    playsinlineAttr: video.hasAttribute('playsinline'),
    webkitPI: video.getAttribute('webkit-playsinline'),
    owned: video.hasAttribute('data-loop-owned'),
    preload: video.preload,
    display: cs.display,
    visibility: cs.visibility,
    opacity: cs.opacity,
    contentVisibility: (cs as CSSStyleDeclaration & { contentVisibility?: string }).contentVisibility || '',
    transform: cs.transform,
    w: Math.round(rect.width),
    h: Math.round(rect.height),
    top: Math.round(rect.top),
    left: Math.round(rect.left),
    hostW: hostRect ? Math.round(hostRect.width) : null,
    hostH: hostRect ? Math.round(hostRect.height) : null,
    hostTop: hostRect ? Math.round(hostRect.top) : null,
    classes: video.className,
    wrapPlaying: !!(host && host.classList.contains('is-playing')),
  };
}

function describeVideo(el: EventTarget | null): string {
  if (!(el instanceof HTMLVideoElement)) return 'non-video';
  return (
    el.getAttribute('data-mhero-video') ||
    el.getAttribute('data-bh-video') ||
    el.getAttribute('data-hero-loop') ||
    el.getAttribute('data-decorative-autoplay') ||
    el.className.slice(0, 32) ||
    'video'
  );
}

/** Install panel, play() probe, and page-level listeners. Safe to call repeatedly. */
export function installVideoDebug() {
  if (!isVideoDebug() || typeof window === 'undefined') return;
  window.__vdEnabled = true;
  ensurePanel();

  if (!window.__vdInstalled) {
    window.__vdInstalled = true;
    videoDebugLog('boot', {
      ua: navigator.userAgent.slice(0, 120),
      href: location.href,
      vis: document.visibilityState,
      dpr: window.devicePixelRatio,
      vw: window.innerWidth,
      vh: window.innerHeight,
    });

    if (!window.__vdOrigPlay) {
      window.__vdOrigPlay = HTMLVideoElement.prototype.play;
      HTMLVideoElement.prototype.play = function patchedPlay(this: HTMLVideoElement) {
        const label = describeVideo(this);
        videoDebugLog('play()', { video: label, ...snapshotMedia(this) });
        const tBefore = this.currentTime;
        const result = window.__vdOrigPlay!.apply(this, arguments as unknown as []);
        if (result && typeof (result as Promise<void>).then === 'function') {
          (result as Promise<void>).then(
            () => {
              videoDebugLog('play:ok', {
                video: label,
                tBefore,
                tAfter: Math.round(this.currentTime * 1000) / 1000,
                paused: this.paused,
                readyState: this.readyState,
              });
            },
            (err: unknown) => {
              const e = err as { name?: string; message?: string };
              videoDebugLog('play:fail', {
                video: label,
                name: e?.name || 'Error',
                message: e?.message || String(err),
                paused: this.paused,
                readyState: this.readyState,
              });
            }
          );
        }
        return result;
      };
    }

    const mediaEvents = [
      'loadstart',
      'loadedmetadata',
      'loadeddata',
      'canplay',
      'canplaythrough',
      'play',
      'playing',
      'pause',
      'waiting',
      'stalled',
      'suspend',
      'emptied',
      'ended',
      'error',
      'timeupdate',
    ] as const;
    let lastTimeLog = 0;
    document.addEventListener(
      'timeupdate',
      (ev) => {
        if (!(ev.target instanceof HTMLVideoElement)) return;
        const now = performance.now();
        if (now - lastTimeLog < 500) return;
        lastTimeLog = now;
        videoDebugLog('timeupdate', {
          video: describeVideo(ev.target),
          t: Math.round(ev.target.currentTime * 1000) / 1000,
          paused: ev.target.paused,
          readyState: ev.target.readyState,
        });
      },
      true
    );
    mediaEvents.forEach((name) => {
      if (name === 'timeupdate') return;
      document.addEventListener(
        name,
        (ev) => {
          if (!(ev.target instanceof HTMLVideoElement)) return;
          videoDebugLog(`evt:${name}`, {
            video: describeVideo(ev.target),
            paused: ev.target.paused,
            readyState: ev.target.readyState,
            networkState: ev.target.networkState,
            t: Math.round(ev.target.currentTime * 1000) / 1000,
          });
        },
        true
      );
    });

    let scrollLogged = 0;
    window.addEventListener(
      'scroll',
      () => {
        scrollLogged += 1;
        if (scrollLogged > 8 && scrollLogged % 10 !== 0) return;
        const vids = Array.from(document.querySelectorAll('video')).slice(0, 4);
        videoDebugLog('scroll', {
          n: scrollLogged,
          y: Math.round(window.scrollY || window.pageYOffset || 0),
          videos: vids.map((v) => ({
            label: describeVideo(v),
            paused: v.paused,
            t: Math.round(v.currentTime * 1000) / 1000,
            readyState: v.readyState,
            owned: v.hasAttribute('data-loop-owned'),
          })),
        });
      },
      { passive: true }
    );

    window.addEventListener('resize', () => {
      videoDebugLog('resize', { vw: window.innerWidth, vh: window.innerHeight });
    });
    window.addEventListener('pageshow', (ev) => {
      videoDebugLog('pageshow', { persisted: ev.persisted, vis: document.visibilityState });
    });
    document.addEventListener('visibilitychange', () => {
      videoDebugLog('visibilitychange', { vis: document.visibilityState });
    });
    document.addEventListener(
      'touchstart',
      (ev) => {
        videoDebugLog('touchstart', {
          targets: (ev.composedPath?.() || [ev.target])
            .slice(0, 3)
            .map((n) => (n instanceof Element ? n.tagName + (n.id ? `#${n.id}` : '') : typeof n)),
        });
      },
      { passive: true, capture: true }
    );

    // Periodic snapshot of owned / hero videos so we see frozen currentTime before scroll.
    window.setInterval(() => {
      if (!isVideoDebug()) return;
      const vids = document.querySelectorAll<HTMLVideoElement>(
        'video[data-loop-owned], video[data-hero-loop], video[data-mhero-video], video[data-decorative-autoplay]'
      );
      vids.forEach((video) => {
        if (video.getClientRects().length === 0) return;
        const host =
          video.closest('.video-decorative-wrap, .hero-strip-film, .hero-strip-mobile-visual, .bh__sticky') ||
          video.parentElement;
        videoDebugLog('tick', snapshotMedia(video, host));
      });
    }, 1200);
  }

  // Re-attach panel after VT swaps.
  document.addEventListener('astro:page-load', () => {
    if (!isVideoDebug()) return;
    ensurePanel();
    videoDebugLog('astro:page-load', { href: location.href });
  });
}
