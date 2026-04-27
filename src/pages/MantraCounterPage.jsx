import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronRight, BookOpen, Sparkles, HelpCircle } from 'lucide-react';
import { JapaCounter } from '../components/JapaCounter';
import { SeoHead } from '../components/SeoHead';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { getMantraById, getMantrasByCategory } from '../lib/mantras';
import { siteUrl } from '../lib/siteConfig';

const ScriptFontClass = (text) => {
  if (!text) return 'font-script';
  if (/[\u0A80-\u0AFF]/.test(text)) return 'font-gujarati';
  if (/[\u0A00-\u0A7F]/.test(text)) return 'font-gurmukhi';
  if (/[\u0B80-\u0BFF]/.test(text)) return 'font-tamil';
  if (/[\u0D00-\u0D7F]/.test(text)) return 'font-malayalam';
  if (/[\u0900-\u097F]/.test(text)) return 'font-devanagari';
  return 'font-script';
};

const buildFAQ = (m) => [
  { q: `What does ${m.name} mean?`, a: m.meaning },
  { q: `How many times should I chant ${m.name}?`, a: `Traditionally 108 repetitions form one mala. Many devotees chant 1, 3, or 11 malas daily as a sustainable sadhana.` },
  { q: `What is the best time to chant ${m.name}?`, a: m.howToChant },
  { q: `What are the benefits of ${m.name}?`, a: m.benefits },
  { q: `Can I chant ${m.name} silently?`, a: 'Yes — japa can be done aloud (vaikhari), softly (upamshu), or mentally (manasika). Mental japa is considered the highest form.' },
];

export default function MantraCounterPage() {
  const { slug } = useParams();
  const mantra = getMantraById(slug);
  if (!mantra) return <Navigate to="/mantra-library" replace />;

  const related = getMantrasByCategory(mantra.category, mantra.id).slice(0, 4);
  const fontClass = ScriptFontClass(mantra.script);
  const url = siteUrl(`/counter/${mantra.id}`);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': `${mantra.name} Japa Counter`,
    'description': `Free online digital mala for chanting ${mantra.name} (${mantra.transliteration}). ${mantra.benefits}`,
    'applicationCategory': 'LifestyleApplication',
    'operatingSystem': 'Web',
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'INR' },
    'url': url,
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': buildFAQ(mantra).map(f => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
    })),
  };

  return (
    <>
      <SeoHead
        title={`${mantra.name} Japa Counter Online — Free Digital Mala`}
        description={`Chant ${mantra.name} (${mantra.script.slice(0,40)}) online with our free digital japa counter. Track 108 malas, write your japa on a sacred parchment, download as image, and share your devotion.`}
        canonical={url}
        schema={[schema, faqSchema]}
      />

      {/* Hero — server-rendered static text for SEO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4" data-testid={`mantra-hero-${mantra.id}`}>
        <nav className="text-xs text-[#7B1C1C]/70 mb-4">
          <Link to="/" className="hover:text-[#FF6B00]">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/mantra-library" className="hover:text-[#FF6B00]">Mantra Library</Link>
          <span className="mx-2">›</span>
          <span className="text-[#7B1C1C]">{mantra.name}</span>
        </nav>
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-3">{mantra.tradition} · {mantra.deity}</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#7B1C1C] mb-4">{mantra.name} Japa Counter</h1>
          <p className={`${fontClass} text-2xl sm:text-3xl text-[#FF6B00] my-6 leading-relaxed`}>{mantra.script}</p>
          <p className="text-sm italic text-[#7B1C1C]/70 mb-3">{mantra.transliteration}</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <Badge variant="outline" className="border-[#D4AF37] text-[#7B1C1C]">Deity: {mantra.deity}</Badge>
            <Badge variant="outline" className="border-[#D4AF37] text-[#7B1C1C]">Tradition: {mantra.tradition}</Badge>
            <Badge variant="outline" className="border-[#D4AF37] text-[#7B1C1C]">Language: {mantra.language}</Badge>
          </div>
          <p className="text-base text-[#1A1A1A]/80 leading-relaxed mt-6 max-w-3xl mx-auto">{mantra.meaning}</p>
        </div>
      </section>

      {/* Interactive counter widget */}
      <JapaCounter
        storageKey={`jco_session_${mantra.id}`}
        initialMantraId={mantra.id}
        lockMantra
        defaultMusic={mantra.defaultMusic}
      />

      {/* Static info content — visible in View Source */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-6" data-testid={`mantra-info-${mantra.id}`}>
        <article className="bg-white border border-[#D4AF37]/30 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-[#FF6B00]" />
            <h2 className="font-serif text-2xl text-[#7B1C1C] m-0">Meaning</h2>
          </div>
          <p className="text-[#1A1A1A]/85 leading-relaxed">{mantra.meaning}</p>
          <p className="text-[#1A1A1A]/70 leading-relaxed mt-3 font-devanagari">{mantra.meaningHindi}</p>
        </article>
        <article className="bg-white border border-[#D4AF37]/30 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#FF6B00]" />
            <h2 className="font-serif text-2xl text-[#7B1C1C] m-0">Benefits</h2>
          </div>
          <p className="text-[#1A1A1A]/85 leading-relaxed">{mantra.benefits}</p>
        </article>
        <article className="bg-white border border-[#D4AF37]/30 rounded-2xl p-6 md:col-span-2">
          <h2 className="font-serif text-2xl text-[#7B1C1C] mb-3">How to Chant</h2>
          <p className="text-[#1A1A1A]/85 leading-relaxed">{mantra.howToChant}</p>
        </article>
      </section>

      {/* Related mantras */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" data-testid={`related-mantras-${mantra.id}`}>
          <h2 className="font-serif text-3xl text-[#7B1C1C] mb-5 text-center">Related Mantras</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map(r => (
              <Link key={r.id} to={`/counter/${r.id}`}
                    className="bg-white border border-[#D4AF37]/30 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-xl transition"
                    data-testid={`related-${r.id}`}>
                <p className={`${ScriptFontClass(r.script)} text-xl text-[#FF6B00] mb-2 line-clamp-1`}>{r.script}</p>
                <p className="font-serif text-lg text-[#7B1C1C] line-clamp-1">{r.name}</p>
                <p className="text-xs uppercase tracking-widest text-[#D4AF37] mt-2 inline-flex items-center gap-1">Open <ChevronRight className="w-3 h-3" /></p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-testid={`mantra-faq-${mantra.id}`}>
        <h2 className="font-serif text-3xl text-[#7B1C1C] mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {buildFAQ(mantra).map((f, i) => (
            <details key={i} className="bg-white border border-[#D4AF37]/30 rounded-2xl p-5 group" data-testid={`faq-${mantra.id}-${i}`}>
              <summary className="cursor-pointer font-serif text-lg text-[#7B1C1C] flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-[#FF6B00] mt-1 flex-shrink-0" />
                <span className="flex-1">{f.q}</span>
              </summary>
              <p className="text-[#1A1A1A]/80 leading-relaxed mt-3 pl-6">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 text-center">
        <Link to="/mantra-library">
          <Button variant="outline" className="rounded-full border-[#7B1C1C] text-[#7B1C1C]" data-testid="back-to-library-btn">
            ← Browse all mantras
          </Button>
        </Link>
      </section>
    </>
  );
}
