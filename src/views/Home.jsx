import Link from "next/link";
import { JapaCounter } from "../components/JapaCounter";
import { ArrowRight, Sparkles, Heart, Shield } from "lucide-react";

export default function Home() {
	return (
		<>
			<section
				className="relative pt-12 pb-6 px-4 sm:px-6 lg:px-8 text-center"
				data-testid="hero-section"
			>
				<div className="max-w-4xl mx-auto">
					<p className="text-sm uppercase tracking-[0.3em] text-[#D4AF37] mb-3">A Sacred Digital Mala</p>
					<h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#7B1C1C] leading-tight mb-5">Japa & Chanting Counter Online</h1>
					<h2 className="text-xl lg:text-2xl font-serif text-[#7B1C1C] leading-tight mb-5">
						Tap. Chant. <span className="italic text-[#FF6B00]">Manifest.</span>
					</h2>
					<p className="text-base sm:text-lg text-[#1A1A1A]/75 max-w-2xl mx-auto leading-relaxed">
						Every tap writes your mantra on a parchment of devotion. Track 108-bead malas, download your handwritten page, and share your sadhana with the world.
					</p>
					<div className="flex flex-wrap justify-center gap-3 mt-6 text-xs">
						{[
							{ i: Sparkles, t: "18+ Mantras" },
							{ i: Heart, t: "Free Forever" },
							{ i: Shield, t: "Private — On Your Device" }
						].map((x, i) => (
							<span
								key={i}
								className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#D4AF37]/30 text-[#7B1C1C]"
							>
								<x.i className="w-3.5 h-3.5 text-[#FF6B00]" /> {x.t}
							</span>
						))}
					</div>
				</div>
			</section>

			<JapaCounter
				storageKey="jco_session_home"
				initialMantraId="om"
			/>

			{/* Quick links */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<h2 className="font-serif text-3xl text-[#7B1C1C] mb-6 text-center">Dedicated Counter Pages</h2>
				<div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
					{[
						{ to: "/counter/ram-ram", n: "Ram Naam", s: "राम" },
						{ to: "/counter/radhe-radhe", n: "Radhe Radhe", s: "राधे" },
						{ to: "/counter/om-namah-shivaya", n: "Om Namah Shivaya", s: "ॐ नमः शिवाय" },
						{ to: "/counter/om-han-hanumate-namah", n: "Hanuman", s: "ॐ हं हनुमते" },
						{ to: "/counter/waheguru", n: "Waheguru", s: "ਵਾਹਿਗੁਰੂ" }
					].map((c) => (
						<Link
							key={c.to}
							href={c.to}
							className="group bg-white rounded-2xl border border-[#D4AF37]/30 p-5 hover:-translate-y-1 hover:shadow-xl transition"
							data-testid={`home-counter-card-${c.to.replace(/\//g, "")}`}
						>
							<p className="font-devanagari text-2xl text-[#FF6B00] mb-2">{c.s}</p>
							<p className="font-serif text-lg text-[#7B1C1C]">{c.n} Counter</p>
							<p className="text-xs text-[#D4AF37] mt-2 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
								Open <ArrowRight className="w-3 h-3" />
							</p>
						</Link>
					))}
				</div>
			</section>

			{/* About blurb */}
			<section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
				<h2 className="font-serif text-3xl text-[#7B1C1C] mb-4">Why Use a Japa Counter?</h2>
				<p className="text-[#1A1A1A]/80 leading-relaxed">
					A traditional mala carries 108 beads, a number woven through Vedic cosmology, astronomy, and the quiet mathematics of the breath. For thousands of years, devotees have moved bead by bead, letting the
					rhythm of touch hold the count while the mind held the mantra. But life has changed shape. The metro arrives at 8:15. The meeting starts at 9. The mala stays at home in a small velvet pouch, and somewhere
					between the office desk and the evening commute, the chanting that once lived inside the day begins to slip.
				</p>
				<p className="text-[#1A1A1A]/80 leading-relaxed">
					This is where a quiet Japa Counter can step in. Not to replace the sacred bead, but to protect the practice when the bead cannot travel with you. (Scroll up and tap the lotus to begin whenever you are
					ready.)
				</p>
				<h2 className="font-serif text-3xl text-[#7B1C1C] mb-4 mt-3">A Chanting Counter That Stays Out of the Way</h2>
				<p className="text-[#1A1A1A]/80 leading-relaxed">
					This is a free online Japa Counter for devotees who want to keep their daily practice steady, no matter where the day takes them. Each tap of the lotus is one mantra. One bead turned. One breath honoured.
					The 108 counter tracks every full mala on its own, so the part of the mind that usually whispers “was that ninety-six or ninety-seven?” can finally rest. What you are left with is the sound of the name
					itself, rising and settling in its own time.
				</p>
				<p className="text-[#1A1A1A]/80 leading-relaxed">
					Whether you chant Om Namah Shivaya before dawn, repeat Radhe Radhe on a quiet evening walk, recite the Hare Krishna Mahamantra through sixteen rounds, or hold a single syllable of Om in stillness, this
					Chanting Counter holds the count gently in the background while you stay with the sound.
				</p>
				<h2 className="font-serif text-3xl text-[#7B1C1C] mb-4 mt-3">Why 108, And Why It Still Matters</h2>
				<p className="text-[#1A1A1A]/80 leading-relaxed">
					The number 108 is not arbitrary. The diameter of the sun is roughly 108 times the diameter of the earth. The distance from the earth to the sun is approximately 108 sun-diameters. The Upanishads name 108
					principal nadis converging at the heart. There are 108 Upanishads, 108 sacred sites, 108 names for many deities. To complete one mala, one round of 108, is to walk a small circle of cosmic geometry with
					your tongue, your breath, and your attention.
				</p>
				<p className="text-[#1A1A1A]/80 leading-relaxed">A modern Mantra Counter Online does not dilute this. It simply removes the friction. The geometry is still there. The discipline is still yours.</p>
				<h2 className="font-serif text-3xl text-[#7B1C1C] mb-4 mt-3">A Mantra Counter Built for Real Life</h2>
				<p className="text-[#1A1A1A]/80 leading-relaxed">
					Most people who try to begin a regular practice do not stop because the practice is hard. They stop because they lost count once at a traffic signal, or felt awkward pulling out a mala at the office, or
					could not remember by Friday how many rounds Tuesday’s chanting had been. A simple Online Mala Counter removes all three of those small frictions.
				</p>
				<p className="text-[#1A1A1A]/80 leading-relaxed">
					The tool works on any device. Phone, tablet, laptop. Tap the screen, press Space, or press Enter. Your current count, your malas, and your lifetime total are kept on your own device. No login. No sign-up.
					No data sent anywhere. Your practice stays between you and the divine, the way it has always been.
				</p>
				<p className="text-[#1A1A1A]/80 leading-relaxed">
					For those who like company in their chanting, the parchment canvas beside the counter quietly writes your mantra in flowing script as you tap. A small visual record of the morning. You can download it as
					an image and share it, or simply close the tab and let the practice be yours alone.
				</p>
				<h2 className="font-serif text-3xl text-[#7B1C1C] mb-4 mt-3">A Chanting Counter Online for Every Tradition</h2>
				<p className="text-[#1A1A1A]/80 leading-relaxed">
					Devotion is not bound to a single name. From Gayatri Mantra and Maha Mrityunjaya to Waheguru, Hare Krishna, Om Mani Padme Hum, and Jai Shri Ram, this Chanting Counter Online holds space for more than eighteen mantras across Hindu, Sikh, and Buddhist traditions. You can switch between Devanagari and English script with one tap, set a personal target of 11, 21, 54, 108, or any number that feels right, and use the meditation timer when your practice is more about duration than rounds.
				</p>
				<p className="text-[#1A1A1A]/80 leading-relaxed">
					For devotees who keep dedicated rounds for specific deities, separate counter pages are also available: Ram Naam Counter, Radhe Radhe Counter, Om Namah Shivaya Counter, Hanuman Counter, and Waheguru Counter. Each is tuned for that particular practice.
				</p>
				<h2 className="font-serif text-3xl text-[#7B1C1C] mb-4 mt-3">A Tool Built With Reverence</h2>
				<p className="text-[#1A1A1A]/80 leading-relaxed">
					There is a temptation, when technology meets tradition, to flatten the tradition. To make it look modern. To gamify it. We have tried to do the opposite. This tool is meant to disappear, to be the thinnest possible layer between you and the mantra. No notifications. No leaderboards. No streaks designed to pull you back when your heart wanted rest. Just a lotus, a number, and the quiet space your practice deserves.
				</p>
				<p className="text-[#1A1A1A]/80 leading-relaxed">
					If you have been searching for a clean Japa Counter, a focused Chanting Counter, or an online mala counter that respects the practice it serves, you have arrived. Tap the lotus when you are ready. The count will hold itself. You only need to bring the name.
				</p>
			</section>
		</>
	);
}
