import { About } from "@/views/StaticPages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
	title: "About Japa Counter | Sacred Digital Mala Tool",
	description: "Japa Counter is a free, beautiful digital mala built with reverence. Learn the story behind our online chanting counter for mantra meditation.",
	canonical: "/about"
});

export default function AboutPage() {
	return <About />;
}
