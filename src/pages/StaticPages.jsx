import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { siteUrl, getSiteOrigin, contactEmail } from '../lib/siteConfig';
import { Button } from '../components/ui/button';
import { Heart, Sparkles, Lock, BookOpen } from 'lucide-react';

export const About = () => (
  <>
    <SeoHead title="About — Japa Counter Online" description="The story behind a free digital mala built by a college student for the global spiritual community." canonical={siteUrl('/about')} />
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14" data-testid="about-page">
      <p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] mb-2">Our Story</p>
      <h1 className="font-serif text-4xl sm:text-5xl text-[#7B1C1C] mb-6">Built with devotion. Shared for free.</h1>
      <div className="aspect-video rounded-2xl bg-gradient-to-br from-[#FFE7BE] to-[#FFF3DD] border border-[#D4AF37]/30 mb-8 flex items-center justify-center text-[#7B1C1C]/50">
        <span className="text-sm">[ Founder photo placeholder ]</span>
      </div>

      <div className="space-y-8 text-[#1A1A1A]/85 leading-relaxed">
        <Section icon={BookOpen} title="The Story">
          What began as a simple personal tool — a way to keep count of mantras during morning sadhana without staring at a phone keypad — has now grown into a free gift for the worldwide spiritual community. Every line of code in this site is written with reverence.
        </Section>
        <Section icon={Sparkles} title="Mission">
          To bring the sacred discipline of japa into the digital age — without ads, without accounts, without distraction. A digital mala that feels like a temple, not an app.
        </Section>
        <Section icon={Heart} title="Why Free">
          A mala has never been a luxury item. The digital equivalent shouldn't be either. This site is, and will always remain, free.
        </Section>
        <Section icon={Lock} title="Privacy Promise">
          We do not collect or transmit any personal data. Your count, your malas, your handwritten parchment — all stored only in your browser. Always yours, never ours.
        </Section>
      </div>
      <div className="mt-10 text-center">
        <Link to="/contact"><Button className="bg-[#FF6B00] hover:bg-[#7B1C1C] text-white rounded-full px-8" data-testid="about-contact-cta">Contact Us</Button></Link>
      </div>
    </section>
  </>
);

const Section = ({ icon: I, title, children }) => (
  <div className="bg-white rounded-2xl border border-[#D4AF37]/30 p-6">
    <div className="flex items-center gap-3 mb-2">
      <span className="w-9 h-9 rounded-full bg-[#FFF3DD] flex items-center justify-center"><I className="w-4 h-4 text-[#FF6B00]" /></span>
      <h2 className="font-serif text-2xl text-[#7B1C1C] m-0">{title}</h2>
    </div>
    <p>{children}</p>
  </div>
);

export const Contact = () => (
  <>
    <SeoHead title="Contact — Japa Counter Online" description="Reach out with feedback, suggestions, or mantra requests." canonical={siteUrl('/contact')} />
    <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14" data-testid="contact-page">
      <h1 className="font-serif text-4xl sm:text-5xl text-[#7B1C1C] mb-2">Get in Touch</h1>
      <p className="text-[#1A1A1A]/75 mb-8">Have a mantra to add, a suggestion, or a kind word? We'd love to hear from you.</p>
      <div className="bg-white rounded-2xl border border-[#D4AF37]/30 p-6">
        <p className="text-[#1A1A1A] mb-2">Write to us at:</p>
        <a href={`mailto:${contactEmail()}`} className="font-serif text-2xl text-[#FF6B00] hover:text-[#7B1C1C]" data-testid="contact-email">{contactEmail()}</a>
        <p className="mt-6 text-sm text-[#7B1C1C]/70">We typically respond within 2–3 days.</p>
      </div>
    </section>
  </>
);

const POSTS = [
  {
    slug: 'why-108',
    title: 'Why Are There 108 Beads in a Mala?',
    excerpt: 'The cosmic significance of the sacred number — from astronomy to Vedic mathematics.',
    body: [
      'The number 108 appears across nearly every Indic spiritual tradition. A traditional mala has 108 beads. Sun namaskars are often performed in cycles of 108. Many temples have 108 steps.',
      'Some say 108 reflects the average ratio of distances from the Earth to the Sun and Moon. Others note that the human body has 108 marma points. In numerology, 1 stands for higher truth, 0 for emptiness/completeness, 8 for infinity.',
      'Whatever the source, the practice of completing 108 chants creates a contained, deliberate spiritual unit. It is not too few to be casual, nor too many to be unsustainable. It is a perfect circle.',
    ],
  },
  {
    slug: 'beginners-guide',
    title: "Beginner's Guide to Japa Meditation",
    excerpt: 'How to choose a mantra, sit, and begin your daily practice — without overcomplicating it.',
    body: [
      'Start small. One mala (108 repetitions) takes roughly 8–12 minutes depending on your pace. That is enough.',
      'Choose any mantra that resonates. There is no hierarchy. The mantra you can return to daily is the right one for you.',
      'Sit comfortably with spine erect. Eyes can be open softly or closed. Move from one bead (or tap) to the next with each repetition. When the mind wanders — and it will — gently return to the sound.',
    ],
  },
  {
    slug: 'mantra-vs-affirmation',
    title: 'Mantra vs. Affirmation: What\'s the Difference?',
    excerpt: 'Understanding the energetic distinction between these two related practices.',
    body: [
      'An affirmation is a self-directed positive statement chosen to reshape thought patterns. A mantra is a sound-form, often Sanskrit, whose vibration itself is considered transformative — independent of literal meaning.',
      'Both have value. Affirmations work primarily through the conscious mind. Mantras are said to act on subtler levels — pranic, energetic.',
      'The Freestyle counter on this site supports both equally. Type whatever your heart needs to hear today.',
    ],
  },
];

