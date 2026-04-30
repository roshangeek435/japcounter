import { redirect } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { ALL_MANTRAS, getMantraById } from "@/lib/mantras";
import { configuredSiteUrl } from "@/lib/siteConfig";
import MantraCounterPage, { buildFAQ } from "@/views/MantraCounterPage";

export async function generateStaticParams() {
	return ALL_MANTRAS.map((mantra) => ({ slug: mantra.id }));
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const mantra = getMantraById(slug);

	if (!mantra) {
		return buildMetadata({
			title: "Mantra Library | 150+ Mantras for Daily Chanting",
			description: "Browse 150+ sacred mantras for daily chanting. Find mantras for Shiva, Vishnu, Krishna, Ram, Devi, and more. Free japa counter for each mantra.",
			canonical: "/mantra-library"
		});
	}

	const { name, category, language } = mantra;

	// Title Logic: Use "Online Japa Counter" for long names to stay within SEO limits
	const title = `${name} Counter | ${name.length > 25 ? "Online Japa Counter" : "Free Japa Counter Online"}`;

	// Description Templates based on spreadsheet categories
	let description = `Chant ${name} online with our free digital Japa Counter. Track 108 malas, write your japa on a sacred parchment, and download as image. No signup.`;

	const categoryLower = category.toLowerCase();
	const nameLower = name.toLowerCase();

	if (categoryLower === "shiva") {
		description = `Chant ${name} for inner stillness and Shiva's grace. Free online japa counter with 108 mala tracking. No signup. Begin your daily sadhana.`;
	} else if (categoryLower === "vishnu") {
		description = `Chant ${name} for divine protection and surrender. Free online chanting counter with 108-bead mala tracking. Begin your daily Vishnu sadhana.`;
	} else if (categoryLower === "ram") {
		description = `Repeat ${name} for peace and Ram's blessings. Free online japa counter with 108-bead mala tracking. Start your daily Ram naam practice today.`;
	} else if (categoryLower === "krishna") {
		description = `Chant ${name} for love and Krishna bhakti. Free online chanting counter with 108 mala tracking. Begin your daily Krishna naam sadhana.`;
	} else if (categoryLower === "hanuman") {
		description = `Chant ${name} for courage and Hanuman's protection. Free online japa counter with 108-bead mala tracking. Start your daily Hanuman bhakti.`;
	} else if (categoryLower === "ganesha") {
		description = `Chant ${name} to remove obstacles with Ganesh's grace. Free online japa counter with 108-bead mala tracking. Begin your daily practice.`;
	} else if (categoryLower === "devi") {
		if (nameLower.includes("lakshmi")) {
			description = `Chant ${name} for prosperity and Lakshmi's blessings. Free online japa counter with 108 mala tracking. Begin your daily Lakshmi sadhana.`;
		} else if (nameLower.includes("saraswati")) {
			description = `Chant ${name} for wisdom and Saraswati's grace. Free online japa counter with 108-bead mala tracking. Begin your daily sadhana now.`;
		} else if (nameLower.includes("kali")) {
			description = `Chant ${name} for inner transformation and Kali's grace. Free online japa counter with 108 mala tracking. Begin your daily Kali sadhana.`;
		} else {
			description = `Chant ${name} for strength and Devi's protection. Free online chanting counter with 108-bead mala tracking. Begin your daily Durga sadhana.`;
		}
	} else if (categoryLower === "surya") {
		description = `Chant ${name} for vitality and Surya's blessings. Free online chanting counter with 108-bead mala tracking. Begin your daily practice.`;
	} else if (categoryLower === "universal" || categoryLower === "guru") {
		if (categoryLower === "guru" || nameLower.includes("guru")) {
			description = `Chant ${name} for the guru's grace and inner guidance. Free online japa counter with 108-bead mala tracking. Begin your daily sadhana.`;
		} else {
			description = `Chant ${name} for self-realization and inner truth. Free online japa counter with 108-bead mala tracking. Begin your daily Vedantic practice.`;
		}
	} else if (categoryLower === "navagraha") {
		description = `Chant ${name} for planetary harmony and grace. Free online japa counter with 108-bead mala tracking. Begin your daily graha sadhana.`;
	} else if (categoryLower === "buddhist") {
		description = `Chant ${name} for compassion and Buddhist practice. Free online japa counter with 108-bead mala tracking. Begin your daily mantra meditation.`;
	} else if (categoryLower === "jain") {
		description = `Chant ${name} for spiritual purity and Jain dharma. Free online japa counter with 108-bead mala tracking. Begin your daily Jain practice.`;
	} else if (categoryLower === "sikh") {
		description = `Recite ${name} for divine remembrance and naam simran. Free online jap counter with 108-bead mala tracking. Begin your daily Sikh practice.`;
	}

	// Tamil specific override if needed
	if (language.toLowerCase() === "tamil" && !description.includes("sadhana")) {
		description = `Chant ${name} with devotion. Free online japa counter with 108-bead mala tracking. Begin your daily Tamil mantra practice today.`;
	}

	return buildMetadata({
		title,
		description,
		canonical: `/counter/${mantra.id}`
	});
}

export default async function CounterPage({ params }) {
	const { slug } = await params;
	const mantra = getMantraById(slug);

	if (!mantra) {
		redirect("/mantra-library");
	}

	const schema = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: `${mantra.name} Japa Counter`,
		description: `Free online digital mala for chanting ${mantra.name} (${mantra.transliteration}). ${mantra.benefits}`,
		applicationCategory: "LifestyleApplication",
		operatingSystem: "Web",
		offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
		url: configuredSiteUrl(`/counter/${mantra.id}`)
	};

	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: buildFAQ(mantra).map((item) => ({
			"@type": "Question",
			name: item.q,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.a
			}
		}))
	};

	return (
		<>
			<JsonLd
				id="counter-jsonld"
				data={[schema, faqSchema]}
			/>
			<MantraCounterPage mantra={mantra} />
		</>
	);
}
