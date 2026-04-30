import { Privacy } from "@/views/StaticPages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
	title: "Privacy Policy | Japa Counter",
	description: "Read our privacy policy. Japa Counter stores your chanting data only on your device. No tracking, no accounts, no data sold. Ever.",
	canonical: "/privacy"
});

export default function PrivacyPage() {
	return <Privacy />;
}
