import { Privacy } from "@/views/StaticPages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
	title: "Privacy Policy — Japa Counter",
	description: "Privacy-first: no personal data is collected or transmitted.",
	canonical: "/privacy"
});

export default function PrivacyPage() {
	return <Privacy />;
}
