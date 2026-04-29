'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Maximize2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Switch } from '../components/ui/switch';
import { AudioPlayer } from '../components/AudioPlayer';
import { playOneShot } from '../hooks/useAudio';

const BELL = '/audio/mala-bell.mp3';
const PRESETS = [5, 10, 15, 20, 30, 45, 60];

export default function MeditationTimer() {
  const [target, setTarget] = useState(10);
  const [remaining, setRemaining] = useState(10 * 60);
  const [running, setRunning] = useState(false);
  const [breathing, setBreathing] = useState(false);
  const [phase, setPhase] = useState('Inhale');
  const wrap = useRef(null);

  useEffect(() => { setRemaining(target * 60); }, [target]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) {
          setRunning(false);
          playOneShot(BELL, 0.7);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  // Breathing 4-4-4 (in - hold - out)
  useEffect(() => {
    if (!breathing || !running) return;
    const phases = [{n:'Inhale',d:4000},{n:'Hold',d:4000},{n:'Exhale',d:4000}];
    let i = 0;
    setPhase(phases[0].n);
    const tick = () => {
      i = (i + 1) % phases.length;
      setPhase(phases[i].n);
    };
    const id = setInterval(tick, 4000);
    return () => clearInterval(id);
  }, [breathing, running]);

  const start = () => { if (remaining===0) setRemaining(target*60); setRunning(true); playOneShot(BELL, 0.7); };
  const reset = () => { setRunning(false); setRemaining(target*60); };
  const goFull = () => { wrap.current?.requestFullscreen?.().catch(()=>{}); };

  const totalSec = target * 60;
  const pct = totalSec ? remaining / totalSec : 1;
  const radius = 140, stroke = 12, norm = radius - stroke;
  const circ = norm * 2 * Math.PI;
  const offset = circ - pct * circ;

  const fmt = (s) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  return (
    <section ref={wrap} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#FFF8EE]" data-testid="meditation-timer-page">
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] mb-2">Sit. Breathe. Be.</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#7B1C1C]">Meditation Timer</h1>
        </div>

        <div className="bg-white rounded-3xl border border-[#D4AF37]/30 p-8 text-center shadow-sm">
          <div className="relative inline-block mb-6">
            <svg width={radius*2} height={radius*2} className="rotate-[-90deg]">
              <circle cx={radius} cy={radius} r={norm} stroke="#FFE7BE" strokeWidth={stroke} fill="transparent" />
              <circle cx={radius} cy={radius} r={norm} stroke="#FF6B00" strokeWidth={stroke} strokeLinecap="round"
                strokeDasharray={circ} strokeDashoffset={offset} fill="transparent"
                style={{ transition: 'stroke-dashoffset 1s linear' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {breathing && running ? (
                <>
                  <div
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#D4AF37] mb-3 transition-transform"
                    style={{
                      transform: phase === 'Inhale' ? 'scale(1.4)' : phase === 'Exhale' ? 'scale(0.7)' : 'scale(1.1)',
                      transitionDuration: '4000ms',
                    }}
                  />
                  <p className="text-[#7B1C1C] font-serif text-lg" data-testid="breathing-phase">{phase}</p>
                </>
              ) : (
                <p className="font-serif text-5xl text-[#7B1C1C]" data-testid="meditation-time-display">{fmt(remaining)}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {PRESETS.map(p => (
              <button key={p} onClick={() => setTarget(p)}
                className={`px-3 py-1.5 rounded-full text-sm transition ${target===p?'bg-[#FF6B00] text-white':'bg-[#FFF3DD] text-[#7B1C1C] hover:bg-[#FFE7BE]'}`}
                data-testid={`preset-${p}min`}>
                {p < 60 ? `${p} min` : '1 hr'}
              </button>
            ))}
            <div className="flex items-center gap-2 ml-2">
              <Input type="number" min={1} max={180} value={target} onChange={e=>setTarget(parseInt(e.target.value)||1)} className="w-20 h-9 border-[#D4AF37]/40" data-testid="custom-duration-input" />
              <span className="text-sm text-[#7B1C1C]">min</span>
            </div>
          </div>

          <div className="flex justify-center gap-3 mb-5">
            <Button onClick={() => setRunning(r => r ? false : (start(), true))} className="bg-[#FF6B00] hover:bg-[#7B1C1C] text-white rounded-full px-6" data-testid="meditation-toggle-btn">
              {running ? <><Pause className="w-4 h-4 mr-1"/>Pause</> : <><Play className="w-4 h-4 mr-1"/>Start</>}
            </Button>
            <Button variant="outline" onClick={reset} className="rounded-full border-[#7B1C1C]/30 text-[#7B1C1C]" data-testid="meditation-reset-btn">
              <RotateCcw className="w-4 h-4 mr-1"/>Reset
            </Button>
            <Button variant="outline" onClick={goFull} className="rounded-full border-[#7B1C1C]/30 text-[#7B1C1C]" data-testid="fullscreen-btn">
              <Maximize2 className="w-4 h-4 mr-1"/>Fullscreen
            </Button>
          </div>

          <div className="flex justify-center items-center gap-3 text-sm text-[#1A1A1A]">
            <label htmlFor="breathing-toggle">Breathing guide (4‑4‑4)</label>
            <Switch id="breathing-toggle" checked={breathing} onCheckedChange={setBreathing} data-testid="breathing-toggle" />
          </div>
        </div>

        <div className="mt-6">
          <AudioPlayer clickSoundEnabled={false} setClickSoundEnabled={()=>{}} />
        </div>
    </section>
  );
}
