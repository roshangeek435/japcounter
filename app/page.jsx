import Home from "@/views/Home";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { configuredSiteUrl } from "@/lib/siteConfig";

export const metadata = buildMetadata({
	title: "Japa Counter · Free Online Chanting Counter & 108 Mala Tracker",
	description: "A free Japa Counter and online Chanting Counter for daily mantra meditation. Track 108-bead malas with a beautiful digital mala. No signup. Just devotion.",
	canonical: "/"
});

export default function HomePage() {
	const schema = {
		"@context": "https://schema.org",
		"@type": "WebApplication",
		name: "Japa Counter",
		url: configuredSiteUrl("/"),
		applicationCategory: "LifestyleApplication",
		operatingSystem: "Web",
		offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
		description: "A free digital mala for mantra meditation with live writing canvas, downloadable image, and 20+ preloaded mantras."
	};

	return (
		<>
			<JsonLd
				id="home-jsonld"
				data={schema}
			/>
			<Home />
		</>
	);
}
