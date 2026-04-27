import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Copy, ChevronRight } from 'lucide-react';
import { ALL_MANTRAS, CATEGORIES } from '../lib/mantras';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from '../components/ui/dialog';
import { SeoHead } from '../components/SeoHead';
import { siteUrl } from '../lib/siteConfig';
import { toast } from 'sonner';

const ScriptFontClass = (text) => {
  if (!text) return 'font-devanagari';
  if (/[\u0A80-\u0AFF]/.test(text)) return 'font-gujarati';
  if (/[\u0A00-\u0A7F]/.test(text)) return 'font-gurmukhi';
  if (/[\u0B80-\u0BFF]/.test(text)) return 'font-tamil';
  if (/[\u0D00-\u0D7F]/.test(text)) return 'font-malayalam';
  return 'font-devanagari';
};

export default function MantraLibrary() {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    return ALL_MANTRAS.filter(m => {
      const matchQ = !q || m.name.toLowerCase().includes(q.toLowerCase()) || m.deity.toLowerCase().includes(q.toLowerCase()) || m.script.includes(q) || m.tradition.toLowerCase().includes(q.toLowerCase());
      const matchD = filter === 'all' || m.category === filter;
      return matchQ && matchD;
    });
  }, [q, filter]);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': ALL_MANTRAS.map((m, i) => ({
      '@type': 'ListItem',
      'position': i + 1,
      'name': m.name,
      'url': siteUrl(`/counter/${m.id}`),
    })),
  };

  return (
    <>
      <SeoHead
        title="Mantra Library — 150+ Sacred Mantras with Meanings & Benefits"
        description="Explore 150+ Hindu, Sikh, Jain, Buddhist mantras with original script, transliteration, meaning, pronunciation, vidhi, and benefits. Free japa counter for every mantra."
        canonical={siteUrl('/mantra-library')}
        schema={schema}
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-testid="library-page">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] mb-2">Sacred Texts</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#7B1C1C] mb-3">Mantra Library</h1>
          <p className="text-[#1A1A1A]/75 max-w-2xl mx-auto">A curated collection of {ALL_MANTRAS.length}+ mantras across Hindu, Sikh, Jain, Buddhist and regional dharmic traditions.</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#D4AF37]/30 p-4 mb-8 shadow-sm">
          <div className="relative mb-4">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7B1C1C]/50" />
            <Input placeholder="Search by name, deity, tradition or text…" value={q} onChange={e=>setQ(e.target.value)} className="pl-9 border-[#D4AF37]/40 bg-[#FFF8EE]" data-testid="library-search" />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button key={c.id}
                onClick={() => setFilter(c.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${filter===c.id? 'bg-[#FF6B00] text-white':'bg-[#FFF3DD] text-[#7B1C1C] hover:bg-[#FFE7BE]'}`}
                data-testid={`library-filter-${c.id}`}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(m => (
            <article key={m.id} className="bg-white rounded-2xl border border-[#D4AF37]/30 p-5 hover:shadow-xl hover:-translate-y-1 transition flex flex-col" data-testid={`library-card-${m.id}`}>
              <p className={`${ScriptFontClass(m.script)} text-xl text-[#FF6B00] mb-2 leading-snug line-clamp-2`}>{m.script}</p>
              <h2 className="font-serif text-xl text-[#7B1C1C]">{m.name}</h2>
              <p className="text-xs uppercase tracking-widest text-[#D4AF37] mt-1">{m.deity} · {m.tradition}</p>
              <p className="text-sm text-[#1A1A1A]/75 mt-3 leading-relaxed flex-1">{m.meaning.slice(0, 110)}{m.meaning.length>110?'…':''}</p>
              <div className="mt-4 flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="rounded-full border-[#7B1C1C]/30 text-[#7B1C1C] text-xs" data-testid={`library-details-${m.id}`}>
                      Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-[#FFF8EE] border-[#D4AF37]/40 max-w-2xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="font-serif text-2xl text-[#7B1C1C]">{m.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-2">
                      <div className="bg-[#FFF3DD] rounded-xl p-4 border border-[#D4AF37]/30">
                        <p className={`${ScriptFontClass(m.script)} text-2xl text-[#FF6B00] leading-relaxed`}>{m.script}</p>
                        <p className="italic text-[#7B1C1C] mt-2">{m.transliteration}</p>
                      </div>
                      <Section label="English Meaning" body={m.meaning} />
                      <Section label="Hindi Meaning" body={m.meaningHindi} />
                      <Section label="How to Chant" body={m.howToChant} />
                      <Section label="Benefits" body={m.benefits} />
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-[#D4AF37]/30">
                        <Button onClick={() => { navigator.clipboard?.writeText(m.script); toast.success('Mantra copied'); }} variant="outline" className="rounded-full" data-testid={`copy-mantra-${m.id}`}>
                          <Copy className="w-4 h-4 mr-1" /> Copy
                        </Button>
                        <Link to={`/counter/${m.id}`} className="ml-auto">
                          <Button className="rounded-full bg-[#FF6B00] hover:bg-[#7B1C1C]" data-testid={`start-japa-${m.id}`}>Start Japa →</Button>
                        </Link>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Link to={`/counter/${m.id}`} className="ml-auto">
                  <Button className="rounded-full bg-[#FF6B00] hover:bg-[#7B1C1C] text-xs" data-testid={`library-open-${m.id}`}>
                    Open <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-[#7B1C1C] mt-10">No mantras match your search.</p>
        )}
      </section>
    </>
  );
}

const Section = ({ label, body }) => (
  <div>
    <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] mb-1">{label}</p>
    <p className="text-sm text-[#1A1A1A]/85 leading-relaxed">{body}</p>
  </div>
);
