import { Disclaimer } from "@/views/StaticPages";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
	title: "Disclaimer — Japa Counter",
	description: "Spiritual guidance disclaimer.",
	canonical: "/disclaimer"
});

export default function DisclaimerPage() {
	return <Disclaimer />;
}
