import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import html2canvas from 'html2canvas';
import { Play, Pause, RotateCcw, Trash2, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from './ui/select';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from './ui/alert-dialog';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from './ui/table';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { toast } from 'sonner';
import { MANTRAS, getMantraById } from '../lib/mantras';
import { MandalaTapButton } from './MandalaTapButton';
import { WritingCanvas } from './WritingCanvas';
import { ShareButtons } from './ShareButtons';
import { AudioPlayer } from './AudioPlayer';
import { playOneShot } from '../hooks/useAudio';

const CLICK_SRC = '/audio/bell-click.mp3';
const BELL_SRC = '/audio/mala-bell.mp3';

const fmtTime = (s) => {
  const h = Math.floor(s/3600).toString().padStart(2,'0');
  const m = Math.floor((s%3600)/60).toString().padStart(2,'0');
  const sec = (s%60).toString().padStart(2,'0');
  return `${h}:${m}:${sec}`;
};

const SCRIPT_OPTIONS = [
  { id: 'sanskrit', label: 'Original Script' },
  { id: 'transliteration', label: 'English' },
];

export const JapaCounter = ({
  storageKey = 'jco_session_default',
  initialMantraId = 'om',
  lockMantra = false,
  pageTitle,
  defaultMusic = 'silence',
}) => {
  const [mantraId, setMantraId] = useState(initialMantraId);
  const [scriptType, setScriptType] = useState('sanskrit');
  const [customMantra, setCustomMantra] = useState('');
  const [count, setCount] = useState(0);
  const [malas, setMalas] = useState(0);
  const [total, setTotal] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [words, setWords] = useState([]);
  const [malaHistory, setMalaHistory] = useState([]);
  const [sparkle, setSparkle] = useState(false);
  const [savedTick, setSavedTick] = useState(false);
  const [clickSoundEnabled, setClickSoundEnabled] = useState(false);
  const [countdownMode, setCountdownMode] = useState(false);
  const [targetMin, setTargetMin] = useState(10);
  const [malaStartSec, setMalaStartSec] = useState(0);

  const canvasRef = useRef(null);
  const restored = useRef(false);

  const mantra = useMemo(() => {
    if (mantraId === 'custom') {
      return { id: 'custom', name: customMantra || 'Custom', script: customMantra, transliteration: customMantra, deity: 'Custom', meaning: 'Custom mantra' };
    }
    return getMantraById(mantraId) || MANTRAS[0];
  }, [mantraId, customMantra]);

  const activeText = useMemo(() => {
    if (mantraId === 'custom') return customMantra || '';
    if (scriptType === 'transliteration') return mantra.transliteration;
    return mantra.script;
  }, [mantra, scriptType, customMantra, mantraId]);

  // Restore from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const s = JSON.parse(raw);
        if (!lockMantra && s.mantraId) setMantraId(s.mantraId);
        setScriptType(s.scriptType || 'sanskrit');
        setCustomMantra(s.customMantra || '');
        setCount(s.count || 0);
        setMalas(s.malas || 0);
        setTotal(s.total || 0);
        setSeconds(s.seconds || 0);
        setWords(s.words || []);
        setMalaHistory(s.malaHistory || []);
        setMalaStartSec(s.malaStartSec || 0);
      }
    } catch (e) { /* ignore */ }
    restored.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  // Auto-save
  useEffect(() => {
    if (!restored.current) return;
    const data = { mantraId, scriptType, customMantra, count, malas, total, seconds, words, malaHistory, malaStartSec };
    localStorage.setItem(storageKey, JSON.stringify(data));
    setSavedTick(true);
    const t = setTimeout(() => setSavedTick(false), 1200);
    return () => clearTimeout(t);
  }, [mantraId, scriptType, customMantra, count, malas, total, seconds, words, malaHistory, malaStartSec, storageKey]);

  // Timer
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => {
      const next = s + 1;
      if (countdownMode && next >= targetMin * 60) {
        setRunning(false);
        playOneShot(BELL_SRC, 0.7);
        toast.success('🔔 Meditation timer complete', { description: `${targetMin} minutes done.` });
      }
      return next;
    }), 1000);
    return () => clearInterval(id);
  }, [running, countdownMode, targetMin]);

  const handleTap = useCallback(() => {
    if (mantraId === 'custom' && !customMantra.trim()) {
      toast.error('Please type your custom mantra first.');
      return;
    }
    if (!activeText) return;
    if (!running) setRunning(true);
    if (clickSoundEnabled) playOneShot(CLICK_SRC, 0.4);
    setCount(c => {
      const nc = c + 1;
      if (nc >= 108) {
        setMalas(m => m + 1);
        setMalaHistory(h => [...h, { id: Date.now(), idx: h.length + 1, count: 108, timeSec: seconds - malaStartSec }]);
        setMalaStartSec(seconds);
        setSparkle(true);
        playOneShot(BELL_SRC, 0.6);
        setTimeout(() => setSparkle(false), 1400);
        toast.success('🌸 Mala complete! 108 chants achieved.');
        return 0;
      }
      return nc;
    });
    setTotal(t => t + 1);
    setWords(w => [...w, activeText]);
  }, [activeText, clickSoundEnabled, running, seconds, malaStartSec, mantraId, customMantra]);

  // Keyboard tap (Space / Enter)
  useEffect(() => {
    const onKey = (e) => {
      if (e.target?.tagName === 'INPUT' || e.target?.tagName === 'TEXTAREA') return;
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleTap();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleTap]);

  const reset = () => {
    setCount(0); setMalas(0); setTotal(0); setSeconds(0); setWords([]); setMalaHistory([]); setRunning(false); setMalaStartSec(0);
    toast.success('Session reset.');
  };

  const deleteMala = (id) => setMalaHistory(h => h.filter(x => x.id !== id));

  const downloadCanvas = async () => {
    if (!canvasRef.current) return;
    try {
      toast.info('Capturing your sacred page…');
      const node = canvasRef.current;
      const canvas = await html2canvas(node, { backgroundColor: '#FFF3DD', scale: 2, useCORS: true });
      const link = document.createElement('a');
      const d = new Date();
      const date = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      link.download = `JapaCounter_${mantra.name.replace(/[^A-Za-z0-9]+/g,'_')}_${malas}Malas_${date}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.success('Downloaded! Share your divine handwriting 🙏');
    } catch (e) {
      toast.error('Download failed. Try again.');
    }
  };

  const totalTaps = malaHistory.reduce((a, b) => a + b.count, 0);
  const totalMalaTime = malaHistory.reduce((a, b) => a + b.timeSec, 0);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" data-testid="japa-counter-section">
      {pageTitle && (
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#7B1C1C] mb-3">{pageTitle}</h1>
          <p className="text-base text-[#1A1A1A]/70 max-w-2xl mx-auto">A sacred digital mala — every tap writes your mantra on the parchment of devotion.</p>
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-8">
        {/* LEFT — Counter */}
        <div className="lg:col-span-3 space-y-6">
          {/* Mantra selector */}
          <div className="bg-white rounded-2xl border border-[#D4AF37]/30 p-5 shadow-sm" data-testid="mantra-selector-card">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <div className="flex-1">
                <label className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-2 block">Choose Mantra</label>
                <Select value={mantraId} onValueChange={setMantraId} disabled={lockMantra}>
                  <SelectTrigger className="border-[#D4AF37]/40 bg-[#FFF8EE]" data-testid="mantra-select-trigger">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#FFF8EE] border-[#D4AF37]/40 max-h-72">
                  <SelectItem value="custom" data-testid="mantra-option-custom">✨ Custom (Your Own)</SelectItem>
                    {MANTRAS.map(m => (
                      <SelectItem key={m.id} value={m.id} data-testid={`mantra-option-${m.id}`}>
                        <span className="font-devanagari mr-2">{m.script.length > 25 ? m.script.slice(0,25)+'…' : m.script}</span>
                        <span className="text-xs text-[#7B1C1C]/70">— {m.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {mantraId !== 'custom' && (
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-2 block">Script</label>
                  <ToggleGroup type="single" value={scriptType} onValueChange={(v) => v && setScriptType(v)} className="bg-[#FFF8EE] border border-[#D4AF37]/30 rounded-full p-1" data-testid="script-toggle-group">
                    {SCRIPT_OPTIONS.map(s => (
                      <ToggleGroupItem key={s.id} value={s.id} className="text-xs px-3 data-[state=on]:bg-[#FF6B00] data-[state=on]:text-white rounded-full" data-testid={`script-toggle-${s.id}`}>
                        {s.label}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
              )}
            </div>
            {mantraId === 'custom' && (
              <Input
                placeholder="Type your mantra in any language (Sanskrit, Hindi, Gujarati, English…)"
                value={customMantra}
                onChange={(e) => setCustomMantra(e.target.value)}
                className="mt-4 border-[#D4AF37]/40 bg-[#FFF8EE]"
                data-testid="custom-mantra-input"
              />
            )}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-[#7B1C1C]/80">Active: <span className="font-medium font-devanagari">{activeText || '—'}</span></p>
              {savedTick && <span className="text-xs text-emerald-700 flex items-center gap-1" data-testid="autosave-indicator"><CheckCircle2 className="w-3 h-3" /> Autosaved</span>}
            </div>
          </div>

          {/* Counter centerpiece */}
          <div className="bg-white rounded-3xl border border-[#D4AF37]/30 p-8 text-center shadow-sm relative" data-testid="counter-centerpiece">
            <div className="grid grid-cols-3 gap-2 mb-6">
              <div data-testid="stat-current">
                <p className="text-xs uppercase tracking-[0.18em] text-[#D4AF37]">Current</p>
                <p className="font-serif text-4xl text-[#7B1C1C]">{count}<span className="text-xl text-[#1A1A1A]/40">/108</span></p>
              </div>
              <div data-testid="stat-malas">
                <p className="text-xs uppercase tracking-[0.18em] text-[#D4AF37]">Malas</p>
                <p className="font-serif text-4xl text-[#FF6B00]">{malas}</p>
              </div>
              <div data-testid="stat-total">
                <p className="text-xs uppercase tracking-[0.18em] text-[#D4AF37]">Total</p>
                <p className="font-serif text-4xl text-[#1A1A1A]">{total}</p>
              </div>
            </div>
            <div className="flex justify-center mb-6">
              <MandalaTapButton count={count} total={108} onTap={handleTap} sparkle={sparkle} />
            </div>
            <p className="text-sm text-[#7B1C1C]/70">Tap the lotus, press <kbd className="px-2 py-0.5 rounded bg-[#FFF3DD] border border-[#D4AF37]/30 text-xs">Space</kbd> or <kbd className="px-2 py-0.5 rounded bg-[#FFF3DD] border border-[#D4AF37]/30 text-xs">Enter</kbd></p>

            {/* Timer */}
            <div className="mt-6 border-t border-[#D4AF37]/20 pt-5">
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <p className="font-serif text-3xl text-[#1A1A1A]" data-testid="timer-display">{fmtTime(seconds)}</p>
                <Button onClick={() => setRunning(r => !r)} className="bg-[#FF6B00] hover:bg-[#7B1C1C] text-white rounded-full" data-testid="timer-toggle-btn">
                  {running ? <><Pause className="w-4 h-4 mr-1"/>Pause</> : <><Play className="w-4 h-4 mr-1"/>Start</>}
                </Button>
                <Button variant="outline" onClick={() => { setSeconds(0); setRunning(false); }} className="rounded-full border-[#7B1C1C]/30 text-[#7B1C1C]" data-testid="timer-reset-btn">
                  <RotateCcw className="w-4 h-4 mr-1"/>Reset
                </Button>
              </div>
              <div className="mt-3 flex items-center justify-center gap-3 text-sm">
                <label className="flex items-center gap-2 text-[#1A1A1A]">
                  <input type="checkbox" checked={countdownMode} onChange={(e) => setCountdownMode(e.target.checked)} data-testid="countdown-toggle" />
                  Countdown mode
                </label>
                {countdownMode && (
                  <Input type="number" min={1} max={180} value={targetMin} onChange={(e) => setTargetMin(parseInt(e.target.value)||10)} className="w-20 h-8 border-[#D4AF37]/40" data-testid="countdown-minutes" />
                )}
                {countdownMode && <span className="text-[#7B1C1C]/70">minutes</span>}
              </div>
            </div>

            <div className="mt-5 flex justify-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="rounded-full border-[#7B1C1C] text-[#7B1C1C] hover:bg-[#7B1C1C] hover:text-white" data-testid="reset-session-btn">
                    <RotateCcw className="w-4 h-4 mr-2" /> Reset Session
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#FFF8EE] border-[#D4AF37]/40">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-serif text-[#7B1C1C]">Reset your japa session?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will clear your current count, mala history, timer, and writing canvas. This cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel data-testid="reset-cancel-btn">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={reset} className="bg-[#7B1C1C] hover:bg-[#FF6B00]" data-testid="reset-confirm-btn">Yes, reset</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          {/* Audio */}
          <AudioPlayer defaultTrack={defaultMusic} clickSoundEnabled={clickSoundEnabled} setClickSoundEnabled={setClickSoundEnabled} />

          {/* Mala History */}
          {malaHistory.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#D4AF37]/30 p-5 shadow-sm" data-testid="mala-history-card">
              <h3 className="font-serif text-xl text-[#7B1C1C] mb-3">Mala Sessions</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mala #</TableHead>
                      <TableHead>Count</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {malaHistory.map(m => (
                      <TableRow key={m.id} data-testid={`mala-row-${m.id}`}>
                        <TableCell className="font-medium text-[#7B1C1C]">{m.idx}</TableCell>
                        <TableCell>{m.count}</TableCell>
                        <TableCell>{fmtTime(m.timeSec)}</TableCell>
                        <TableCell>
                          <button onClick={() => deleteMala(m.id)} className="text-[#7B1C1C]/60 hover:text-[#FF6B00]" aria-label="Delete mala" data-testid={`delete-mala-${m.id}`}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-[#FFF3DD]/60 font-semibold">
                      <TableCell>Total</TableCell>
                      <TableCell>{totalTaps}</TableCell>
                      <TableCell colSpan={2}>{fmtTime(totalMalaTime)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — Writing canvas + share */}
        <div className="lg:col-span-2 space-y-6">
          <WritingCanvas ref={canvasRef} words={words} mantraText={activeText} />
          <ShareButtons mantraName={mantra.name} malas={malas} onDownload={downloadCanvas} onCopyMessage={(m) => navigator.clipboard?.writeText(m)} />
        </div>
      </div>
    </section>
  );
};

export default JapaCounter;
