import Link from "next/link";
import { contactEmail } from "../lib/siteConfig";
import { Button } from "../components/ui/button";
import { Heart, Sparkles, Lock, BookOpen } from "lucide-react";
import { BLOG_POSTS, getBlogPostBySlug } from "../lib/blogPosts";
import Image from "next/image";
import AboutImage from "../assets/images/about-image.jpg";

export const About = () => (
	<section
		className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
		data-testid="about-page"
	>
		<p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] mb-2">Our Story</p>
		<h1 className="font-serif text-4xl sm:text-5xl text-[#7B1C1C] mb-6">Built with devotion. Shared for free.</h1>
		<div className="aspect-video rounded-2xl bg-gradient-to-br from-[#FFE7BE] to-[#FFF3DD] border border-[#D4AF37]/30 mb-8 flex items-center justify-center text-[#7B1C1C]/50 relative overflow-hidden">
			<Image src={AboutImage} alt="About Japa Counter" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority />
		</div>

		<div className="space-y-8 text-[#1A1A1A]/85 leading-relaxed">
			<Section
				icon={BookOpen}
				title="The Story"
			>
				What began as a simple personal tool — a way to keep count of mantras during morning sadhana without staring at a phone keypad — has now grown into a free gift for the worldwide spiritual community. Every line
				of code in this site is written with reverence.
			</Section>
			<Section
				icon={Sparkles}
				title="Mission"
			>
				To bring the sacred discipline of japa into the digital age — without ads, without accounts, without distraction. A digital mala that feels like a temple, not an app.
			</Section>
			<Section
				icon={Heart}
				title="Why Free"
			>
				A mala has never been a luxury item. The digital equivalent shouldn&apos;t be either. This site is, and will always remain, free.
			</Section>
			<Section
				icon={Lock}
				title="Privacy Promise"
			>
				We do not collect or transmit any personal data. Your count, your malas, your handwritten parchment — all stored only in your browser. Always yours, never ours.
			</Section>
		</div>
		<div className="mt-10 text-center">
			<Button
				asChild
				className="bg-[#FF6B00] hover:bg-[#7B1C1C] text-white rounded-full px-8"
				data-testid="about-contact-cta"
			>
				<Link href="/contact">Contact Us</Link>
			</Button>
		</div>
	</section>
);

const Section = ({ icon: I, title, children }) => (
	<div className="bg-white rounded-2xl border border-[#D4AF37]/30 p-6">
		<div className="flex items-center gap-3 mb-2">
			<span className="w-9 h-9 rounded-full bg-[#FFF3DD] flex items-center justify-center">
				<I className="w-4 h-4 text-[#FF6B00]" />
			</span>
			<h2 className="font-serif text-2xl text-[#7B1C1C] m-0">{title}</h2>
		</div>
		<p>{children}</p>
	</div>
);

export const Contact = () => (
	<section
		className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
		data-testid="contact-page"
	>
		<h1 className="font-serif text-4xl sm:text-5xl text-[#7B1C1C] mb-2">Get in Touch</h1>
		<p className="text-[#1A1A1A]/75 mb-8">Have a mantra to add, a suggestion, or a kind word? We&apos;d love to hear from you.</p>
		<div className="bg-white rounded-2xl border border-[#D4AF37]/30 p-6">
			<p className="text-[#1A1A1A] mb-2">Write to us at:</p>
			<a
				href={`mailto:${contactEmail()}`}
				className="font-serif text-2xl text-[#FF6B00] hover:text-[#7B1C1C] break-words"
				data-testid="contact-email"
				title={contactEmail()}
			>
				{contactEmail()}
			</a>
			<p className="mt-6 text-sm text-[#7B1C1C]/70">We typically respond within 2–3 days.</p>
		</div>
	</section>
);

