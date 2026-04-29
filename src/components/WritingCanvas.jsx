'use client';

import React, { forwardRef, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteHostname } from '../lib/siteConfig';

const isDevanagari = (s) => /[\u0900-\u097F]/.test(s);
const isGujarati = (s) => /[\u0A80-\u0AFF]/.test(s);
const isGurmukhi = (s) => /[\u0A00-\u0A7F]/.test(s);
const isTamil = (s) => /[\u0B80-\u0BFF]/.test(s);
const isMalayalam = (s) => /[\u0D00-\u0D7F]/.test(s);

export const WritingCanvas = forwardRef(({ words, mantraText }, ref) => {
  const innerRef = useRef(null);
  useEffect(() => {
    if (innerRef.current) innerRef.current.scrollTop = innerRef.current.scrollHeight;
  }, [words.length]);

  const fontClass = !mantraText ? 'font-script'
    : isGujarati(mantraText)  ? 'font-gujarati'
    : isGurmukhi(mantraText)  ? 'font-gurmukhi'
    : isTamil(mantraText)     ? 'font-tamil'
    : isMalayalam(mantraText) ? 'font-malayalam'
    : isDevanagari(mantraText)? 'font-devanagari'
    : 'font-script';

  return (
    <div
      ref={ref}
      className="parchment rounded-3xl border-4 border-[#7B1C1C]/15 overflow-hidden flex flex-col"
      data-testid="writing-canvas"
      style={{ minHeight: '520px' }}
    >
      <div className="px-6 pt-5 pb-3 border-b border-[#7B1C1C]/15 flex items-center justify-between">
        <div>
          <p className="font-serif text-xl text-[#7B1C1C]">सच्ची साधना</p>
          <p className="text-xs uppercase tracking-[0.25em] text-[#7B1C1C]/70">Live Writing Canvas</p>
        </div>
        <p className="text-xs text-[#7B1C1C]/70">{words.length} words</p>
      </div>
      <div
        ref={innerRef}
        className="flex-1 overflow-y-auto px-7 py-6 ruled-lines leading-[48px]"
        style={{ maxHeight: '60vh' }}
        data-testid="writing-canvas-scroll"
      >
        <AnimatePresence initial={false}>
          {words.map((w, i) => (
            <motion.span
              key={`${w}-${i}`}
              initial={{ opacity: 0, filter: 'blur(4px)', y: 6 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className={`${fontClass} text-2xl md:text-3xl text-[#7B1C1C] mr-3 inline-block`}
            >
              {w}
            </motion.span>
          ))}
          {words.length === 0 && (
            <p className="text-[#7B1C1C]/60 italic font-script text-xl">
              Tap the lotus to begin writing your mantra…
            </p>
          )}
        </AnimatePresence>
      </div>
      <div className="px-6 py-3 border-t border-[#7B1C1C]/15 bg-[#FFF3DD]/60 text-center">
        <p className="text-sm text-[#7B1C1C] font-medium">
          🙏 {siteHostname()} — Your Digital Mala
        </p>
      </div>
    </div>
  );
});

WritingCanvas.displayName = 'WritingCanvas';
export default WritingCanvas;
