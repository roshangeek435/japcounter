import { Terms } from "@/views/StaticPages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
	title: "Terms of Service | Japa Counter",
	description: "Read the terms of service for using Japa Counter, our free online chanting counter and digital mala for daily mantra meditation.",
	canonical: "/terms"
});

export default function TermsPage() {
	return <Terms />;
}
