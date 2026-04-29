// useAudio.js — robust HTML5 audio hook with iOS unlock + state management.
// Handles play/pause/track switching/volume/mute and survives mobile autoplay policies.

import { useCallback, useEffect, useRef, useState } from 'react';

let _ctxUnlocked = false;
const unlockAudioContext = () => {
  if (_ctxUnlocked || typeof window === 'undefined') return;
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
    if (ctx.state === 'suspended') ctx.resume();
    _ctxUnlocked = true;
  } catch {
    /* noop */
  }
};

// Attach a one‑time gesture listener to unlock audio on iOS.
if (typeof window !== 'undefined' && !window.__jcoAudioGestureBound) {
  window.__jcoAudioGestureBound = true;
  const onFirstGesture = () => {
    unlockAudioContext();
    window.removeEventListener('touchstart', onFirstGesture);
    window.removeEventListener('click', onFirstGesture);
    window.removeEventListener('keydown', onFirstGesture);
  };
  window.addEventListener('touchstart', onFirstGesture, { once: true, passive: true });
  window.addEventListener('click', onFirstGesture, { once: true });
  window.addEventListener('keydown', onFirstGesture, { once: true });
}

export const useAudio = ({ src, loop = true, initialVolume = 0.6 } = {}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(initialVolume);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(null);
  const [currentSrc, setCurrentSrc] = useState(src || '');

  // Lazily build the audio element once.
  if (!audioRef.current && typeof window !== 'undefined') {
    audioRef.current = new Audio();
    audioRef.current.preload = 'none';
    audioRef.current.loop = loop;
  }

  // Attach event listeners
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onErr = () => { setError('Audio unavailable. Check your connection.'); setIsPlaying(false); };
    const onEnded = () => { if (!el.loop) setIsPlaying(false); };
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    el.addEventListener('error', onErr);
    el.addEventListener('ended', onEnded);
    return () => {
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('error', onErr);
      el.removeEventListener('ended', onEnded);
    };
  }, []);

  // Volume / mute side effects
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = muted ? 0 : Math.max(0, Math.min(1, volume));
  }, [volume, muted]);

  // Loop
  useEffect(() => {
    const el = audioRef.current;
    if (el) el.loop = loop;
  }, [loop]);

  // Switch source: stop current → set new src → optionally play
  const switchTrack = useCallback((newSrc, autoplay = true) => {
    const el = audioRef.current;
    if (!el) return;
    setError(null);
    if (!newSrc) {
      el.pause();
      el.removeAttribute('src');
      el.load();
      setCurrentSrc('');
      setIsPlaying(false);
      return;
    }
    el.pause();
    el.src = newSrc;
    setCurrentSrc(newSrc);
    if (autoplay) {
      const p = el.play();
      if (p && p.catch) p.catch((_error) => { setError('Tap Play to start audio'); });
    }
  }, []);

  const play = useCallback(() => {
    unlockAudioContext();
    const el = audioRef.current;
    if (!el || !currentSrc) return;
    setError(null);
    const p = el.play();
    if (p && p.catch) p.catch(() => setError('Audio unavailable. Check your connection.'));
  }, [currentSrc]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el || !currentSrc) return;
    if (el.paused) play(); else pause();
  }, [currentSrc, play, pause]);

  return {
    audioRef,
    isPlaying,
    volume,
    setVolume,
    muted,
    setMuted,
    error,
    currentSrc,
    play,
    pause,
    toggle,
    switchTrack,
  };
};

// Tiny one-shot SFX hook for click/bell sounds — independent of background music
export const playOneShot = (src, volume = 0.5) => {
  if (!src || typeof window === 'undefined') return;
  try {
    unlockAudioContext();
    const a = new Audio(src);
    a.volume = volume;
    a.play().catch(() => {});
  } catch {
    /* noop */
  }
};

export default useAudio;
