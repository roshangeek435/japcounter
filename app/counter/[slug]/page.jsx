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
			title: "Mantra Library — Japa Counter",
			description: "Explore the mantra library and open a dedicated digital mala for your practice.",
			canonical: "/mantra-library"
		});
	}

	return buildMetadata({
		title: `${mantra.name} Japa Counter — Free Digital Mala`,
		description: `Chant ${mantra.name} (${mantra.script.slice(0, 40)}) online with our free digital Japa Counter. Track 108 malas, write your japa on a sacred parchment, download as image, and share your devotion.`,
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
