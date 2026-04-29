import { configuredSiteUrl, getConfiguredSiteOrigin } from "./siteConfig";

export function getMetadataBase() {
	const origin = getConfiguredSiteOrigin();
	if (!origin) {
		return undefined;
	}

	try {
		return new URL(origin);
	} catch {
		return undefined;
	}
}

export function buildMetadata({ title, description, canonical = "/", robots, openGraphType = "website", image = "/og-image.png" }) {
	const canonicalUrl = configuredSiteUrl(canonical);
	const imageUrl = configuredSiteUrl(image);

	return {
		title,
		description,
		alternates: {
			canonical
		},
		robots,
		openGraph: {
			type: openGraphType,
			siteName: "Japa Counter",
			locale: "en_IN",
			title,
			description,
			url: canonicalUrl,
			images: imageUrl ? [{ url: imageUrl }] : undefined
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: imageUrl ? [imageUrl] : undefined
		}
	};
}

export function buildJsonLd(schema) {
	if (!schema) {
		return null;
	}

	if (Array.isArray(schema)) {
		const graph = schema.map((node) => {
			if (node && typeof node === "object" && "@context" in node) {
				const { "@context": _context, ...rest } = node;
				return rest;
			}
			return node;
		});

		return {
			"@context": "https://schema.org",
			"@graph": graph
		};
	}

	return schema;
}

export function getGlobalJsonLd() {
	const origin = getConfiguredSiteOrigin();
	if (!origin) {
		return null;
	}

	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebSite",
				"@id": `${origin}/#website`,
				name: "Japa Counter",
				url: `${origin}/`,
				description: "Free digital mala for mantra meditation with live writing canvas, downloadable image, and 150+ preloaded mantras.",
				inLanguage: "en-IN",
				publisher: { "@id": `${origin}/#organization` }
			},
			{
				"@type": "Organization",
				"@id": `${origin}/#organization`,
				name: "Japa Counter",
				url: origin
			}
		]
	};
}
