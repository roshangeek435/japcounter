"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { configuredSiteUrl, siteHostname } from "../lib/siteConfig";

const NAV_BEFORE = [{ to: "/", label: "Home" }];

const NAV_AFTER = [
	{ to: "/mantra-library", label: "Mantra Library" },
	{ to: "/meditation-timer", label: "Meditation Timer" },
	{ to: "/blog", label: "Blog" },
	{ to: "/about", label: "About" },
	{ to: "/contact", label: "Contact" }
];

/** Keep a flat NAV array for footer / mobile usage */
const NAV = [...NAV_BEFORE, ...NAV_AFTER];

const FEATURED_COUNTERS = [
	{ to: "/counter/ram-ram", label: "Ram Naam Counter" },
	{ to: "/counter/radhe-radhe", label: "Radhe Radhe Counter" },
	{ to: "/counter/om-namah-shivaya", label: "Om Namah Shivaya Counter" },
	{ to: "/counter/om-han-hanumate-namah", label: "Hanuman Japa Counter" },
	{ to: "/counter/om", label: "Om Counter" },
	{ to: "/counter/gayatri-mantra", label: "Gayatri Mantra Counter" },
	{ to: "/counter/waheguru", label: "Waheguru Counter" },
	{ to: "/counter/om-mani-padme-hum", label: "Om Mani Padme Hum" }
];