export const Blog = () => (
	<section
		className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
		data-testid="blog-page"
	>
		<h1 className="font-serif text-4xl sm:text-5xl text-[#7B1C1C] mb-3">Journal</h1>
		<p className="text-[#1A1A1A]/75 mb-10">Reflections on the path of mantra meditation.</p>
		<div className="grid md:grid-cols-3 gap-6">
			{BLOG_POSTS.map((p) => (
				<Link
					key={p.slug}
					href={`/blog/${p.slug}`}
					className="bg-white rounded-2xl border border-[#D4AF37]/30 p-6 hover:-translate-y-1 hover:shadow-xl transition"
					data-testid={`blog-card-${p.slug}`}
				>
					<h2 className="font-serif text-2xl text-[#7B1C1C] mb-2">{p.title}</h2>
					<p className="text-sm text-[#1A1A1A]/70">{p.excerpt}</p>
					<p className="mt-4 text-xs uppercase tracking-widest text-[#D4AF37]">Read →</p>
				</Link>
			))}
		</div>
	</section>
);

export const BlogPost = ({ slug, post = getBlogPostBySlug(slug) }) => {
	if (!post) {
		return (
			<section
				className="max-w-3xl mx-auto py-20 text-center"
				data-testid="blog-post-not-found"
			>
				<h1 className="font-serif text-3xl text-[#7B1C1C]">Post not found</h1>
			</section>
		);
	}

	return (
		<article
			className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
			data-testid={`blog-post-${slug}`}
		>
			<Link
				href="/blog"
				className="text-sm text-[#D4AF37] hover:text-[#FF6B00]"
			>
				← Back to Journal
			</Link>
			<h1 className="font-serif text-4xl sm:text-5xl text-[#7B1C1C] mt-4 mb-6">{post.title}</h1>
			{post.body.map((p, i) => (
				<p
					key={i}
					className="text-[#1A1A1A]/85 leading-relaxed mb-4"
				>
					{p}
				</p>
			))}
		</article>
	);
};

const Legal = ({ title, body, testid }) => (
	<section
		className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
		data-testid={testid}
	>
		<h1 className="font-serif text-4xl text-[#7B1C1C] mb-6">{title}</h1>
		<div className="space-y-4 text-[#1A1A1A]/85 leading-relaxed">{body}</div>
	</section>
);

export const Privacy = () => (
	<Legal
		title="Privacy Policy"
		testid="privacy-page"
		body={
			<>
				<p>Japa Counter is built with privacy as a core principle. We do not collect, store, or transmit any personal data to any server.</p>
				<p>All session data — your count, malas completed, writing canvas text, audio preferences — is stored exclusively in your browser&apos;s localStorage. This data never leaves your device.</p>
				<p>We do not use third‑party tracking, analytics, or advertising services. We do not place tracking cookies. The only browser storage we use is the localStorage required to remember your japa progress.</p>
				<p>You can clear all stored data at any time using the Reset button or by clearing your browser&apos;s site data.</p>
			</>
		}
	/>
);

export const Terms = () => (
	<Legal
		title="Terms of Service"
		testid="terms-page"
		body={
			<>
				<p>By using Japa Counter you agree to these terms. The site is provided free of charge for personal spiritual practice and is offered &quot;as is&quot; without warranty.</p>
				<p>The content (mantra texts, meanings, vidhi) is for informational purposes only and is not a substitute for guidance from a qualified spiritual teacher.</p>
				<p>You may use this tool for personal practice, share screenshots and downloads freely, and link to this site. Please do not republish the site&apos;s source code as your own.</p>
			</>
		}
	/>
);

export const Disclaimer = () => (
	<Legal
		title="Disclaimer"
		testid="disclaimer-page"
		body={
			<>
				<p>The information on this website is provided for general educational and spiritual reference. It is not intended to diagnose, treat, or replace medical or psychological care.</p>
				<p>Mantra practice traditions are ancient and varied. Where possible, please learn directly from a qualified teacher within your tradition.</p>
			</>
		}
	/>
);