export const Blog = () => (
  <>
    <SeoHead title="Blog — Japa Counter Online" description="Articles on mantra meditation, japa traditions, and the spiritual significance of 108." canonical={siteUrl('/blog')} />
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14" data-testid="blog-page">
      <h1 className="font-serif text-4xl sm:text-5xl text-[#7B1C1C] mb-3">Journal</h1>
      <p className="text-[#1A1A1A]/75 mb-10">Reflections on the path of mantra meditation.</p>
      <div className="grid md:grid-cols-3 gap-6">
        {POSTS.map(p => (
          <Link key={p.slug} to={`/blog/${p.slug}`} className="bg-white rounded-2xl border border-[#D4AF37]/30 p-6 hover:-translate-y-1 hover:shadow-xl transition" data-testid={`blog-card-${p.slug}`}>
            <h2 className="font-serif text-2xl text-[#7B1C1C] mb-2">{p.title}</h2>
            <p className="text-sm text-[#1A1A1A]/70">{p.excerpt}</p>
            <p className="mt-4 text-xs uppercase tracking-widest text-[#D4AF37]">Read →</p>
          </Link>
        ))}
      </div>
    </section>
  </>
);

export const BlogPost = ({ slug }) => {
  const post = POSTS.find(p => p.slug === slug);
  if (!post) {
    return (
      <>
        <SeoHead
          title="Post not found — Japa Counter Online"
          description="This journal entry could not be found."
          canonical={siteUrl('/blog')}
          robots="noindex, follow"
        />
        <section className="max-w-3xl mx-auto py-20 text-center" data-testid="blog-post-not-found">
          <h1 className="font-serif text-3xl text-[#7B1C1C]">Post not found</h1>
        </section>
      </>
    );
  }
  const postUrl = siteUrl(`/blog/${post.slug}`);
  const origin = getSiteOrigin();
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: postUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    ...(origin ? { publisher: { '@id': `${origin}/#organization` } } : {}),
  };
  return (
    <>
      <SeoHead title={`${post.title} — Japa Counter Online`} description={post.excerpt} canonical={postUrl} schema={articleSchema} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14" data-testid={`blog-post-${slug}`}>
        <Link to="/blog" className="text-sm text-[#D4AF37] hover:text-[#FF6B00]">← Back to Journal</Link>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#7B1C1C] mt-4 mb-6">{post.title}</h1>
        {post.body.map((p,i) => <p key={i} className="text-[#1A1A1A]/85 leading-relaxed mb-4">{p}</p>)}
      </article>
    </>
  );
};

const Legal = ({ title, body, testid }) => (
  <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14" data-testid={testid}>
    <h1 className="font-serif text-4xl text-[#7B1C1C] mb-6">{title}</h1>
    <div className="space-y-4 text-[#1A1A1A]/85 leading-relaxed">{body}</div>
  </section>
);

export const Privacy = () => (
  <>
    <SeoHead title="Privacy Policy — Japa Counter Online" description="Privacy-first: no personal data is collected or transmitted." canonical={siteUrl('/privacy')} />
    <Legal
      title="Privacy Policy"
      testid="privacy-page"
      body={<>
        <p>Japa Counter Online is built with privacy as a core principle. We do not collect, store, or transmit any personal data to any server.</p>
        <p>All session data — your count, malas completed, writing canvas text, audio preferences — is stored exclusively in your browser's localStorage. This data never leaves your device.</p>
        <p>We do not use third‑party tracking, analytics, or advertising services. We do not place tracking cookies. The only browser storage we use is the localStorage required to remember your japa progress.</p>
        <p>You can clear all stored data at any time using the Reset button or by clearing your browser's site data.</p>
      </>}
    />
  </>
);

export const Terms = () => (
  <>
    <SeoHead title="Terms of Service — Japa Counter Online" description="Terms governing use of the free Japa Counter Online tool." canonical={siteUrl('/terms')} />
    <Legal
      title="Terms of Service"
      testid="terms-page"
      body={<>
        <p>By using Japa Counter Online you agree to these terms. The site is provided free of charge for personal spiritual practice and is offered "as is" without warranty.</p>
        <p>The content (mantra texts, meanings, vidhi) is for informational purposes only and is not a substitute for guidance from a qualified spiritual teacher.</p>
        <p>You may use this tool for personal practice, share screenshots and downloads freely, and link to this site. Please do not republish the site's source code as your own.</p>
      </>}
    />
  </>
);

export const Disclaimer = () => (
  <>
    <SeoHead title="Disclaimer — Japa Counter Online" description="Spiritual guidance disclaimer." canonical={siteUrl('/disclaimer')} />
    <Legal
      title="Disclaimer"
      testid="disclaimer-page"
      body={<>
        <p>The information on this website is provided for general educational and spiritual reference. It is not intended to diagnose, treat, or replace medical or psychological care.</p>
        <p>Mantra practice traditions are ancient and varied. Where possible, please learn directly from a qualified teacher within your tradition.</p>
      </>}
    />
  </>
);
