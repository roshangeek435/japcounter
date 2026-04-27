import React from 'react';
import { MessageCircle, Facebook, Twitter, Send, Instagram, Download } from 'lucide-react';
import { toast } from 'sonner';
import { siteHostname, siteUrl } from '../lib/siteConfig';

export const ShareButtons = ({ mantraName, malas, onDownload, onCopyMessage }) => {
  const url = typeof window !== 'undefined' ? window.location.href : siteUrl('/');
  const label = siteHostname();
  const message = `🕉️ I just completed ${malas} mala${malas !== 1 ? 's' : ''} of ${mantraName} japa today 🙏 Try the free Japa Counter at ${label}`;
  const enc = encodeURIComponent;

  const links = [
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, color: 'bg-[#25D366]', href: `https://wa.me/?text=${enc(message + ' ' + url)}` },
    { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'bg-[#1877F2]', href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}&quote=${enc(message)}` },
    { id: 'twitter', label: 'Twitter / X', icon: Twitter, color: 'bg-[#000]', href: `https://twitter.com/intent/tweet?text=${enc(message)}&url=${enc(url)}` },
    { id: 'telegram', label: 'Telegram', icon: Send, color: 'bg-[#229ED9]', href: `https://t.me/share/url?url=${enc(url)}&text=${enc(message)}` },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#D4AF37]/30 p-5 shadow-sm" data-testid="share-buttons">
      <h3 className="font-serif text-lg text-[#7B1C1C] mb-3">Download & Share</h3>
      <button
        onClick={onDownload}
        className="w-full mb-4 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#7B1C1C] text-white font-medium shadow-md hover:shadow-lg transition"
        data-testid="download-image-btn"
      >
        <Download className="w-4 h-4" /> Download as Image
      </button>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {links.map(l => (
          <a key={l.id} href={l.href} target="_blank" rel="noopener noreferrer"
             className={`${l.color} text-white rounded-xl py-2 px-2 flex flex-col items-center gap-1 hover:opacity-90 transition text-xs`}
             data-testid={`share-${l.id}-btn`}>
            <l.icon className="w-5 h-5" />
            <span>{l.label}</span>
          </a>
        ))}
        <button
          onClick={() => { onCopyMessage?.(message); toast.success('Caption copied. Now post the downloaded image to Instagram!'); }}
          className="bg-gradient-to-tr from-[#FF6B00] via-[#7B1C1C] to-[#D4AF37] text-white rounded-xl py-2 px-2 flex flex-col items-center gap-1 hover:opacity-90 transition text-xs"
          data-testid="share-instagram-btn"
        >
          <Instagram className="w-5 h-5" />
          <span>Instagram</span>
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
