import "@/index.css";
import { AppToaster } from "@/components/AppToaster";
import { Layout } from "@/components/Layout";
import { JsonLd } from "@/components/JsonLd";
import { getGlobalJsonLd, getMetadataBase } from "@/lib/metadata";

export const metadata = {
	metadataBase: getMetadataBase(),
	title: "Japa Counter — Free Digital Mala for Mantra Meditation",
	description: "Free, beautiful digital mala. Tap to chant, watch your mantra fill a sacred parchment, download as image and share."
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Layout>
					<JsonLd
						id="global-jsonld"
						data={getGlobalJsonLd()}
					/>
					{children}
				</Layout>
				<AppToaster />
			</body>
		</html>
	);
}
