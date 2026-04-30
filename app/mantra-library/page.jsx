import MantraLibrary from "@/views/MantraLibrary";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { ALL_MANTRAS } from "@/lib/mantras";
import { configuredSiteUrl } from "@/lib/siteConfig";

export const metadata = buildMetadata({
	title: "Mantra Library | 150+ Mantras for Daily Chanting",
	description: "Browse 150+ sacred mantras for daily chanting. Find mantras for Shiva, Vishnu, Krishna, Ram, Devi, and more. Free japa counter for each mantra.",
	canonical: "/mantra-library"
});

export default function MantraLibraryPage() {
	const schema = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		itemListElement: ALL_MANTRAS.map((mantra, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: mantra.name,
			url: configuredSiteUrl(`/counter/${mantra.id}`)
		}))
	};

	return (
		<>
			<JsonLd
				id="mantra-library-jsonld"
				data={schema}
			/>
			<MantraLibrary />
		</>
	);
}
