import "@/index.css";
import { AppToaster } from "@/components/AppToaster";
import { Layout } from "@/components/Layout";
import { JsonLd } from "@/components/JsonLd";
import { getGlobalJsonLd, getMetadataBase } from "@/lib/metadata";

export const metadata = {
	metadataBase: getMetadataBase(),
	title: "Japa Counter · Free Online Chanting Counter & 108 Mala Tracker",
	description: "A free Japa Counter and online Chanting Counter for daily mantra meditation. Track 108-bead malas with a beautiful digital mala. No signup. Just devotion."
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
