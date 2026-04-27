import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger
} from './ui/dropdown-menu';
import { siteUrl, siteHostname } from '../lib/siteConfig';
import { GlobalJsonLd } from './GlobalJsonLd';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/mantra-library', label: 'Mantra Library' },
  { to: '/meditation-timer', label: 'Meditation Timer' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const FEATURED_COUNTERS = [
  { to: '/counter/ram-ram',                label: 'Ram Naam Counter' },
  { to: '/counter/radhe-radhe',            label: 'Radhe Radhe Counter' },
  { to: '/counter/om-namah-shivaya',       label: 'Om Namah Shivaya Counter' },
  { to: '/counter/om-han-hanumate-namah',  label: 'Hanuman Japa Counter' },
  { to: '/counter/om',                     label: 'Om Counter' },
  { to: '/counter/gayatri-mantra',         label: 'Gayatri Mantra Counter' },
  { to: '/counter/waheguru',               label: 'Waheguru Counter' },
  { to: '/counter/om-mani-padme-hum',      label: 'Om Mani Padme Hum' },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => { setOpen(false); }, [loc.pathname]);

  const linkClass = ({isActive}) => `nav-link text-[#1A1A1A] font-medium hover:text-[#FF6B00] ${isActive?'active text-[#FF6B00]':''}`;

  return (
    <header className="sticky top-0 z-40 bg-[#FFF8EE]/95 backdrop-blur-sm border-b border-[#D4AF37]/30" data-testid="site-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex items-center gap-7" data-testid="desktop-nav">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="nav-link flex items-center gap-1 text-[#1A1A1A] font-medium hover:text-[#FF6B00]" data-testid="counters-dropdown-trigger">
                Counters <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-[#FFF8EE] border-[#D4AF37]/40 w-64">
              {FEATURED_COUNTERS.map(c => (
                <DropdownMenuItem key={c.to} asChild>
                  <Link to={c.to} className="cursor-pointer hover:bg-[#FFF3DD]" data-testid={`nav-counter-${c.to.replace(/\//g,'-')}`}>{c.label}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/mantra-library" className="cursor-pointer text-[#FF6B00] font-medium" data-testid="nav-counter-view-all">
                  View All Mantras →
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <NavLink to="/mantra-library" className={linkClass}>Mantra Library</NavLink>
          <NavLink to="/meditation-timer" className={linkClass}>Meditation Timer</NavLink>
          <NavLink to="/blog" className={linkClass}>Blog</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>
        <button
          className="lg:hidden p-2 text-[#7B1C1C]"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          data-testid="mobile-menu-toggle"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-[#D4AF37]/30 bg-[#FFF8EE]" data-testid="mobile-nav">
          <div className="px-4 py-4 space-y-1">
            {NAV.map(n => (
              <Link key={n.to} to={n.to} className="block py-2 px-3 rounded-lg hover:bg-[#FFF3DD] text-[#1A1A1A] font-medium" data-testid={`mobile-nav-${n.label.toLowerCase().replace(/ /g,'-')}`}>{n.label}</Link>
            ))}
            <div className="pt-2 border-t border-[#D4AF37]/30">
              <p className="text-xs uppercase tracking-widest text-[#D4AF37] px-3 py-2">Featured Counters</p>
              {FEATURED_COUNTERS.map(c => (
                <Link key={c.to} to={c.to} className="block py-2 px-3 rounded-lg hover:bg-[#FFF3DD] text-[#7B1C1C]">{c.label}</Link>
              ))}
              <Link to="/mantra-library" className="block py-2 px-3 rounded-lg text-[#FF6B00] font-medium">View All Mantras →</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export const Footer = () => (
  <footer className="mt-20 bg-[#7B1C1C] text-[#FFF8EE]" data-testid="site-footer">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid md:grid-cols-4 gap-10">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#D4AF37] text-white font-serif text-xl">ॐ</span>
          <span className="font-serif text-2xl">Japa Counter Online</span>
        </div>
        <p className="text-[#FFF8EE]/80 max-w-md leading-relaxed">
          Supporting your spiritual journey through technology. A free, beautiful digital mala for mantra meditation — built with reverence.
        </p>
      </div>
      <div>
        <h4 className="font-serif text-lg mb-3 text-[#D4AF37]">Explore</h4>
        <ul className="space-y-2 text-sm">
          {NAV.map(n => <li key={n.to}><Link to={n.to} className="hover:text-[#FF6B00] transition">{n.label}</Link></li>)}
          <li>
            <a
              href={siteUrl('/sitemap.xml')}
              className="hover:text-[#FF6B00] transition"
              data-testid="footer-sitemap"
            >
              Sitemap
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-serif text-lg mb-3 text-[#D4AF37]">Featured Counters</h4>
        <ul className="space-y-2 text-sm">
          {FEATURED_COUNTERS.slice(0,6).map(c => <li key={c.to}><Link to={c.to} className="hover:text-[#FF6B00] transition">{c.label}</Link></li>)}
        </ul>
      </div>
    </div>
    <div className="border-t border-[#FFF8EE]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row gap-3 justify-between text-xs text-[#FFF8EE]/70">
        <p>© 2026 {siteHostname()} · All rights reserved.</p>
        <div className="flex gap-5">
          <Link to="/privacy" className="hover:text-[#D4AF37]">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-[#D4AF37]">Terms of Service</Link>
          <Link to="/disclaimer" className="hover:text-[#D4AF37]">Disclaimer</Link>
        </div>
      </div>
    </div>
  </footer>
);

export const CookieBanner = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('jco_cookie_ack')) {
      const t = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(t);
    }
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md bg-[#FFF3DD] border border-[#D4AF37]/50 rounded-2xl p-5 shadow-2xl z-50" data-testid="cookie-banner">
      <p className="text-sm text-[#1A1A1A] mb-3">
        We use only <span className="font-semibold text-[#7B1C1C]">localStorage</span> to remember your japa progress on this device. No personal data is sent to any server.
      </p>
      <div className="flex gap-2">
        <Button
          className="bg-[#FF6B00] hover:bg-[#7B1C1C] text-white rounded-full"
          onClick={() => { localStorage.setItem('jco_cookie_ack','1'); setShow(false); }}
          data-testid="cookie-accept-btn"
        >Got it</Button>
        <Link to="/privacy" className="text-sm self-center text-[#7B1C1C] underline">Privacy</Link>
      </div>
    </div>
  );
};

export const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <GlobalJsonLd />
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
    <CookieBanner />
  </div>
);

export default Layout;
