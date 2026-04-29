import Home from "@/views/Home";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { configuredSiteUrl } from "@/lib/siteConfig";

export const metadata = buildMetadata({
	title: "Japa Counter — Free Digital Mala for Mantra Meditation",
	description: "Free, beautiful digital mala. Tap to chant, watch your mantra fill a sacred parchment, download as image and share. 20+ preloaded mantras (Om, Ram, Hare Krishna, Om Namah Shivaya, Hanuman, Gayatri & more).",
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
