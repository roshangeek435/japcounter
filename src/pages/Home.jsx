import { Link } from 'react-router-dom';
import { JapaCounter } from '../components/JapaCounter';
import { SeoHead } from '../components/SeoHead';
import { siteUrl } from '../lib/siteConfig';
import { ArrowRight, Sparkles, Heart, Shield } from 'lucide-react';

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Jap Counter Online",
    "url": siteUrl('/'),
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
    "description": "A free digital mala for mantra meditation with live writing canvas, downloadable image, and 20+ preloaded mantras."
  };

  return (
    <>
      <SeoHead
        title="Jap Counter Online — Free Digital Mala for Mantra Meditation"
        description="Free, beautiful digital mala. Tap to chant, watch your mantra fill a sacred parchment, download as image and share. 20+ preloaded mantras (Om, Ram, Hare Krishna, Om Namah Shivaya, Hanuman, Gayatri & more)."
        canonical={siteUrl('/')}
        schema={schema}
      />
      {/* Hero */}
      <section className="relative pt-12 pb-6 px-4 sm:px-6 lg:px-8 text-center" data-testid="hero-section">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] mb-3">A sacred digital mala</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#7B1C1C] leading-tight mb-5">
            Tap. Chant. <span className="italic text-[#FF6B00]">Manifest.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#1A1A1A]/75 max-w-2xl mx-auto leading-relaxed">
            Every tap writes your mantra on a parchment of devotion. Track 108‑bead malas, download your handwritten page, and share your sadhana with the world.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-xs">
            {[{i:Sparkles,t:'18+ Mantras'},{i:Heart,t:'Free Forever'},{i:Shield,t:'Private — On Your Device'}].map((x,i)=>(
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#D4AF37]/30 text-[#7B1C1C]">
                <x.i className="w-3.5 h-3.5 text-[#FF6B00]" /> {x.t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <JapaCounter storageKey="jco_session_home" initialMantraId="om" />

      {/* Quick links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-serif text-3xl text-[#7B1C1C] mb-6 text-center">Dedicated Counter Pages</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { to: '/counter/ram-ram',                n: 'Ram Naam', s: 'राम' },
            { to: '/counter/radhe-radhe',            n: 'Radhe Radhe', s: 'राधे' },
            { to: '/counter/om-namah-shivaya',       n: 'Om Namah Shivaya', s: 'ॐ नमः शिवाय' },
            { to: '/counter/om-han-hanumate-namah',  n: 'Hanuman', s: 'ॐ हं हनुमते' },
            { to: '/counter/waheguru',               n: 'Waheguru', s: 'ਵਾਹਿਗੁਰੂ' },
          ].map(c => (
            <Link key={c.to} to={c.to} className="group bg-white rounded-2xl border border-[#D4AF37]/30 p-5 hover:-translate-y-1 hover:shadow-xl transition" data-testid={`home-counter-card-${c.to.replace(/\//g,'')}`}>
              <p className="font-devanagari text-2xl text-[#FF6B00] mb-2">{c.s}</p>
              <p className="font-serif text-lg text-[#7B1C1C]">{c.n} Counter</p>
              <p className="text-xs text-[#D4AF37] mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">Open <ArrowRight className="w-3 h-3" /></p>
            </Link>
          ))}
        </div>
      </section>

      {/* About blurb */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="font-serif text-3xl text-[#7B1C1C] mb-4">Why Jap Counter Online?</h2>
        <p className="text-[#1A1A1A]/80 leading-relaxed">
          A traditional mala has 108 beads — a sacred number woven into Vedic cosmology. Whether you chant Om, Ram, Radhe, or any mantra of your heart, this free tool gently keeps count so your mind can stay with the sound. Your data lives only on your device. No accounts. No tracking. Just devotion.
        </p>
      </section>
    </>
  );
}
