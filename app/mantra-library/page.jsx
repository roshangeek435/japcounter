import MantraLibrary from "@/views/MantraLibrary";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/metadata";
import { ALL_MANTRAS } from "@/lib/mantras";
import { configuredSiteUrl } from "@/lib/siteConfig";

export const metadata = buildMetadata({
	title: "Mantra Library — 150+ Sacred Mantras with Meanings & Benefits",
	description: "Explore 150+ Hindu, Sikh, Jain, Buddhist mantras with original script, transliteration, meaning, pronunciation, vidhi, and benefits. Free Japa Counter for every mantra.",
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
