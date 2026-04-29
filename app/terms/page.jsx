import { Terms } from "@/views/StaticPages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
	title: "Terms of Service — Japa Counter",
	description: "Terms governing use of the free Japa Counter tool.",
	canonical: "/terms"
});

export default function TermsPage() {
	return <Terms />;
}