const CountersDropdown = () => {
	const [open, setOpen] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		const handleClick = (e) => {
			if (ref.current && !ref.current.contains(e.target)) setOpen(false);
		};
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, []);

	return (
		<div
			ref={ref}
			className="relative"
			data-testid="counters-dropdown"
		>
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				className="nav-link flex items-center gap-1 text-[#1A1A1A] font-medium hover:text-[#FF6B00] transition-colors"
				data-testid="counters-dropdown-trigger"
				aria-expanded={open}
				aria-haspopup="true"
			>
				Counters
				<ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
			</button>

			{open && (
				<div
					className="absolute left-0 top-full mt-2 w-64 rounded-xl bg-[#FFF8EE] border border-[#D4AF37]/40 shadow-xl py-1 z-50"
					data-testid="counters-dropdown-menu"
				>
					{FEATURED_COUNTERS.map((c) => (
						<Link
							key={c.to}
							href={c.to}
							onClick={() => setOpen(false)}
							className="block px-4 py-2 text-sm text-[#1A1A1A] hover:bg-[#FFF3DD] hover:text-[#FF6B00] transition-colors"
							data-testid={`nav-counter-${c.to.replace(/\//g, "-")}`}
						>
							{c.label}
						</Link>
					))}
					<div className="border-t border-[#D4AF37]/30 mt-1 pt-1">
						<Link
							href="/mantra-library"
							onClick={() => setOpen(false)}
							className="block px-4 py-2 text-sm font-medium text-[#FF6B00] hover:bg-[#FFF3DD] transition-colors"
							data-testid="nav-counter-view-all"
						>
							View All Mantras →
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export const Header = () => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(false);
	}, []);

	return (
		<header
			className="sticky top-0 z-40 bg-[#FFF8EE]/95 backdrop-blur-sm border-b border-[#D4AF37]/30"
			data-testid="site-header"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
				<Logo />
				<nav
					className="hidden lg:flex items-center gap-7"
					data-testid="desktop-nav"
				>
					{NAV_BEFORE.map((item) => (
						<Link
							key={item.to}
							href={item.to}
							className="nav-link text-[#1A1A1A] font-medium hover:text-[#FF6B00]"
						>
							{item.label}
						</Link>
					))}
					<CountersDropdown />
					{NAV_AFTER.map((item) => (
						<Link
							key={item.to}
							href={item.to}
							className="nav-link text-[#1A1A1A] font-medium hover:text-[#FF6B00]"
						>
							{item.label}
						</Link>
					))}
				</nav>
				<button
					className="lg:hidden p-2 text-[#7B1C1C]"
					onClick={() => setOpen((value) => !value)}
					aria-label={open ? "Close menu" : "Open menu"}
					data-testid="mobile-menu-toggle"
					type="button"
				>
					{open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</button>
			</div>
			{open && (
				<div
					className="lg:hidden border-t border-[#D4AF37]/30 bg-[#FFF8EE] h-[calc(100vh-5rem)] overflow-y-auto animate-slideDown"
					data-testid="mobile-nav"
				>
					<div className="px-4 py-4 space-y-1 h-full">
						{NAV.map((item) => (
							<Link
								key={item.to}
								href={item.to}
								className="block rounded-lg px-3 py-2 text-[#1A1A1A] font-medium hover:bg-[#FFF3DD]"
								data-testid={`mobile-nav-${item.label.toLowerCase().replace(/ /g, "-")}`}
							>
								{item.label}
							</Link>
						))}
						<div className="border-t border-[#D4AF37]/30 pt-2">
							<p className="px-3 py-2 text-xs uppercase tracking-widest text-[#D4AF37]">Featured Counters</p>
							{FEATURED_COUNTERS.map((counter) => (
								<Link
									key={counter.to}
									href={counter.to}
									className="block rounded-lg px-3 py-2 text-[#7B1C1C] hover:bg-[#FFF3DD]"
								>
									{counter.label}
								</Link>
							))}
							<Link
								href="/mantra-library"
								className="block rounded-lg px-3 py-2 font-medium text-[#FF6B00]"
							>
								View All Mantras →
							</Link>
						</div>
					</div>
				</div>
			)}
		</header>
	);
};

export const Footer = () => (
	<footer
		className="sm:mt-20 bg-[#7B1C1C] text-[#FFF8EE]"
		data-testid="site-footer"
	>
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid md:grid-cols-4 gap-10">
			<div className="md:col-span-2">
				<div className="flex items-center gap-2 mb-3">
					<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B00] to-[#D4AF37] text-white font-serif text-xl">ॐ</span>
					<span className="font-serif text-2xl">Japa Counter</span>
				</div>
				<p className="text-[#FFF8EE]/80 max-w-md leading-relaxed">Supporting your spiritual journey through technology. A free, beautiful digital mala for mantra meditation — built with reverence.</p>
			</div>
			<div>
				<h4 className="font-serif text-lg mb-3 text-[#D4AF37]">Explore</h4>
				<ul className="space-y-2 text-sm">
					{NAV.map((n) => (
						<li key={n.to}>
							<Link
								href={n.to}
								className="hover:text-[#FF6B00] transition"
							>
								{n.label}
							</Link>
						</li>
					))}
					<li>
						<a
							href={configuredSiteUrl("/sitemap.xml")}
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
					{FEATURED_COUNTERS.slice(0, 6).map((c) => (
						<li key={c.to}>
							<Link
								href={c.to}
								className="hover:text-[#FF6B00] transition"
							>
								{c.label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
		<div className="border-t border-[#FFF8EE]/15">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row gap-3 justify-between text-xs text-[#FFF8EE]/70">
				<p>
					© {new Date().getFullYear()} {siteHostname()} · All rights reserved.
				</p>
				<div className="flex gap-5">
					<Link
						href="/privacy"
						className="hover:text-[#D4AF37]"
					>
						Privacy Policy
					</Link>
					<Link
						href="/terms"
						className="hover:text-[#D4AF37]"
					>
						Terms of Service
					</Link>
					<Link
						href="/disclaimer"
						className="hover:text-[#D4AF37]"
					>
						Disclaimer
					</Link>
				</div>
			</div>
		</div>
	</footer>
);

export const CookieBanner = () => {
	const [show, setShow] = useState(false);
	useEffect(() => {
		if (typeof window !== "undefined" && !localStorage.getItem("jco_cookie_ack")) {
			const t = setTimeout(() => setShow(true), 800);
			return () => clearTimeout(t);
		}
	}, []);
	if (!show) return null;
	return (
		<div
			className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md bg-[#FFF3DD] border border-[#D4AF37]/50 rounded-2xl p-5 shadow-2xl z-50"
			data-testid="cookie-banner"
		>
			<p className="text-sm text-[#1A1A1A] mb-3">
				We use only <span className="font-semibold text-[#7B1C1C]">localStorage</span> to remember your japa progress on this device. No personal data is sent to any server.
			</p>
			<div className="flex gap-2">
				<Button
					className="bg-[#FF6B00] hover:bg-[#7B1C1C] text-white rounded-full"
					onClick={() => {
						localStorage.setItem("jco_cookie_ack", "1");
						setShow(false);
					}}
					data-testid="cookie-accept-btn"
				>
					Got it
				</Button>
				<Link
					href="/privacy"
					className="text-sm self-center text-[#7B1C1C] underline"
				>
					Privacy
				</Link>
			</div>
		</div>
	);
};

export const Layout = ({ children }) => (
	<div className="min-h-screen flex flex-col">
		<Header />
		<main className="flex-1">{children}</main>
		<Footer />
		<CookieBanner />
	</div>
);

export default Layout;
