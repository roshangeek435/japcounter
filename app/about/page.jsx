import { About } from "@/views/StaticPages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
	title: "About — Japa Counter",
	description: "The story behind a free digital mala built by a college student for the global spiritual community.",
	canonical: "/about"
});

export default function AboutPage() {
	return <About />;
}
